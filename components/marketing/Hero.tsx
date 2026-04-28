"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand">
      {/* Video Placeholder / Poster */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand/60 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale opacity-40"
          poster="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000"
        >
          {/* Add real video URL here later */}
        </video>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-mono-dm text-xs tracking-[0.3em] uppercase mb-4"
          >
            Nationwide Drone Services · UK
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-syne font-bold text-5xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Professional Drone Pilots. <br />
            <span className="gradient-text">Every Postcode.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted text-lg lg:text-xl font-inter max-w-xl mb-10 leading-relaxed"
          >
            From aerial photography to LiDAR survey — Altitude connects you with CAA-compliant pilots for any mission, anywhere in the UK.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/enquiry">
              <button className="bg-accent text-brand font-syne font-bold px-10 py-4 rounded-full transition-all hover:bg-accent/90 hover:scale-105">
                Get a Quote
              </button>
            </Link>
            <Link href="/register/pilot">
              <button className="border border-white/20 text-white font-syne font-bold px-10 py-4 rounded-full transition-all hover:bg-white/5">
                Join as a Pilot
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right side stats/visual (optional for desktop) */}
        <div className="hidden lg:block relative h-[500px]">
          {/* Animated elements or extra imagery could go here */}
        </div>
      </div>

      {/* Counters Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 py-8 border-t border-white/5 bg-brand/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "1,200+", label: "Pilots" },
            { val: "UK-Wide", label: "Coverage" },
            { val: "CAA", label: "Compliant" },
            { val: "48hr", label: "Dispatch" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="font-mono-dm text-white text-xl font-bold mb-1">{stat.val}</div>
              <div className="font-inter text-muted text-[0.65rem] uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 text-white/20 hidden lg:block"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
