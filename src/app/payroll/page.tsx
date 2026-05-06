"use client";

import React from 'react';
import { StreamingCard } from '@/components/dashboard/StreamingCard';
import { Plus, CreditCard, Users, History, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const streams = [
  { recipient: 'Alex Rivera', role: 'Full Stack Developer', rate: 0.015, totalStreamed: 452.20, status: 'active' as const },
  { recipient: 'Sarah Chen', role: 'UI/UX Designer', rate: 0.012, totalStreamed: 320.15, status: 'active' as const },
  { recipient: 'Jordan Smith', role: 'Content Creator', rate: 0.008, totalStreamed: 125.40, status: 'paused' as const },
];

export default function PayrollPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Streaming Payroll</h1>
          <p className="text-slate-400 mt-1">Real-time global compensation infrastructure</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-secondary text-white text-sm font-bold hover:bg-brand-secondary/80 transition-all shadow-lg shadow-brand-secondary/20">
          <Plus className="w-4 h-4" />
          Create New Stream
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-brand-primary">
          <div className="text-slate-500 text-sm mb-1">Total Streaming Volume</div>
          <div className="text-3xl font-bold text-white">$12,450.00 <span className="text-sm font-normal text-slate-500">PUSD</span></div>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <div className="text-slate-500 text-sm mb-1">Active Streams</div>
          <div className="text-3xl font-bold text-white">24</div>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <div className="text-slate-500 text-sm mb-1">Next Settlement</div>
          <div className="text-3xl font-bold text-white flex items-center gap-2">
            Instant <span className="text-xs px-2 py-1 rounded bg-green-400/10 text-green-400">Real-time</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active Payment Streams</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Calendar className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><History className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {streams.map((stream, i) => (
              <motion.div
                key={stream.recipient}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <StreamingCard {...stream} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Payroll Analytics</h2>
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Operational Budget</span>
                <span className="text-white font-medium">85% utilized</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-secondary w-[85%]" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Global Reach</div>
                  <div className="text-xs text-slate-500">12 countries supported</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">PUSD Savings</div>
                  <div className="text-xs text-slate-500">$1,240 saved on fees</div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-sm">
              Download Payroll Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
