"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { faqs } from "@/lib/faq-data";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = question.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 40);

  return (
    <div className="faq-item rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
        className="w-full cursor-pointer p-5 md:p-6 font-medium text-base md:text-lg flex justify-between items-center text-left hover:text-primary transition-colors text-text-main"
      >
        {question}
        {open ? (
          <Minus className="w-5 h-5 text-text-muted shrink-0 ml-4" aria-hidden="true" />
        ) : (
          <Plus className="w-5 h-5 text-text-muted shrink-0 ml-4" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div
          id={`faq-answer-${id}`}
          role="region"
          aria-labelledby={`faq-question-${id}`}
          className="px-5 md:px-6 pb-5 md:pb-6 text-text-muted text-sm md:text-base leading-relaxed border-t border-border-dark/30 pt-4 animate-fade-in-up"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="pt-8 md:pt-12 pb-16 md:pb-24 px-6 max-w-3xl mx-auto scroll-mt-[39px]">
      <ScrollReveal className="mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center gradient-text">
          Frequently asked questions
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
