"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--color-black)",
    paddingTop: "calc(72px + 48px)",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 var(--space-6) var(--space-20)",
  },
  header: {
    marginBottom: "var(--space-12)",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-accent)",
    marginBottom: "var(--space-6)",
    textDecoration: "none",
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: 600,
    color: "var(--color-white)",
    marginBottom: "var(--space-4)",
    lineHeight: 1.1,
  },
  updated: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
  },
  content: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-mist)",
    lineHeight: 1.8,
  },
  section: {
    marginBottom: "var(--space-10)",
  },
  sectionTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-2xl)",
    fontWeight: 500,
    color: "var(--color-white)",
    marginBottom: "var(--space-4)",
  },
  paragraph: {
    marginBottom: "var(--space-4)",
  },
  list: {
    paddingLeft: "var(--space-6)",
    marginBottom: "var(--space-4)",
  },
  listItem: {
    marginBottom: "var(--space-2)",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div style={s.page}>
        <div style={s.container}>
          <div style={s.header}>
            <Link href="/" style={s.backLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 style={s.title}>Privacy Policy</h1>
            <p style={s.updated}>Last updated: March 13, 2026</p>
          </div>

          <div style={s.content}>
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Introduction</h2>
              <p style={s.paragraph}>
                Welcome to Nomad. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains our approach to data collection and privacy when you use our
                travel planning platform.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Information We Collect</h2>
              <p style={s.paragraph}>
                Nomad does not collect, store, or process any personal information from our users. We do not
                require account creation, and we do not track your activities across our platform. Your travel
                planning remains completely private.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>How We Use Your Information</h2>
              <p style={s.paragraph}>
                Since we do not collect any personal information, we do not use, share, or process any user data.
                All itinerary generation and travel planning happens locally in your browser without any data
                being transmitted to our servers.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Third-Party Services</h2>
              <p style={s.paragraph}>
                Our platform may use third-party services for essential functionality such as image delivery
                (Pexels API) and AI-powered itinerary generation. These services have their own privacy policies,
                and we encourage you to review them. We do not share any personal information with these services.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Cookies and Tracking Technologies</h2>
              <p style={s.paragraph}>
                We use minimal cookies only for essential website functionality. We do not use tracking cookies,
                analytics cookies, or advertising cookies.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Data Security</h2>
              <p style={s.paragraph}>
                Since we do not collect or store any personal data, there is no user data at risk. Your travel
                preferences and itineraries remain on your device and are never transmitted to our servers.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Children's Privacy</h2>
              <p style={s.paragraph}>
                Our services do not collect personal information from anyone, including children. Parents and
                guardians can feel confident that no data is being collected from users of any age.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Changes to This Policy</h2>
              <p style={s.paragraph}>
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Contact Us</h2>
              <p style={s.paragraph}>
                If you have any questions about this privacy policy, please contact Jayden Ferrao
              </p>
              <p style={s.paragraph}>
                Address: Goa, India
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
