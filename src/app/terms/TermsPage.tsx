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

export default function TermsPage() {
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
            <h1 style={s.title}>Terms of Service</h1>
            <p style={s.updated}>Last updated: March 13, 2026</p>
          </div>

          <div style={s.content}>
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Agreement to Terms</h2>
              <p style={s.paragraph}>
                By accessing or using Nomad's travel planning platform, you agree to be bound by these Terms
                of Service and all applicable laws and regulations. If you do not agree with any of these terms,
                you are prohibited from using this service.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Use License</h2>
              <p style={s.paragraph}>
                Permission is granted to access and use Nomad's services for personal,
                non-commercial travel planning purposes. This license does not include:
              </p>
              <ul style={s.list}>
                <li style={s.listItem}>Modifying or copying our materials without authorization</li>
                <li style={s.listItem}>Using the materials for commercial purposes or public display</li>
                <li style={s.listItem}>Attempting to reverse engineer any software on our platform</li>
                <li style={s.listItem}>Removing copyright or proprietary notations</li>
                <li style={s.listItem}>Transferring materials to another person or mirroring on another server</li>
              </ul>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Travel Services</h2>
              <p style={s.paragraph}>
                Nomad provides curated travel recommendations and itinerary planning services. Please note:
              </p>
              <ul style={s.list}>
                <li style={s.listItem}>We are an informational platform and do not directly provide travel services</li>
                <li style={s.listItem}>All travel recommendations are for informational purposes only</li>
                <li style={s.listItem}>Prices, availability, and details are subject to change without notice</li>
                <li style={s.listItem}>We are not responsible for the quality or delivery of third-party services</li>
                <li style={s.listItem}>Travel insurance is strongly recommended for all trips</li>
                <li style={s.listItem}>You are responsible for verifying all travel information independently</li>
              </ul>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Prohibited Activities</h2>
              <p style={s.paragraph}>You agree not to:</p>
              <ul style={s.list}>
                <li style={s.listItem}>Use the platform for any illegal purpose</li>
                <li style={s.listItem}>Interfere with the platform's security features or functionality</li>
                <li style={s.listItem}>Engage in automated data collection (scraping, bots, crawlers)</li>
                <li style={s.listItem}>Upload viruses, malware, or malicious code</li>
                <li style={s.listItem}>Attempt to gain unauthorized access to our systems</li>
                <li style={s.listItem}>Use the platform in any way that could damage or overburden our servers</li>
              </ul>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Intellectual Property</h2>
              <p style={s.paragraph}>
                All content on Nomad, including text, graphics, logos, images, and software, is the property
                of Nomad or its content suppliers and is protected by international copyright laws. Our
                trademarks and trade dress may not be used without prior written consent.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Disclaimer of Warranties</h2>
              <p style={s.paragraph}>
                Nomad's services are provided "as is" without warranties of any kind, either express or implied.
                We do not warrant that:
              </p>
              <ul style={s.list}>
                <li style={s.listItem}>The service will be uninterrupted or error-free</li>
                <li style={s.listItem}>Results obtained will be accurate or reliable</li>
                <li style={s.listItem}>The quality of services will meet your expectations</li>
                <li style={s.listItem}>Any errors in the software will be corrected</li>
              </ul>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Limitation of Liability</h2>
              <p style={s.paragraph}>
                To the maximum extent permitted by law, Nomad shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including loss of profits, data, or other intangible
                losses resulting from your use of our services.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Indemnification</h2>
              <p style={s.paragraph}>
                You agree to indemnify and hold Nomad harmless from any claims, damages, losses, liabilities,
                and expenses arising from your use of the service or violation of these terms.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Governing Law</h2>
              <p style={s.paragraph}>
                These Terms shall be governed by and construed in accordance with the laws of India,
                without regard to its conflict of law provisions.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Changes to Terms</h2>
              <p style={s.paragraph}>
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes by posting the new Terms of Service on this page and updating the "Last updated" date.
                Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div style={s.section}>
              <h2 style={s.sectionTitle}>Contact Information</h2>
              <p style={s.paragraph}>
                If you have any questions about these Terms of Service, please contact Jayden Ferrao
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
