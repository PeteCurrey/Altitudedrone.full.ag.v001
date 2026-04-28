"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("altitude_splash_seen");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("altitude_splash_seen", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <>{children}</>;
}
