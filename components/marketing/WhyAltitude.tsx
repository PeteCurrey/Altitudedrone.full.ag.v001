"use client";

import { motion } from "framer-motion";

export default function WhyAltitude() {
  const stats = [
    { val: "48hr", label: "Average Dispatch" },
    { val: "98%", label: "Client Satisfaction" },
    { val: "1,200+", label: "Active Pilots" },
    { val: "100%", label: "CAA Compliant" },
  ];

  return (
    <section className="py-24 bg-surface-dark/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="font-syne font-bold text-4xl text-accent mb-2">{stat.val}</div>
                <div className="font-mono-dm text-[0.65rem] uppercase tracking-widest text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-syne font-bold text-white mb-8">Unrivalled Aerial Intelligence</h2>
            <div className="space-y-8">
              {[
                { title: "Smart Pilot Matching", desc: "Our AI algorithm matches your mission to the nearest pilot with the exact certification and equipment required." },
                { title: "Centralised Compliance", desc: "Every flight is backed by our centralised safety management system, ensuring 100% CAA regulatory compliance." },
                { title: "Standardised Delivery", desc: "No matter where your site is, receive standardised, high-quality deliverables formatted to your specific requirements." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="font-syne font-bold text-white/20 text-4xl">{i + 1}</div>
                  <div>
                    <h3 className="font-syne font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-muted text-sm font-inter leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
