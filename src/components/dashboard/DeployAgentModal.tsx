"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap, Wallet, Shield, Loader2, Sparkles } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  { id: 'product', name: 'Product AI', icon: Cpu, desc: 'Manages roadmap and technical specifications.' },
  { id: 'marketing', name: 'Marketing AI', icon: Zap, desc: 'Executes campaigns and handles social growth.' },
  { id: 'treasury', name: 'Treasury AI', icon: Wallet, desc: 'Optimizes yield and manages capital allocation.' },
  { id: 'security', name: 'Security AI', icon: Shield, desc: 'Monitors risk and enforces financial policies.' },
];

export const DeployAgentModal = ({ isOpen, onClose }: DeployAgentModalProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [budget, setBudget] = useState('1000');
  const [isDeploying, setIsDeploying] = useState(false);
  const queryClient = useQueryClient();

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || `${selectedRole} Agent`,
          role: selectedRole,
          budget: budget
        }),
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ['agents'] });
        setStep(3); // Success step
      }
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-xl glass-panel rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl relative"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Deploy AI Agent</h2>
                  <p className="text-slate-500 text-sm">Scale your autonomous workforce on Solana</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-3xl border text-left transition-all group ${
                          selectedRole === role.id 
                            ? 'bg-brand-primary/10 border-brand-primary/40' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${
                          selectedRole === role.id ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-slate-500 group-hover:text-white'
                        }`}>
                          <role.icon className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-sm text-white">{role.name}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{role.desc}</div>
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={!selectedRole}
                    onClick={() => setStep(2)}
                    className="w-full py-4 rounded-2xl bg-brand-primary text-neural-dark font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Agent Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Atlas Prime"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Initial PUSD Budget</label>
                      <input 
                        type="number" 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary/40 transition-all font-mono"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-brand-primary mt-0.5" />
                    <p className="text-[11px] text-brand-primary/80 leading-relaxed font-medium">
                      Deploying this agent will automatically generate a new Solana wallet and fund it with 5% of the allocated budget from the treasury.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Back</button>
                    <button 
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="flex-[2] py-4 rounded-2xl bg-brand-primary text-neural-dark font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isDeploying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isProcessing ? 'Initializing Neural Link...' : 'Confirm Deployment'}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto border border-brand-primary/40 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Agent Deployed!</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      Your AI agent has been initialized and its Solana wallet is now active on Devnet.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Enter Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { CheckCircle2 } from 'lucide-react';
