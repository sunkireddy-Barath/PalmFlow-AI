"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Globe, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none -z-10 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(0,229,204,0.07) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="status-dot-active" />
          <span className="text-xs font-medium text-white/50">Neural Network v4.2 · Deployment Active</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          The Future of{' '}
          <span className="text-gradient-cyan">Autonomous</span>
          <br />
          Economy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/45 font-normal max-w-lg mx-auto leading-relaxed mb-10"
        >
          PalmFlow AI is the world's first neural operating system for autonomous treasury
          management and cross-border financial operations on Solana.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
        >
          <a href="/dashboard">
            <button className="btn-primary">
              Initialize Protocol
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
          <button className="btn-outline">
            Read Documentation
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Active Agents', value: '4,281', icon: Cpu },
            { label: 'Total Volume', value: '$842M+', icon: Globe },
            { label: 'Avg Latency', value: '12ms', icon: Zap },
            { label: 'Success Rate', value: '99.9%', icon: Shield },
          ].map((s, i) => (
            <div key={i} className="text-center space-y-1.5">
              <div className="text-xl font-semibold text-white tracking-tight tabular-nums">{s.value}</div>
              <div className="label-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
