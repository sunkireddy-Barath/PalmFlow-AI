"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, CheckCircle2, MoreVertical, Play, Pause, Settings } from 'lucide-react';

interface AgentCardProps {
  name: string;
  role: string;
  status: string;
  budget: string;
  spent: string;
  tasks: number;
  efficiency: number;
  avatar?: string;
  onCollaborate?: () => void;
}

const statusColors: Record<string, string> = {
  active: 'text-brand-primary bg-brand-primary/10',
  executing: 'text-brand-secondary bg-brand-secondary/10',
  paused: 'text-orange-400 bg-orange-400/10',
};

export function AgentCard({ name, role, status, budget, spent, tasks, efficiency, onCollaborate }: AgentCardProps) {
  const efficiencyColor = efficiency > 90 ? 'text-green-400' : 'text-brand-primary';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-[2rem] border-white/5 relative group overflow-hidden"
    >
      {/* Background Neural Pulse */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/20 transition-all duration-500" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:border-brand-primary/30 transition-all">
            <Activity className="w-7 h-7 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{role}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${statusColors[status]}`}>
                {status}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Allocated
          </div>
          <div className="text-lg font-bold text-white tracking-tight">{budget} <span className="text-[10px] text-slate-500">PUSD</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
            <Activity className="w-3 h-3" /> Efficiency
          </div>
          <div className={`text-lg font-bold tracking-tight ${efficiencyColor}`}>{efficiency}%</div>
        </div>
      </div>

      <div className="mt-6 space-y-2 relative z-10">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Resource Utilization</span>
          <span className="text-brand-primary font-mono">{spent} / {budget}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(parseFloat(spent.replace(/,/g, '')) / parseFloat(budget.replace(/,/g, ''))) * 100}%` }}
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3 relative z-10">
        <button 
          onClick={onCollaborate}
          className="flex-1 py-3 rounded-2xl bg-brand-primary text-neural-dark font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-brand-primary/20 active:scale-95"
        >
          Collaborate
        </button>
        <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
