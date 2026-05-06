"use client";

import React from 'react';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAgents } from '@/hooks/useAgents';
import { DeployAgentModal } from '@/components/dashboard/DeployAgentModal';

export default function AgentsPage() {
  const { data: agents, isLoading, error } = useAgents();
  const [isDeployModalOpen, setIsDeployModalOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Workforce</h1>
          <p className="text-slate-400 mt-1">Deploy and manage your autonomous financial agents</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsDeployModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-neural-dark text-sm font-bold hover:bg-brand-primary/80 transition-all shadow-lg shadow-brand-primary/20"
          >
            <Plus className="w-4 h-4" />
            Deploy Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents?.map((agent: any, i: number) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <AgentCard 
              name={agent.name}
              role={agent.role}
              status={agent.status}
              budget={agent.budget.toLocaleString()}
              spent={agent.spent.toLocaleString()}
              tasks={agent.tasksCount}
              efficiency={agent.efficiency}
            />
          </motion.div>
        ))}
        
        <button 
          onClick={() => setIsDeployModalOpen(true)}
          className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-slate-500 hover:border-brand-primary/30 hover:text-brand-primary transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/10 transition-all">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">Hire New AI Agent</div>
            <p className="text-sm">Expand your autonomous workforce</p>
          </div>
        </button>
      </div>

      <DeployAgentModal 
        isOpen={isDeployModalOpen} 
        onClose={() => setIsDeployModalOpen(false)} 
      />
    </div>
  );
}
