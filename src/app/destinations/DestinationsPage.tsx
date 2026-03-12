"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

import { allDestinations, DestinationEntry } from "@/data/destinations";

const regions = ["All", "Europe", "Asia", "Americas", "Africa", "Middle East"];

/* ── Styles ── */
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--color-black)",
    paddingTop: "calc(72px + 36px)",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 var(--space-6)",
  },
  hero: {
    position: "relative",
    padding: "var(--space-20) 0 var(--space-12)",
    textAlign: "center" as const,
  },
  heroLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    marginBottom: "var(--space-4)",
  },
  heroTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
    fontWeight: 600,
    lineHeight: 1.1,
    color: "var(--color-white)",
    letterSpacing: "-0.02em",
    marginBottom: "var(--space-4)",
  },
  heroSub: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-lg)",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "var(--color-silver)",
    maxWidth: 560,
    margin: "0 auto",
  },
  filters: {
    display: "flex",
    gap: "var(--space-2)",
    justifyContent: "center",
    flexWrap: "wrap" as const,
    marginBottom: "var(--space-12)",
  },
  filterBtn: {
    padding: "var(--space-2) var(--space-5)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    borderRadius: "var(--radius-full)",
    cursor: "pointer",
    transition: "all 200ms ease",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(8px)",
    color: "var(--color-silver)",
    outline: "none",
  },
  filterBtnActive: {
    background: "var(--color-accent)",
    color: "var(--color-black)",
    borderColor: "var(--color-accent)",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-8)",
    paddingBottom: "var(--space-24)",
  },
  card: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    borderRadius: "var(--radius-2xl)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardImage: {
    width: "100%",
    height: 240,
    objectFit: "cover" as const,
  },
  cardBody: {
    padding: "var(--space-6) var(--space-8)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-3)",
    flex: 1,
  },
  cardRegion: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
  },
  cardCity: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-2xl)",
    fontWeight: 600,
    color: "var(--color-white)",
    lineHeight: 1.2,
  },
  cardTagline: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-sm)",
    fontWeight: 400,
    color: "var(--color-mist)",
    fontStyle: "italic",
  },
  cardDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    lineHeight: 1.7,
  },
  cardMeta: {
    display: "flex",
    gap: "var(--space-6)",
    marginTop: "var(--space-2)",
    flexWrap: "wrap" as const,
  },
  metaItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },
  metaLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 600,
    color: "var(--color-ash)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  metaValue: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-cloud)",
  },
  highlights: {
    display: "flex",
    gap: "var(--space-2)",
    flexWrap: "wrap" as const,
    marginTop: "var(--space-1)",
  },
  highlightTag: {
    padding: "var(--space-1) var(--space-3)",
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 500,
    color: "var(--color-mist)",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "var(--radius-full)",
  },
  planBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "var(--space-3) var(--space-5)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-accent)",
    background: "rgba(200, 165, 90, 0.08)",
    border: "1px solid rgba(200, 165, 90, 0.2)",
    borderRadius: "var(--radius-lg)",
    cursor: "pointer",
    transition: "all 200ms ease",
    textDecoration: "none",
    marginTop: "auto",
    paddingTop: "var(--space-4)",
    alignSelf: "flex-start",
    outline: "none",
    backdropFilter: "blur(4px)",
  },
};

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [destinationsWithImages, setDestinationsWithImages] = useState<DestinationEntry[]>(allDestinations);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Fetch real images from Pexels on mount
  React.useEffect(() => {
    const fetchImages = async () => {
      setIsLoadingImages(true);
      try {
        const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
        
        if (!PEXELS_API_KEY) {
          console.log("Pexels API key not found, using default images");
          setIsLoadingImages(false);
          return;
        }

        const updatedDestinations = await Promise.all(
          allDestinations.map(async (dest) => {
            try {
              const query = `${dest.city} ${dest.country} landmark`;
              const response = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
                {
                  headers: {
                    'Authorization': PEXELS_API_KEY
                  }
                }
              );

              if (response.ok) {
                const data = await response.json();
                if (data.photos && data.photos.length > 0) {
                  return {
                    ...dest,
                    image: data.photos[0].src.large
                  };
                }
              }
            } catch (error) {
              console.error(`Error fetching image for ${dest.city}:`, error);
            }
            // Keep original image if fetch fails
            return dest;
          })
        );

        setDestinationsWithImages(updatedDestinations);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchImages();
  }, []);

  const filtered =
    activeRegion === "All"
      ? destinationsWithImages
      : destinationsWithImages.filter((d) => d.region === activeRegion);

  return (
    <>
      <Navbar />
      <Marquee />

      <div style={s.page}>
        <div style={s.container}>
          {/* Hero */}
          <motion.div
            style={s.hero}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={s.heroLabel}>Explore the World</p>
            <h1 style={s.heroTitle}>Destinations</h1>
            <p style={s.heroSub}>
              Curated guides to the world&apos;s most inspiring places. Each destination handpicked with the best stays, eats, and experiences.
            </p>
          </motion.div>

          {/* Region Filters */}
          <div style={s.filters}>
            {regions.map((r) => (
              <button
                key={r}
                style={{
                  ...s.filterBtn,
                  ...(activeRegion === r ? s.filterBtnActive : {}),
                }}
                onClick={() => setActiveRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {isLoadingImages && (
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-8)',
              color: 'var(--color-silver)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)'
            }}>
              Loading destination images...
            </div>
          )}
          <div style={s.grid} className="destinations-grid">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.slug}
                style={s.card}
                className="destination-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dest.image} alt={dest.city} style={s.cardImage} />

                <div style={s.cardBody}>
                  <span style={s.cardRegion}>{dest.region} · {dest.country}</span>
                  <h2 style={s.cardCity}>{dest.city}</h2>
                  <span style={s.cardTagline}>{dest.tagline}</span>
                  <p style={s.cardDesc}>{dest.description}</p>

                  <div style={s.cardMeta}>
                    <div style={s.metaItem}>
                      <span style={s.metaLabel}>Best Time</span>
                      <span style={s.metaValue}>{dest.bestTime}</span>
                    </div>
                    <div style={s.metaItem}>
                      <span style={s.metaLabel}>Avg. Budget</span>
                      <span style={s.metaValue}>{dest.avgBudget}</span>
                    </div>
                  </div>

                  <div style={s.highlights} className="highlights-wrap">
                    {dest.highlights.map((h) => (
                      <span key={h} style={s.highlightTag}>{h}</span>
                    ))}
                  </div>

                  <Link href={`/destinations/${dest.slug}`} style={s.planBtn} className="plan-dest-btn">
                    Read Guide & Plan Trip
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @media (min-width: 768px) {
          .destinations-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1100px) {
          .destinations-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        .destination-card:hover {
          border-color: rgba(200, 165, 90, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .plan-dest-btn:hover {
          background: rgba(200, 165, 90, 0.15) !important;
          border-color: rgba(200, 165, 90, 0.35) !important;
        }
        .highlights-wrap {
          margin-bottom: var(--space-4);
        }
      `}</style>
    </>
  );
}
