import { NextResponse } from 'next/server';
import { tokenService } from '@/server/services/token.service';
import { Keypair } from '@solana/web3.js';

export async function GET() {
  try {
    const authoritySecret = JSON.parse(process.env.PUSD_AUTHORITY_KEY!);
    const authority = Keypair.fromSecretKey(Uint8Array.from(authoritySecret));
    
    const portfolio = await tokenService.getWalletPortfolio(authority.publicKey.toBase58());
    
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}
