"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BudgetSelector from "@/components/BudgetSelector";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import Footer from "@/components/Footer";

type BudgetTier = "budget" | "mid" | "luxury";

interface BudgetSelections {
  stay: BudgetTier;
  eat: BudgetTier;
  explore: BudgetTier;
}

interface TripData {
  destinations: string[];
  days: number;
  selections: BudgetSelections;
}

export default function Home() {
  const [tripData, setTripData] = useState<TripData | null>(null);

  const handlePlanTrip = (destinations: string[], days: number, selections: BudgetSelections) => {
    setTripData({ destinations, days, selections });

    // Scroll to itinerary after a short delay
    setTimeout(() => {
      const el = document.getElementById("itinerary");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main>
      <Navbar />
      <Marquee />
      <HeroSection />
      <FeaturesSection />
      <BudgetSelector onPlanTrip={handlePlanTrip} />

      <AnimatePresence>
        {tripData && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ItineraryDisplay
              destination={tripData.destinations[0]} // Temp fallback for display
              days={tripData.days}
              selections={tripData.selections}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
