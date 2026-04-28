"use client";

import { motion } from "framer-motion";
import { Camera, Map, HardHat, Box, Calendar, Thermometer, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Camera,
    title: "Aerial Photography & Video",
    desc: "Stunning 4K cinematic footage and high-resolution stills for commercial and creative projects.",
  },
  {
    icon: Map,
    title: "Survey & Mapping",
    desc: "High-accuracy orthomosaic maps and topography data for construction and land management.",
  },
  {
    icon: HardHat,
    title: "Inspection Services",
    desc: "Safe and detailed inspection of high-altitude assets, roofs, towers, and infrastructure.",
  },
  {
    icon: Box,
    title: "Gaussian Splat / 3D Capture",
    desc: "Immersive 3D reconstructions of sites and spaces using state-of-the-art capture technology.",
  },
  {
    icon: Calendar,
    title: "Event Coverage",
    desc: "Complete aerial documentation for sporting events, festivals, and corporate gatherings.",
  },
  {
    icon: Thermometer,
    title: "LiDAR & Thermal",
    desc: "Advanced sensor data for heat loss analysis, vegetation management, and precise terrain modeling.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-brand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-syne font-bold text-white mb-4">Our Services</h2>
            <p className="text-muted font-inter">Specialist drone operations tailored to your industry. All pilots are CAA certified and fully insured for commercial work.</p>
          </div>
          <Link href="/enquiry" className="group flex items-center gap-2 text-accent font-syne font-bold uppercase tracking-wider text-sm">
            View All Services <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-8 group relative overflow-hidden flex flex-col items-start text-left"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent transition-colors group-hover:bg-accent group-hover:text-brand">
                <service.icon size={24} />
              </div>
              
              <h3 className="text-xl font-syne font-bold text-white mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-muted text-sm font-inter leading-relaxed flex-1">{service.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-white/5 w-full">
                <span className="text-[0.65rem] font-mono-dm uppercase tracking-[0.2em] text-muted group-hover:text-white transition-colors">Learn More</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
