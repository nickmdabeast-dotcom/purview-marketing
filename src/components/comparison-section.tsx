import { Check, X, Minus } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

type CellValue = "yes" | "no" | "partial" | string;

interface ComparisonRow {
  feature: string;
  purview: CellValue;
  onetrust: CellValue;
  termly: CellValue;
  diy: CellValue;
}

const rows: ComparisonRow[] = [
  {
    feature: "Multi-state compliance matching",
    purview: "yes",
    onetrust: "yes",
    termly: "no",
    diy: "partial",
  },
  {
    feature: "Privacy policy generation",
    purview: "yes",
    onetrust: "yes",
    termly: "yes",
    diy: "partial",
  },
  {
    feature: "Step-by-step remediation",
    purview: "yes",
    onetrust: "partial",
    termly: "no",
    diy: "no",
  },
  {
    feature: "Website tracker scanning",
    purview: "yes",
    onetrust: "yes",
    termly: "yes",
    diy: "no",
  },
  {
    feature: "SMB-friendly pricing",
    purview: "yes",
    onetrust: "no",
    termly: "yes",
    diy: "yes",
  },
  {
    feature: "Setup in under 30 minutes",
    purview: "yes",
    onetrust: "no",
    termly: "yes",
    diy: "no",
  },
  {
    feature: "No consultants required",
    purview: "yes",
    onetrust: "no",
    termly: "partial",
    diy: "no",
  },
];

const pricing = {
  purview: "From $49/mo",
  onetrust: "$10,000+/yr",
  termly: "From $10/mo",
  diy: '"Free" + 40hrs',
};

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-success" />
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="w-6 h-6 rounded-full bg-risk-red/20 flex items-center justify-center">
        <X className="w-3.5 h-3.5 text-risk-red" />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="w-6 h-6 rounded-full bg-risk-amber/20 flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-risk-amber" />
      </div>
    );
  }
  return <span className="text-sm text-text-muted">{value}</span>;
}

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <ScrollReveal className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 gradient-text">
          How Purview compares
        </h2>
        <p className="text-text-muted text-lg">
          Enterprise tools are overkill. Cookie-only tools aren&apos;t enough. We built the middle ground.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="overflow-x-auto -mx-6 px-6">
          <p className="md:hidden text-xs text-text-muted text-center mb-3">&larr; Scroll to compare &rarr;</p>
          <table className="w-full min-w-[640px]">
            <caption className="sr-only">Feature comparison: Purview vs OneTrust vs Termly vs DIY</caption>
            {/* Header */}
            <thead>
              <tr>
                <th className="text-left py-4 pr-4 text-sm text-text-muted font-normal w-[200px]" />
                <th className="text-center py-4 px-3">
                  <div className="premium-card rounded-xl px-4 py-3 inline-block border-primary/40">
                    <span className="font-bold text-primary text-sm">Purview</span>
                  </div>
                </th>
                <th className="text-center py-4 px-3">
                  <span className="text-sm text-text-muted font-medium">OneTrust</span>
                </th>
                <th className="text-center py-4 px-3">
                  <span className="text-sm text-text-muted font-medium">Termly</span>
                </th>
                <th className="text-center py-4 px-3">
                  <span className="text-sm text-text-muted font-medium">DIY</span>
                </th>
              </tr>
            </thead>

            {/* Feature rows */}
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-t border-border-dark/30">
                  <td className="py-4 pr-4 text-sm text-text-main font-medium">
                    {row.feature}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex justify-center">
                      <CellIcon value={row.purview} />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex justify-center">
                      <CellIcon value={row.onetrust} />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex justify-center">
                      <CellIcon value={row.termly} />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex justify-center">
                      <CellIcon value={row.diy} />
                    </div>
                  </td>
                </tr>
              ))}

              {/* Pricing row */}
              <tr className="border-t border-border-dark/50">
                <td className="py-5 pr-4 text-sm text-text-main font-bold">
                  Pricing
                </td>
                <td className="py-5 px-3 text-center">
                  <span className="text-sm font-bold text-primary">{pricing.purview}</span>
                </td>
                <td className="py-5 px-3 text-center">
                  <span className="text-sm text-text-muted">{pricing.onetrust}</span>
                </td>
                <td className="py-5 px-3 text-center">
                  <span className="text-sm text-text-muted">{pricing.termly}</span>
                </td>
                <td className="py-5 px-3 text-center">
                  <span className="text-sm text-text-muted">{pricing.diy}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-center text-[10px] md:text-xs text-text-muted/70 font-mono mt-6">
          Comparison based on publicly available pricing and feature information as of 2026.
        </p>
      </ScrollReveal>
    </section>
  );
}
