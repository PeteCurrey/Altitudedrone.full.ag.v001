"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PilotCTA() {
  return (
    <section className="py-24 bg-brand px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-surface-dark border border-white/5 p-12 lg:p-20 text-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-accent/5 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-syne font-bold text-white mb-6 leading-tight">
              Are You a Professional <br /><span className="text-accent">Drone Pilot?</span>
            </h2>
            <p className="text-muted text-lg font-inter mb-10 leading-relaxed">
              Earn with your skills. Join the UK's most advanced drone network and get access to nationwide missions, full ops support, and guaranteed payouts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register/pilot">
                <button className="bg-accent text-brand font-syne font-bold px-10 py-4 rounded-full transition-all hover:bg-accent/90 hover:scale-105 flex items-center gap-2">
                  Apply to Join the Network <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
