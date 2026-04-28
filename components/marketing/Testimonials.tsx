"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Mark Thompson",
    company: "BuildUK Group",
    quote: "Altitude has transformed our site inspection process. We get high-quality data from any site in the UK without the logistical headache of managing pilots ourselves.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    company: "Everest Real Estate",
    quote: "The 3D Gaussian Splats we received for our new development were incredible. The level of detail and the seamless delivery process are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "James Miller",
    company: "GridSource Energy",
    quote: "Reliable, professional, and compliant. Altitude is our go-to partner for all aerial solar inspections across our UK portfolio.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-syne font-bold text-white mb-4">Client Feedback</h2>
          <p className="text-muted font-inter">Don't just take our word for it. Hear from the companies we've helped scale their aerial operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-white/80 font-inter italic mb-8 flex-1 leading-relaxed">"{t.quote}"</p>
              <div>
                <div className="font-syne font-bold text-white text-sm">{t.name}</div>
                <div className="font-mono-dm text-[0.6rem] text-muted uppercase tracking-widest mt-1">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
