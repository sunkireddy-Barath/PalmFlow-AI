import { prisma } from '@/lib/prisma';

export const reputationService = {
  /**
   * Calculate and update the Reputation (Trust Score) for an agent
   * Score is based on: Efficiency, Task Completion, and Budget Discipline
   */
  async calculateAgentReputation(agentId: string) {
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: { transactions: true }
    });

    if (!agent) return 0;

    // 1. Efficiency Base (0-100)
    let score = agent.efficiency;

    // 2. Task Volume Bonus
    score += Math.min(agent.tasksCount * 2, 20);

    // 3. Discipline Penalty (if spent > budget)
    if (agent.spent > agent.budget) {
      score -= 30;
    }

    // 4. Transaction Reliability (Success vs Failure)
    const txCount = agent.transactions.length;
    if (txCount > 10) score += 5;

    // Cap at 100
    const finalScore = Math.max(0, Math.min(100, score));

    // We can store this in a new field if we want, or just return it
    // For now, let's update the efficiency field to reflect the "Overall Trust Score"
    await prisma.agent.update({
      where: { id: agentId },
      data: { efficiency: finalScore }
    });

    return finalScore;
  },

  /**
   * Get the "Credit Rating" label for an agent
   */
  getAgentCreditRating(score: number) {
    if (score >= 95) return 'AAA (Elite)';
    if (score >= 85) return 'AA (Trusted)';
    if (score >= 70) return 'A (Reliable)';
    if (score >= 50) return 'B (Developing)';
    return 'C (High Risk)';
  }
};
