"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Activity, MoreHorizontal, Settings, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AgentStatus = 'active' | 'idle' | 'executing' | 'paused';

interface AgentCardProps {
  name: string;
  role: string;
  status: AgentStatus;
  budget: string;
  spent: string;
  tasks: number;
  efficiency: number;
  avatar?: string;
}

const statusColors = {
  active: 'text-green-400 bg-green-400/10',
  idle: 'text-slate-400 bg-slate-400/10',
  executing: 'text-brand-primary bg-brand-primary/10',
  paused: 'text-orange-400 bg-orange-400/10',
};

export function AgentCard({ name, role, status, budget, spent, tasks, efficiency }: AgentCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-3xl group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 flex items-center justify-center border border-white/5">
          <Brain className="w-7 h-7 text-brand-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{name}</h3>
          <p className="text-sm text-slate-400">{role}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className={cn("px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5", statusColors[status])}>
          <div className={cn("w-1.5 h-1.5 rounded-full", status === 'executing' ? 'animate-pulse bg-current' : 'bg-current')} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300">
          Efficiency: {efficiency}%
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500">Treasury Allocation</span>
            <span className="text-slate-300 font-medium">{spent} / {budget} PUSD</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(parseFloat(spent.replace(/,/g, '')) / parseFloat(budget.replace(/,/g, ''))) * 100}%` }}
              className="h-full bg-brand-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Target className="w-3 h-3" /> Tasks
            </div>
            <div className="text-sm font-bold text-white">{tasks} Completed</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> uptime
            </div>
            <div className="text-sm font-bold text-white">99.9%</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all">
          <Settings className="w-3.5 h-3.5" /> Configure
        </button>
        <button className="px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary/20 transition-all">
          {status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </motion.div>
  );
}
