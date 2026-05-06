"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShoppingCart, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Search,
  ArrowRight,
  Star,
  Globe
} from 'lucide-react';

const agentTemplates = [
  {
    id: 'arb-hunter',
    name: 'Arbitrage Hunter',
    role: 'DeFi Specialist',
    rating: 4.9,
    price: 'Free',
    desc: 'Scans Solana DEXs for price discrepancies and executes low-risk trades.',
    stats: { efficiency: 98, complexity: 'High' },
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10'
  },
  {
    id: 'social-growth',
    name: 'Growth Engine',
    role: 'Marketing AI',
    rating: 4.8,
    price: '100 PUSD/mo',
    desc: 'Automates social engagement and influencer outreach to boost treasury value.',
    stats: { efficiency: 94, complexity: 'Medium' },
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10'
  },
  {
    id: 'security-sentinel',
    name: 'Sentinel v1',
    role: 'Security AI',
    rating: 5.0,
    price: 'Free',
    desc: 'Real-time threat detection and autonomous emergency treasury locking.',
    stats: { efficiency: 100, complexity: 'High' },
    color: 'text-brand-accent',
    bg: 'bg-brand-accent/10'
  }
];

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" /> Neural Store Live
        </motion.div>
        <h1 className="text-5xl font-black text-white tracking-tighter">Expand Your Intelligence.</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Hire specialized AI agents pre-trained on high-performance financial models to automate your decentralized treasury.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search for specialized AI models..."
          className="w-full glass-panel bg-white/5 border-white/10 rounded-full px-16 py-6 text-white focus:outline-none focus:border-brand-primary/30 transition-all text-lg"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-brand-primary text-neural-dark font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {agentTemplates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-[2.5rem] border-white/5 relative group hover:border-brand-primary/20 transition-all"
          >
            <div className={`w-16 h-16 rounded-2xl ${template.bg} ${template.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Cpu className="w-8 h-8" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{template.name}</h3>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">{template.role}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-orange-400 font-bold">
                  <Star className="w-4 h-4 fill-current" /> {template.rating}
                </div>
                <div className="text-[10px] text-slate-600 font-mono">{template.price}</div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {template.desc}
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Deployment</span>
                <span className="text-white font-bold">Solana Mainnet Ready</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Efficiency</span>
                <span className="text-brand-primary font-bold">{template.stats.efficiency}%</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest group-hover:bg-brand-primary group-hover:text-neural-dark transition-all flex items-center justify-center gap-2">
              Hire Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="p-12 glass-panel rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-brand-secondary/10 to-transparent">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl font-black text-white tracking-tight">Build & Monetize Your Own Agents</h2>
          <p className="text-slate-400 leading-relaxed">
            Are you an AI engineer? Upload your pre-trained models to the Neural Store and earn PUSD whenever businesses hire your agents for their treasury.
          </p>
          <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-secondary text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-secondary/20">
            Submit Agent <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="w-64 h-64 rounded-full border-2 border-dashed border-brand-secondary/30 flex items-center justify-center animate-spin-slow">
          <div className="w-48 h-48 rounded-full border-2 border-brand-secondary/50 flex items-center justify-center">
            <Cpu className="w-16 h-16 text-brand-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
