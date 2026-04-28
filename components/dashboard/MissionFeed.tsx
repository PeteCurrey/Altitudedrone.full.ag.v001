"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, ShieldCheck, Map as MapIcon } from "lucide-react";

const MOCK_MISSIONS = [
  {
    id: "m1",
    title: "Roof Inspection - Central London",
    category: "Infrastructure",
    location: "London, SW1",
    distance: "1.2 miles",
    date: "2026-05-12",
    fee: "£250",
    status: "OPEN",
  },
  {
    id: "m2",
    title: "Real Estate Shoot - Hampstead",
    category: "Real Estate",
    location: "London, NW3",
    distance: "3.5 miles",
    date: "2026-05-14",
    fee: "£180",
    status: "OPEN",
  },
  {
    id: "m3",
    title: "Construction Progress - Battersea",
    category: "Construction",
    location: "London, SW11",
    distance: "2.1 miles",
    date: "2026-05-15",
    fee: "£320",
    status: "OPEN",
  },
];

export default function MissionFeed() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-syne font-bold text-white">Available Missions</h2>
          <p className="text-muted text-xs font-inter mt-1">Based on your current location in London</p>
        </div>
        <button className="flex items-center gap-2 text-accent font-syne font-bold text-[0.65rem] uppercase tracking-wider bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
          <MapIcon size={14} /> View Map
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_MISSIONS.map((mission, i) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 group cursor-pointer hover:border-accent/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-dark border border-white/5 flex items-center justify-center flex-shrink-0 text-muted group-hover:text-accent transition-colors">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="badge badge-accent text-[0.6rem]">{mission.category}</span>
                  <span className="text-[0.6rem] font-mono-dm text-muted uppercase tracking-widest">{mission.distance} away</span>
                </div>
                <h3 className="text-lg font-syne font-bold text-white group-hover:text-accent transition-colors">{mission.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted font-inter">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} /> {mission.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} /> {mission.date}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
              <div className="text-right">
                <div className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Pilot Fee</div>
                <div className="text-xl font-syne font-bold text-white">{mission.fee}</div>
              </div>
              <button className="bg-white/5 text-white font-syne font-bold text-[0.7rem] uppercase tracking-widest px-6 py-2.5 rounded-lg group-hover:bg-accent group-hover:text-brand transition-all flex items-center gap-2">
                Details <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
