"use client";

import React from 'react';
import { Hero } from './Hero';
import { AgentSystem } from './AgentSystem';
import { Ecosystem } from './Ecosystem';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  return (
    <div className="relative z-10 pb-40">
      <Hero />
      
      {/* Clean Agent Preview */}
      <AgentSystem />
      
      {/* Clean Ecosystem */}
      <Ecosystem />
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-16 border-t flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-sm">P</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-white">PalmFlow AI</span>
            <span className="text-xs text-white/30 ml-1.5">Neural OS</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {['Twitter', 'Discord', 'Docs', 'Security'].map(link => (
            <span key={link} className="text-sm text-white/35 hover:text-white transition-colors cursor-pointer">
              {link}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/20">© 2026 PalmFlow AI</p>
      </footer>

    </div>
  );
};
