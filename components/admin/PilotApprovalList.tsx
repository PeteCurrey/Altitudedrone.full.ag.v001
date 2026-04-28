"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Eye, ShieldCheck, Mail, Phone, Award } from "lucide-react";

const MOCK_PENDING_PILOTS = [
  {
    id: "p1",
    name: "Alex Reed",
    email: "alex.reed@example.com",
    city: "Manchester",
    flyerId: "GBR-RP-123456",
    certs: ["GVC", "A2 CofC"],
    appliedDate: "2026-04-25",
  },
  {
    id: "p2",
    name: "Samantha Low",
    email: "sam.low@example.com",
    city: "London",
    flyerId: "GBR-RP-987654",
    certs: ["GVC"],
    appliedDate: "2026-04-26",
  },
  {
    id: "p3",
    name: "David Miller",
    email: "d.miller@example.com",
    city: "Bristol",
    flyerId: "GBR-RP-456789",
    certs: ["GVC", "Specific"],
    appliedDate: "2026-04-27",
  },
];

export default function PilotApprovalList() {
  const [pilots, setPilots] = useState(MOCK_PENDING_PILOTS);

  const handleAction = (id: string, approved: boolean) => {
    setPilots((prev) => prev.filter((p) => p.id !== id));
    // In a real app, call an API to update status
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-syne font-bold text-white flex items-center gap-3">
          Pilot Approval Queue <span className="badge badge-accent">{pilots.length}</span>
        </h2>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-4 text-[0.65rem] font-inter font-bold text-muted uppercase tracking-widest">Pilot Details</th>
              <th className="p-4 text-[0.65rem] font-inter font-bold text-muted uppercase tracking-widest">Compliance</th>
              <th className="p-4 text-[0.65rem] font-inter font-bold text-muted uppercase tracking-widest">Applied</th>
              <th className="p-4 text-right text-[0.65rem] font-inter font-bold text-muted uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pilots.map((pilot) => (
                <motion.tr
                  key={pilot.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/5 hover:bg-white/[0.01] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-syne font-bold text-white">{pilot.name}</span>
                      <span className="text-xs text-muted font-inter">{pilot.city}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Award size={12} className="text-accent" />
                        <span className="text-[0.65rem] font-mono-dm text-white/80">{pilot.flyerId}</span>
                      </div>
                      <div className="flex gap-1">
                        {pilot.certs.map((c) => (
                          <span key={c} className="text-[0.55rem] px-1.5 py-0.5 rounded bg-white/5 text-muted border border-white/10 uppercase font-bold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-muted font-inter">{pilot.appliedDate}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-white transition-colors">
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => handleAction(pilot.id, false)}
                        className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                      <button 
                        onClick={() => handleAction(pilot.id, true)}
                        className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success hover:bg-success hover:text-white transition-colors"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {pilots.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-muted text-sm font-inter">
                  No pending pilot applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
