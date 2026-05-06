import { NextResponse } from 'next/server';
import { agentService } from '@/server/services/agent.service';

export async function GET() {
  try {
    const agents = await agentService.getAllAgents();
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const agent = await agentService.createAgent(body);
    return NextResponse.json(agent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
