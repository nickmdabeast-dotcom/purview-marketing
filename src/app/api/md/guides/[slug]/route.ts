import { getRawGuideMarkdown } from "@/lib/guides";

/**
 * Serves the markdown mirror for a state privacy law guide.
 *
 * Users reach this handler via a rewrite in next.config.ts — a request for
 * /guides/my-guide.md is rewritten to /api/md/guides/my-guide. The body is the
 * raw MDX content (frontmatter stripped + a clean markdown header prepended)
 * so AI crawlers can ingest it without HTML/JS noise.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = getRawGuideMarkdown(slug);

  if (!body) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
