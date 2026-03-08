import type { Metadata } from "next";
import DestinationsPage from "../destinations/DestinationsPage";

export const metadata: Metadata = {
  title: "Destinations — Nomad | Curated Travel Guides",
  description:
    "Explore our curated travel guides for the world's most inspiring destinations. From Paris to Tokyo, find your next adventure with Nomad.",
};

export default function Page() {
  return <DestinationsPage />;
}
