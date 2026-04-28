"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function MarketingFooter() {
  return (
    <footer className="bg-brand border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-syne font-bold text-2xl tracking-widest text-white">ALTITUDE</span>
              <span className="font-mono-dm text-[0.7rem] text-muted tracking-widest mt-2">UK</span>
            </Link>
            <p className="text-muted text-sm font-inter leading-relaxed max-w-xs">
              The UK's leading drone operations management platform. Connecting vetted pilots with commercial and creative clients nationwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-syne font-bold uppercase tracking-widest text-xs mb-6">Platform</h4>
            <div className="flex flex-col gap-4">
              {["Services", "How It Works", "Case Studies", "Pricing", "Security"].map((item) => (
                <Link key={item} href="#" className="text-muted text-sm hover:text-accent transition-colors font-inter">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* For Pilots */}
          <div>
            <h4 className="text-white font-syne font-bold uppercase tracking-widest text-xs mb-6">For Pilots</h4>
            <div className="flex flex-col gap-4">
              {["Join the Network", "Pilot Portal", "Compliance Guide", "Insurance Partners", "Equipment Store"].map((item) => (
                <Link key={item} href="#" className="text-muted text-sm hover:text-accent transition-colors font-inter">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-syne font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-muted text-sm font-inter">hello@altitude-hire.com</p>
              <p className="text-muted text-sm font-inter">+44 (0) 20 7946 0000</p>
            </div>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all">
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted text-[0.7rem] font-inter">
            © 2026 Altitude UK Operations Ltd. All rights reserved.
          </div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "CAA Compliance"].map((item) => (
              <Link key={item} href="#" className="text-muted text-[0.7rem] hover:text-white transition-colors font-inter">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
