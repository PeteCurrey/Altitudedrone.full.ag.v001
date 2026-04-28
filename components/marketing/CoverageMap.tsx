"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";

// Simulated pilot locations (Major UK Cities)
const PILOT_LOCATIONS = [
  { city: "London", coords: [-0.1276, 51.5074] },
  { city: "Manchester", coords: [-2.2426, 53.4808] },
  { city: "Birmingham", coords: [-1.8904, 52.4862] },
  { city: "Glasgow", coords: [-4.2518, 55.8642] },
  { city: "Bristol", coords: [-2.5879, 51.4545] },
  { city: "Leeds", coords: [-1.5491, 53.8008] },
  { city: "Edinburgh", coords: [-3.1883, 55.9533] },
  { city: "Belfast", coords: [-5.9301, 54.5973] },
  { city: "Newcastle", coords: [-1.6178, 54.9783] },
  { city: "Cardiff", coords: [-3.1791, 51.4816] },
  { city: "Brighton", coords: [-0.1372, 50.8225] },
  { city: "Norwich", coords: [1.2974, 52.6309] },
];

export default function CoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use a placeholder public token for demo purposes if not provided in env
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";


    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-2.4282, 54.7024], // Center of UK
      zoom: 5,
      attributionControl: false,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add a custom pulsing dot layer
      PILOT_LOCATIONS.forEach((pilot, i) => {
        const el = document.createElement("div");
        el.className = "pilot-marker";
        el.style.width = "12px";
        el.style.height = "12px";
        el.style.backgroundColor = "#00D4FF";
        el.style.borderRadius = "50%";
        el.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.6)";
        el.style.position = "relative";

        // Add pulse effect via CSS in globals.css or inject here
        const pulse = document.createElement("div");
        pulse.className = "animate-ping absolute inset-0 rounded-full bg-accent opacity-75";
        el.appendChild(pulse);

        new mapboxgl.Marker(el)
          .setLngLat(pilot.coords as [number, number])
          .addTo(map.current!);
      });
    });

    return () => map.current?.remove();
  }, []);

  return (
    <section id="coverage" className="py-24 bg-brand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-syne font-bold text-white mb-6">Pilots Everywhere You Need Them</h2>
          <p className="text-muted font-inter text-lg mb-8 leading-relaxed">
            With over 1,200 active, CAA-certified pilots across every UK postcode, Altitude delivers professional drone data anywhere in the country within 48 hours.
          </p>
          <div className="space-y-4">
            {[
              "Real-time pilot availability tracking",
              "Local expertise for every environment",
              "Nationwide compliance & standardisation",
              "48-hour average mission dispatch",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
                <span className="text-sm font-inter text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/5">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand/40 to-transparent" />
          
          {/* Map Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl md:max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[0.65rem] font-mono-dm uppercase tracking-widest text-white">Live Network Status</span>
            </div>
            <div className="font-syne font-bold text-white text-lg mb-1">1,248 Verified Pilots</div>
            <div className="text-muted text-xs font-inter">Active across 124 UK regions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
