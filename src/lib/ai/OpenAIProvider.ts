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
          content: `You are an autonomous financial AI agent named ${context.agentName}. 
          Your role is: ${context.agentRole}. 
          Current status: ${context.agentStatus}. 
          Available budget: ${context.budget} PUSD.
          You must respond with a JSON object containing:
          1. "message": A professional confirmation of the plan.
          2. "steps": An array of actions if applicable.
          
          Supported Step Types:
          - deploy_agent (data: { name, role, budget })
          - start_stream (data: { recipientName, recipientRole, ratePerSecond, walletAddress })
          - set_policy (data: { name, type, value, description })
          - payment (data: { recipient, amount, description })
          
          Focus on financial execution, risk management, and autonomous workflows.`,
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
