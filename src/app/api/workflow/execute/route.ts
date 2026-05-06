import { generateAgentResponse } from '@/lib/ai/OpenAIProvider';
import { transactionService } from '@/server/services/transaction.service';
import { agentService } from '@/server/services/agent.service';
import { solanaService } from '@/server/services/solana.service';

export async function POST(req: Request) {
  try {
    const { command, agentId } = await req.json();
    
    // 1. Get Agent Context
    const agent = await agentService.getAgentById(agentId);
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    // 2. Process Command with AI
    const aiResponse = await generateAgentResponse(command, {
      agentName: agent.name,
      agentRole: agent.role,
      agentStatus: agent.status,
      budget: agent.budget - agent.spent,
    });

    // 3. Execute Actions (REAL SOLANA TRANSACTIONS)
    let txHash = null;
    if (aiResponse.action === 'payment') {
      // Execute REAL on-chain payment
      // For demo, we use a fixed test recipient or the agent's wallet
      const recipient = agent.walletAddress || 'FRnaJo8MyEzt7Hd6XRHaYeid71JyaACEVVWkvjp4G8wv';
      
      txHash = await solanaService.executePayment(recipient, aiResponse.amount);

      await transactionService.createTransaction({
        amount: aiResponse.amount,
        type: 'payment',
        description: aiResponse.description,
        agentId: agent.id,
        txHash: txHash,
      });
      
      await agentService.recordTaskCompletion(agent.id);
    }

    return NextResponse.json({
      success: true,
      message: aiResponse.message || 'Workflow executed successfully',
      actions: aiResponse.actions || [],
    });
  } catch (error) {
    console.error('Workflow Execution Error:', error);
    return NextResponse.json({ error: 'Failed to execute workflow' }, { status: 500 });
  }
}
