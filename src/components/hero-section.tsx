"use client";

import { useState } from "react";
import { Scale, ArrowRight, CheckCircle, Search } from "lucide-react";
import { DashboardMockup } from "./dashboard-mockup";
import { ScrollReveal } from "./scroll-reveal";

function ScanInput() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanUrl = url.trim();
    if (!cleanUrl) return;

    // Add https:// if no protocol specified
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    window.location.href = `https://app.getpurview.com/scan?url=${encodeURIComponent(cleanUrl)}`;
  };

  return (
    <div className="max-w-lg">
      <div
        className="flex items-center gap-0 rounded-xl border border-border-dark bg-surface/80 backdrop-blur-sm overflow-hidden transition-all focus-within:border-primary/60 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-primary/30"
      >
        <div className="pl-4 text-text-muted">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(e); }}
          placeholder="Enter your website URL..."
          className="flex-1 bg-transparent text-text-main placeholder:text-text-muted/60 px-3 py-4 text-base outline-none font-sans"
          autoComplete="url"
          spellCheck={false}
        />
        <button
          onClick={handleSubmit}
          className="btn-primary text-white px-6 py-4 font-semibold text-sm whitespace-nowrap flex items-center gap-2 shrink-0 h-full rounded-none rounded-r-xl cursor-pointer"
        >
          Scan Free
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-xs text-text-muted font-mono flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          No credit card required · 10-second scan
        </p>
        <a
          href="https://app.getpurview.com/quiz"
          className="text-xs text-text-muted hover:text-primary underline decoration-primary/50 underline-offset-4 transition-colors"
        >
          or take the free compliance assessment →
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-40 md:pb-24 px-6 max-w-[1440px] mx-auto z-10 scroll-mt-16"
    >
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 premium-badge text-primary px-4 py-2 rounded-full text-xs font-mono mb-6 md:mb-8 glow-blue">
              <Scale className="w-3.5 h-3.5" />
              Backed by real enforcement data
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1] gradient-text">
              Find out exactly which privacy laws apply to your business
            </h1>

            <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8 md:mb-10 max-w-xl">
              You&apos;ve got a business to run. We&apos;ll scan your site, find
              your legal blind spots, and give you a simple checklist to fix
              them. No legal degree required.
            </p>

            <ScanInput />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <DashboardMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}
