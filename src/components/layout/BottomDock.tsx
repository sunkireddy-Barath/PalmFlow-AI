"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  ShoppingCart,
  Shield,
  Cpu,
  History,
  CreditCard,
  Rocket,
  TrendingUp,
  Award,
  BarChart3
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Workforce', href: '/agents', icon: Users },
  { name: 'Market', href: '/marketplace', icon: ShoppingCart },
  { name: 'Launchpad', href: '/launchpad', icon: Rocket },
  { name: 'Payroll', href: '/payroll', icon: CreditCard },
  { name: 'Laws', href: '/policy', icon: Shield },
  { name: 'Ledger', href: '/history', icon: History },
  { name: 'Yield', href: '/yield', icon: TrendingUp },
  { name: 'Repute', href: '/reputation', icon: Award },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export const BottomDock = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 120 }}
        className="relative flex items-center gap-2 px-2 py-1.5 rounded-2xl"
        style={{
          background: 'rgba(8, 10, 15, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Nav Items */}
        <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide max-w-[calc(100vw-140px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-300 group shrink-0"
              >
                {isActive && (
                  <motion.div
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.09)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.icon
                  className={`w-4 h-4 relative z-10 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                  }`}
                />
                <span
                  className={`text-sm font-medium relative z-10 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'hidden sm:block text-white/30 group-hover:text-white/60'
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 pl-2 border-l border-white/[0.06] ml-2">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-medium text-white/60 leading-none">Neural OS</div>
            <div className="text-[9px] text-white/25 leading-none mt-1">v4.2.0</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-colors cursor-pointer group">
            <Cpu className="w-3.5 h-3.5 text-white/30 group-hover:text-accent-cyan transition-colors" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
