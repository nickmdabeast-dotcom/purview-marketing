import type { Metadata } from "next";
import { AnimatedGrid } from "@/components/animated-grid";
import { NavBar } from "@/components/nav-bar";
import { JumpNav } from "@/components/jump-nav";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { MidCtaSection } from "@/components/mid-cta-section";
import { FeaturesSection } from "@/components/features-section";
import { WhoIsThisForSection } from "@/components/who-is-this-for-section";
import { ComparisonSection } from "@/components/comparison-section";
import { TrustSection } from "@/components/trust-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { SecurityBadges } from "@/components/security-badges";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://getpurview.com",
    types: {
      "text/markdown": "https://getpurview.com/index.md",
    },
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Purview",
    url: "https://getpurview.com",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Compliance Software",
    operatingSystem: "Web",
    description:
      "Multi-state privacy compliance platform for SMBs. Automated compliance matching, privacy policy generation, and step-by-step remediation.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "49",
      highPrice: "149",
      priceCurrency: "USD",
      offerCount: "3",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <div className="min-h-screen bg-bg relative overflow-x-hidden">
        {/* Background layers */}
        <AnimatedGrid />

        {/* Navigation */}
        <NavBar />
        <JumpNav />

        <main id="main-content">
          {/* Content sections */}
          <HeroSection />

          <ProblemSection />
          <SectionDivider />

          <HowItWorksSection />
          <SectionDivider />

          <MidCtaSection />
          <SectionDivider />

          <FeaturesSection />
          <SectionDivider />

          <WhoIsThisForSection />
          <SectionDivider />

          <ComparisonSection />
          <SectionDivider />

          <TrustSection />
          <SectionDivider />

          <PricingSection />
          <SectionDivider />

          <FaqSection />
          <SectionDivider />

          <div className="relative">
            {/* Shared gradient background for the entire closing section */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 radial-glow pointer-events-none" />

            <FinalCtaSection />
            <SecurityBadges />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
