"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, X, Command as CommandIcon, Loader2 } from 'lucide-react';

export const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');

    try {
      // Trigger AI Workflow API
      const res = await fetch('/api/workflow/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: currentInput, agentId: 'product-ai' }), // Defaulting to Product AI
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.message || 'Workflow initiated successfully.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Neural link failed. Please try again.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border-white/10 shadow-[0_0_50px_-12px_rgba(0,242,255,0.3)]"
            >
              <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-sm font-bold text-white uppercase tracking-widest">Neural Link</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 max-h-[40vh] overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-slate-500 text-sm italic">Connect your consciousness to the Treasury...</div>
                    <div className="text-[10px] text-slate-700 mt-2 font-mono uppercase tracking-widest">Type a command like: "Launch marketing campaign for $500"</div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary/20 border border-brand-primary/20 text-brand-primary' 
                        : 'bg-white/5 border border-white/5 text-slate-300'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
                      <span className="text-xs text-slate-500 font-mono tracking-widest">PROCESSING...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/5 border-t border-white/5 flex items-center gap-3">
                <input 
                  autoFocus
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate financial workflow..."
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-slate-600 text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isProcessing}
                  className="p-2 rounded-xl bg-brand-primary text-neural-dark hover:scale-110 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 rounded-full glass-panel flex items-center justify-center text-brand-primary hover:neural-glow hover:scale-110 transition-all active:scale-95 group"
      >
        <CommandIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary rounded-full animate-ping opacity-40" />
      </button>
    </>
  );
};
