"use client";

import { Camera, Image as ImageIcon, Box, Thermometer, Map, Radio } from "lucide-react";

interface StepProps {
  data: any;
  update: (data: any) => void;
}

const OPTIONS = [
  { id: "photo", label: "High-Res Photos", icon: ImageIcon, desc: "45MP+ stills for marketing or inspection." },
  { id: "video", label: "4K/6K Video", icon: Camera, desc: "Cinematic aerial footage for commercial use." },
  { id: "3d", label: "3D Gaussian Splat", icon: Box, desc: "Interactive 3D reconstruction of the site." },
  { id: "ortho", label: "Orthomosaic Map", icon: Map, desc: "Stitched 2D map with survey-grade accuracy." },
  { id: "thermal", label: "Thermal Imagery", icon: Thermometer, desc: "Heat signatures for utility or solar checks." },
  { id: "live", label: "Live Stream", icon: Radio, desc: "Encrypted real-time low-latency video feed." },
];

export default function StepRequirements({ data, update }: StepProps) {
  const toggleDeliverable = (id: string) => {
    const current = data.deliverables || [];
    const next = current.includes(id) 
      ? current.filter((i: string) => i !== id)
      : [...current, id];
    update({ deliverables: next });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-syne font-bold text-white">Deliverables</h2>
        <p className="text-muted text-sm font-inter">Select the data outputs you require from this mission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONS.map((opt) => {
          const active = data.deliverables?.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleDeliverable(opt.id)}
              className={`flex items-start gap-4 p-6 rounded-2xl border transition-all text-left group ${
                active ? "bg-accent/10 border-accent" : "bg-surface-dark border-white/5 hover:border-white/20"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                active ? "bg-accent text-brand" : "bg-white/5 text-muted group-hover:text-white"
              }`}>
                <opt.icon size={22} />
              </div>
              <div className="flex-1">
                <div className={`font-syne font-bold text-sm mb-1 ${active ? "text-white" : "text-white/60"}`}>
                  {opt.label}
                </div>
                <div className="text-[0.7rem] text-muted font-inter leading-relaxed">
                  {opt.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
