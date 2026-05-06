"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, LayoutDashboard, Users, CreditCard, Shield, BarChart3, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Workforce', href: '/agents', icon: Users },
  { name: 'Treasury', href: '/treasury', icon: BarChart3 },
  { name: 'Payroll', href: '/payroll', icon: CreditCard },
  { name: 'Risk', href: '/risk', icon: Shield },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-white/5 px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center neural-glow">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold gradient-text tracking-tight">PalmFlow AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  isActive 
                    ? "bg-brand-primary/10 text-brand-primary text-glow" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-brand-primary/5 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <WalletMultiButton className="!bg-brand-primary/10 !border !border-brand-primary/20 !text-brand-primary !rounded-xl !text-sm !font-medium hover:!bg-brand-primary/20 transition-all neural-glow" />
        <button className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
