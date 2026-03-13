"use client";

import React from "react";
import Link from "next/link";

const footerStyles: Record<string, React.CSSProperties> = {
  footer: {
    position: "relative",
    padding: "var(--space-16) 0 var(--space-8)",
    background: "var(--color-black)",
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 var(--space-6)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-10)",
    marginBottom: "var(--space-12)",
  },
  brand: {
    maxWidth: 300,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-3)",
    marginBottom: "var(--space-4)",
  },
  logoIcon: {
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-serif)",
    fontWeight: 700,
    fontSize: "var(--text-base)",
    color: "var(--color-black)",
  },
  logoText: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    color: "var(--color-white)",
  },
  brandDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    lineHeight: 1.7,
    paddingTop: "var(--space-4)",
  },
  column: {},
  colTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--color-mist)",
    marginBottom: "var(--space-4)",
  },
  colLinks: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-3)",
  },
  colLink: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    cursor: "pointer",
    transition: "color 200ms ease",
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left" as const,
  },
  divider: {
    width: "100%",
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
    marginBottom: "var(--space-6)",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "var(--space-4)",
  },
  copyright: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--color-ash)",
  },
  socials: {
    display: "flex",
    gap: "var(--space-4)",
  },
  socialLink: {
    width: 32,
    height: 32,
    borderRadius: "var(--radius-md)",
    background: "rgba(255, 255, 255, 0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-silver)",
    transition: "all 200ms ease",
    cursor: "pointer",
    border: "none",
    fontSize: "var(--text-sm)",
  },
};

export default function Footer() {
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.grid} className="footer-grid">
          {/* Brand */}
          <div style={footerStyles.brand}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
              <img src="/icon.png" alt="Nomad" style={{ height: 30, borderRadius: "var(--radius-lg)" }} />
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-white)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Nomad</span>
            </div>
            <p style={footerStyles.brandDesc}>
              Curated travel experiences tailored to your style and budget.
              Explore the world, your way.
            </p>
          </div>

          {/* Empty spacer */}
          <div></div>

          {/* Legal */}
          <div style={{...footerStyles.column, textAlign: "right" as const}} className="footer-legal">
            <p style={{...footerStyles.colTitle, textAlign: "right" as const}} className="footer-legal-title">Legal</p>
            <div style={{...footerStyles.colLinks, alignItems: "flex-end"}} className="footer-legal-links">
              <Link href="/privacy" style={footerStyles.colLink} className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" style={footerStyles.colLink} className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div style={footerStyles.divider} />

        <div style={footerStyles.bottom} className="footer-bottom">
          <span style={footerStyles.copyright}>
            © {new Date().getFullYear()} Nomad. All rights reserved.
          </span>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-sm)",
            fontStyle: "italic",
            color: "var(--color-ash)",
            fontWeight: 300,
            margin: 0,
          }} className="footer-bottom-traveller">
            Built by a traveller for all other travellers ❤️
          </p>
          <div style={footerStyles.socials} className="footer-bottom-socials">
            {["𝕏", "IG", "in"].map((s) => (
              <button key={s} style={footerStyles.socialLink} className="social-icon-hover">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-link:hover {
          color: var(--color-white) !important;
        }
        .social-icon-hover:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: var(--color-accent) !important;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-legal {
            text-align: left !important;
          }
          .footer-legal-title {
            text-align: left !important;
          }
          .footer-legal-links {
            align-items: flex-start !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--space-6) !important;
          }
          .footer-bottom-traveller {
            order: 2 !important;
          }
          .footer-bottom-socials {
            order: 3 !important;
          }
        }
      `}</style>
    </footer>
  );
}
