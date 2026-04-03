import { ScrollReveal } from "./scroll-reveal";

export function MidCtaSection() {
  return (
    <section id="mid-cta" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <ScrollReveal className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text">
          Ready to see where you stand?
        </h2>
        <p className="text-text-muted mb-8 text-lg">
          Take 10 seconds to scan your website and uncover your legal blind spots.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://app.getpurview.com/scan"
            className="btn-primary text-white h-14 px-10 rounded-xl font-semibold flex items-center justify-center text-base w-full sm:w-auto"
          >
            Scan Your Website Free &rarr;
          </a>
          <a
            href="#features"
            className="text-text-muted hover:text-primary underline decoration-primary/50 underline-offset-4 transition-colors text-base"
          >
            or learn more about features
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
