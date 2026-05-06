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
  Plus,
  Loader2
} from 'lucide-react';
import { TreasuryChart } from '@/components/dashboard/TreasuryChart';
import { motion } from 'framer-motion';
import { useAgents } from '@/hooks/useAgents';

export default function DashboardPage() {
  const { data: agents, isLoading, error } = useAgents();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  const stats = [
    { 
      label: 'Total Treasury', 
      value: `$${agents?.reduce((acc: number, agent: any) => acc + agent.budget, 0).toLocaleString()}.00`, 
      change: '+12.5%', 
      icon: Wallet, 
      color: 'text-brand-primary' 
    },
    { 
      label: 'AI Spending (Total)', 
      value: `$${agents?.reduce((acc: number, agent: any) => acc + agent.spent, 0).toLocaleString()}.00`, 
      change: '-2.1%', 
      icon: Activity, 
      color: 'text-brand-secondary' 
    },
    { 
      label: 'Yield Earned', 
      value: '$452.20', 
      change: '+5.4%', 
      icon: TrendingUp, 
      color: 'text-green-400' 
    },
    { 
      label: 'Active AI Agents', 
      value: agents?.filter((a: any) => a.status === 'active' || a.status === 'executing').length.toString(), 
      change: 'Stable', 
      icon: Users, 
      color: 'text-brand-accent' 
    },
  ];

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
        {stats.map((stat, i) => (
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
          title="Live AI Feed"
          description="Agents executing financial workflows."
          header={
            <div className="space-y-3">
              {agents?.[1]?.transactions?.map((tx: any, i: number) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-secondary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{agents[1].name}</div>
                      <div className="text-xs text-slate-500">{tx.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-brand-primary">-{tx.amount} PUSD</div>
                    <div className="text-xs text-slate-500">Just now</div>
                  </div>
                </div>
              ))}
            </div>
          }
          className="md:col-span-1"
          icon={<Activity className="h-4 w-4 text-brand-primary" />}
        />
      </BentoGrid>
    </div>
  );
}
