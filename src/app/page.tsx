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
import { supabase } from "@/lib/supabase";

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
  people: number;
}

export default function Home() {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanTrip = async (destinations: string[], days: number, selections: BudgetSelections, currency: string, people: number) => {
    setIsLoading(true);
    setTripData(null);
    setItinerary(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-itinerary", {
        body: { destinations, days, selections, currency, people },
      });
      
      if (error) throw error;
      
      setTripData({ destinations, days, selections, people });
      setItinerary(data);

      // Scroll to itinerary after a short delay
      setTimeout(() => {
        const el = document.getElementById("itinerary");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Error calling Supabase Edge Function. Make sure 'generate-itinerary' is deployed and populated with GROQ_AI_API_KEY.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      <Marquee />
      <HeroSection />
      <FeaturesSection />
      <BudgetSelector onPlanTrip={handlePlanTrip} isLoading={isLoading} />

      <AnimatePresence>
        {tripData && itinerary && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ItineraryDisplay
              destination={tripData.destinations[0]}
              days={tripData.days}
              selections={tripData.selections}
              aiItinerary={itinerary}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
