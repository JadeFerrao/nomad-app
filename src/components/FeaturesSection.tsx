"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ── SVG Icons instead of emojis ── */
const MixMatchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" opacity="0.5" />
  </svg>
);

const ItineraryIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
    <path d="M3 21h18" opacity="0.4" />
  </svg>
);

const CameraIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const BoltIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const features = [
  {
    icon: <MixMatchIcon />,
    title: "Mix & Match Budgets",
    description:
      "Luxury stays with street food adventures. Your trip, your rules. Customize each category independently.",
  },
  {
    icon: <ItineraryIcon />,
    title: "Curated Itineraries",
    description:
      "Hand-picked venues, restaurants, and experiences — not auto-generated lists. Every suggestion is vetted.",
  },
  {
    icon: <CameraIcon />,
    title: "Visual Planning",
    description:
      "See real photos of every hotel, café, and landmark before you plan your itinerary. No surprises on arrival.",
  },
  {
    icon: <BoltIcon />,
    title: "Instant Generation",
    description:
      "Get a complete day-by-day itinerary in seconds. Adjust, refine, and share with your travel partners.",
  },
];

const st: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    padding: "var(--space-24) 0",
    background: "var(--color-black)",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 var(--space-6)",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "var(--space-16)",
  },
  label: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    marginBottom: "var(--space-4)",
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 600,
    lineHeight: 1.15,
    color: "var(--color-white)",
    letterSpacing: "-0.02em",
    marginBottom: "var(--space-4)",
  },
  subtitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-lg)",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "var(--color-silver)",
    maxWidth: 520,
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-6)",
  },
  card: {
    padding: "var(--space-8)",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "var(--radius-2xl)",
    transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardIconWrap: {
    width: 56,
    height: 56,
    borderRadius: "var(--radius-xl)",
    background: "rgba(200, 165, 90, 0.08)",
    border: "1px solid rgba(200, 165, 90, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "var(--space-5)",
  },
  cardTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-xl)",
    fontWeight: 500,
    color: "var(--color-white)",
    marginBottom: "var(--space-3)",
  },
  cardDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    lineHeight: 1.7,
  },
};

export default function FeaturesSection() {
  const travelPlanningRef = useRef<HTMLSpanElement>(null);
  const perfectedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "Travel Planning," from the left
      gsap.fromTo(
        travelPlanningRef.current,
        {
          opacity: 0,
          x: -200,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: travelPlanningRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate "Perfected" from the right
      gsap.fromTo(
        perfectedRef.current,
        {
          opacity: 0,
          x: 200,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: perfectedRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={st.section}>
      <div style={st.container}>
        <motion.div
          style={st.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={st.label}>Why Nomad</p>
          <h2 style={st.title}>
            <span ref={travelPlanningRef} style={{ display: 'inline-block' }}>Travel Planning,</span>{' '}
            <span ref={perfectedRef} style={{ display: 'inline-block' }}>Perfected</span>
          </h2>
          <p style={st.subtitle}>
            We believe every journey should feel personal. Here&apos;s what makes Nomad different.
          </p>
        </motion.div>

        <div style={st.grid} className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              style={st.card}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div style={st.cardIconWrap}>{feature.icon}</div>
              <h3 style={st.cardTitle}>{feature.title}</h3>
              <p style={st.cardDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        .feature-card:hover {
          border-color: rgba(200, 165, 90, 0.15) !important;
          background: rgba(200, 165, 90, 0.04) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
