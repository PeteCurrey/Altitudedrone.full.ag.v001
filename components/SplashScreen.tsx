"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "ALTITUDE".split("");

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"intro" | "hold" | "exit">("intro");

  useEffect(() => {
    // Intro animation ~1.8s, then hold for 3s
    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 1800);

    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 4800); // 1.8s intro + 3s hold

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5400); // +600ms for exit animation

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          {/* Animated terrain grid */}
          <TerrainGrid />

          {/* Radial glow center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,212,255,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Letter-by-letter ALTITUDE reveal */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-1" aria-label="ALTITUDE">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-white font-syne tracking-widest select-none"
                  style={{
                    fontSize: "clamp(2.8rem, 8vw, 6rem)",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
              style={{
                height: 1,
                width: 200,
                background:
                  "linear-gradient(90deg, transparent, #00D4FF, transparent)",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.8rem",
                color: "#6B7280",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Nationwide Drone Operations · UK
            </motion.p>
          </div>

          {/* Loading pulse bar at bottom */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div
              style={{
                width: 48,
                height: 2,
                background: "rgba(0,212,255,0.3)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "#00D4FF",
                  borderRadius: 1,
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TerrainGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines drifting upward */}
      <motion.div
        className="absolute inset-0 terrain-grid"
        animate={{ y: [0, -60] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: 0.15 }}
      />
      {/* Bottom fade mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, #1A1A2E 0%, transparent 100%)",
        }}
      />
      {/* Top fade mask */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3"
        style={{
          background:
            "linear-gradient(to bottom, #1A1A2E 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
