import { ScrollReveal } from "./scroll-reveal";

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="pt-24 md:pt-32 pb-10 md:pb-14 relative">

      <ScrollReveal className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight gradient-text">
          Stop wondering. Start complying.
        </h2>
        <p className="text-lg md:text-xl text-text-muted mb-10">
          Scan your website in 10 seconds — free, no credit card required.
        </p>

        <a
          href="https://app.getpurview.com/scan"
          className="inline-flex btn-primary text-white h-14 md:h-16 px-10 rounded-xl font-bold items-center text-lg transition-all animate-pulse-glow hover:scale-[1.02] w-full sm:w-auto justify-center"
        >
          Scan Your Website Free &rarr;
        </a>

        <div className="mt-6">
          <a
            href="https://app.getpurview.com/quiz"
            className="text-text-muted hover:text-primary underline decoration-primary/50 underline-offset-4 transition-colors"
          >
            or take the free compliance assessment &rarr;
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
