"use client";

import React from 'react';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { 
  Activity, 
  Wallet, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Users,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { TreasuryChart } from '@/components/dashboard/TreasuryChart';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Financial Command Center</h1>
          <p className="text-slate-400 mt-1">Autonomous Treasury Management & AI Workforce Analytics</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 transition-all">
            <Plus className="w-4 h-4" />
            New AI Agent
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-sm font-medium text-brand-primary hover:bg-brand-primary/20 transition-all neural-glow">
            <Zap className="w-4 h-4" />
            Auto-Allocate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Treasury', value: '$124,592.00', change: '+12.5%', icon: Wallet, color: 'text-brand-primary' },
          { label: 'AI Spending (24h)', value: '$1,240.50', change: '-2.1%', icon: Activity, color: 'text-brand-secondary' },
          { label: 'Yield Earned', value: '$452.20', change: '+5.4%', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Active AI Agents', value: '12', change: 'Stable', icon: Users, color: 'text-brand-accent' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={stat.color}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={stat.change.startsWith('+') ? 'text-green-400 text-xs' : 'text-slate-400 text-xs'}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <BentoGrid>
        <BentoGridItem
          title="Treasury Growth"
          description="Autonomous yield optimization and capital flow."
          header={<TreasuryChart />}
          className="md:col-span-2"
          icon={<TrendingUp className="h-4 w-4 text-brand-primary" />}
        />
        <BentoGridItem
          title="Security Engine"
          description="Real-time risk monitoring and anomaly detection active."
          header={
            <div className="flex-1 flex flex-col justify-center items-center space-y-4">
              <div className="w-24 h-24 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
              <div className="text-center">
                <div className="text-brand-primary font-mono text-sm">SCANNING...</div>
                <div className="text-slate-400 text-xs">All Systems Nominal</div>
              </div>
            </div>
          }
          className="md:col-span-1"
          icon={<ShieldCheck className="h-4 w-4 text-brand-primary" />}
        />
        <BentoGridItem
          title="Recent Transactions"
          description="AI agents executing financial workflows."
          header={
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-secondary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Marketing AI</div>
                      <div className="text-xs text-slate-500">Ad Credits Purchase</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-brand-primary">-250 PUSD</div>
                    <div className="text-xs text-slate-500">2m ago</div>
                  </div>
                </div>
              ))}
            </div>
          }
          className="md:col-span-1"
          icon={<Activity className="h-4 w-4 text-brand-primary" />}
        />
        <BentoGridItem
          title="AI Workforce"
          description="Manage and delegate tasks to your autonomous agents."
          header={
            <div className="flex -space-x-2 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-neural-dark bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                  AI{i}
                </div>
              ))}
              <div className="inline-block h-10 w-10 rounded-full ring-2 ring-neural-dark bg-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
                +7
              </div>
            </div>
          }
          className="md:col-span-1"
          icon={<Users className="h-4 w-4 text-brand-primary" />}
        />
        <BentoGridItem
          title="Yield Router"
          description="Automatically routing idle capital to highest-yield safe pools."
          header={
            <div className="flex flex-col justify-end h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Current APY</span>
                <span className="text-sm font-bold text-green-400">14.2%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-brand-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
          }
          className="md:col-span-1"
          icon={<ArrowUpRight className="h-4 w-4 text-brand-primary" />}
        />
      </BentoGrid>
    </div>
  );
}
