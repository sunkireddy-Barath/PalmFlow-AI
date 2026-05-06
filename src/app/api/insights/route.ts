import { NextResponse } from 'next/server';
import { insightService } from '@/server/services/insight.service';

export async function GET() {
  try {
    const insights = await insightService.generateStrategicInsights();
    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate strategic insights' }, { status: 500 });
  }
}
