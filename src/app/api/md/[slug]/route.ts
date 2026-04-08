import { markdownMirrors } from "@/lib/markdown-mirrors";

/**
 * Serves the markdown mirror for a given slug.
 *
 * Users reach this handler via rewrites in next.config.ts — e.g. a request
 * for /index.md is rewritten to /api/md/index. The response is plain markdown
 * with the appropriate Content-Type so LLM-based crawlers can ingest it cleanly.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = markdownMirrors[slug];

  if (!body) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
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
