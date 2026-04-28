"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-brand/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-syne font-bold text-xl tracking-widest text-white">ALTITUDE</span>
          <span className="font-mono-dm text-[0.6rem] text-muted tracking-widest mt-1">UK</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["Services", "How It Works", "Pricing", "For Pilots"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-inter text-muted hover:text-accent transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link href="/login">
            <button className="bg-accent text-brand font-syne font-bold px-6 py-2.5 rounded-full text-sm transition-all hover:bg-accent/90">
              Get a Quote
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-brand border-b border-white/10 p-6 flex flex-col gap-4"
        >
          {["Services", "How It Works", "Pricing", "For Pilots"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-lg font-syne font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-accent text-brand font-syne font-bold py-4 rounded-xl mt-4">
              Get a Quote
            </button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
