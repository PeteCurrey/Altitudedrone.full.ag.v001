"use client";

import { MapPin, Calendar, ClipboardCheck, LayoutGrid } from "lucide-react";

interface StepProps {
  data: any;
}

export default function StepReview({ data }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-syne font-bold text-white">Review & Submit</h2>
        <p className="text-muted text-sm font-inter">Please verify your mission details before submitting to the network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Details */}
        <div className="space-y-6">
          <div className="card p-6 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
              <ClipboardCheck size={14} /> Project Details
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Title</div>
                <div className="text-sm text-white font-medium">{data.title || "Untitled Mission"}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Category</div>
                  <div className="text-sm text-white font-medium">{data.category}</div>
                </div>
                <div>
                  <div className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Target Date</div>
                  <div className="text-sm text-white font-medium">{data.date || "Not specified"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={14} /> Location
            </h3>
            <div className="text-sm text-white font-medium mb-1">{data.location.postcode || "No postcode provided"}</div>
            <div className="text-[0.65rem] text-muted font-inter">
              {data.location.coords ? `GPS: ${data.location.coords[1].toFixed(5)}, ${data.location.coords[0].toFixed(5)}` : "Coordinates not set"}
            </div>
          </div>
        </div>

        {/* Deliverables & AI Brief */}
        <div className="space-y-6">
          <div className="card p-6 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
              <LayoutGrid size={14} /> Deliverables
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.deliverables?.length > 0 ? (
                data.deliverables.map((d: string) => (
                  <span key={d} className="badge badge-accent bg-accent/10 border border-accent/20">
                    {d.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted">No deliverables selected</span>
              )}
            </div>
          </div>

          <div className="card p-6 border-white/5 bg-white/[0.02] flex-1">
            <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
              AI Generated Brief
            </h3>
            <div className="text-[0.65rem] text-white/70 font-mono-dm leading-relaxed line-clamp-6">
              {data.aiBrief || "Brief has not been generated yet."}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-success/5 border border-success/20">
        <p className="text-xs text-success leading-relaxed font-inter">
          <strong>Note:</strong> Once submitted, our operations team will review your brief and match it with a qualified pilot within 24 hours. You will receive an email confirmation.
        </p>
      </div>
    </div>
  );
}
