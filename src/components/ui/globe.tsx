"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.15, 0.15, 0.15],
  markerColor: [200 / 255, 165 / 255, 90 / 255],
  glowColor: [0.12, 0.12, 0.12],
  markers: [
    { location: [48.8566, 2.3522], size: 0.08 },      // Paris
    { location: [35.6762, 139.6503], size: 0.08 },     // Tokyo
    { location: [-8.3405, 115.092], size: 0.06 },      // Bali
    { location: [41.9028, 12.4964], size: 0.07 },      // Rome
    { location: [40.7128, -74.006], size: 0.1 },       // NYC
    { location: [41.0082, 28.9784], size: 0.06 },      // Istanbul
    { location: [-33.8688, 151.2093], size: 0.07 },    // Sydney
    { location: [55.7558, 37.6173], size: 0.06 },      // Moscow
    { location: [-22.9068, -43.1729], size: 0.07 },    // Rio
    { location: [1.3521, 103.8198], size: 0.05 },      // Singapore
    { location: [25.2048, 55.2708], size: 0.08 },      // Dubai
    { location: [51.5074, -0.1278], size: 0.08 },      // London
    { location: [34.0522, -118.2437], size: 0.07 },    // LA
    { location: [13.7563, 100.5018], size: 0.06 },     // Bangkok
    { location: [-33.9249, 18.4241], size: 0.06 },     // Cape Town
    { location: [19.076, 72.8777], size: 0.1 },        // Mumbai
    { location: [52.52, 13.405], size: 0.06 },         // Berlin
    { location: [37.5665, 126.978], size: 0.07 },      // Seoul
  ],
};

const globeWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  maxWidth: 600,
  margin: "0 auto",
};

const canvasStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  opacity: 0,
  transition: "opacity 500ms ease",
  contain: "layout paint size",
  cursor: "grab",
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)} style={globeWrapperStyle}>
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
