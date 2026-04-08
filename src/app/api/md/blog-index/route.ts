import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

/**
 * Markdown mirror for the /blog index — served via the rewrite in next.config.ts
 * (`/blog.md` → `/api/md/blog-index`). Lists all blog posts as a simple
 * markdown document for AI crawlers.
 */
export function GET() {
  const posts = getAllPosts();

  let md = "# Purview Blog — Privacy Compliance Insights\n\n";
  md += "> Guides, analysis, and updates on US state privacy law compliance for small businesses.\n\n";

  if (posts.length === 0) {
    md += "No posts published yet.\n";
  } else {
    md += "## Posts\n\n";
    for (const post of posts) {
      md += `- [${post.title}](https://getpurview.com/blog/${post.slug}.md) — ${post.description}\n`;
    }
  }

  md += "\n---\n\nLearn more at [getpurview.com](https://getpurview.com)\n";

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
