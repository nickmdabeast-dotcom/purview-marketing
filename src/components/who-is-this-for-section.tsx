import { ShoppingCart, Code, Users, Rocket } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const personas = [
  {
    icon: ShoppingCart,
    title: "E-commerce stores",
    subtitle: "Selling to customers nationally",
    description:
      "You use Shopify or WooCommerce, run Meta Pixel, collect shipping addresses across state lines, and have no idea which privacy laws apply to you. Sound familiar?",
  },
  {
    icon: Code,
    title: "SaaS companies",
    subtitle: "With multi-state user bases",
    description:
      "Your users sign up from everywhere. You're storing PII, processing payments, and using analytics — but your privacy policy was copied from a template two years ago.",
  },
  {
    icon: Users,
    title: "Marketing agencies",
    subtitle: "Managing client compliance",
    description:
      "Your clients ask you if their sites are compliant and you don't have a clear answer. Purview gives you a tool to audit clients and upsell compliance services.",
  },
  {
    icon: Rocket,
    title: "Growing startups",
    subtitle: "Preparing for due diligence",
    description:
      "Investors and acquirers check your compliance posture. A clean compliance dashboard signals operational maturity and reduces deal friction.",
  },
];

export function WhoIsThisForSection() {
  return (
    <section id="who-is-this-for" className="py-16 md:py-24 px-6 max-w-[1440px] mx-auto">
      <ScrollReveal className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 gradient-text">
          Built for businesses like yours
        </h2>
        <p className="text-text-muted text-lg">
          If any of these sound like you, Purview was designed for your exact situation.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {personas.map((persona, i) => {
          const Icon = persona.icon;
          return (
            <ScrollReveal key={persona.title} delay={i * 100}>
              <div className="premium-card rounded-2xl p-6 md:p-8 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/50 text-primary glow-blue shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main">
                      {persona.title}
                    </h3>
                    <p className="text-sm text-primary font-mono">
                      {persona.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
