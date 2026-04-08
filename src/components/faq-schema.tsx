import { Plus } from "lucide-react";

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  questions: FAQSchemaItem[];
}

/**
 * Renders a visual FAQ list AND injects FAQPage JSON-LD so the page can earn
 * rich FAQ snippets in Google search results. Used inside MDX blog posts via
 * the MDX components map.
 *
 * The JSON-LD is escaped against `</script>` injection — JSON.stringify alone
 * is not enough if a question or answer contains the literal string "</script>".
 */
export function FAQSchema({ questions }: FAQSchemaProps) {
  if (!questions?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  // Escape `</` so author content can never break out of the script tag.
  const safeJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <div className="not-prose my-10 space-y-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson }}
      />
      {questions.map((item, i) => (
        <details
          key={i}
          className="faq-item group rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="cursor-pointer list-none p-5 md:p-6 font-medium text-base md:text-lg flex justify-between items-center text-left text-text-main hover:text-primary transition-colors">
            <span className="pr-4">{item.question}</span>
            <Plus
              className="w-5 h-5 text-text-muted shrink-0 transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 md:px-6 pb-5 md:pb-6 text-text-muted text-sm md:text-base leading-relaxed border-t border-border-dark/30 pt-4">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
