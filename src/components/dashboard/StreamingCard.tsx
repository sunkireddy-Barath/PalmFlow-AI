"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Zap, Clock, Globe, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreamingCardProps {
  recipient: string;
  role: string;
  rate: number; // PUSD per second
  totalStreamed: number;
  status: 'active' | 'paused';
  avatar?: string;
}

export function StreamingCard({ recipient, role, rate, totalStreamed: initialTotal, status: initialStatus }: StreamingCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [streamed, setStreamed] = useState(initialTotal);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'active') {
      interval = setInterval(() => {
        setStreamed(prev => prev + rate);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, rate]);

  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-lg font-bold text-white">
            {recipient.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-bold">{recipient}</h3>
            <p className="text-slate-400 text-sm">{role}</p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5",
          status === 'active' ? "bg-green-400/10 text-green-400" : "bg-white/5 text-slate-500"
        )}>
          {status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
          {status}
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <Zap className="w-3 h-3 text-brand-primary" /> Total Streamed
        </div>
        <div className="text-3xl font-mono font-bold text-white tabular-nums">
          {streamed.toFixed(6)} <span className="text-sm font-sans text-brand-primary">PUSD</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Flow Rate</div>
          <div className="text-sm font-bold text-white">{(rate * 3600).toFixed(2)} PUSD/hr</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Region</div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Global
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setStatus(status === 'active' ? 'paused' : 'active')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all",
            status === 'active' 
              ? "bg-white/5 text-white hover:bg-white/10" 
              : "bg-brand-primary text-neural-dark hover:bg-brand-primary/80"
          )}
        >
          {status === 'active' ? (
            <><Pause className="w-4 h-4" /> Pause Stream</>
          ) : (
            <><Play className="w-4 h-4" /> Resume Stream</>
          )}
        </button>
        <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
