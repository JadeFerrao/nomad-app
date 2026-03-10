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

const NomadBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5283 1.5999C11.7686 1.29437 12.2314 1.29437 12.4717 1.5999L14.2805 3.90051C14.4309 4.09173 14.6818 4.17325 14.9158 4.10693L17.7314 3.3089C18.1054 3.20292 18.4799 3.475 18.4946 3.86338L18.6057 6.78783C18.615 7.03089 18.77 7.24433 18.9984 7.32823L21.7453 8.33761C22.1101 8.47166 22.2532 8.91189 22.0368 9.23478L20.4078 11.666C20.2724 11.8681 20.2724 12.1319 20.4078 12.334L22.0368 14.7652C22.2532 15.0881 22.1101 15.5283 21.7453 15.6624L18.9984 16.6718C18.77 16.7557 18.615 16.9691 18.6057 17.2122L18.4946 20.1366C18.4799 20.525 18.1054 20.7971 17.7314 20.6911L14.9158 19.8931C14.6818 19.8267 14.4309 19.9083 14.2805 20.0995L12.4717 22.4001C12.2314 22.7056 11.7686 22.7056 11.5283 22.4001L9.71949 20.0995C9.56915 19.9083 9.31823 19.8267 9.08421 19.8931L6.26856 20.6911C5.89463 20.7971 5.52014 20.525 5.50539 20.1366L5.39427 17.2122C5.38503 16.9691 5.22996 16.7557 5.00164 16.6718L2.25467 15.6624C1.88986 15.5283 1.74682 15.0881 1.96317 14.7652L3.59221 12.334C3.72761 12.1319 3.72761 11.8681 3.59221 11.666L1.96317 9.23478C1.74682 8.91189 1.88986 8.47166 2.25467 8.33761L5.00165 7.32823C5.22996 7.24433 5.38503 7.03089 5.39427 6.78783L5.50539 3.86338C5.52014 3.475 5.89463 3.20292 6.26857 3.3089L9.08421 4.10693C9.31823 4.17325 9.56915 4.09173 9.71949 3.90051L11.5283 1.5999Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
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

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      // Create a temporary container with the itinerary content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '800px';
      tempContainer.style.background = '#fff';
      tempContainer.style.padding = '40px';
      tempContainer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      tempContainer.style.color = '#111';
      tempContainer.style.lineHeight = '1.6';

      // Build the content
      tempContainer.innerHTML = `
        <div style="max-width: 720px;">
          <h2 style="font-size: 32px; font-weight: 700; margin-bottom: 8px; color: #111;">
            Trip to ${data.name}
          </h2>
          <p style="font-size: 16px; color: #666; margin-bottom: 32px;">
            ${displayDays.length} Days Itinerary — Curated just for you
          </p>
          
          <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 24px; margin-bottom: 40px;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
                Total Estimated Budget (Incl. Flights)
              </span>
              <div style="font-size: 28px; font-weight: 700; color: #111; margin-bottom: 16px;">
                ${data.total_budget || "Calculated on request"}
              </div>
              
              <div style="background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Approx Flights (${people} Flyers)</span>
                  <span style="color: #c8a55a; font-weight: 600;">${data.approx_flight_budget || "—"}</span>
                </div>
                <p style="font-size: 12px; color: #666; font-style: italic;">
                  *Flight prices are indicative and vary by airline.
                </p>
              </div>
              
              <p style="font-size: 12px; color: #666; margin-top: 16px;">
                *Estimated based on your selected "${tierLabels[selections.stay]}" stay and transportation.
              </p>
            </div>
            
            <div>
              <span style="font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
                Travel Essentials
              </span>
              <ul style="list-style: none; padding: 0;">
                ${(data.requirements || ["Check your local visa entry requirements", "Travel insurance is highly recommended", "Currency exchange available at city center"]).map((req: string) => 
                  `<li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 14px; color: #444;">
                    <span style="color: #28a745; font-weight: bold;">✓</span>
                    ${req}
                  </li>`
                ).join('')}
              </ul>
            </div>
          </div>
          
          ${displayDays.map((day: any, i: number) => `
            <div style="margin-bottom: 40px; page-break-inside: avoid;">
              <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #e9ecef;">
                <span style="font-size: 18px; font-weight: 700; color: #c8a55a; margin-right: 12px;">Day ${i + 1}</span>
                <span style="font-size: 20px; font-weight: 600; color: #111;">${day.title}</span>
              </div>
              
              ${day.description ? `<p style="font-size: 14px; color: #666; margin-bottom: 20px; line-height: 1.6;">${day.description}</p>` : ''}
              
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${categories.map((cat) => {
                  const tier = selections[cat];
                  const item = day[cat][tier];
                  const categoryColors = {
                    stay: '#28a745',
                    eat: '#fd7e14', 
                    explore: '#6f42c1'
                  };
                  
                  return `
                    <div style="display: flex; background: #fff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <div style="width: 80px; height: 80px; background: #f0f0f0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">
                        IMG
                      </div>
                      <div style="padding: 16px; flex: 1;">
                        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; color: ${categoryColors[cat]};">
                          ${categoryLabels[cat]}
                        </div>
                        <div style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 4px;">
                          ${item.name}
                        </div>
                        <div style="font-size: 14px; font-weight: 600; color: #c8a55a;">
                          ${item.price}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;

      document.body.appendChild(tempContainer);

      // Convert to canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin

      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20); // Account for margins

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }

      // Download the PDF
      const fileName = `${data.name.replace(/[^a-zA-Z0-9]/g, '-')}-${displayDays.length}-Days-Itinerary.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print dialog
      window.print();
    }
    // Create a new window with only the itinerary content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the itinerary content
    const itineraryElement = document.getElementById('itinerary');
    if (!itineraryElement) return;

    // Create the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Trip to ${data.name} - ${displayDays.length} Days Itinerary</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #111;
              background: #fff;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            
            .no-print, button, .mix-badges-container {
              display: none !important;
            }
            
            h2 {
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 8px;
              color: #111;
            }
            
            .header-sub {
              font-size: 16px;
              color: #666;
              margin-bottom: 32px;
            }
            
            .summary-card {
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 40px;
              display: flex;
              gap: 32px;
            }
            
            .summary-section {
              flex: 1;
            }
            
            .summary-label {
              font-size: 14px;
              font-weight: 600;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
              display: block;
            }
            
            .total-price {
              font-size: 28px;
              font-weight: 700;
              color: #111;
              margin-bottom: 16px;
            }
            
            .flight-info {
              background: #fff;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 16px;
              margin-top: 16px;
            }
            
            .flight-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            
            .flight-note {
              font-size: 12px;
              color: #666;
              font-style: italic;
            }
            
            .req-list {
              list-style: none;
            }
            
            .req-item {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 12px;
              font-size: 14px;
              color: #444;
            }
            
            .req-item::before {
              content: "✓";
              color: #28a745;
              font-weight: bold;
              flex-shrink: 0;
            }
            
            .day-card {
              margin-bottom: 40px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .day-header {
              margin-bottom: 16px;
              padding-bottom: 12px;
              border-bottom: 2px solid #e9ecef;
            }
            
            .day-number {
              font-size: 18px;
              font-weight: 700;
              color: #c8a55a;
              margin-right: 12px;
            }
            
            .day-title {
              font-size: 20px;
              font-weight: 600;
              color: #111;
            }
            
            .day-description {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
              line-height: 1.6;
            }
            
            .day-items {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            
            .item-card {
              display: flex;
              background: #fff;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .item-image {
              width: 80px;
              height: 80px;
              object-fit: cover;
              flex-shrink: 0;
            }
            
            .item-info {
              padding: 16px;
              flex: 1;
            }
            
            .item-category {
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            
            .item-category.stay { color: #28a745; }
            .item-category.eat { color: #fd7e14; }
            .item-category.explore { color: #6f42c1; }
            
            .item-name {
              font-size: 16px;
              font-weight: 600;
              color: #111;
              margin-bottom: 4px;
            }
            
            .item-price {
              font-size: 14px;
              font-weight: 600;
              color: #c8a55a;
            }
            
            @media print {
              body { padding: 20px; }
              .day-card { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
    `);

    // Add the content
    printWindow.document.write(`
      <div>
        <h2>Trip to ${data.name}</h2>
        <p class="header-sub">${displayDays.length} Days Itinerary — Curated just for you</p>
        
        <div class="summary-card">
          <div class="summary-section">
            <span class="summary-label">Total Estimated Budget (Incl. Flights)</span>
            <div class="total-price">${data.total_budget || "Calculated on request"}</div>
            
            <div class="flight-info">
              <div class="flight-row">
                <span>Approx Flights (${people} Flyers)</span>
                <span style="color: #c8a55a; font-weight: 600;">${data.approx_flight_budget || "—"}</span>
              </div>
              <p class="flight-note">*Flight prices are indicative and vary by airline.</p>
            </div>
            
            <p style="font-size: 12px; color: #666; margin-top: 16px;">
              *Estimated based on your selected "${tierLabels[selections.stay]}" stay and transportation.
            </p>
          </div>
          
          <div class="summary-section">
            <span class="summary-label">Travel Essentials</span>
            <ul class="req-list">
              ${(data.requirements || ["Check your local visa entry requirements", "Travel insurance is highly recommended", "Currency exchange available at city center"]).map((req: string) => 
                `<li class="req-item">${req}</li>`
              ).join('')}
            </ul>
          </div>
        </div>
    `);

    // Add each day
    displayDays.forEach((day: any, i: number) => {
      printWindow.document.write(`
        <div class="day-card">
          <div class="day-header">
            <span class="day-number">Day ${i + 1}</span>
            <span class="day-title">${day.title}</span>
          </div>
          
          ${day.description ? `<p class="day-description">${day.description}</p>` : ''}
          
          <div class="day-items">
      `);

      categories.forEach((cat) => {
        const tier = selections[cat];
        const item = day[cat][tier];
        const categoryColors = {
          stay: '#28a745',
          eat: '#fd7e14', 
          explore: '#6f42c1'
        };
        
        printWindow.document.write(`
          <div class="item-card">
            <img src="${item.image}" alt="${item.name}" class="item-image" />
            <div class="item-info">
              <div class="item-category ${cat}" style="color: ${categoryColors[cat]}">
                ${categoryLabels[cat]}
              </div>
              <div class="item-name">${item.name}</div>
              <div class="item-price">${item.price}</div>
            </div>
          </div>
        `);
      });

      printWindow.document.write(`
          </div>
        </div>
      `);
    });

    printWindow.document.write(`
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    
    // Wait for images to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };


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
      <div style={st.container} className="itinerary-container">

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
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative'
            }}>
              <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center' }}>
                <NomadBadge />
              </span>
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

          <button
            onClick={handleDownloadPDF}
            className="no-print"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: 'var(--space-6)',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'var(--color-white)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <DownloadIcon />
            Download as PDF
          </button>

          {/* Mix badges */}
          <div style={st.mixBadges} className="mix-badges-container">

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
            <div style={{ ...st.totalPrice, color: isRecalculating ? 'var(--color-silver)' : 'var(--color-white)', transition: 'color 0.3s' }}>
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

              <a
                href="https://www.skyscanner.net/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: 'var(--space-4)',
                  padding: '10px',
                  background: '#0b8af9ff', // Skyscanner cyan
                  color: '#000',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
              >
                <img src="/skyscanner.svg" alt="Skyscanner" style={{ height: 16 }} />
                {/* Compare Flights on Skyscanner */}
              </a>
            </div>

            <p style={{ color: 'var(--color-ash)', fontSize: '12px', marginTop: 'var(--space-4)', fontFamily: 'var(--font-sans)' }}>
              *Estimated based on your selected "{tierLabels[selections.stay]}" stay and transportation.
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <span style={st.summaryLabel}>Travel Essentials</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.8 }}>
              </div>
            </div>
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
              className="day-card"

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
              <div style={{ ...st.dayHeader, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                  <span style={st.dayNumber}>Day {i + 1}</span>
                  <span style={st.dayTitle}>{day.title}</span>
                </div>
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
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80';
                        }}
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

        @media print {
          /* Hide non-essential elements */
          nav, footer, .no-print, button, .mix-badges-container {
            display: none !important;
          }

          /* Force clean background and layout */
          body, #itinerary {
            background: #fff !important;
            color: #111 !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          #itinerary {
            min-height: auto !important;
          }
          
          .itinerary-container {
             max-width: 100% !important;
             margin: 0 !important;
             padding: 40px !important;
          }

          /* Single column for print */
          .itinerary-day-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }

          /* Aesthetic card replacements for print */
          [style*="background: rgba(255, 255, 255, 0.03)"],
          [style*="background:rgba(255, 255, 255, 0.03)"],
          [style*="rgba(255,255,255,0.05)"] {
            background: #fdfdfd !important;
            border-color: #ddd !important;
            border-radius: 12px !important;
            box-shadow: none !important;
          }

          /* Text colors for legibility */
          h2, h3, span, p, li {
            color: #111 !important;
            text-shadow: none !important;
          }

          [style*="var(--color-white)"] {
            color: #111 !important;
          }

          [style*="var(--color-ash)"],
          [style*="var(--color-silver)"] {
            color: #444 !important;
          }

          [style*="var(--color-accent)"] {
            color: #c8a55a !important; /* Force a dark gold for print */
          }

          /* Timeline line adjustments */
          [style*="linear-gradient"] {
             background: #c8a55a !important;
          }

          /* Ensure images and colors show up */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .day-card {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 40px !important;
          }

          img {
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

    </section>
  );
}
