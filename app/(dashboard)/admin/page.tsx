"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PilotApprovalList from "@/components/admin/PilotApprovalList";
import MissionDispatchList from "@/components/admin/MissionDispatchList";
import { motion } from "framer-motion";
import { Users, Send, Map as MapIcon, ShieldAlert, BarChart3 } from "lucide-react";
import { useEffect } from "react";

export default function AdminCommandCentre() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8">
      {/* Admin Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Network", val: "1,248", icon: Users, color: "text-accent" },
          { label: "Pending Approval", val: "12", icon: ShieldAlert, color: "text-warning" },
          { label: "Missions Today", val: "34", icon: Send, color: "text-success" },
          { label: "Rev. Forecast", val: "£14.2k", icon: BarChart3, color: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="card p-6 flex items-center justify-between">
            <div>
              <div className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-2xl font-syne font-bold text-white">{stat.val}</div>
            </div>
            <stat.icon className={stat.color} size={24} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Pilot Approvals */}
        <section>
          <PilotApprovalList />
        </section>

        {/* Right Column: Mission Dispatch */}
        <section>
          <MissionDispatchList />
        </section>
      </div>

      {/* Global Network Map Placeholder */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-syne font-bold text-white">UK Network Map</h2>
          <button className="text-accent font-syne font-bold text-xs uppercase tracking-widest hover:underline">
            Fullscreen Map
          </button>
        </div>
        <div className="relative h-[500px] rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] flex items-center justify-center">
          {/* Map would go here - reuse CoverageMap logic if needed */}
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center">
            <MapIcon size={48} className="text-muted opacity-20" />
            <p className="text-muted font-inter text-sm max-w-xs">Global operations overview. Live pilot tracking and mission clusters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
