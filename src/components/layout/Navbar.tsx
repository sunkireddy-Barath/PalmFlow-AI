"use client";

import React from 'react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Zap, LayoutDashboard, Users, Repeat, Shield } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Workforce', href: '/agents', icon: Users },
  { name: 'Neural Store', href: '/marketplace', icon: ShoppingCart },
  { name: 'Streaming', href: '/streaming', icon: Repeat },
  { name: 'Policy', href: '/policy', icon: Shield },
];

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="glass-panel px-6 py-3 rounded-2xl flex items-center justify-between border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 group-hover:neural-glow transition-all">
            <Zap className="w-6 h-6 text-brand-primary" fill="currentColor" fillOpacity={0.2} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            PALM<span className="text-brand-primary">FLOW</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 tracking-widest uppercase">Devnet Live</span>
          </div>
          <div className="wallet-adapter-wrap">
            <WalletMultiButton className="!bg-brand-primary !text-neural-dark !font-bold !text-sm !h-10 !rounded-xl !px-6 hover:!scale-105 transition-all" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
