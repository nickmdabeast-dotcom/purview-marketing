import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Tag } from "lucide-react";

import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "State Privacy Law Guides | Purview",
  description:
    "Comprehensive compliance guides for all 20 US state privacy laws. Find out what applies to your business — revenue thresholds, penalties, and action checklists.",
  alternates: {
    canonical: "https://getpurview.com/guides",
    types: {
      "text/markdown": "https://getpurview.com/guides.md",
    },
  },
  openGraph: {
    title: "State Privacy Law Guides — Purview",
    description:
      "Comprehensive compliance guides for all 20 US state privacy laws. Find out what applies to your business.",
    type: "website",
    url: "https://getpurview.com/guides",
    siteName: "Purview",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Purview State Privacy Law Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "State Privacy Law Guides — Purview",
    description:
      "Comprehensive compliance guides for all 20 US state privacy laws.",
    images: ["/og-image.png"],
  },
};

export default function GuidesIndexPage() {
  // Guides are reference material, not chronological — sort alphabetically by title.
  const guides = getAllGuides().sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "State Privacy Law Guides",
    description:
      "Comprehensive compliance guides for all 20 US state privacy laws.",
    url: "https://getpurview.com/guides",
    publisher: {
      "@type": "Organization",
      name: "Purview",
      url: "https://getpurview.com",
    },
    hasPart: guides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.datePublished,
      author: { "@type": "Person", name: guide.author },
      url: `https://getpurview.com/guides/${guide.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />

      <div className="min-h-screen bg-bg relative overflow-x-hidden">
        {/* Atmospheric backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-primary/[0.08] via-primary/[0.02] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 radial-glow"
        />

        <NavBar />

        <main id="main-content" className="relative z-10">
          <section className="max-w-[1100px] mx-auto px-6 pt-32 pb-20 md:pt-44 md:pb-28">
            <header className="mb-14 md:mb-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 premium-badge text-primary px-4 py-2 rounded-full text-xs font-mono mb-6 md:mb-8 glow-blue">
                <BookMarked className="w-3.5 h-3.5" />
                Purview Guides
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] gradient-text mb-6">
                State Privacy Law Guides
              </h1>
              <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
                Comprehensive compliance guides for all 20 US state privacy
                laws. Find out what applies to your business.
              </p>
            </header>

            {guides.length === 0 ? <EmptyState /> : <GuideGrid guides={guides} />}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function GuideGrid({
  guides,
}: {
  guides: ReturnType<typeof getAllGuides>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {guides.map((guide) => (
        <GuideCard key={guide.slug} guide={guide} />
      ))}
    </div>
  );
}

function GuideCard({
  guide,
}: {
  guide: ReturnType<typeof getAllGuides>[number];
}) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block feature-card rounded-2xl p-6 md:p-7 h-full"
    >
      <div className="flex flex-col h-full">
        {guide.category && (
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary">
              {guide.category}
            </span>
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-bold text-text-main mb-3 leading-snug group-hover:text-primary-light transition-colors">
          {guide.title}
        </h2>

        <p className="text-sm text-text-muted leading-relaxed mb-6 line-clamp-3">
          {guide.description}
        </p>

        <div className="mt-auto pt-5 border-t border-border-dark/50 flex items-center justify-between text-[11px] text-text-muted font-mono">
          <span className="inline-flex items-center gap-1.5">
            <BookMarked className="w-3 h-3" />
            {guide.readingTime}
          </span>
          <span className="inline-flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
            Read guide
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="premium-card rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-surface-elevated to-surface border border-border-dark mb-6 glow-blue">
        <Tag className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
        Guides coming soon.
      </h2>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        We&apos;re finalizing comprehensive compliance guides for all 20 US
        state privacy laws. Scan your website in the meantime to see which
        laws likely apply to you.
      </p>
      <a
        href="https://app.getpurview.com/scan"
        className="btn-primary text-white text-sm font-semibold px-6 py-3 rounded-xl inline-block"
      >
        Scan Your Website Free
      </a>
    </div>
  );
}
