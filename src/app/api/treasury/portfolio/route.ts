import { NextResponse } from 'next/server';
import { solanaService } from '@/server/services/solana.service';

export async function GET() {
  try {
    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY_ADDRESS!;
    const portfolio = await solanaService.getPortfolio(treasuryAddress);

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Portfolio API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}
