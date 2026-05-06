"use client";

import React from 'react';
import { 
  Repeat, 
  Plus, 
  Play, 
  Pause, 
  Wallet, 
  ArrowUpRight,
  Loader2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStreams } from '@/hooks/useStreams';

export default function StreamingPage() {
  const { data: streams, isLoading } = useStreams();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Streaming Payroll</h1>
          <p className="text-slate-400 mt-1">Manage real-time global settlement and autonomous salary flows.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-primary text-neural-dark font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">
          <Plus className="w-4 h-4" />
          Create New Stream
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
            <Repeat className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{streams?.length || 0}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Active Flows</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-brand-secondary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {streams?.reduce((acc: number, s: any) => acc + s.totalStreamed, 0).toFixed(2)}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Settled (PUSD)</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Global Uptime</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Repeat className="w-5 h-5 text-brand-primary" />
          Active Payroll Streams
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {streams?.map((stream: any, i: number) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-3xl border-white/5 flex items-center justify-between group hover:border-brand-primary/20 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-slate-800" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{stream.recipientName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stream.recipientRole}</span>
                    <span className="text-[10px] text-brand-primary font-mono">{stream.walletAddress.slice(0, 4)}...{stream.walletAddress.slice(-4)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Settled Amount</div>
                  <div className="text-xl font-mono font-bold text-brand-primary">{stream.totalStreamed.toFixed(4)} <span className="text-xs">PUSD</span></div>
                </div>
                <div className="text-right border-l border-white/10 pl-12">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Stream Rate</div>
                  <div className="text-lg font-mono font-bold text-white">{stream.ratePerSecond} <span className="text-[10px]">PUSD/s</span></div>
                </div>
                <div className="flex items-center gap-3 pl-8">
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                    {stream.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary/20 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
