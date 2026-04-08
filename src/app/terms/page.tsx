import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Purview",
  description: "Purview's terms of service — usage terms and conditions for our privacy compliance platform.",
  alternates: {
    canonical: "https://getpurview.com/terms",
    types: {
      "text/markdown": "https://getpurview.com/terms.md",
    },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main px-6 py-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Terms of Service</h1>
      <p className="text-text-muted">
        Our terms of service are being finalized. For questions, contact{" "}
        <a href="mailto:nikolas@getpurview.com" className="text-primary hover:underline">
          nikolas@getpurview.com
        </a>
        .
      </p>
    </div>
  );
}
