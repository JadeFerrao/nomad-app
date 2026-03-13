import type { Metadata } from "next";
import TermsPage from "./TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service — Nomad",
  description: "Read the terms and conditions for using Nomad's travel planning services.",
};

export default function Page() {
  return <TermsPage />;
}
