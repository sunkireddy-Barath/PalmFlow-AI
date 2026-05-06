import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Cpu, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative isolate pt-14">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl gradient-text">
              The Financial Layer for the AI Economy
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              PalmFlow AI is an autonomous financial operating system built on Solana using non-freezable PUSD. Powering the next generation of autonomous AI businesses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-neural-dark shadow-sm hover:bg-brand-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-all neural-glow flex items-center gap-2"
              >
                Launch App <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6 text-white flex items-center gap-1">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Autonomous Treasury', icon: Shield, desc: 'AI agents manage budgets and optimize capital.' },
              { title: 'Streaming Payroll', icon: Zap, desc: 'Real-time global payments for the AI workforce.' },
              { title: 'Censorship Resistant', icon: Globe, desc: 'Powered by non-freezable PUSD on Solana.' },
              { title: 'Agent Marketplace', icon: Cpu, desc: 'Machine-to-machine financial infrastructure.' },
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl group hover:border-brand-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
