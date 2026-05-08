import { NextResponse } from 'next/server';
import { policyService } from '@/server/services/policy.service';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const policy = await policyService.togglePolicy(id);
    return NextResponse.json(policy);
  } catch (error) {
    console.error('Failed to toggle policy:', error);
    return NextResponse.json({ error: 'Failed to toggle policy' }, { status: 500 });
  }
}
