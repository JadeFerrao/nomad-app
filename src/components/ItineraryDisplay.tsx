"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── SVG Icons ── */
const StayIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4z" />
    <path d="M9 3h6l3 4H6l3-4z" />
  </svg>
);

const EatIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const ExploreIconSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const PencilIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 4px rgba(78, 205, 196, 0.4))' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#4ecdc4" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Types ── */
type BudgetTier = "budget" | "mid" | "luxury";

interface BudgetSelections {
  stay: BudgetTier;
  eat: BudgetTier;
  explore: BudgetTier;
}

interface ItineraryDisplayProps {
  destination: string;
  days: number;
  selections: BudgetSelections;
  aiItinerary?: any;
  currency: string;
  people: number;
}

/* ── Itinerary Data ── */
const destinationData: Record<
  string,
  {
    name: string;
    image: string;
    days: Array<{
      title: string;
      stay: Record<BudgetTier, { name: string; image: string; price: string }>;
      eat: Record<BudgetTier, { name: string; image: string; price: string }>;
      explore: Record<BudgetTier, { name: string; image: string; price: string }>;
    }>;
  }
> = {
  paris: {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    days: [
      {
        title: "Arrival & Montmartre",
        stay: {
          budget: { name: "Generator Paris Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$35/night" },
          mid: { name: "Hôtel des Arts Montmartre", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$120/night" },
          luxury: { name: "Terrass Hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$350/night" },
        },
        eat: {
          budget: { name: "Marché d'Aligre Street Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$8" },
          mid: { name: "Café des Deux Moulins", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$25" },
          luxury: { name: "Le Meurice Alain Ducasse", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$180" },
        },
        explore: {
          budget: { name: "Walk Sacré-Cœur & Artist Square", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Montmartre Walking Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$30" },
          luxury: { name: "Private Art Tour with Historian", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$200" },
        },
      },
      {
        title: "The Eiffel Tower & Seine",
        stay: {
          budget: { name: "St Christopher's Inn", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$30/night" },
          mid: { name: "Hôtel Le Compostelle", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$110/night" },
          luxury: { name: "Shangri-La Paris", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$500/night" },
        },
        eat: {
          budget: { name: "Rue Cler Market", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$10" },
          mid: { name: "Les Ombres", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$45" },
          luxury: { name: "Le Jules Verne", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$250" },
        },
        explore: {
          budget: { name: "Seine River Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Seine River Cruise", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$20" },
          luxury: { name: "Private Yacht on the Seine", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$400" },
        },
      },
      {
        title: "The Louvre & Le Marais",
        stay: {
          budget: { name: "MIJE Le Marais Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$40/night" },
          mid: { name: "Hôtel Jeanne d'Arc", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$130/night" },
          luxury: { name: "Le Pavillon de la Reine", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$420/night" },
        },
        eat: {
          budget: { name: "L'As du Fallafel", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$7" },
          mid: { name: "Breizh Café", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$22" },
          luxury: { name: "Le Grand Véfour", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$200" },
        },
        explore: {
          budget: { name: "Free Louvre (First Sunday)", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Skip-the-Line Louvre Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$50" },
          luxury: { name: "Private Curator-Led Louvre Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$350" },
        },
      },
      {
        title: "Versailles Day Trip",
        stay: {
          budget: { name: "Same hostel (Le Marais)", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$40/night" },
          mid: { name: "Same hotel (Jeanne d'Arc)", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$130/night" },
          luxury: { name: "Trianon Palace Versailles", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$450/night" },
        },
        eat: {
          budget: { name: "Pack a picnic from Monoprix", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$8" },
          mid: { name: "Ore by Alain Ducasse", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$55" },
          luxury: { name: "Gordon Ramsay au Trianon", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$220" },
        },
        explore: {
          budget: { name: "Self-Guided Palace Ground Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "€10" },
          mid: { name: "Audio-Guided Palace Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$35" },
          luxury: { name: "Private Royal Experience Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$500" },
        },
      },
      {
        title: "Saint-Germain & Departure",
        stay: {
          budget: { name: "Young & Happy Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$32/night" },
          mid: { name: "Hôtel d'Aubusson", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$180/night" },
          luxury: { name: "Hôtel Lutetia", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$550/night" },
        },
        eat: {
          budget: { name: "Crêpe from a street vendor", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$5" },
          mid: { name: "Café de Flore", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$30" },
          luxury: { name: "L'Ambroisie", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$300" },
        },
        explore: {
          budget: { name: "Luxembourg Gardens Stroll", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Shakespeare & Co. Book Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$15" },
          luxury: { name: "Private Shopping with Stylist", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$300" },
        },
      },
    ],
  },
  tokyo: {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    days: [
      {
        title: "Arrival & Shibuya",
        stay: {
          budget: { name: "Capsule Hotel Shibuya", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$25/night" },
          mid: { name: "Shibuya Stream Hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$150/night" },
          luxury: { name: "The Cerulean Tower", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$400/night" },
        },
        eat: {
          budget: { name: "Genki Sushi (kaiten)", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$10" },
          mid: { name: "Afuri Ramen (Ebisu)", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$18" },
          luxury: { name: "Sukiyabashi Jiro Omakase", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$300" },
        },
        explore: {
          budget: { name: "Shibuya Crossing & Hachiko", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Guided Street Culture Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$40" },
          luxury: { name: "Private Night Tour + VIP Access", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$250" },
        },
      },
      {
        title: "Asakusa & Akihabara",
        stay: {
          budget: { name: "Khaosan Tokyo Kabuki", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$28/night" },
          mid: { name: "Gate Hotel Asakusa", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$130/night" },
          luxury: { name: "Hoshinoya Tokyo", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$550/night" },
        },
        eat: {
          budget: { name: "Nakamise-dori Street Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$8" },
          mid: { name: "Sometaro Okonomiyaki", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$20" },
          luxury: { name: "Kagurazaka Ishikawa (Kaiseki)", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$250" },
        },
        explore: {
          budget: { name: "Sensoji Temple & Gardens", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Akihabara Anime Walking Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$35" },
          luxury: { name: "Private Rickshaw & Tea Ceremony", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$300" },
        },
      },
      {
        title: "Harajuku & Shinjuku",
        stay: {
          budget: { name: "Book And Bed Tokyo", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$30/night" },
          mid: { name: "Hotel Gracery Shinjuku", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$140/night" },
          luxury: { name: "Park Hyatt Tokyo", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$600/night" },
        },
        eat: {
          budget: { name: "Takeshita Street Crêpes", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$6" },
          mid: { name: "Kawaii Monster Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$30" },
          luxury: { name: "New York Grill (Park Hyatt)", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$150" },
        },
        explore: {
          budget: { name: "Meiji Shrine & Yoyogi Park", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Robot Restaurant Show", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$55" },
          luxury: { name: "Private Fashion Tour + Shopping", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$350" },
        },
      },
    ],
  },
  bali: {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    days: [
      {
        title: "Arrival & Ubud",
        stay: {
          budget: { name: "Puri Garden Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$12/night" },
          mid: { name: "Bisma Eight Ubud", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$90/night" },
          luxury: { name: "Four Seasons Sayan", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$700/night" },
        },
        eat: {
          budget: { name: "Warung Biah Biah", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$3" },
          mid: { name: "Locavore To Go", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$15" },
          luxury: { name: "Aperitif Restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$120" },
        },
        explore: {
          budget: { name: "Tegallalang Rice Terraces Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "$2" },
          mid: { name: "Ubud Cycling & Culture Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$40" },
          luxury: { name: "Private Helicopter Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$500" },
        },
      },
      {
        title: "Temples & Beaches",
        stay: {
          budget: { name: "Seminyak Beach Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$15/night" },
          mid: { name: "The Haven Bali", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$80/night" },
          luxury: { name: "The Mulia Nusa Dua", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$500/night" },
        },
        eat: {
          budget: { name: "Jimbaran Bay Seafood Warungs", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$5" },
          mid: { name: "Sardine Restaurant", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$25" },
          luxury: { name: "Soleil at Mulia", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$100" },
        },
        explore: {
          budget: { name: "Tanah Lot Temple Visit", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "$3" },
          mid: { name: "Snorkeling Trip to Nusa Penida", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$50" },
          luxury: { name: "Private Catamaran Day Trip", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$400" },
        },
      },
    ],
  },
  rome: {
    name: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    days: [
      {
        title: "Arrival & Colosseum",
        stay: {
          budget: { name: "The Yellow Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$30/night" },
          mid: { name: "Hotel Raphael", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$160/night" },
          luxury: { name: "Hotel de Russie", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$500/night" },
        },
        eat: {
          budget: { name: "Supplizio (fried suppli)", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$6" },
          mid: { name: "Da Enzo al 29 Trastevere", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$28" },
          luxury: { name: "La Pergola (3 Michelin Stars)", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$280" },
        },
        explore: {
          budget: { name: "Walk the Roman Forum", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Skip-the-Line Colosseum Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$45" },
          luxury: { name: "Private After-Hours Colosseum", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$400" },
        },
      },
      {
        title: "Vatican & Trastevere",
        stay: {
          budget: { name: "Alessandro Downtown Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$28/night" },
          mid: { name: "Hotel Santa Maria Trastevere", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$140/night" },
          luxury: { name: "Hotel Eden", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$600/night" },
        },
        eat: {
          budget: { name: "Pizzarium Bonci", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$8" },
          mid: { name: "Armando al Pantheon", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$35" },
          luxury: { name: "Il Pagliaccio", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$220" },
        },
        explore: {
          budget: { name: "St. Peter's Basilica (free entry)", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Vatican Museum Guided Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$55" },
          luxury: { name: "Private Sistine Chapel Access", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$500" },
        },
      },
    ],
  },
  nyc: {
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    days: [
      {
        title: "Manhattan & Times Square",
        stay: {
          budget: { name: "HI NYC Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$50/night" },
          mid: { name: "Arlo Midtown", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$200/night" },
          luxury: { name: "The Plaza Hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$800/night" },
        },
        eat: {
          budget: { name: "Joe's Pizza (Greenwich)", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$5" },
          mid: { name: "Chelsea Market Food Hall", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$25" },
          luxury: { name: "Le Bernardin", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$250" },
        },
        explore: {
          budget: { name: "Central Park & High Line Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Top of the Rock Tickets", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$40" },
          luxury: { name: "Private Helicopter Tour NYC", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$350" },
        },
      },
      {
        title: "Brooklyn & Culture",
        stay: {
          budget: { name: "NY Moore Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$45/night" },
          mid: { name: "The Williamsburg Hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$220/night" },
          luxury: { name: "1 Hotel Brooklyn Bridge", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$550/night" },
        },
        eat: {
          budget: { name: "Smorgasburg Market", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$12" },
          mid: { name: "The River Café", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$55" },
          luxury: { name: "Peter Luger Steak House", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$180" },
        },
        explore: {
          budget: { name: "Brooklyn Bridge Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Brooklyn Street Art Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$35" },
          luxury: { name: "Private Yacht Dinner Cruise", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$500" },
        },
      },
    ],
  },
  istanbul: {
    name: "Istanbul, Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    days: [
      {
        title: "Sultanahmet & Old City",
        stay: {
          budget: { name: "Cheers Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$15/night" },
          mid: { name: "Hotel Amira Istanbul", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$90/night" },
          luxury: { name: "Four Seasons Sultanahmet", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$450/night" },
        },
        eat: {
          budget: { name: "Simit & Çay from street cart", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$2" },
          mid: { name: "Karaköy Lokantası", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$18" },
          luxury: { name: "Mikla (rooftop by Mehmet Gürs)", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$120" },
        },
        explore: {
          budget: { name: "Hagia Sophia & Blue Mosque", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "$5" },
          mid: { name: "Guided Old City Walking Tour", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$30" },
          luxury: { name: "Private Ottoman Heritage Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$250" },
        },
      },
      {
        title: "Bosphorus & Grand Bazaar",
        stay: {
          budget: { name: "Agora Hostel", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$18/night" },
          mid: { name: "The Marmara Taksim", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$100/night" },
          luxury: { name: "Çırağan Palace Kempinski", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$600/night" },
        },
        eat: {
          budget: { name: "Balik Ekmek (fish sandwich boat)", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$3" },
          mid: { name: "Çiya Sofrası", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$15" },
          luxury: { name: "Sunset Grill & Bar", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$90" },
        },
        explore: {
          budget: { name: "Bosphorus Ferry (public)", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "$2" },
          mid: { name: "Bosphorus Cruise + Spice Bazaar", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$40" },
          luxury: { name: "Private Yacht Bosphorus Cruise", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$400" },
        },
      },
    ],
  },
  hokkaido: {
    name: "Hokkaido (North Japan)",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    days: [
      {
        title: "Sapporo Arrival & Ramen Alley",
        stay: {
          budget: { name: "The Stay Sapporo", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$40/night" },
          mid: { name: "Sapporo Grand Hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$140/night" },
          luxury: { name: "JR Tower Hotel Nikko", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$320/night" },
        },
        eat: {
          budget: { name: "Ganso Ramen Yokocho", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$9" },
          mid: { name: "Sapporo Beer Garden", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$35" },
          luxury: { name: "Moliere (3 Michelin Stars)", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$150" },
        },
        explore: {
          budget: { name: "Odori Park Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Sapporo TV Tower Observatory", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$10" },
          luxury: { name: "Private Snow Resort Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$400" },
        },
      },
    ],
  },
  mumbai: {
    name: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
    days: [
      {
        title: "Colaba & Gateway",
        stay: {
          budget: { name: "Backpacker Panda", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80", price: "$15/night" },
          mid: { name: "Abode Bombay", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", price: "$85/night" },
          luxury: { name: "Taj Mahal Palace", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80", price: "$450/night" },
        },
        eat: {
          budget: { name: "Bademiya Street Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", price: "$5" },
          mid: { name: "Leopold Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", price: "$20" },
          luxury: { name: "Wasabi by Morimoto", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: "$120" },
        },
        explore: {
          budget: { name: "Gateway of India Walk", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80", price: "Free" },
          mid: { name: "Elephanta Caves Boat Trip", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80", price: "$15" },
          luxury: { name: "Private South Bombay Art Tour", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80", price: "$200" },
        },
      },
    ],
  },
};

/* ── Styles ── */
const tierColors: Record<BudgetTier, string> = {
  budget: "var(--color-budget)",
  mid: "var(--color-mid)",
  luxury: "var(--color-luxury)",
};

const tierBgColors: Record<BudgetTier, string> = {
  budget: "var(--color-budget-bg)",
  mid: "var(--color-mid-bg)",
  luxury: "var(--color-luxury-bg)",
};

const tierLabels: Record<BudgetTier, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  luxury: "Luxury",
};

const categoryIcons: Record<string, React.ReactNode> = {
  stay: <StayIconSm />,
  eat: <EatIconSm />,
  explore: <ExploreIconSm />,
};

const categoryLabels: Record<string, string> = {
  stay: "Stay",
  eat: "Eat",
  explore: "Explore",
};

const st: Record<string, React.CSSProperties> = {
  section: {
    padding: "var(--space-24) 0",
    background: "var(--color-black)",
    minHeight: "50vh",
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "0 var(--space-6)",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "var(--space-12)",
  },
  headerLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    marginBottom: "var(--space-4)",
  },
  headerTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
    fontWeight: 600,
    color: "var(--color-white)",
    marginBottom: "var(--space-2)",
    letterSpacing: "-0.02em",
  },
  headerSub: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--color-silver)",
  },
  mixBadges: {
    display: "flex",
    justifyContent: "center",
    gap: "var(--space-3)",
    marginTop: "var(--space-6)",
    flexWrap: "wrap" as const,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2)",
    padding: "var(--space-2) var(--space-4)",
    borderRadius: "var(--radius-full)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: 500,
  },
  timeline: {
    position: "relative" as const,
    paddingLeft: 32,
  },
  summaryCard: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-8)",
    marginBottom: "var(--space-16)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "var(--space-8)",
    textAlign: "left" as const,
  },
  summaryLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    color: "var(--color-accent)",
    letterSpacing: "0.15em",
    marginBottom: "var(--space-4)",
    display: "block",
  },
  totalPrice: {
    fontFamily: "var(--font-serif)",
    fontSize: "2.5rem",
    color: "var(--color-white)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
  },
  reqList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-3)",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  reqItem: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--color-silver)",
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-3)",
    lineHeight: "1.5",
  },
  timelineLine: {
    position: "absolute" as const,
    left: 11,
    top: 15,
    bottom: 0,
    width: 1,
    background: "linear-gradient(180deg, var(--color-accent), transparent)",
  },
  dayCard: {
    position: "relative" as const,
    marginBottom: "var(--space-10)",
  },
  dayDot: {
    position: "absolute" as const,
    left: -28,
    top: 6,
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "var(--color-black)",
    border: "2px solid rgba(200, 165, 90, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  dayDotInner: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--color-accent)",
  },
  dayHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "var(--space-3)",
    marginBottom: "var(--space-4)",
  },
  dayNumber: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    fontWeight: 500,
    color: "var(--color-accent)",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  dayTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "var(--text-xl)",
    fontWeight: 500,
    color: "var(--color-white)",
  },
  dayItems: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--space-3)",
  },
  itemCard: {
    display: "flex",
    gap: "var(--space-4)",
    padding: "var(--space-4)",
    borderRadius: "var(--radius-lg)",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
    overflow: "hidden",
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: "var(--radius-md)",
    objectFit: "cover" as const,
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    gap: "var(--space-1)",
    minWidth: 0,
  },
  itemCategoryRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
  },
  itemCategoryLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  itemName: {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-white)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  itemPrice: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: "var(--color-accent)",
    fontWeight: 500,
  },
};

export default function ItineraryDisplay({ destination, days, selections, aiItinerary, currency, people }: ItineraryDisplayProps) {
  const [itineraryData, setItineraryData] = React.useState<any>(null);
  const [isRecalculating, setIsRecalculating] = React.useState(false);

  React.useEffect(() => {
    if (aiItinerary) {
      setItineraryData(aiItinerary);
    }
  }, [aiItinerary]);

  // Use AI generated data instead of hardcoded data
  const data = itineraryData;
  if (!data) return null;

  const recalculateBudget = async (updatedData: any) => {
    setIsRecalculating(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          mode: 'recalculate',
          itinerary: updatedData,
          currency,
          people
        }),
      });
      const result = await response.json();
      if (result.total_budget) {
        setItineraryData({ ...updatedData, total_budget: result.total_budget, approx_flight_budget: result.approx_flight_budget });
      }
    } catch (err) {
      console.error("Recalculation error:", err);
    } finally {
      setIsRecalculating(false);
    }
  };

  const handleEdit = (e: React.MouseEvent, dayIndex: number, category: string, currentItem: any) => {
    e.stopPropagation();
    const newName = window.prompt(`Edit ${category} for Day ${dayIndex + 1}:`, currentItem.name);
    if (newName && newName !== currentItem.name) {
      const newData = { ...itineraryData };
      const tier = selections[category as keyof BudgetSelections];
      newData.days[dayIndex][category][tier].name = newName;
      // Also update location_url to be safe
      newData.days[dayIndex][category][tier].location_url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newName)}`;
      setItineraryData(newData);
      recalculateBudget(newData);
    }
  };

  // The generated data should already have exactly the right amount of days
  const displayDays = data.days.slice(0, days).map((dayData: any, i: number) => {
    return { ...dayData, number: i + 1 };
  });
  const categories: Array<"stay" | "eat" | "explore"> = ["stay", "eat", "explore"];

  return (
    <section id="itinerary" style={st.section}>
      <div style={st.container}>
        {/* Header */}
        <motion.div
          style={st.header}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <span style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '10px', 
              fontWeight: 700, 
              color: 'var(--color-ash)', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>CURATION</span>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <VerifiedIcon />
              <span style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: 'var(--color-white)',
                letterSpacing: '0.02em'
              }}>Nomad Verified</span>
            </div>
          </div>
          <h2 style={st.headerTitle}>
            {data.name}
          </h2>
          <p style={st.headerSub}>{displayDays.length} Days Itinerary — Curated just for you</p>

          {/* Mix badges */}
          <div style={st.mixBadges}>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  ...st.badge,
                  background: tierBgColors[selections[cat]],
                  color: tierColors[selections[cat]],
                  border: `1px solid ${tierColors[selections[cat]]}30`,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>{categoryIcons[cat]}</span> {categoryLabels[cat]}: {tierLabels[selections[cat]]}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          style={st.summaryCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ flex: 1.2 }}>
            <span style={st.summaryLabel}>Total Estimated Budget (Incl. Flights)</span>
            <div style={{...st.totalPrice, color: isRecalculating ? 'var(--color-silver)' : 'var(--color-white)', transition: 'color 0.3s'}}>
              {isRecalculating ? "Recalculating..." : (data.total_budget || "Calculated on request")}
            </div>
            
            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)' }}>Approx Flights ({people} Flyers)</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>{data.approx_flight_budget || "—"}</span>
              </div>
              <p style={{ color: 'var(--color-ash)', fontSize: '11px', marginTop: '4px', fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                *Flight prices are indicative and vary by airline.
              </p>
            </div>

            <p style={{ color: 'var(--color-ash)', fontSize: '12px', marginTop: 'var(--space-4)', fontFamily: 'var(--font-sans)' }}>
              *Estimated based on your selected "{tierLabels[selections.stay]}" stay and transportation.
            </p>
          </div>
          
          <div>
            <span style={st.summaryLabel}>Travel Requirements & Tips</span>
            <ul style={st.reqList}>
              {(data.requirements || ["Check your local visa entry requirements", "Travel insurance is highly recommended", "Currency exchange available at city center"]).map((req: string, idx: number) => (
                <li key={idx} style={st.reqItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Timeline */}
        <div style={st.timeline}>
          <div style={st.timelineLine} />
          {displayDays.map((day: any, i: number) => (
            <motion.div
              key={i}
              style={st.dayCard}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Timeline dot */}
              <div style={st.dayDot}>
                <div style={st.dayDotInner} />
              </div>

              {/* Day header */}
              <div style={st.dayHeader}>
                <span style={st.dayNumber}>Day {i + 1}</span>
                <span style={st.dayTitle}>{day.title}</span>
              </div>

              {/* Day Description (Flights, Transit, etc) */}
              {day.description && (
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: 'var(--color-silver)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-6)',
                  maxWidth: '700px',
                  opacity: 0.8
                }}>
                  {day.description}
                </p>
              )}

              {/* Day items */}
              <div style={st.dayItems} className="itinerary-day-grid">
                {categories.map((cat) => {
                  const tier = selections[cat];
                  const item = day[cat][tier];
                  return (
                    <motion.div
                      key={cat}
                      style={{ ...st.itemCard, cursor: 'pointer' }}
                      whileHover={{
                        borderColor: `${tierColors[tier]}40`,
                        y: -2,
                        boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
                      }}
                      onClick={() => {
                        const url = item.location_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`;
                        window.open(url, "_blank");
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={st.itemImage}
                        loading="lazy"
                      />
                      <div style={st.itemInfo}>
                        <div style={st.itemCategoryRow}>
                          <span style={{ color: tierColors[tier], display: 'flex' }}>{categoryIcons[cat]}</span>
                          <span style={{ ...st.itemCategoryLabel, color: tierColors[tier] }}>
                            {categoryLabels[cat]}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={st.itemName}>{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</span>
                          <button 
                            onClick={(e) => handleEdit(e, i, cat, item)}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              padding: 4, 
                              cursor: 'pointer', 
                              color: 'var(--color-silver)',
                              opacity: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <PencilIcon />
                          </button>
                        </div>
                        <span style={st.itemPrice}>{item.price}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .itinerary-day-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
