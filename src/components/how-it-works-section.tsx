import { Radar, LayoutDashboard, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const steps = [
  {
    number: "01",
    icon: Radar,
    title: "Scan your site",
    description:
      "Answer a few questions about your business size and data. We'll handle the complex legal mapping to see what applies.",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Get your checklist",
    description:
      "See requirements organized by priority. One unified dashboard across all states — the strictest standard wins.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Check the boxes",
    description:
      "Follow step-by-step actions: generate policies, install banners, send DPA requests. Get compliant without hiring consultants.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="pt-12 md:pt-20 pb-12 md:pb-16 relative scroll-mt-[8px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-14 md:mb-16 text-center gradient-text">
            Compliance doesn&apos;t have to be a headache.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 relative mt-12 md:mt-16">
          {/* Connecting line */}
          <div className="absolute top-8 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 100}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="step-number w-14 h-14 rounded-full flex items-center justify-center font-mono text-primary font-bold text-xl mb-8">
                    {step.number}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg md:text-xl font-bold text-text-main">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
