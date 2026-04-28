"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Map,
  Radio,
  Image,
  ClipboardList,
  BarChart2,
  Users,
  Send,
  CreditCard,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "OPERATIONS",
    items: [
      { label: "Dashboard",     href: "/dashboard",   icon: LayoutDashboard },
      { label: "Briefs & CRM",  href: "/briefs",      icon: FileText, roles: ["CLIENT", "ADMIN"] },
      { label: "Flight Planner",href: "/planner",     icon: Map, roles: ["PILOT", "ADMIN"] },
      { label: "Live Flight",   href: "/live",        icon: Radio, roles: ["PILOT", "ADMIN"] },
      { label: "Media",         href: "/media",       icon: Image },
      { label: "Job Sheets",    href: "/job-sheets",  icon: ClipboardList, roles: ["PILOT", "ADMIN"] },
      { label: "Reports",       href: "/reports",     icon: BarChart2 },
    ],
  },
  {
    title: "PILOT NETWORK",
    items: [
      { label: "Pilot Registry",   href: "/pilots",   icon: Users, roles: ["ADMIN"] },
      { label: "Mission Dispatch", href: "/dispatch", icon: Send, roles: ["ADMIN"] },
      { label: "Pilot Payments",   href: "/payments", icon: CreditCard, roles: ["ADMIN", "PILOT"] },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings",    href: "/settings", icon: Settings },
      { label: "Admin Panel", href: "/admin",    icon: Shield, roles: ["ADMIN"] },
    ],
  },
];

// Bottom-tab items for mobile (5 main items)
const MOBILE_TABS: NavItem[] = [
  { label: "Dashboard",  href: "/dashboard", icon: LayoutDashboard },
  { label: "Briefs",     href: "/briefs",    icon: FileText },
  { label: "Planner",   href: "/planner",   icon: Map },
  { label: "Live",      href: "/live",       icon: Radio },
  { label: "Settings",  href: "/settings",   icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || "CLIENT";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const filteredGroups = NAV_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => !item.roles || item.roles.includes(userRole))
  })).filter(group => group.items.length > 0);

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col h-full relative z-30 flex-shrink-0"
        style={{
          background: "#16213E",
          borderRight: "1px solid rgba(229,231,235,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Logo area */}
        <div
          className="flex items-center h-16 px-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(229,231,235,0.08)" }}
        >
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center w-full"
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#00D4FF",
                  }}
                >
                  A
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#00D4FF",
                    letterSpacing: "0.1em",
                  }}
                >
                  ALTITUDE
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "0.6rem",
                    color: "#6B7280",
                    letterSpacing: "0.1em",
                    marginTop: 2,
                  }}
                >
                  UK
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          {filteredGroups.map((group) => (
            <div key={group.title} className="mb-6">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 mb-2 text-xs tracking-widest"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      color: "#6B7280",
                      fontSize: "0.65rem",
                    }}
                  >
                    {group.title}
                  </motion.p>
                )}
              </AnimatePresence>

              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 group"
                      style={{
                        borderLeft: active
                          ? "3px solid #00D4FF"
                          : "3px solid transparent",
                        background: active
                          ? "rgba(0,212,255,0.06)"
                          : "transparent",
                        color: active ? "#00D4FF" : "rgba(255,255,255,0.55)",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background =
                            "rgba(0,212,255,0.05)";
                          (e.currentTarget as HTMLDivElement).style.color =
                            "rgba(255,255,255,0.85)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLDivElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLDivElement).style.color =
                            "rgba(255,255,255,0.55)";
                        }
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={active ? 2 : 1.5}
                        style={{ flexShrink: 0 }}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.15 }}
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.85rem",
                              fontWeight: active ? 500 : 400,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip when collapsed */}
                      {collapsed && (
                        <div
                          className="absolute left-full ml-3 px-3 py-1.5 rounded-md text-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap"
                          style={{
                            background: "#16213E",
                            border: "1px solid rgba(229,231,235,0.15)",
                            fontFamily: "var(--font-inter)",
                            color: "#ffffff",
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center h-12 w-full transition-colors"
          style={{
            borderTop: "1px solid rgba(229,231,235,0.08)",
            color: "#6B7280",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#00D4FF";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,212,255,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </motion.aside>

      {/* ── Mobile Bottom Tab Bar ─────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16"
        style={{
          background: "rgba(22,33,62,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(229,231,235,0.1)",
        }}
      >
        {MOBILE_TABS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className="flex flex-col items-center gap-1 px-4 py-2"
                style={{ color: active ? "#00D4FF" : "#6B7280" }}
              >
                <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
