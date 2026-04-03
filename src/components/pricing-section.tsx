"use client";

import { useState } from "react";
import { Check, CheckCircle, Gift, Zap } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For businesses with limited exposure.",
    features: [
      "Up to 5 states",
      "1 policy generation per period",
      "Website scanner",
      "Quick compliance actions",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "For multi-state operators.",
    popular: true,
    features: [
      { text: "All applicable states (unlimited)", bold: true },
      "Unlimited policy generation",
      "Full compliance dashboard",
      "Priority action items",
      "Implementation guides",
    ],
    highlighted: true,
    trial: "14-day free trial",
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For complex data operations.",
    features: [
      "Everything in Growth",
      "Advanced compliance reporting",
      "Priority support",
      "Custom implementation guidance",
    ],
    highlighted: false,
    cta: "Get Started",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="pt-10 md:pt-16 pb-16 md:pb-24 px-6 max-w-[1440px] mx-auto scroll-mt-[23px]">
      <ScrollReveal className="text-center mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 gradient-text">
          Simple pricing. No hidden fees.
        </h2>
        <p className="text-text-muted text-lg">
          Start with a free scan. Upgrade when you&apos;re ready.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-text-main" : "text-text-muted"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-surface-elevated border border-border-dark transition-colors cursor-pointer hover:border-primary/50"
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle annual billing"
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ${
                isAnnual
                  ? "left-7 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "left-0.5 bg-text-muted"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-text-main" : "text-text-muted"}`}>
            Annual
          </span>
          {isAnnual && (
            <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-full">
              Save 20%
            </span>
          )}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center max-w-5xl mx-auto">
        {plans.map((plan) => (
          <ScrollReveal key={plan.name}>
            <div
              className={`rounded-2xl p-6 md:p-8 flex flex-col h-full relative ${
                plan.highlighted
                  ? "feature-card-highlighted transform lg:-translate-y-4 z-10"
                  : "premium-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-text-main">{plan.name}</h3>
              <div
                className={`text-3xl md:text-4xl font-mono font-bold mt-4 mb-2 ${
                  plan.highlighted ? "gradient-text-blue" : "gradient-text"
                }`}
              >
                ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                <span className="text-base md:text-lg text-text-muted font-sans font-normal">
                  /mo
                </span>
              </div>
              {isAnnual && (
                <div className="text-xs text-text-muted font-mono mt-1">
                  ${plan.annualPrice * 12}/year
                </div>
              )}
              <p
                className={`text-xs md:text-sm text-text-muted pb-6 border-b ${
                  plan.highlighted
                    ? "border-primary/30"
                    : "border-border-dark/50"
                }`}
              >
                {plan.description}
              </p>

              {plan.trial && (
                <div className="flex items-center gap-2 mt-4 mb-2 text-sm font-medium text-success">
                  <CheckCircle className="w-4 h-4" />
                  {plan.trial}
                </div>
              )}

              <ul className="flex flex-col gap-3 md:gap-4 my-6 md:my-8 flex-grow text-sm">
                {plan.features.map((feature) => {
                  const text =
                    typeof feature === "string" ? feature : feature.text;
                  const bold =
                    typeof feature === "object" && feature.bold;
                  return (
                    <li key={text} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span
                        className={`text-text-main ${bold ? "font-medium" : ""}`}
                      >
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <a
                href={`https://app.getpurview.com/signup?plan=${plan.name.toLowerCase()}${isAnnual ? "&billing=annual" : ""}`}
                className={`w-full text-center py-3.5 rounded-xl font-semibold ${
                  plan.highlighted
                    ? "btn-primary text-white"
                    : "btn-secondary text-text-main"
                }`}
              >
                {plan.cta} &rarr;
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Freemium clarity box */}
      <ScrollReveal>
        <div className="mt-12 md:mt-16 premium-card rounded-2xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold mb-2 flex items-center gap-2 text-text-main">
              <Gift className="w-5 h-5 text-primary" />
              Free Forever
            </h3>
            <p className="text-text-muted text-sm">
              Your free account includes a full website tracker scan and a basic multi-state exposure report. No credit card required.
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          <div className="w-full md:hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold mb-2 flex items-center gap-2 text-text-main">
              <Zap className="w-5 h-5 text-primary" />
              Paid Plans
            </h3>
            <p className="text-text-muted text-sm">
              Unlock the full multi-state dashboard, AI-generated privacy policies, step-by-step remediation actions, and ongoing tracker alerts.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-center text-text-muted text-[10px] md:text-xs mt-8 font-mono">
          All plans include: Cancel anytime &middot; Annual pricing saves 20%
        </p>
      </ScrollReveal>
    </section>
  );
}
