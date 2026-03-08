"use client";

import React, { Suspense, lazy, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
  },
  loaderDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--color-accent)",
    animation: "pulse-glow 1.5s ease-in-out infinite",
  },
  splineContainer: {
    width: "100%",
    height: "100%",
  },
};

interface SplineSceneProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

function SplineLoader() {
  return (
    <div style={styles.loader}>
      <div style={styles.loaderDot} />
    </div>
  );
}

export function SplineScene({ scene, className, style }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      {!isLoaded && <SplineLoader />}
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene={scene}
          onLoad={() => setIsLoaded(true)}
          style={styles.splineContainer}
        />
      </Suspense>
    </div>
  );
}
