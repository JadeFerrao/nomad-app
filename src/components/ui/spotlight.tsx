"use client";

import React, { useRef, useState, useCallback } from "react";

interface SpotlightProps {
  className?: string;
  fill?: string;
  children?: React.ReactNode;
}

const spotlightStyles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  svg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
    transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

export function Spotlight({
  className = "",
  fill = "rgba(200, 165, 90, 0.08)",
  children,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => setOpacity(1), []);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={spotlightStyles.container}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        style={{ ...spotlightStyles.svg, opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx={position.x}
          cy={position.y}
          rx="400"
          ry="400"
          fill="url(#spotlight-gradient)"
        />
      </svg>
      {children}
    </div>
  );
}
