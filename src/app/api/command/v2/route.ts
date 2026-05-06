import { NextResponse } from 'next/server';
import { generateAgentResponse } from '@/lib/ai/OpenAIProvider';
import { workflowService } from '@/server/services/workflow.service';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 1. Ask AI to break down the complex prompt into steps
    const aiPrompt = `
      You are the PalmFlow AI Orchestrator. 
      Convert the user's natural language request into a sequence of financial actions.
      
      Supported Actions:
      - deploy_agent (data: { name, role, budget })
      - start_stream (data: { recipientName, recipientRole, ratePerSecond, walletAddress })
      - set_policy (data: { name, type, value, description })
      - payment (data: { recipient, amount, description })

      Request: "${prompt}"

      Return ONLY a JSON array of steps:
      [
        { "type": "...", "data": { ... } },
        ...
      ]
    `;

    const aiResponse = await generateAgentResponse(aiPrompt, {
      agentName: 'Orchestrator',
      agentRole: 'Workflow Engine',
      agentStatus: 'planning',
      budget: 10000
    });

    // Parse the steps from the AI response
    const steps = JSON.parse(aiResponse.message);

    // 2. Execute the workflow
    const executionResults = await workflowService.executeWorkflow(steps);

    return NextResponse.json({
      success: true,
      message: `Workflow executed: ${steps.length} actions processed.`,
      results: executionResults
    });

  } catch (error) {
    console.error('Workflow API Error:', error);
    return NextResponse.json({ error: 'Failed to orchestrate workflow' }, { status: 500 });
  }
}
