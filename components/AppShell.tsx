"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Sun, Moon } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className="flex h-full w-full"
      style={{ background: darkMode ? "#1A1A2E" : "#F5F5F0" }}
    >
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-full overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between h-16 px-8 flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(229,231,235,0.08)",
            background: "rgba(22,33,62,0.5)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Breadcrumb / page title */}
          <PageTitle pathname={pathname} />

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Dark/light toggle */}
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(229,231,235,0.1)",
                color: "#6B7280",
              }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* User avatar placeholder */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium"
              style={{
                background: "rgba(0,212,255,0.15)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content with transition */}
        <main
          className="flex-1 overflow-y-auto pb-20 md:pb-0"
          style={{ padding: "2rem" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="page-transition h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function PageTitle({ pathname }: { pathname: string }) {
  const routeMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/briefs": "Briefs & CRM",
    "/briefs/new": "New Brief",
    "/planner": "Flight Planner",
    "/live": "Live Flight",
    "/media": "Media",
    "/job-sheets": "Job Sheets",
    "/reports": "Reports",
    "/pilots": "Pilot Registry",
    "/dispatch": "Mission Dispatch",
    "/payments": "Pilot Payments",
    "/settings": "Settings",
    "/admin": "Admin Panel",
  };

  const label = routeMap[pathname] ?? "Altitude UK";

  return (
    <h1
      style={{
        fontFamily: "var(--font-syne)",
        fontWeight: 700,
        fontSize: "1rem",
        color: "#ffffff",
        letterSpacing: "0.02em",
      }}
    >
      {label}
    </h1>
  );
}
