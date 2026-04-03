import {
  Crosshair,
  FileText,
  ScanLine,
  LayoutGrid,
  Zap,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const features = [
  {
    icon: Crosshair,
    title: "Compliance Matching Engine",
    description:
      "Stop guessing. We automatically match your business revenue and data practices against 20+ state laws to tell you exactly what applies.",
    highlighted: true,
  },
  {
    icon: FileText,
    title: "Privacy Policy Generator",
    description:
      "Ditch the expensive lawyers. Generate an attorney-reviewed privacy policy that covers every applicable state in one hosted document.",
    highlighted: true,
  },
  {
    icon: ScanLine,
    title: "Website Scanner",
    description:
      "Instantly detect risky trackers like Meta Pixel or Stripe. Find missing consent banners before regulators or competitors do.",
    highlighted: true,
  },
  {
    icon: LayoutGrid,
    title: "Unified Dashboard",
    description:
      "One single view across all states. Requirements are merged by the 'strictest wins' rule to eliminate duplicate work and confusion.",
    highlighted: false,
  },
  {
    icon: Zap,
    title: "Quick Compliance Actions",
    description:
      "Access pre-written DPA emails and code snippets for cookie banners. One click marks requirements globally compliant.",
    highlighted: false,
  },
  {
    icon: TrendingUp,
    title: "Compliance Tracking",
    description:
      "Watch your score improve in real-time. Prove to partners, board members, or acquirers that you take data privacy seriously.",
    highlighted: false,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 px-6 max-w-[1440px] mx-auto scroll-mt-0">
      <ScrollReveal className="text-center mb-10 md:mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 gradient-text">
          Built for multi-state compliance
        </h2>
        <p className="text-text-muted text-lg">
          Everything you need to map, execute, and maintain compliance automatically.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <ScrollReveal key={feature.title} delay={(i % 3) * 100}>
              <div
                className={`rounded-2xl p-6 ${
                  feature.highlighted
                    ? "feature-card feature-card-highlighted"
                    : "feature-card"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    feature.highlighted
                      ? "bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/50 text-primary glow-blue"
                      : "bg-surface-elevated border border-border-dark text-text-main"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-main">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
