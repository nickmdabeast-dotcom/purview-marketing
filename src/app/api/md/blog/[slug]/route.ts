import { getRawMarkdown } from "@/lib/blog";

/**
 * Serves the markdown mirror for a blog post.
 *
 * Users reach this handler via a rewrite in next.config.ts — a request for
 * /blog/my-post.md is rewritten to /api/md/blog/my-post. The body is the raw
 * MDX content (frontmatter stripped + a clean markdown header prepended) so
 * AI crawlers can ingest it without HTML/JS noise.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = getRawMarkdown(slug);

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
