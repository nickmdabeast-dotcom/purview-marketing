import { NextResponse } from "next/server";
import { getAllGuides } from "@/lib/guides";

/**
 * Markdown mirror for the /guides index — served via the rewrite in next.config.ts
 * (`/guides.md` → `/api/md/guides-index`). Lists all state privacy law guides
 * as a simple markdown document for AI crawlers.
 */
export function GET() {
  const guides = getAllGuides();

  let md = "# Purview State Privacy Law Guides\n\n";
  md += "> Comprehensive compliance guides for all 20 US state privacy laws.\n\n";

  if (guides.length === 0) {
    md += "No guides published yet.\n";
  } else {
    md += "## Guides\n\n";
    for (const guide of guides) {
      md += `- [${guide.title}](https://getpurview.com/guides/${guide.slug}.md) — ${guide.description}\n`;
    }
  }

  md += "\n---\n\nCheck which laws apply to your business: [Take the free quiz](https://app.getpurview.com/quiz)\n";

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
