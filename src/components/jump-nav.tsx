"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Top" },
  { id: "problem", label: "The Problem" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export function JumpNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 bg-surface/90 backdrop-blur-md px-3 py-4 rounded-full border border-border-dark shadow-2xl">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          className={`jump-nav-item w-3 h-3 rounded-full relative group ${
            activeSection === section.id
              ? "active bg-primary"
              : "bg-border-dark hover:bg-primary"
          }`}
        >
          <span className="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-surface/95 border border-border-dark text-xs font-medium opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-lg text-text-muted group-hover:text-text-main">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
