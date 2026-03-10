"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { allDestinations } from "@/data/destinations";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

// Utility to generate hyper-relevant images using AI
const getImages = (type: "hl" | "fd" | "st", count: number, slug: string, specificPrompts: string[] = []) => {
  return Array.from({length: count}).map((_, i) => {
    let prompt = "";
    if (type === "hl") prompt = `${specificPrompts[i] || "landmark"} in ${slug} highly detailed 4k travel photography epic lighting`;
    else if (type === "fd") prompt = `${specificPrompts[i] || "local cuisine"} dish from ${slug} delicious professional food photography`;
    else prompt = `premium luxury boutique hotel or resort in ${slug} beautiful architectural photography`;
    
    // Pollinations AI generates real images on the fly via URL prompts
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${type === "fd" ? 600 : 1200}&height=${type === "fd" ? 600 : 800}&nologo=true&model=flux&seed=${slug.length}`;
  });
}

const NomadBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5283 1.5999C11.7686 1.29437 12.2314 1.29437 12.4717 1.5999L14.2805 3.90051C14.4309 4.09173 14.6818 4.17325 14.9158 4.10693L17.7314 3.3089C18.1054 3.20292 18.4799 3.475 18.4946 3.86338L18.6057 6.78783C18.615 7.03089 18.77 7.24433 18.9984 7.32823L21.7453 8.33761C22.1101 8.47166 22.2532 8.91189 22.0368 9.23478L20.4078 11.666C20.2724 11.8681 20.2724 12.1319 20.4078 12.334L22.0368 14.7652C22.2532 15.0881 22.1101 15.5283 21.7453 15.6624L18.9984 16.6718C18.77 16.7557 18.615 16.9691 18.6057 17.2122L18.4946 20.1366C18.4799 20.525 18.1054 20.7971 17.7314 20.6911L14.9158 19.8931C14.6818 19.8267 14.4309 19.9083 14.2805 20.0995L12.4717 22.4001C12.2314 22.7056 11.7686 22.7056 11.5283 22.4001L9.71949 20.0995C9.56915 19.9083 9.31823 19.8267 9.08421 19.8931L6.26856 20.6911C5.89463 20.7971 5.52014 20.525 5.50539 20.1366L5.39427 17.2122C5.38503 16.9691 5.22996 16.7557 5.00164 16.6718L2.25467 15.6624C1.88986 15.5283 1.74682 15.0881 1.96317 14.7652L3.59221 12.334C3.72761 12.1319 3.72761 11.8681 3.59221 11.666L1.96317 9.23478C1.74682 8.91189 1.88986 8.47166 2.25467 8.33761L5.00165 7.32823C5.22996 7.24433 5.38503 7.03089 5.39427 6.78783L5.50539 3.86338C5.52014 3.475 5.89463 3.20292 6.26857 3.3089L9.08421 4.10693C9.31823 4.17325 9.56915 4.09173 9.71949 3.90051L11.5283 1.5999Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


// ── Components ── //

const Slideshow = ({ items, images }: { items: string[], images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((idx + 1) % items.length);
  const prev = () => setIdx((idx - 1 + items.length) % items.length);
  
  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-2xl)", overflow: "hidden", height: 450, border: "1px solid rgba(255,255,255,0.06)" }}>
       <AnimatePresence mode="wait">
         <motion.img 
           key={idx}
           src={images[idx]} 
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.6 }}
           style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} 
         />
       </AnimatePresence>
       
       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)", pointerEvents: "none" }} />
       
       <div style={{ position: "absolute", bottom: "var(--space-8)", left: "var(--space-8)", right: "var(--space-8)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
         <div style={{ maxWidth: "70%" }}>
            <motion.div 
               key={`num-${idx}`}
               initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
               style={{ color: "var(--color-accent)", fontFamily: "var(--font-serif)", fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)", fontStyle: "italic" }}
            >
               0{idx + 1}
            </motion.div>
            <motion.h4 
               key={`title-${idx}`}
               initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
               style={{ color: "var(--color-white)", fontSize: "var(--text-3xl)", fontFamily: "var(--font-serif)", lineHeight: 1.2, fontWeight: 500 }}
            >
               {items[idx]}
            </motion.h4>
         </div>
         
         <div style={{ display: "flex", gap: "var(--space-3)" }}>
           <button onClick={prev} className="slide-btn" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
           </button>
           <button onClick={next} className="slide-btn" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
           </button>
         </div>
       </div>
    </div>
  )
}

// ── Styles ── //

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "var(--color-black)", paddingTop: 106 },
  hero: { position: "relative", width: "100%", height: "65vh", minHeight: 400, overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.1) 60%)" },
  heroContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--space-12) var(--space-6)", maxWidth: 1280, margin: "0 auto" },
  heroLabelWrap: { display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" },
  heroLabelLine: { width: 40, height: 1, background: "var(--color-accent)", opacity: 0.6 },
  heroLabel: { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)" },
  heroTitle: { fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: 600, lineHeight: 1.05, color: "var(--color-white)", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" },
  heroTagline: { fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontStyle: "italic", color: "var(--color-mist)", borderLeft: "2px solid rgba(200, 165, 90, 0.4)", paddingLeft: "var(--space-5)", maxWidth: 800 },
  mainContent: { maxWidth: 1280, margin: "0 auto", padding: "var(--space-20) var(--space-6) var(--space-32)", display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-16)" },
  article: { display: "flex", flexDirection: "column", gap: "var(--space-20)" },
  sectionTitle: { fontFamily: "var(--font-serif)", fontSize: "var(--text-4xl)", fontWeight: 500, color: "var(--color-white)", marginBottom: "var(--space-8)" },
  paragraph: { fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--color-mist)", lineHeight: 1.8, fontWeight: 300, marginBottom: "var(--space-6)" },
  sidebar: { display: "flex", flexDirection: "column", gap: "var(--space-12)" },
  glassPanel: { background: "rgba(26, 26, 26, 0.4)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "var(--radius-2xl)", padding: "var(--space-10)", position: "sticky", top: 140 },
  panelHeader: { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "var(--space-8)" },
  statRow: { display: "flex", flexDirection: "column", gap: 6, marginBottom: "var(--space-6)" },
  statLabel: { fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--color-ash)", textTransform: "uppercase", letterSpacing: "0.1em" },
  statValue: { fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--color-white)", fontWeight: 500 },
  panelDivider: { height: 1, background: "rgba(255, 255, 255, 0.06)", margin: "var(--space-8) 0" },
  ctaTitle: { fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)", fontStyle: "italic", color: "var(--color-white)", textAlign: "center", marginBottom: "var(--space-6)" },
  btnPrimary: { display: "block", width: "100%", textAlign: "center", padding: "var(--space-4)", background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))", color: "var(--color-black)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "var(--radius-xl)", textDecoration: "none" },
  
  // Custom refined block elements
  contentBlock: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "var(--radius-2xl)", padding: "var(--space-10)" },
  foodGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "var(--space-4)" },
  foodCard: { position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", height: 200, border: "1px solid rgba(255,255,255,0.08)" },
};

export default function DestinationArticle() {
  const { slug } = useParams();
  const dest = allDestinations.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={s.sectionTitle}>Destination not found</h1>
          <Link href="/destinations" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>Return to Destinations</Link>
        </div>
      </div>
    );
  }

  // Pre-generate deterministic images for this destination
  const hlItems = dest.visit || dest.highlights;
  const hlImages = getImages("hl", hlItems.length, dest.city, hlItems);
  
  const fdItems = dest.food || ["Local Cuisine"];
  const fdImages = getImages("fd", fdItems.length, dest.city, fdItems);
  
  const stImages = getImages("st", 1, dest.city);

  return (
    <>
      <Navbar />
      <Marquee />

      <div style={s.page}>
        <section style={s.hero}>
          <img src={dest.image} alt={dest.city} style={s.heroImg} />
          <div style={s.heroOverlay} />
          <div style={s.heroContent}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div style={s.heroLabelWrap}><div style={s.heroLabelLine} /><span style={s.heroLabel}>{dest.region} · {dest.country}</span></div>
              <h1 style={s.heroTitle}>{dest.city}</h1>
              <div style={s.heroTagline}>&quot;{dest.tagline}&quot;</div>
            </motion.div>
          </div>
        </section>

        <div style={s.mainContent} className="grid-layout">
          
          <div style={s.article}>
            
            <section style={s.contentBlock}>
              <h2 style={{...s.sectionTitle, marginBottom: "var(--space-6)"}}>Overview</h2>
              <p style={{...s.paragraph, marginBottom: 0}}>{dest.description}</p>
              {dest.articleContent && (
                <p style={{ ...s.paragraph, paddingTop: "var(--space-6)", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "var(--space-6)", marginBottom: 0 }}>
                  {dest.articleContent}
                </p>
              )}
            </section>

            <section>
              <h3 style={s.sectionTitle}>Must-Visit Experiences</h3>
              <Slideshow items={hlItems} images={hlImages} />
            </section>

            <section>
              <h3 style={s.sectionTitle}>Gastronomic Roots</h3>
              <div style={s.foodGrid}>
                {fdItems.map((f, i) => (
                  <div key={i} style={s.foodCard} className="hover-brightness">
                    <img src={fdImages[i]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={f} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)", padding: "var(--space-5)", display: "flex", alignItems: "flex-end" }}>
                       <span style={{ color: "var(--color-white)", fontSize: "var(--text-base)", fontWeight: 500, fontFamily: "var(--font-sans)", lineHeight: 1.3 }}>{f}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ ...s.contentBlock, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
               <div style={{ height: 350, width: "100%", position: "relative" }}>
                 <img src={stImages[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Stay" />
                 <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,1) 20%, rgba(10,10,10,0.4) 60%, transparent 100%)" }} />
                 <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--space-10)", zIndex: 10 }}>
                   <div style={{ display: "grid", gap: "var(--space-8)" }} className="stay-grid">
                     <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" style={{ marginTop: "4px" }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)", color: "var(--color-white)", lineHeight: 1.15 }}>Where to Stay</h4>
                     </div>
                     <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--color-cloud)", margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
                        {dest.stay || "Uncover the most authentic boutique hotels and unique stays vetted by our curators. Perfect for immersing yourself completely into the destination's vibe."}
                     </p>
                   </div>
                 </div>
               </div>
            </section>

          </div>

          <div style={s.sidebar}>
            <div style={s.glassPanel}>
              <div style={s.panelHeader}>Travel Essentials</div>
              
              <div style={s.statRow}><span style={s.statLabel}>Best Time to Visit</span><span style={s.statValue}>{dest.bestTime}</span></div>
              <div style={s.statRow}><span style={s.statLabel}>Average Daily Budget</span><span style={s.statValue}>{dest.avgBudget}</span></div>
              <div style={s.statRow}>
                <span style={s.statLabel}>Curation</span>
                <span style={{ ...s.statValue, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Nomad Verified
                  <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center' }}>
                    <NomadBadge />
                  </span>
                </span>
              </div>


              <div style={s.panelDivider} />

              <h5 style={s.ctaTitle}>Ready to explore?</h5>
              <Link href="/#planner" style={s.btnPrimary} className="hover-btn">Build Itinerary</Link>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        @media (min-width: 1024px) { .grid-layout { grid-template-columns: 1.8fr 1fr !important; } }
        @media (max-width: 767px) { .stay-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) { .stay-grid { grid-template-columns: 1fr 2fr !important; gap: var(--space-10) !important; align-items: center !important; } }
        .hover-card:hover { border-color: rgba(200, 165, 90, 0.4) !important; background: rgba(255, 255, 255, 0.05) !important; transform: translateY(-2px); }
        .hover-btn:hover { box-shadow: 0 0 24px rgba(200, 165, 90, 0.3); transform: translateY(-1px); }
        .slide-btn { width: 50px; height: 50px; border-radius: 25px; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; color: white; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.3s ease; }
        .slide-btn:hover { background: var(--color-accent); color: black; transform: scale(1.05); }
        .hover-brightness { transition: filter 0.3s ease; filter: brightness(0.85); }
        .hover-brightness:hover { filter: brightness(1.1); }
      `}</style>
    </>
  );
}
