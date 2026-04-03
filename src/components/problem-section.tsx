"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          if (target === 0) {
            setCount(0);
            observer.unobserve(el);
            return;
          }
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function ProblemSection() {
  return (
    <section id="problem" className="pt-10 md:pt-14 pb-16 md:pb-24 px-6 max-w-[1440px] mx-auto z-10 relative scroll-mt-[32px]">
      <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <div className="inline-block bg-risk-amber/10 border border-risk-amber/40 text-risk-amber px-4 py-2 rounded-full text-xs font-mono mb-6 glow-blue">
          Active Enforcement: State AGs are issuing fines now — with more laws taking effect every quarter.
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 gradient-text">
          You&apos;re probably exposed to laws you don&apos;t even know about
        </h2>
        <p className="text-text-muted text-base md:text-lg leading-relaxed">
          If you have customers in multiple states, overlapping privacy laws are already actively enforced against businesses like yours. Ignorance isn&apos;t a defense.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollReveal delay={100}>
          <div className="premium-card rounded-2xl p-6 md:p-8 flex flex-col items-start group">
            <div className="font-mono text-4xl md:text-5xl font-bold gradient-text-blue mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <AnimatedCounter target={20} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-primary font-mono mb-2 uppercase tracking-widest">
              State Privacy Laws
            </div>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              And counting. Each with different thresholds, requirements, and deadlines.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="premium-card rounded-2xl p-6 md:p-8 flex flex-col items-start group">
            <div className="flex items-baseline font-mono text-4xl md:text-5xl font-bold text-risk-red mb-3 md:mb-4">
              $<AnimatedCounter target={7988} />
            </div>
            <div className="text-xs md:text-sm text-primary font-mono mb-2 uppercase tracking-widest">
              Per-Violation Fine
            </div>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              California&apos;s penalty rate — with no aggregate cap. Other states up to $25,000.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="premium-card rounded-2xl p-6 md:p-8 flex flex-col items-start group">
            <div className="flex items-baseline font-mono text-4xl md:text-5xl font-bold gradient-text mb-3 md:mb-4">
              <AnimatedCounter target={0} />
              <span className="text-xl md:text-2xl ml-2 text-risk-red">Days</span>
            </div>
            <div className="text-xs md:text-sm text-primary font-mono mb-2 uppercase tracking-widest">
              Cure Period
            </div>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              California eliminated the right to cure. Colorado&apos;s expires soon. More following.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="premium-card rounded-2xl p-6 flex flex-col">
            <div className="text-xs font-mono text-risk-red uppercase tracking-widest mb-2">
              Enforcement Action
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold gradient-text mb-2">
              $345,000
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Todd Snyder Inc. — fined by California AG for failure to honor opt-out requests and inadequate privacy disclosures.
            </p>
          </div>
          <div className="premium-card rounded-2xl p-6 flex flex-col">
            <div className="text-xs font-mono text-risk-red uppercase tracking-widest mb-2">
              Enforcement Action
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold gradient-text mb-2">
              $85,000
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              TicketNetwork — settled with Connecticut AG over unauthorized data collection and missing consumer disclosures.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-center text-xs text-text-muted/70 font-mono mt-8">
          *Sourced directly from actual state attorney general enforcement records.
        </p>
      </ScrollReveal>
    </section>
  );
}
