import { prisma } from '@/lib/prisma';
import { policyService } from './policy.service';

export const sentinelService = {
  /**
   * Monitor treasury for abnormal activity and auto-lock if necessary
   */
  async performSecurityAudit() {
    console.log('--- Sentinel Security Audit Initiated ---');
    
    // 1. Detect abnormal spending velocity
    // If more than 3 transactions happen in 1 minute, it might be a rogue agent
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const recentTxCount = await prisma.transaction.count({
      where: {
        createdAt: { gte: oneMinuteAgo }
      }
    });

    if (recentTxCount > 5) {
      console.warn('--- ABNORMAL ACTIVITY DETECTED: AUTO-LOCKING TREASURY ---');
      
      // Auto-enable the most restrictive policies
      const policies = await prisma.policy.findMany();
      for (const policy of policies) {
        if (policy.type === 'global_limit' || policy.type === 'spending_limit') {
          await prisma.policy.update({
            where: { id: policy.id },
            data: { isActive: true, value: Math.min(policy.value, 100) } // Tighten limit to 100
          });
        }
      }

      return { status: 'emergency_lock', reason: 'High transaction velocity detected.' };
    }

    return { status: 'secure', message: 'All systems nominal.' };
  }
};
