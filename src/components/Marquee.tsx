"use client";

import React, { useState, useEffect } from "react";

/* ── Destination Timezones & Data ── */
// Using simplified offset calculation for the marquee
const marqueeDestinations = [
  { label: "Paris", country: "France", timezone: "Europe/Paris" },
  { label: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { label: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { label: "London", country: "UK", timezone: "Europe/London" },
  { label: "New York", country: "USA", timezone: "America/New_York" },
  { label: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { label: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { label: "Rio", country: "Brazil", timezone: "America/Sao_Paulo" },
  { label: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg" },
  { label: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { label: "Bali", country: "Indonesia", timezone: "Asia/Makassar" },
  { label: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { label: "Oslo", country: "Norway", timezone: "Europe/Oslo" },
  { label: "Goa", country: "India", timezone: "Asia/Kolkata" },
  { label: "Kyoto", country: "Japan", timezone: "Asia/Tokyo" },
  { label: "Marrakech", country: "Morocco", timezone: "Africa/Casablanca" },
];

const marqueeStyles: Record<string, React.CSSProperties> = {
  container: {
    padding: "var(--space-2) 0",
    background: "rgba(10, 10, 10, 0.4)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
    position: "fixed" as const,
    top: 72,
    left: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
  },
  track: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap" as const,
    animation: "marquee-scroll 60s linear infinite",
  },
  item: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 400,
    color: "var(--color-ash)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "0 var(--space-8)",
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-4)",
    flexShrink: 0,
  },
  time: {
    color: "var(--color-accent)",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    opacity: 0.8,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "var(--color-accent)",
    opacity: 0.4,
    flexShrink: 0,
  },
};

export default function Marquee() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTime = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        hour12: false,
        timeZone: timezone,
      }).format(time);
    } catch (e) {
      return "--:--";
    }
  };

  // Triple items for extremely smooth seamless loop on large screens
  const items = [...marqueeDestinations, ...marqueeDestinations, ...marqueeDestinations];

  return (
    <>
      <div style={marqueeStyles.container}>
        <div style={marqueeStyles.track}>
          {items.map((dest, i) => (
            <span key={i} style={marqueeStyles.item}>
              <span style={marqueeStyles.dot} />
              <span>{dest.label} · {dest.country}</span>
              <span style={marqueeStyles.time}>{getLocalTime(dest.timezone)}</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </>
  );
}
