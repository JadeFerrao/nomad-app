"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Spotlight } from "@/components/ui/spotlight";
import { Globe } from "@/components/ui/globe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const heroStyles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    background: "var(--color-black)",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.08,
    filter: "saturate(0.3)",
  },
  bgGradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.95) 60%, var(--color-black) 100%)",
  },
  spotlightWrap: {
    position: "absolute",
    inset: 0,
  },
  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 var(--space-6)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    alignItems: "center",
    gap: "var(--space-10)",
    minHeight: "100vh",
    paddingTop: "calc(72px + var(--space-16))",
    paddingBottom: "var(--space-16)",
  },
  textContent: {
    maxWidth: 640,
  },
  label: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    marginBottom: "var(--space-6)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--color-accent)",
    animation: "pulse-glow 2s ease-in-out infinite",
  },
  heading: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "var(--color-white)",
    marginBottom: "var(--space-6)",
  },
  headingAccent: {
    color: "var(--color-accent)",
    fontStyle: "italic",
  },
  subtext: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-lg)",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "var(--color-mist)",
    marginBottom: "var(--space-10)",
    maxWidth: 480,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
    flexWrap: "wrap" as const,
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-10)",
    marginTop: "var(--space-12)",
    paddingTop: "var(--space-8)",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
  },
  stat: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-1)",
  },
  statNumber: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-3xl)",
    fontWeight: 600,
    color: "var(--color-white)",
  },
  statLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 400,
    color: "var(--color-silver)",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  globeWrap: {
    display: "none",
    position: "relative" as const,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  globeGlow: {
    position: "absolute" as const,
    width: "80%",
    height: "80%",
    top: "10%",
    left: "10%",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(200,165,90,0.06) 0%, transparent 70%)",
    pointerEvents: "none" as const,
  },
  trustedBy: {
    position: "relative",
    padding: "var(--space-8) 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    background: "rgba(255, 255, 255, 0.02)",
    overflow: "hidden",
  },
  trustedLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "10px",
    fontWeight: 600,
    color: "var(--color-ash)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    textAlign: "center" as const,
    marginBottom: "var(--space-6)",
    display: "block",
  },
  logoTrack: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    width: "max-content",
    animation: "logo-scroll 40s linear infinite",
  },
  logo: {
    height: 35,
    width: "auto",
    maxWidth: 140,
    filter: "brightness(0) invert(1)",
    objectFit: "contain" as const,
  },
};

const trustedLogos = [
  "/skyscanner.svg",
  "/tripadvisor.svg",
  "/qatarairways.svg",
  "/expedia.svg",
  "/airbnb.svg",
  "/makemytrip.svg",
  "/uber.svg",
];

export default function HeroSection() {
  const [heroImage, setHeroImage] = React.useState("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80");
  const travelTextRef = useRef<HTMLSpanElement>(null);
  const reimaginedTextRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
        
        if (!PEXELS_API_KEY) {
          console.log("Pexels API key not found, using default hero image");
          return;
        }

        const response = await fetch(
          `https://api.pexels.com/v1/search?query=travel+adventure+destination&per_page=1&orientation=landscape`,
          {
            headers: {
              'Authorization': PEXELS_API_KEY
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.photos && data.photos.length > 0) {
            setHeroImage(data.photos[0].src.large2x);
          }
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);

  // GSAP animation for the heading text
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "Travel" dropping from the top
      gsap.fromTo(
        travelTextRef.current,
        {
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "bounce.out",
          delay: 0.3,
        }
      );

      // Animate "Reimagined." swooshing in from the left
      gsap.fromTo(
        reimaginedTextRef.current,
        {
          opacity: 0,
          x: -200,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8,
        }
      );

      // Add a subtle continuous animation to "Reimagined."
      gsap.to(reimaginedTextRef.current, {
        textShadow: "0 0 20px rgba(200, 165, 90, 0.4)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Typing animation for subtext
      if (subtextRef.current) {
        const text = "Craft your perfect journey with intelligently curated itineraries. Mix luxury stays with street food adventures — travel your way.";
        subtextRef.current.textContent = "";
        
        gsap.to(subtextRef.current, {
          duration: text.length * 0.03, // Fast typing speed
          text: {
            value: text,
            delimiter: "",
          },
          ease: "none",
          delay: 1.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToPlanner = () => {
    const el = document.getElementById("planner");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="hero" style={heroStyles.section}>
        <div style={{...heroStyles.bgImage, backgroundImage: `url(${heroImage})`}} />
        <div style={heroStyles.bgGradient} />
        <div style={heroStyles.spotlightWrap}>
          <Spotlight fill="rgba(200, 165, 90, 0.06)" />
        </div>

        <div style={heroStyles.container} className="hero-grid">
          <motion.div
            style={heroStyles.textContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={heroStyles.label}>
              <span style={heroStyles.labelDot} />
              <span>Curated Travel Experiences</span>
            </div>

            <h1 style={heroStyles.heading}>
              <span ref={travelTextRef} style={{ display: 'inline-block' }}>Travel</span>
              <br />
              <span ref={reimaginedTextRef} style={{...heroStyles.headingAccent, display: 'inline-block'}}>Reimagined.</span>
            </h1>

            <p ref={subtextRef} style={heroStyles.subtext}>
              Craft your perfect journey with intelligently curated itineraries.
              Mix luxury stays with street food adventures — travel your way.
            </p>

            <div style={heroStyles.actions}>
              <Button variant="primary" size="lg" onClick={scrollToPlanner}>
                Start Planning
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <Link href="/destinations" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg">
                  Explore Destinations
                </Button>
              </Link>
            </div>

            <div style={heroStyles.statsRow} className="hero-stats">
              <div style={heroStyles.stat}>
                <span style={heroStyles.statNumber}>150+</span>
                <span style={heroStyles.statLabel}>Destinations</span>
              </div>
              <div style={heroStyles.stat}>
                <span style={heroStyles.statNumber}>50k+</span>
                <span style={heroStyles.statLabel}>Trips Planned</span>
              </div>
              <div style={heroStyles.stat}>
                <span style={heroStyles.statNumber}>4.3</span>
                <span style={heroStyles.statLabel}>User Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Globe — desktop only */}
          <motion.div
            style={heroStyles.globeWrap}
            className="hero-globe"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={heroStyles.globeGlow} />
            <Globe />
          </motion.div>
        </div>

        <style jsx global>{`
          @media (min-width: 1024px) {
            .hero-grid {
              grid-template-columns: 1fr 1fr !important;
            }
            .hero-globe {
              display: flex !important;
            }
          }
          @media (max-width: 600px) {
            .hero-stats {
              gap: var(--space-6) !important;
            }
          }
          @keyframes logo-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}</style>
      </section>

      <div style={heroStyles.trustedBy}>
        <span style={heroStyles.trustedLabel}>Trusted By</span>
        <div style={heroStyles.logoTrack}>
          {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="partner logo"
              style={{
                ...heroStyles.logo,
                height: logo.includes("qatarairways") ? 70 : 35,
              }}
              initial={{ opacity: 0.3, filter: "brightness(0) invert(1) grayscale(1)" }}
              whileHover={{
                opacity: 1,
                filter: "brightness(0) invert(1) grayscale(0)",
                scale: 1.05
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
