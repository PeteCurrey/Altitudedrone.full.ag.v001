"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  "Construction", "Real Estate", "Infrastructure", "Energy", "Events", 
  "Insurance", "Agriculture", "Film & TV", "Heritage", "Emergency Services"
];

export default function IndustriesScroller() {
  return (
    <section className="py-24 bg-brand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl font-syne font-bold text-white uppercase tracking-widest opacity-40">Industries Served</h2>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee whitespace-nowrap flex gap-12">
          {[...INDUSTRIES, ...INDUSTRIES].map((industry, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center px-10 py-6 rounded-2xl bg-surface-dark border border-white/5 font-syne font-bold text-white text-lg transition-all hover:border-accent/30 hover:bg-accent/5 cursor-default"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
