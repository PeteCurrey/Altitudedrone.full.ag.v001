"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Battery, Clock, Cloud, Box, Image as ImageIcon, Send, Loader2 } from "lucide-react";

export default function FlightLogForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mb-6">
          <ClipboardCheck size={32} />
        </div>
        <h2 className="text-2xl font-syne font-bold text-white mb-2">Flight Log Submitted</h2>
        <p className="text-muted text-sm font-inter max-w-xs mx-auto">Your job sheet has been recorded. Our ops team will verify the details shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-accent font-syne font-bold text-xs uppercase tracking-widest hover:underline"
        >
          Submit Another Log
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-syne font-bold text-white mb-2">Submit Job Sheet</h1>
        <p className="text-muted font-inter">Record your flight data and mission observations for client verification.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-8 space-y-8">
          {/* Mission Selection Placeholder */}
          <div className="space-y-2">
            <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Active Mission</label>
            <select className="input appearance-none bg-surface-dark">
              <option>Roof Inspection - Central London (#M1248)</option>
              <option>Real Estate Shoot - Hampstead (#M1250)</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-[0.2em] mb-4">Flight Data</h3>
              
              <div className="space-y-2">
                <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Flight Duration (Mins)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input type="number" required className="input pl-12" placeholder="e.g. 18" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Battery Consumed (%)</label>
                <div className="relative">
                  <Battery className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input type="number" required className="input pl-12" placeholder="e.g. 65" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-[0.2em] mb-4">Conditions & Gear</h3>
              
              <div className="space-y-2">
                <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Weather Conditions</label>
                <div className="relative">
                  <Cloud className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input type="text" required className="input pl-12" placeholder="e.g. Clear, 12mph Wind" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Equipment Used</label>
                <div className="relative">
                  <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input type="text" required className="input pl-12" placeholder="e.g. DJI Mavic 3 Enterprise" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Mission Observations & Notes</label>
            <textarea className="input min-h-[120px] py-4" placeholder="Detail any site hazards, technical issues, or notable findings..."></textarea>
          </div>

          {/* Media Placeholder */}
          <div className="pt-4">
            <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Media Files</label>
            <div className="mt-2 border-2 border-dashed border-white/5 rounded-2xl p-12 text-center hover:border-accent/30 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-muted group-hover:text-accent transition-colors">
                <ImageIcon size={24} />
              </div>
              <p className="text-sm font-inter text-muted">Click or drag files to upload mission media</p>
              <p className="text-[0.65rem] text-muted/50 mt-1 uppercase tracking-widest">Max 2GB per file</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-accent text-brand font-syne font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-accent/90 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Submit Job Sheet <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
