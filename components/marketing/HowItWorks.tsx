"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Download } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Describe your mission",
    desc: "Submit your brief online. Our AI-assisted builder helps you define the perfect shot list and technical requirements.",
  },
  {
    icon: Users,
    title: "We match your pilot",
    desc: "We match your mission to a local, vetted CAA-certified pilot with the specific equipment and skills required.",
  },
  {
    icon: Download,
    title: "Receive your deliverables",
    desc: "Raw footage, orthomosaics, or 3D Gaussian Splats are delivered directly to your portal for review and download.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-brand border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-syne font-bold text-white mb-4">How Altitude Works</h2>
          <p className="text-muted font-inter max-w-2xl mx-auto">Connecting you to the UK's most professional drone pilot network in three simple steps.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 relative">
          {/* Animated connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-24 h-24 rounded-3xl bg-surface-dark border border-white/5 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-xl" />
                <step.icon size={32} className="text-accent relative z-10" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand border border-accent/20 flex items-center justify-center font-mono-dm text-accent text-xs font-bold">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-4">{step.title}</h3>
              <p className="text-muted text-sm font-inter leading-relaxed max-w-[280px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
