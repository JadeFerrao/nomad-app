import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad — Travel Reimagined | Curated Itinerary Planner",
  description:
    "Craft your perfect journey with Nomad. Mix luxury stays with street food adventures. Curated itineraries for 150+ destinations, tailored to your budget and style.",
  keywords: [
    "travel planner",
    "itinerary generator",
    "trip planner",
    "travel budget",
    "luxury travel",
    "backpacking",
    "curated travel",
  ],
  openGraph: {
    title: "Nomad — Travel Reimagined",
    description:
      "Mix & match budget tiers for stays, food, and experiences. Plan your dream trip in seconds.",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
