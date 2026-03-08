"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ── Types ── */
type BudgetTier = "budget" | "mid" | "luxury";
type Category = "stay" | "eat" | "explore";

interface BudgetSelections {
  stay: BudgetTier;
  eat: BudgetTier;
  explore: BudgetTier;
}

interface BudgetSelectorProps {
  onPlanTrip: (destination: string, days: number, selections: BudgetSelections) => void;
}

/* ── SVG Icons ── */
const StayIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4z" />
    <path d="M9 3h6l3 4H6l3-4z" />
  </svg>
);

const EatIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const ExploreIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const BudgetBadgeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
  </svg>
);

const MidBadgeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const LuxuryBadgeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-silver)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-silver)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ── Destination Data ── */
interface Destination {
  value: string;
  label: string;
  country: string;
  region: string;
  image: string;
}

const destinations: Destination[] = [
  // Europe
  { value: "paris", label: "Paris", country: "France", region: "Europe", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=60&q=60" },
  { value: "rome", label: "Rome", country: "Italy", region: "Europe", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=60&q=60" },
  { value: "amalfi", label: "Amalfi Coast (South)", country: "Italy", region: "Europe", image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de?w=60&q=60" },
  { value: "dolomites", label: "Dolomites (North)", country: "Italy", region: "Europe", image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=60&q=60" },
  { value: "barcelona", label: "Barcelona", country: "Spain", region: "Europe", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=60&q=60" },
  { value: "london", label: "London", country: "UK", region: "Europe", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=60&q=60" },
  { value: "warsaw", label: "Warsaw", country: "Poland", region: "Europe", image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=60&q=60" },
  { value: "bratislava", label: "Bratislava", country: "Slovakia", region: "Europe", image: "https://images.unsplash.com/photo-1564344498308-f472ce1ce16d?w=60&q=60" },
  { value: "tbilisi", label: "Tbilisi", country: "Georgia", region: "Europe", image: "https://images.unsplash.com/photo-1565008418502-186085185d9c?w=60&q=60" },
  { value: "moscow", label: "Moscow", country: "Russia", region: "Europe", image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=60&q=60" },
  { value: "istanbul", label: "Istanbul", country: "Turkey", region: "Europe", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=60&q=60" },
  { value: "cappadocia", label: "Cappadocia", country: "Turkey", region: "Europe", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=60&q=60" },
  // Asia
  { value: "tokyo", label: "Tokyo", country: "Japan", region: "Asia", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=60&q=60" },
  { value: "hokkaido", label: "Hokkaido (North)", country: "Japan", region: "Asia", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=60&q=60" },
  { value: "kyoto", label: "Kyoto (South)", country: "Japan", region: "Asia", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=60&q=60" },
  { value: "mumbai", label: "Mumbai", country: "India", region: "Asia", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=60&q=60" },
  { value: "assam", label: "Assam", country: "India", region: "Asia", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=60&q=60" },
  { value: "thimphu", label: "Thimphu", country: "Bhutan", region: "Asia", image: "https://images.unsplash.com/photo-1578516125863-30fec1761921?w=60&q=60" },
  { value: "maldives", label: "Malé", country: "Maldives", region: "Asia", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=60&q=60" },
  { value: "kuala_lumpur", label: "Kuala Lumpur", country: "Malaysia", region: "Asia", image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=60&q=60" },
  { value: "singapore", label: "Singapore", country: "Singapore", region: "Asia", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=60&q=60" },
  { value: "hanoi", label: "Hanoi", country: "Vietnam", region: "Asia", image: "https://images.unsplash.com/photo-1509030450996-939a8dc516d3?w=60&q=60" },
  { value: "ho_chi_minh", label: "Ho Chi Minh City", country: "Vietnam", region: "Asia", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=60&q=60" },
  { value: "elNido", label: "El Nido", country: "Philippines", region: "Asia", image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=60&q=60" },
  { value: "manila", label: "Manila", country: "Philippines", region: "Asia", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=60&q=60" },
  { value: "muscat", label: "Muscat", country: "Oman", region: "Asia", image: "https://images.unsplash.com/photo-1601640504107-7ea4c46f1f4b?w=60&q=60" },
  { value: "doha", label: "Doha", country: "Qatar", region: "Asia", image: "https://images.unsplash.com/photo-1516108317508-6788f6a160e6?w=60&q=60" },
  { value: "almaty", label: "Almaty", country: "Kazakhstan", region: "Asia", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=60&q=60" },
  { value: "yerevan", label: "Yerevan", country: "Armenia", region: "Asia", image: "https://images.unsplash.com/photo-1563841930606-67e2b64dadad?w=60&q=60" },
  // Americas
  { value: "nyc", label: "New York", country: "USA", region: "Americas", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=60&q=60" },
  { value: "toronto", label: "Toronto", country: "Canada", region: "Americas", image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=60&q=60" },
  { value: "vancouver", label: "Vancouver", country: "Canada", region: "Americas", image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=60&q=60" },
  { value: "santiago", label: "Santiago", country: "Chile", region: "Americas", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=60&q=60" },
  { value: "rio", label: "Rio de Janeiro", country: "Brazil", region: "Americas", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=60&q=60" },
  // Africa
  { value: "cairo", label: "Cairo", country: "Egypt", region: "Africa", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=60&q=60" },
  { value: "mauritius", label: "Mauritius", country: "Mauritius", region: "Africa", image: "https://images.unsplash.com/photo-1589197331516-4d84593eb64e?w=60&q=60" },
  { value: "madagascar", label: "Madagascar", country: "Madagascar", region: "Africa", image: "https://images.unsplash.com/photo-1550252112-922650d0325b?w=60&q=60" },
  { value: "cape_town", label: "Cape Town", country: "South Africa", region: "Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=60&q=60" },
];

/* ── Tier data ── */
const tierInfo: Record<BudgetTier, {
  label: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  icon: React.ReactNode;
}> = {
  budget: {
    label: "Budget",
    color: "var(--color-budget)",
    colorBg: "var(--color-budget-bg)",
    colorBorder: "var(--color-budget-border)",
    icon: <BudgetBadgeIcon />,
  },
  mid: {
    label: "Mid-Range",
    color: "var(--color-mid)",
    colorBg: "var(--color-mid-bg)",
    colorBorder: "var(--color-mid-border)",
    icon: <MidBadgeIcon />,
  },
  luxury: {
    label: "Luxury",
    color: "var(--color-luxury)",
    colorBg: "var(--color-luxury-bg)",
    colorBorder: "var(--color-luxury-border)",
    icon: <LuxuryBadgeIcon />,
  },
};

const categoryInfo: Record<Category, {
  label: string;
  icon: (color: string) => React.ReactNode;
  descriptions: Record<BudgetTier, string>;
}> = {
  stay: {
    label: "Stay",
    icon: (c) => <StayIcon color={c} />,
    descriptions: {
      budget: "Hostels & Guesthouses",
      mid: "Boutique Hotels",
      luxury: "5-Star Resorts & Villas",
    },
  },
  eat: {
    label: "Eat",
    icon: (c) => <EatIcon color={c} />,
    descriptions: {
      budget: "Street Food & Markets",
      mid: "Local Cafes & Bistros",
      luxury: "Fine Dining Experiences",
    },
  },
  explore: {
    label: "Explore",
    icon: (c) => <ExploreIcon color={c} />,
    descriptions: {
      budget: "Walking Tours & Public Transit",
      mid: "Guided Tours & Day Trips",
      luxury: "Private Tours & Exclusive Access",
    },
  },
};

/* ── Styles ── */
const s: Record<string, React.CSSProperties> = {
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
    marginBottom: "var(--space-4)",
    letterSpacing: "-0.02em",
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
  formWrap: {
    maxWidth: 900,
    margin: "0 auto",
  },
  /* Custom Dropdown */
  dropdownRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-6)",
    marginBottom: "var(--space-8)",
  },
  fieldLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--color-silver)",
    opacity: 0.6,
    marginBottom: "var(--space-3)",
    display: "block",
  },
  dropdownContainer: {
    position: "relative" as const,
  },
  dropdownBtn: {
    width: "100%",
    padding: "var(--space-4) var(--space-5)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "var(--radius-lg)",
    cursor: "pointer",
    transition: "all 200ms ease",
    outline: "none",
    textAlign: "left" as const,
    minHeight: 66,
  },
  dropdownImage: {
    width: 32,
    height: 32,
    borderRadius: "var(--radius-md)",
    objectFit: "cover" as const,
    flexShrink: 0,
  },
  dropdownText: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },
  dropdownCity: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    fontWeight: 500,
    color: "var(--color-white)",
  },
  dropdownCountry: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-silver)",
  },
  dropdownPanel: {
    position: "absolute" as const,
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    maxHeight: 360,
    overflowY: "auto" as const,
    background: "var(--color-charcoal)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "var(--radius-lg)",
    zIndex: 50,
    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
  },
  dropdownSearch: {
    position: "sticky" as const,
    top: 0,
    padding: "var(--space-3) var(--space-4)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    background: "var(--color-charcoal)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
  searchInput: {
    flex: 1,
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-white)",
    background: "none",
    border: "none",
    outline: "none",
  },
  regionLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-ash)",
    padding: "var(--space-3) var(--space-4) var(--space-1)",
  },
  dropdownOption: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    padding: "var(--space-3) var(--space-4)",
    cursor: "pointer",
    transition: "background 150ms ease",
    border: "none",
    background: "none",
    width: "100%",
    textAlign: "left" as const,
  },
  optionImage: {
    width: 28,
    height: 28,
    borderRadius: "var(--radius-sm)",
    objectFit: "cover" as const,
    flexShrink: 0,
  },
  optionText: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  optionCity: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-white)",
  },
  optionCountry: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    color: "var(--color-silver)",
  },
  /* Duration input */
  input: {
    width: "100%",
    padding: "var(--space-4) var(--space-5)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-white)",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "var(--radius-lg)",
    transition: "all 200ms ease",
    outline: "none",
    height: 66, // Match dropdownBtn height
  },
  /* Mix & Match */
  divider: {
    width: "100%",
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
    margin: "var(--space-2) 0 var(--space-8)",
  },
  mixTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-2xl)",
    fontWeight: 500,
    color: "var(--color-white)",
    marginBottom: "var(--space-2)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
  },
  mixSub: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    marginBottom: "var(--space-8)",
    lineHeight: 1.6,
  },
  /* Category card */
  catCard: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "var(--radius-2xl)",
    padding: "var(--space-6)",
    marginBottom: "var(--space-5)",
    transition: "all 300ms ease",
  },
  catHeader: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    marginBottom: "var(--space-5)",
  },
  catIconWrap: {
    width: 40,
    height: 40,
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "rgba(255, 255, 255, 0.05)",
  },
  catLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    fontWeight: 600,
    color: "var(--color-white)",
  },
  tierGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "var(--space-3)",
  },
  tierCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    padding: "var(--space-5) var(--space-3)",
    borderRadius: "var(--radius-xl)",
    cursor: "pointer",
    transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(4px)",
    outline: "none",
    minHeight: 100,
  },
  tierLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
  },
  tierDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 400,
    color: "var(--color-silver)",
    textAlign: "center" as const,
    lineHeight: 1.4,
  },
  submitWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "var(--space-10)",
  },
};

/* ── Custom Dropdown Component ── */
function DestinationDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = destinations.find((d) => d.value === value) || destinations[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) searchRef.current.focus();
  }, [isOpen]);

  const filtered = destinations.filter(
    (d) =>
      d.label.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
  );

  const regions = [...new Set(filtered.map((d) => d.region))];

  return (
    <div ref={containerRef} style={s.dropdownContainer}>
      <button
        style={{
          ...s.dropdownBtn,
          borderColor: isOpen ? "rgba(200, 165, 90, 0.4)" : "rgba(255, 255, 255, 0.08)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={selected.image} alt={selected.label} style={s.dropdownImage} />
        <div style={s.dropdownText}>
          <span style={s.dropdownCity}>{selected.label}</span>
          <span style={s.dropdownCountry}>{selected.country}</span>
        </div>
        <ChevronDown />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={s.dropdownPanel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div style={s.dropdownSearch}>
              <SearchIcon />
              <input
                ref={searchRef}
                style={s.searchInput}
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {regions.map((region) => (
              <div key={region}>
                <div style={s.regionLabel}>{region}</div>
                {filtered
                  .filter((d) => d.region === region)
                  .map((d) => (
                    <button
                      key={d.value}
                      style={{
                        ...s.dropdownOption,
                        background:
                          d.value === value
                            ? "rgba(200, 165, 90, 0.08)"
                            : "transparent",
                      }}
                      className="dropdown-option-hover"
                      onClick={() => {
                        onChange(d.value);
                        setIsOpen(false);
                        setSearch("");
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.image} alt={d.label} style={s.optionImage} />
                      <div style={s.optionText}>
                        <span style={s.optionCity}>{d.label}</span>
                        <span style={s.optionCountry}>{d.country}</span>
                      </div>
                      {d.value === value && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ── */
export default function BudgetSelector({ onPlanTrip }: BudgetSelectorProps) {
  const [destination, setDestination] = useState("paris");
  const [days, setDays] = useState(5);
  const [selections, setSelections] = useState<BudgetSelections>({
    stay: "mid",
    eat: "mid",
    explore: "mid",
  });

  const updateCategory = (cat: Category, tier: BudgetTier) => {
    setSelections((prev) => ({ ...prev, [cat]: tier }));
  };

  return (
    <section id="planner" style={s.section}>
      <div style={s.container}>
        {/* Header */}
        <motion.div
          style={s.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={s.label}>Plan Your Journey</p>
          <h2 style={s.title}>Craft Your Perfect Trip</h2>
          <p style={s.subtitle}>
            Choose your destination, set your duration, and mix budget tiers across categories.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          style={s.formWrap}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Destination & Duration */}
          <div style={s.dropdownRow} className="budget-input-grid">
            <div>
              <label style={s.fieldLabel}>Destination</label>
              <DestinationDropdown value={destination} onChange={setDestination} />
            </div>
            <div>
              <label style={s.fieldLabel}>Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                style={s.input}
              />
            </div>
          </div>

          <div style={s.divider} />

          {/* Mix & Match */}
          <h3 style={s.mixTitle}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Mix & Match Your Budget
          </h3>
          <p style={s.mixSub}>
            Customize each category independently. Go luxury on stays but budget on food — it&apos;s your trip.
          </p>

          {(Object.keys(categoryInfo) as Category[]).map((cat) => {
            const active = selections[cat];
            const activeColor = tierInfo[active].color;
            return (
              <div
                key={cat}
                style={{
                  ...s.catCard,
                  borderColor: `color-mix(in srgb, ${activeColor} 15%, transparent)`,
                }}
              >
                <div style={s.catHeader}>
                  <div
                    style={{
                      ...s.catIconWrap,
                      background: tierInfo[active].colorBg,
                      border: `1px solid ${tierInfo[active].colorBorder}`,
                    }}
                  >
                    {categoryInfo[cat].icon(activeColor)}
                  </div>
                  <span style={s.catLabel}>{categoryInfo[cat].label}</span>
                </div>

                <div style={s.tierGrid}>
                  {(Object.keys(tierInfo) as BudgetTier[]).map((tier) => {
                    const isActive = active === tier;
                    const info = tierInfo[tier];
                    return (
                      <motion.button
                        key={tier}
                        style={{
                          ...s.tierCard,
                          background: isActive ? info.colorBg : "rgba(255, 255, 255, 0.02)",
                          borderColor: isActive ? info.colorBorder : "rgba(255, 255, 255, 0.06)",
                          boxShadow: isActive
                            ? `0 0 20px color-mix(in srgb, ${info.color} 10%, transparent)`
                            : "none",
                        }}
                        whileHover={{
                          borderColor: isActive ? undefined : "rgba(255,255,255,0.12)",
                          y: -2,
                        }}
                        transition={{ duration: 0.15 }}
                        onClick={() => updateCategory(cat, tier)}
                      >
                        <span style={{ color: isActive ? info.color : "var(--color-ash)" }}>
                          {info.icon}
                        </span>
                        <span style={{ ...s.tierLabel, color: isActive ? info.color : "var(--color-mist)" }}>
                          {info.label}
                        </span>
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.span
                              key={`${cat}-${tier}`}
                              style={s.tierDesc}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {categoryInfo[cat].descriptions[tier]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Submit */}
          <div style={s.submitWrap}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => onPlanTrip(destination, days, selections)}
              style={{ minWidth: 260 }}
            >
              Generate Itinerary
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .budget-input-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
        .dropdown-option-hover:hover {
          background: rgba(255, 255, 255, 0.04) !important;
        }
      `}</style>
    </section>
  );
}
