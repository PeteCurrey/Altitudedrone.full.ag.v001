"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Calendar, User, Radio, ArrowRight } from "lucide-react";

const MOCK_PENDING_MISSIONS = [
  {
    id: "m10",
    title: "LiDAR Survey - Snowdonia",
    client: "EnergyGrid UK",
    location: "Gwynedd, LL55",
    date: "2026-05-20",
    status: "READY_FOR_DISPATCH",
    nearbyPilots: 4,
  },
  {
    id: "m11",
    title: "Gutter Inspection - Retail Park",
    client: "Prime Assets",
    location: "Reading, RG1",
    date: "2026-05-18",
    status: "REVIEW_REQUIRED",
    nearbyPilots: 12,
  },
];

export default function MissionDispatchList() {
  const [missions, setMissions] = useState(MOCK_PENDING_MISSIONS);

  const handleDispatch = (id: string) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
    // In a real app, broadcast to pilots via API
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-syne font-bold text-white flex items-center gap-3">
        Mission Dispatch Centre <span className="badge badge-accent">{missions.length}</span>
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="card p-6 border-white/5 bg-white/[0.01] hover:border-accent/20 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`badge ${mission.status === 'READY_FOR_DISPATCH' ? 'badge-success' : 'badge-warning'} text-[0.6rem]`}>
                      {mission.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[0.65rem] font-mono-dm text-muted uppercase tracking-widest">#{mission.id}</span>
                  </div>
                  
                  <h3 className="text-lg font-syne font-bold text-white">{mission.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-muted font-inter">
                    <div className="flex items-center gap-1.5"><User size={14} /> {mission.client}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={14} /> {mission.location}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={14} /> {mission.date}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="flex items-center gap-2 text-[0.65rem] font-bold text-accent uppercase tracking-widest">
                    <Radio size={14} className="animate-pulse" /> {mission.nearbyPilots} Local Pilots Online
                  </div>
                  <button 
                    onClick={() => handleDispatch(mission.id)}
                    disabled={mission.status === 'REVIEW_REQUIRED'}
                    className="w-full md:w-auto bg-accent text-brand font-syne font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-accent/90 disabled:opacity-30"
                  >
                    Broadcast Mission <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {missions.length === 0 && (
          <div className="card p-12 text-center text-muted text-sm font-inter">
            All missions have been dispatched.
          </div>
        )}
      </div>
    </div>
  );
}
