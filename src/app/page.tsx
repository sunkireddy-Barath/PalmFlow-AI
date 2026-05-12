"use client";

import React, { useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const wasConnected = useRef(false);

  useEffect(() => {
    if (connected && publicKey && !wasConnected.current) {
      wasConnected.current = true;
      router.push('/dashboard');
    }
    if (!connected) {
      wasConnected.current = false;
    }
  }, [connected, publicKey, router]);

  return (
    <div className="relative min-h-screen">
      <LandingPage />
    </div>
  );
}
