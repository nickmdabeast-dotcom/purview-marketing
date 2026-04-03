import { Scale, Database, FileSearch, CalendarCheck } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const signals = [
  { icon: Scale, label: "Attorney-Reviewed Templates" },
  { icon: Database, label: "20+ States, 170+ Requirements", mono: true },
  { icon: FileSearch, label: "Real Enforcement Data" },
  { icon: CalendarCheck, label: "Current Through 2026" },
];

export function TrustSection() {
  return (
    <section id="trust" className="pt-16 md:pt-20 pb-12 md:pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-12 md:mb-14 gradient-text">
            Built on real regulatory data
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.label}
                  className="flex items-center gap-2 md:gap-3 premium-card rounded-xl px-4 py-3 text-xs md:text-sm"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className={`text-text-main ${signal.mono ? "font-mono" : ""}`}>
                    {signal.label}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-center text-[10px] md:text-xs text-text-muted mt-6 md:mt-8 font-mono max-w-2xl mx-auto px-4">
            Purview provides legal information, not legal advice. Consult a qualified attorney for specific compliance decisions.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
