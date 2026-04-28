"use client";

import { useSession } from "next-auth/react";
import MissionFeed from "@/components/dashboard/MissionFeed";
import { motion } from "framer-motion";
import { Briefcase, Map, BarChart3, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "CLIENT";

  if (userRole === "PILOT") {
    return (
      <div className="space-y-10">
        {/* Pilot Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Jobs", val: "3", icon: Briefcase, color: "text-accent" },
            { label: "Total Flights", val: "48", icon: Map, color: "text-success" },
            { label: "Hours Flown", val: "12.5h", icon: Clock, color: "text-warning" },
            { label: "Avg Rating", val: "4.9", icon: BarChart3, color: "text-accent" },
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

        {/* Mission Feed */}
        <MissionFeed />
      </div>
    );
  }

  // Client Dashboard View
  return (
    <div className="space-y-10">
      {/* Client Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-syne font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-muted font-inter">Manage your aerial missions and deliverables.</p>
        </div>
        <Link href="/briefs/new">
          <button className="bg-accent text-brand font-syne font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105">
            New Mission Brief
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-syne font-bold text-white">Active Projects</h2>
          <div className="card p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted mb-4">
              <AlertCircle size={24} />
            </div>
            <p className="text-muted font-inter text-sm mb-6">You don't have any active missions currently.</p>
            <Link href="/briefs/new" className="text-accent font-syne font-bold text-xs uppercase tracking-widest hover:underline">
              Start Your First Project
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-syne font-bold text-white">Recent Deliverables</h2>
          <div className="card p-8 text-center">
            <p className="text-muted font-inter text-xs">No media files available to view.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
