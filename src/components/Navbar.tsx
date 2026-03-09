"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navStyles: Record<string, React.CSSProperties> = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    padding: "0 var(--space-6)",
  },
  navScrolled: {
    background: "rgba(10, 10, 10, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    cursor: "pointer",
    textDecoration: "none",
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-serif)",
    fontWeight: 700,
    fontSize: "var(--text-lg)",
    color: "var(--color-black)",
  },
  logoText: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-xl)",
    fontWeight: 600,
    color: "var(--color-white)",
    letterSpacing: "-0.02em",
  },
  hamburger: {
    display: "none",
    flexDirection: "column" as const,
    gap: 5,
    cursor: "pointer",
    padding: "var(--space-2)",
    background: "none",
    border: "none",
  },
  bar: {
    width: 22,
    height: 2,
    borderRadius: 2,
    background: "var(--color-white)",
    transition: "all 300ms ease",
  },
  mobileMenu: {
    position: "fixed" as const,
    top: 72,
    left: 0,
    right: 0,
    background: "rgba(10, 10, 10, 0.95)",
    backdropFilter: "blur(20px)",
    padding: "var(--space-8) var(--space-6)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-6)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{ ...navStyles.nav, ...(scrolled ? navStyles.navScrolled : {}) }}>
      <div style={navStyles.inner}>
        <Link href="/" style={navStyles.logoWrap}>
          <img src="/icon.png" alt="Nomad" style={{ height: 30, borderRadius: "var(--radius-lg)" }} />
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-white)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Nomad</span>
        </Link>

        {/* Empty right side — clean minimal header */}
        <div />
      </div>
    </nav>
  );
}
