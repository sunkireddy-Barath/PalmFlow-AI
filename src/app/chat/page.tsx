"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Sparkles, BrainCircuit, Activity, Shield, Zap, Loader2, ChevronRight, Cpu, Network } from 'lucide-react';

export default function NeuralChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Neural link established. I am the PalmFlow Core. How can I assist with your autonomous treasury today?' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/command/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.message || 'Workflow executed successfully.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Neural path disrupted. Re-establishing link...' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-8 pt-8 pb-32 px-6 relative z-10">
      <div className="absolute inset-0 noise-bg pointer-events-none opacity-[0.03]" />
      
      {/* Immersive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <BrainCircuit className="w-7 h-7 text-black" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-emerald-500 border-4 border-black flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight leading-none">Neural Core</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-white/35">Quantum-Leveled Intelligence</span>
              <div className="h-px w-8 bg-neutral-800" />
              <span className="text-xs text-emerald-500">Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Cpu className="w-4 h-4 text-neutral-600" />
            <span className="text-xs text-white/40">H100 Node</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Network className="w-4 h-4 text-neutral-600" />
            <span className="text-xs text-white/40">v4.2.0</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bento-card p-0 flex flex-col overflow-hidden relative group">
        <div 
          ref={scrollRef}
          className="flex-1 p-8 overflow-y-auto space-y-10 custom-scrollbar scroll-smooth"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border transition-all duration-500 ${
                    msg.role === 'user' 
                      ? 'bg-neutral-900 border-neutral-800 text-white group-hover:border-neutral-600' 
                      : 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  }`}>
                    {msg.role === 'user' ? <Zap className="w-5 h-5" /> : <Sparkles className="w-5 h-5 fill-current" />}
                  </div>
                  <div className={`group/msg relative px-6 py-4 rounded-3xl text-[15px] leading-relaxed font-medium transition-all duration-500 ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 border border-indigo-500 text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.3)]'
                      : 'bg-white/[0.03] border border-white/5 text-neutral-300 hover:bg-white/[0.05] hover:border-white/10'
                  }`}>
                    {msg.content}
                    <div className={`absolute top-4 ${msg.role === 'user' ? '-right-2 border-l-indigo-600' : '-left-2 border-r-white/[0.03]'} border-8 border-transparent`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Loader2 className="w-5 h-5 text-black animate-spin" />
                </div>
                <div className="bg-white/[0.03] border border-white/5 px-8 py-5 rounded-3xl flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-white/30">Processing...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Premium Input Bar */}
        <div className="p-8 bg-black/60 backdrop-blur-3xl border-t border-white/5 relative z-20">
          <div className="relative flex items-center gap-4">
            <div className="absolute left-6 text-neutral-600">
              <Terminal className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inject command into Neural Core..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-6 pl-14 pr-32 text-base text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all font-medium placeholder:text-neutral-700"
            />
            <div className="absolute right-3 flex items-center gap-3">
              <kbd className="hidden sm:inline-flex h-7 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-black text-neutral-500">
                <span className="text-xs">⌘</span>K
              </kbd>
              <button 
                onClick={handleSend}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all disabled:opacity-30 flex items-center gap-2 active:scale-95"
              >
                Send <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
