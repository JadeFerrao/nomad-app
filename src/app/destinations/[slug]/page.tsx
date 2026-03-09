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
                     <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" style={{ marginTop: "4px" }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-3xl)", color: "var(--color-white)", lineHeight: 1.15 }}>Where<br/>to Stay</h4>
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
              <div style={s.statRow}><span style={s.statLabel}>Curation</span><span style={s.statValue}>Nomad Verified</span></div>

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
