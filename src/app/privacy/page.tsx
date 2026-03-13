import type { Metadata } from "next";
import LegalPage from "./PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Nomad",
  description: "Learn how Nomad collects, uses, and protects your personal information.",
};

export default function Page() {
  return <LegalPage />;
}
