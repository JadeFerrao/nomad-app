"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

/* ── Destination Data ── */
interface DestinationEntry {
  slug: string;
  city: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
  avgBudget: string;
}

const allDestinations: DestinationEntry[] = [
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    region: "Europe",
    tagline: "The City of Light",
    description: "From the Eiffel Tower to hidden bistros in Le Marais, Paris offers endless charm. Walk the Seine at sunset and lose yourself in world-class museums.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    highlights: ["Eiffel Tower", "Louvre Museum", "Montmartre", "Seine Cruise"],
    bestTime: "Apr – Jun, Sep – Nov",
    avgBudget: "$120 – $450/day",
  },
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    tagline: "Where Tradition Meets Tomorrow",
    description: "Tokyo is a dizzying blend of ancient temples and neon-lit streets. Savor the world's best sushi and find zen in Meiji Shrine.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market", "Akihabara"],
    bestTime: "Mar – May, Oct – Nov",
    avgBudget: "$100 – $500/day",
  },
  {
    slug: "hokkaido",
    city: "Hokkaido (North)",
    country: "Japan",
    region: "Asia",
    tagline: "The Wild Frontier of Japan",
    description: "Vast landscapes, volcanic hot springs, and world-class ski resorts. Hokkaido is a nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    highlights: ["Sapporo Ramen Alley", "Otaru Canal", "Niseko Skiing", "Daisetsuzan National Park"],
    bestTime: "Dec – Feb (Snow), Jul – Aug (Flowers)",
    avgBudget: "$80 – $350/day",
  },
  {
    slug: "toronto",
    city: "Toronto",
    country: "Canada",
    region: "Americas",
    tagline: "The Global Mosaic",
    description: "A multicultural powerhouse on Lake Ontario. Toronto is famous for its vibrant art scene, the towering CN Tower, and legendary food markets.",
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80",
    highlights: ["CN Tower", "Distillery District", "St. Lawrence Market", "Toronto Island"],
    bestTime: "May – Sep",
    avgBudget: "$110 – $400/day",
  },
  {
    slug: "vancouver",
    city: "Vancouver",
    country: "Canada",
    region: "Americas",
    tagline: "Mountains Meet the Ocean",
    description: "Rainforests, mountains, and the Pacific coastline converge in this stunning West Coast city. Perfect for outdoor enthusiasts and urban adventurers.",
    image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80",
    highlights: ["Stanley Park", "Granville Island", "Capilano Suspension Bridge", "Whistler"],
    bestTime: "Jun – Sep",
    avgBudget: "$120 – $450/day",
  },
  {
    slug: "kuala_lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    region: "Asia",
    tagline: "Skylines & Street Food",
    description: "Modern skyscrapers, lush parks, and a world-famous dining scene. Kuala Lumpur is the buzzing heart of Southeast Asian diversity.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&q=80",
    highlights: ["Petronas Towers", "Batu Caves", "Bukit Bintang", "Merdeka Square"],
    bestTime: "Dec – Mar, Jun – Aug",
    avgBudget: "$40 – $250/day",
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    tagline: "The Lion City",
    description: "A garden city of the future. Singapore offers futuristic architecture, luxury shopping, and some of the world's most innovative culinary experiences.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    highlights: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Jewel Changi"],
    bestTime: "Feb – Apr",
    avgBudget: "$100 – $600/day",
  },
  {
    slug: "hanoi",
    city: "Hanoi",
    country: "Vietnam",
    region: "Asia",
    tagline: "Ancient Charm, Modern Hustle",
    description: "Centuries-old architecture and a rich culture with Southeast Asian, Chinese, and French influences. Hanoi is chaotic, historic, and beautiful.",
    image: "https://images.unsplash.com/photo-1509030450996-939a8dc516d3?w=800&q=80",
    highlights: ["Old Quarter", "Hoan Kiem Lake", "Ha Long Bay", "Temple of Literature"],
    bestTime: "Oct – Apr",
    avgBudget: "$30 – $200/day",
  },
  {
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    region: "Asia",
    tagline: "Island of the Gods",
    description: "Terraced rice paddies, sacred water temples, and world-class surf breaks. Bali is the ultimate tropical spiritual sanctuary.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    highlights: ["Ubud Rice Terraces", "Tanah Lot", "Seminyak Beach", "Mount Batur"],
    bestTime: "Apr – Oct",
    avgBudget: "$30 – $400/day",
  },
  {
    slug: "beijing",
    city: "Beijing",
    country: "China",
    region: "Asia",
    tagline: "The Imperial Capital",
    description: "Home to seven UNESCO World Heritage Sites, from the Forbidden City to the Great Wall. Beijing is where China's imperial past comes alive.",
    image: "https://images.unsplash.com/photo-1508804185872-d1badadcc97f?w=800&q=80",
    highlights: ["Great Wall", "Forbidden City", "Temple of Heaven", "Summer Palace"],
    bestTime: "Sep – Oct, Mar – May",
    avgBudget: "$60 – $350/day",
  },
  {
    slug: "maldives",
    city: "Malé & Resorts",
    country: "Maldives",
    region: "Asia",
    tagline: "The Sunny Side of Life",
    description: "Pristine white beaches and an unbelievable underwater world. The Maldives is the ultimate destination for luxury overwater living.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    highlights: ["Overwater Villas", "Snorkeling", "Island Hopping", "Private Dinners"],
    bestTime: "Nov – Apr",
    avgBudget: "$250 – $2000/day",
  },
  {
    slug: "assam",
    city: "Assam",
    country: "India",
    region: "Asia",
    tagline: "The Land of Red Rivers & Blue Hills",
    description: "Famous for its tea plantations, wild silk, and the one-horned rhinoceros. Assam is the soul of Northeast India's natural beauty.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    highlights: ["Kaziranga National Park", "Majuli Island", "Tea Gardens", "Kamakhya Temple"],
    bestTime: "Nov – Apr",
    avgBudget: "$30 – $150/day",
  },
  {
    slug: "cairo",
    city: "Cairo",
    country: "Egypt",
    region: "Africa",
    tagline: "The Cradle of Civilization",
    description: "The Great Pyramids and the Sphinx stand guard over this sprawling metropolis on the Nile. Cairo is a step back through millennia of history.",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
    highlights: ["Giza Pyramids", "Egyptian Museum", "Khan el-Khalili", "Nile Cruise"],
    bestTime: "Oct – Apr",
    avgBudget: "$40 – $300/day",
  },
  {
    slug: "muscat",
    city: "Muscat",
    country: "Oman",
    region: "Asia",
    tagline: "The Jewel of Arabia",
    description: "A city that blends traditional Arab architecture with a modern coastal vibe. Muscat is famous for its stunning mosques and clear turquoise waters.",
    image: "https://images.unsplash.com/photo-1601640504107-7ea4c46f1f4b?w=800&q=80",
    highlights: ["Grand Mosque", "Mutrah Corniche", "Royal Opera House", "Wadi Shab"],
    bestTime: "Oct – Mar",
    avgBudget: "$80 – $400/day",
  },
  {
    slug: "tbilisi",
    city: "Tbilisi",
    country: "Georgia",
    region: "Europe",
    tagline: "Wine, History & Sulphur Baths",
    description: "A city of ancient history and cutting-edge design, nestled in the Caucasus mountains. Famous for its incredible food and warm hospitality.",
    image: "https://images.unsplash.com/photo-1565008418502-186085185d9c?w=800&q=80",
    highlights: ["Old Tbilisi", "Narikala Fortress", "Wine Tasting", "Bridge of Peace"],
    bestTime: "May – Jun, Sep – Oct",
    avgBudget: "$40 – $250/day",
  },
  {
    slug: "manila",
    city: "Manila & El Nido",
    country: "Philippines",
    region: "Asia",
    tagline: "Epic Islands & Lagoons",
    description: "From the busy streets of Manila to the crystal clear lagoons of El Nido. The Philippines is a sprawling archipelago of tropical adventure.",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    highlights: ["Big Lagoon", "Coron", "Intramuros", "Boracay"],
    bestTime: "Dec – Apr",
    avgBudget: "$50 – $350/day",
  },
  {
    slug: "mauritius",
    city: "Mauritius",
    country: "Mauritius",
    region: "Africa",
    tagline: "Turquoise Waters & Volcanic Peaks",
    description: "A jewel in the Indian Ocean, Mauritius is famous for its beaches, lagoons, and reefs. Explore the colorful sands of Chamarel and the bustling local markets.",
    image: "https://images.unsplash.com/photo-1589197331516-4d84593eb64e?w=800&q=80",
    highlights: ["Le Morne Brabant", "Chamarel Seven Coloured Earths", "Flic-en-Flac", "Pamplemousses Garden"],
    bestTime: "May – Dec",
    avgBudget: "$80 – $500/day",
  },
  {
    slug: "madagascar",
    city: "Nosy Be & Antananarivo",
    country: "Madagascar",
    region: "Africa",
    tagline: "The Eighth Continent",
    description: "Home to unique wildlife like lemurs and giant baobabs. Madagascar offers a truly off-the-beaten-path adventure for nature lovers.",
    image: "https://images.unsplash.com/photo-1550252112-922650d0325b?w=800&q=80",
    highlights: ["Avenue of the Baobabs", "Tsingy de Bemaraha", "Nosy Be", "Andasibe-Mantadia"],
    bestTime: "Apr – Oct",
    avgBudget: "$40 – $300/day",
  },
  {
    slug: "warsaw",
    city: "Warsaw",
    country: "Poland",
    region: "Europe",
    tagline: "Phoenix City of Europe",
    description: "A city that rose from the ashes, blending meticulously restored Gothic architecture with modern skyscrapers and a vibrant cultural soul.",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80",
    highlights: ["Old Town Market Place", "Royal Castle", "Palace of Culture and Science", "Vistula River"],
    bestTime: "May – Sep",
    avgBudget: "$45 – $250/day",
  },
  {
    slug: "cappadocia",
    city: "Cappadocia",
    country: "Turkey",
    region: "Europe",
    tagline: "Fairy Chimneys & Hot Air Balloons",
    description: "A surreal landscape of volcanic rock formations and ancient cave dwellings. Watching the sunrise from a hot air balloon is a core travel experience.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    highlights: ["Goreme Open Air Museum", "Uchisar Castle", "Kaymakli Underground City", "Pasabag"],
    bestTime: "Apr – Jun, Sep – Oct",
    avgBudget: "$60 – $400/day",
  },
  {
    slug: "santiago",
    city: "Santiago",
    country: "Chile",
    region: "Americas",
    tagline: "Between the Andes & the Sea",
    description: "A sophisticated metropolis surrounded by snow-capped mountains. Santiago is the gateway to Chile's world-class vineyards and epic PATAGONIA.",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80",
    highlights: ["Cerro San Cristóbal", "Sky Costanera", "Plaza de Armas", "Casablanca Valley"],
    bestTime: "Oct – Apr",
    avgBudget: "$70 – $350/day",
  },
  {
    slug: "bratislava",
    city: "Bratislava",
    country: "Slovakia",
    region: "Europe",
    tagline: "Beauty on the Danube",
    description: "A charming, compact capital with a medieval old town and a castle overlooking the Danube. Often overlooked, but full of character and quirky art.",
    image: "https://images.unsplash.com/photo-1564344498308-f472ce1ce16d?w=800&q=80",
    highlights: ["Bratislava Castle", "St. Martin's Cathedral", "Michael's Gate", "The Blue Church"],
    bestTime: "May – Sep",
    avgBudget: "$50 – $250/day",
  },
];

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

  const filtered =
    activeRegion === "All"
      ? allDestinations
      : allDestinations.filter((d) => d.region === activeRegion);

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

                  <Link href="/#planner" style={s.planBtn} className="plan-dest-btn">
                    Plan a trip to {dest.city}
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
