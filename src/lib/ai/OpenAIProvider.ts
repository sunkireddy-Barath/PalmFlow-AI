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
          You must respond in a professional, efficient, and machine-like manner. 
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
