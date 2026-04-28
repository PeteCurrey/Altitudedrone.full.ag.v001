"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Search, MapPin } from "lucide-react";

interface StepProps {
  data: any;
  update: (data: any) => void;
}

export default function StepLocation({ data, update }: StepProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [postcode, setPostcode] = useState(data.location.postcode || "");

  useEffect(() => {
    if (!mapContainer.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";


    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: data.location.coords || [-2.4282, 54.7024],
      zoom: data.location.coords ? 14 : 5,
      attributionControl: false,
    });

    if (data.location.coords) {
      marker.current = new mapboxgl.Marker({ color: "#00D4FF" })
        .setLngLat(data.location.coords)
        .addTo(map.current);
    }

    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new mapboxgl.Marker({ color: "#00D4FF" })
          .setLngLat([lng, lat])
          .addTo(map.current!);
      }

      update({
        location: {
          ...data.location,
          coords: [lng, lat],
        },
      });
    });

    return () => map.current?.remove();
  }, []);

  const handleSearch = async () => {
    // In a real app, use Mapbox Geocoding API
    // Simulating a lookup for now
    if (postcode.length > 3) {
      // Mock coordinates for central London if SW1
      const coords: [number, number] = postcode.toUpperCase().startsWith("SW1") 
        ? [-0.1419, 51.5014] 
        : [-0.1276, 51.5074];
      
      map.current?.flyTo({ center: coords, zoom: 14 });
      
      if (marker.current) {
        marker.current.setLngLat(coords);
      } else {
        marker.current = new mapboxgl.Marker({ color: "#00D4FF" })
          .setLngLat(coords)
          .addTo(map.current!);
      }

      update({
        location: {
          ...data.location,
          postcode,
          coords,
        },
      });
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-2xl font-syne font-bold text-white">Mission Location</h2>
        <p className="text-muted text-sm font-inter">Drop a pin on the map or search by postcode to define the flight area.</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter Postcode (e.g. SW1A 1AA)"
          className="input pr-32"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-brand font-syne font-bold text-[0.65rem] px-4 py-2 rounded-lg uppercase tracking-wider"
        >
          Locate
        </button>
      </div>

      <div className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-white/5">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg flex items-center gap-2 pointer-events-none">
          <MapPin size={14} className="text-accent" />
          <span className="text-[0.6rem] font-mono-dm text-white">Click map to set precise launch point</span>
        </div>
      </div>
    </div>
  );
}
