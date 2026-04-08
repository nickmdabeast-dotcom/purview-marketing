/**
 * State privacy law guides filesystem layer.
 *
 * Reads MDX guides from `content/guides/*.mdx`. Structurally identical to
 * blog posts but surfaced under `/guides/[slug]` as permanent reference
 * material rather than chronological blog content.
 */

import path from "node:path";
import {
  createContentReader,
  formatPublishedDate as formatPublishedDateImpl,
  type ContentFrontmatter,
  type ContentMeta,
  type ContentPost,
} from "./content";

export type GuideFrontmatter = ContentFrontmatter;
export type GuideMeta = ContentMeta;
export type Guide = ContentPost;

// Literal-scoped path so Turbopack's NFT tracer can statically scope guide
// filesystem access to content/guides only.
const reader = createContentReader({
  contentDir: path.join(process.cwd(), "content/guides"),
  defaultAuthor: "Purview Team",
  label: "Guide",
});

export function getAllGuideSlugs(): string[] {
  return reader.getAllSlugs();
}

export function getAllGuides(): GuideMeta[] {
  return reader.getAllPosts();
}

export function getGuideBySlug(slug: string): Guide | null {
  return reader.getPostBySlug(slug);
}

export function getGuidesByCategory(category: string): GuideMeta[] {
  return reader.getPostsByCategory(category);
}

/**
 * Returns the raw MDX content (without frontmatter) for a guide slug. Used by
 * the markdown-mirror route handler so /guides/[slug].md serves clean markdown
 * to AI crawlers.
 */
export function getRawGuideMarkdown(slug: string): string | null {
  return reader.getRawMarkdown(slug);
}

export function formatGuidePublishedDate(iso: string): string {
  return formatPublishedDateImpl(iso);
}
