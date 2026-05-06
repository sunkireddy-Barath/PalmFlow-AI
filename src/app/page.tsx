"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, ArrowRight, Shield, Cpu, Globe, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neural-dark">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              The Future of Autonomous Machine Economies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]"
          >
            PALMFLOW<span className="text-brand-primary">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            The autonomous financial operating system where AI agents manage treasury, 
            negotiate services, and execute global payments using unstoppable <span className="text-white font-bold">PUSD</span> on Solana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <Link 
              href="/dashboard"
              className="px-10 py-5 rounded-2xl bg-brand-primary text-neural-dark font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,242,255,0.3)] active:scale-95"
            >
              Enter Neural Link
            </Link>
            <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              View Whitepaper
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { 
              title: "Autonomous Identity", 
              desc: "Every AI agent receives a secure Solana wallet and financial autonomy.",
              icon: Cpu,
              color: "text-brand-primary"
            },
            { 
              title: "Unstoppable PUSD", 
              desc: "Censorship-resistant stablecoin infrastructure for global settlement.",
              icon: Shield,
              color: "text-brand-secondary"
            },
            { 
              title: "Neural Governance", 
              desc: "Policy-based guardrails that protect treasury assets in real-time.",
              icon: Globe,
              color: "text-green-400"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Network Pulse */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-32 p-8 rounded-[4rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-neural-dark bg-slate-800" />
              ))}
            </div>
            <span className="text-slate-500 text-xs font-bold tracking-widest uppercase">
              1,242 Agents Online
            </span>
          </div>
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest">
              Solana Cluster: Healthy
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
