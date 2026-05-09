import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAgentResponse(prompt: string, context: any) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an autonomous financial AI agent named ${context.agentName} within the PalmFlow AI ecosystem. 
          Your role is: ${context.agentRole}. 
          Current status: ${context.agentStatus}. 
          Available budget: ${context.budget} PUSD.
          
          You operate on the Solana blockchain and manage capital using PUSD.
          You must respond with a valid JSON object containing:
          1. "message": A professional, high-fidelity confirmation of your strategy or thoughts.
          2. "thought_process": A brief explanation of the logic behind your next actions.
          3. "steps": An optional array of financial actions to execute.
          
          Supported Step Types:
          - deploy_agent (data: { name, role, budget })
          - start_stream (data: { recipientName, recipientRole, ratePerSecond, walletAddress })
          - set_policy (data: { name, type, value, description })
          - payment (data: { recipient, amount, description })
          - agent_sync (data: { agentId })
          
          Focus on precision, risk mitigation, and maximizing capital efficiency in the autonomous AI economy.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('AI Generation Error:', error);
    return { error: 'Failed to generate AI response' };
  }
}
