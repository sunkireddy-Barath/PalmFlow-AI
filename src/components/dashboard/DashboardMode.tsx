"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { TreasuryChart } from '@/components/dashboard/TreasuryChart';
import { useAgents } from '@/hooks/useAgents';
import { useTreasury } from '@/hooks/useTreasury';
import {
  Wallet, Activity, BarChart3, Cpu, Plus, Zap,
  ArrowUpRight, Search, Globe, TrendingUp
} from 'lucide-react';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 28, stiffness: 120 } },
};

export const DashboardMode = () => {
  const { data: agents } = useAgents();
  const { data: treasury } = useTreasury();

  const stats = [
    {
      label: 'Total Liquidity',
      value: treasury ? `${treasury.balance.toLocaleString()} PUSD` : '—',
      icon: Wallet,
      color: '#00e5cc',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      label: 'Network Flow',
      value: agents
        ? `$${agents.reduce((a: number, ag: any) => a + (ag.spent || 0), 0).toLocaleString()}`
        : '$0',
      icon: Activity,
      color: '#10b981',
      trend: '+5.2%',
      trendUp: true,
    },
    {
      label: 'Protocol Yield',
      value: '$4,152',
      icon: TrendingUp,
      color: '#6366f1',
      trend: '+8.1%',
      trendUp: true,
    },
    {
      label: 'Active Agents',
      value: agents ? String(agents.length) : '0',
      icon: Cpu,
      color: '#ec4899',
      trend: 'Stable',
      trendUp: null,
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto px-4 py-10 space-y-8 pb-32"
    >
      {/* Page Header */}
      <motion.header variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-3">
            <span className="status-dot-active" />
            <span className="label-xs">System monitoring active</span>
            <span className="label-xs opacity-40 ml-2">·</span>
            <Globe className="w-3.5 h-3.5 text-white/30" />
            <span className="label-xs">Global sync 12ms</span>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Operational Control</h1>
          <p className="text-sm text-white/40 font-normal mt-1">
            Autonomous treasury & neural workforce management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search nodes..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-sm font-normal text-white placeholder:text-white/25 focus:outline-none transition-all w-64"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Deploy Agent
          </button>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item} className="neural-card p-6 flex flex-col gap-5 group cursor-pointer">
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              {stat.trendUp !== null ? (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)' }}
                >
                  {stat.trend}
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white/30" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div>
              <div className="label-xs mb-1.5">{stat.label}</div>
              <div className="text-xl font-semibold text-white tracking-tight tabular-nums">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Row */}
      <div className="grid lg:grid-cols-12 gap-4">
        {/* Chart */}
        <motion.div variants={item} className="lg:col-span-8 neural-card p-5 flex flex-col gap-4 h-[320px] relative overflow-hidden group">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent-cyan/10 blur-[80px] pointer-events-none group-hover:bg-accent-cyan/15 transition-all duration-700" />

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-accent-cyan" />
                <h3 className="text-sm font-semibold text-white">Treasury Analytics</h3>
              </div>
              <p className="label-sm">Real-time protocol growth data</p>
            </div>
            <div className="flex items-center gap-1">
              {['1D', '1W', '1M', '1Y'].map(t => (
                <button
                  key={t}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                  style={t === '1M'
                    ? { background: 'rgba(255,255,255,0.1)', color: '#ffffff' }
                    : { color: 'rgba(255,255,255,0.3)' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <TreasuryChart />
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={item} className="lg:col-span-4 neural-card p-5 flex flex-col gap-4 overflow-hidden h-[320px]">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-sm font-semibold text-white">Live Activity</h3>
            </div>
            <span className="status-dot-active" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 -mr-2 pr-2">
            {(agents?.flatMap((a: any) => a.transactions) || []).slice(0, 8).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((tx: any, i: number) => (
              <div key={i} className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(0,229,204,0.08)' }}>
                  <Zap className="w-3.5 h-3.5 text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white/60 mb-0.5">AGENT {tx.agentId?.slice(-4).toUpperCase() || 'CORE'}</div>
                  <div className="text-sm text-white/80 leading-snug">{tx.description}</div>
                  <div className="text-xs text-white/25 mt-1">{new Date(tx.createdAt).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
            {(!agents || agents.flatMap((a: any) => a.transactions).length === 0) && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white/10" />
                </div>
                <p className="text-xs text-white/30">No neural activity detected yet. Deploy an agent to begin.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Agents Section */}
      <div className="space-y-5">
        <motion.div variants={item} className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">Active Workforce</h2>
            <p className="text-xs text-white/40 mt-0.5">Monitoring {agents?.length || 0} autonomous agents</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors group">
            View all
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents?.slice(0, 3).map((agent: any) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              role={agent.role}
              status={agent.status}
              budget={agent.budget.toLocaleString()}
              spent={agent.spent.toLocaleString()}
              tasks={agent.tasksCount}
              efficiency={agent.efficiency}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
