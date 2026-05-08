"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ShoppingCart, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Search,
  ArrowRight,
  Star,
  Globe,
  CheckCircle2,
  ChevronRight,
  BrainCircuit
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
  },
  {
    id: 'social-growth',
    name: 'Growth Engine',
    role: 'Marketing AI',
    rating: 4.8,
    price: '100 PUSD/mo',
    desc: 'Automates social engagement and influencer outreach to boost treasury value.',
    stats: { efficiency: 94, complexity: 'Medium' },
  },
  {
    id: 'security-sentinel',
    name: 'Sentinel v1',
    role: 'Security AI',
    rating: 5.0,
    price: 'Free',
    desc: 'Real-time threat detection and autonomous emergency treasury locking.',
    stats: { efficiency: 100, complexity: 'High' },
  }
];

export default function MarketplacePage() {
  const [notification, setNotification] = useState<string | null>(null);

  const handleHire = async (template: any) => {
    setNotification(`${template.name} hiring process initiated...`);
    
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: template.name,
          role: template.role,
          budget: 500 // Default budget for marketplace hires
        }),
      });
      
      if (res.ok) {
        setNotification(`${template.name} deployed successfully! Check Dashboard.`);
      } else {
        throw new Error('Deployment failed');
      }
    } catch (err) {
      setNotification(`Failed to deploy ${template.name}. Re-establishing link...`);
    } finally {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 pt-10">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="px-6 py-3 rounded-full bg-neutral-900 border border-white/10 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">{notification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Neural Store
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Global Marketplace Live</span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Expand Your Intelligence</h1>
        <p className="text-white/40 max-w-xl text-sm font-normal leading-relaxed">
          Hire specialized AI agents pre-trained on high-performance financial models to automate your decentralized treasury.
        </p>
      </div>

      {/* Modern Search */}
      <div className="relative group max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-white transition-colors" />
        <input 
          type="text" 
          placeholder="Search for specialized AI models..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-12 py-4 text-sm text-white focus:outline-none focus:border-neutral-600 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agentTemplates.map((template, i) => (
          <div key={template.id} className="bento-card group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-600 transition-all">
                  <Cpu className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-current" /> {template.rating}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mb-1">{template.name}</h3>
              <p className="text-xs text-white/35 mb-4">{template.role}</p>
              
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                {template.desc}
              </p>

              <div className="space-y-3 mb-10 pt-4 border-t border-neutral-900">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-neutral-600 font-bold uppercase tracking-widest">Deployment</span>
                  <span className="text-white font-bold">Solana Devnet</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-neutral-600 font-bold uppercase tracking-widest">Efficiency</span>
                  <span className="text-emerald-500 font-bold">{template.stats.efficiency}%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleHire(template)}
              className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center gap-2 group/btn"
            >
              Hire Now <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Monetization Card */}
      <div className="bento-card bg-neutral-900/30 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-6 max-w-xl">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white tracking-tight">Monetize Your Intelligence</h2>
            <p className="text-neutral-500 leading-relaxed text-sm">
              Are you an AI engineer? Upload your pre-trained models and earn PUSD whenever businesses hire your agents.
            </p>
          </div>
          <button 
            onClick={() => setNotification('Agent submission portal opening...')}
            className="btn-primary text-[10px] px-8"
          >
            Submit Agent
          </button>
        </div>
        <div className="relative w-48 h-48 hidden md:block">
          <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-white/5 animate-pulse delay-75" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="w-12 h-12 text-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
