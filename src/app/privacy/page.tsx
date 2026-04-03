import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Purview",
  description: "Purview's privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "https://getpurview.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-text-main px-6 py-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Privacy Policy</h1>
      <p className="text-text-muted">
        Our privacy policy is being finalized. For questions, contact{" "}
        <a href="mailto:nikolas@getpurview.com" className="text-primary hover:underline">
          nikolas@getpurview.com
        </a>
        .
      </p>
    </div>
  );
}
