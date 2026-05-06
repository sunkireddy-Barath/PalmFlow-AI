"use client";

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  ToggleLeft, 
  ToggleRight,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const policies = [
  { id: 1, name: 'Standard Spending Limit', type: 'spending_limit', value: 500, status: 'active', desc: 'No single agent can execute a payment exceeding 500 PUSD.' },
  { id: 2, name: 'Yield Optimization Threshold', type: 'yield_trigger', value: 10000, status: 'active', desc: 'Automatically move 20% of treasury to yield vaults when balance > 10,000.' },
  { id: 3, name: 'Risk Mitigation', type: 'risk_threshold', value: 2000, status: 'paused', desc: 'Pause all autonomous spending if total treasury drops below 2,000.' },
];

export default function PolicyPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Policy Factory</h1>
          <p className="text-slate-400 mt-1">Configure autonomous financial guardrails and neural laws.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-primary text-neural-dark font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">
          <Plus className="w-4 h-4" />
          Create New Law
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Active</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Policy Enforcement</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-brand-secondary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Rules Encoded</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Violations Blocked</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-primary" />
          Active Guardrails
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {policies.map((policy, i) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-3xl border-white/5 flex items-center justify-between group hover:border-brand-primary/20 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/30 transition-all">
                  {policy.type === 'spending_limit' && <Lock className="w-6 h-6 text-brand-primary" />}
                  {policy.type === 'yield_trigger' && <TrendingUp className="w-6 h-6 text-brand-secondary" />}
                  {policy.type === 'risk_threshold' && <AlertTriangle className="w-6 h-6 text-orange-400" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{policy.name}</h3>
                  <p className="text-sm text-slate-500 max-w-md">{policy.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Threshold</div>
                  <div className="text-xl font-mono font-bold text-white">{policy.value} <span className="text-xs text-slate-500">PUSD</span></div>
                </div>
                <div className="flex items-center gap-4 pl-8 border-l border-white/10">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${policy.status === 'active' ? 'text-brand-primary' : 'text-slate-600'}`}>
                    {policy.status}
                  </span>
                  <button className="text-slate-500 hover:text-white transition-all">
                    {policy.status === 'active' ? <ToggleRight className="w-8 h-8 text-brand-primary" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-brand-primary/5 border border-brand-primary/10 flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center shrink-0">
          <Info className="w-6 h-6 text-brand-primary" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-brand-primary tracking-tight">Neural Law Enforcement Active</h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            PalmFlow AI's Policy Engine operates at the core level. Before any AI agent can initiate an on-chain transaction, the request is cryptographically validated against these laws. If a violation is detected, the transaction is rejected instantly before it ever hits the Solana network.
          </p>
        </div>
      </div>
    </div>
  );
}
