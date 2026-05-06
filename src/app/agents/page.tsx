"use client";

import React from 'react';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const agents = [
  {
    name: 'Product AI',
    role: 'Treasury Strategy & Allocation',
    status: 'active' as const,
    budget: '50,000',
    spent: '12,450',
    tasks: 124,
    efficiency: 98,
  },
  {
    name: 'Marketing AI',
    role: 'Autonomous Ad Buying & Growth',
    status: 'executing' as const,
    budget: '25,000',
    spent: '18,200',
    tasks: 89,
    efficiency: 94,
  },
  {
    name: 'Developer AI',
    role: 'API Management & Infrastructure',
    status: 'active' as const,
    budget: '15,000',
    spent: '3,120',
    tasks: 45,
    efficiency: 99,
  },
  {
    name: 'Analyst AI',
    role: 'Data Acquisition & Risk Scoring',
    status: 'paused' as const,
    budget: '10,000',
    spent: '2,500',
    tasks: 32,
    efficiency: 91,
  },
];

export default function AgentsPage() {
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-neural-dark text-sm font-bold hover:bg-brand-primary/80 transition-all shadow-lg shadow-brand-primary/20">
            <Plus className="w-4 h-4" />
            Deploy Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <AgentCard {...agent} />
          </motion.div>
        ))}
        
        <button className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-slate-500 hover:border-brand-primary/30 hover:text-brand-primary transition-all group">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/10 transition-all">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">Hire New AI Agent</div>
            <p className="text-sm">Expand your autonomous workforce</p>
          </div>
        </button>
      </div>
    </div>
  );
}
