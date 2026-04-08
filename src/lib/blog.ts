/**
 * Blog filesystem layer.
 *
 * Thin wrapper around `createContentReader` that binds the blog directory
 * (`content/blog/`). The public API (types, function names, signatures) is
 * preserved exactly — routes and sitemap imports continue to work unchanged.
 */

import path from "node:path";
import {
  createContentReader,
  formatPublishedDate as formatPublishedDateImpl,
  type ContentFrontmatter,
  type ContentMeta,
  type ContentPost,
} from "./content";

export type BlogFrontmatter = ContentFrontmatter;
export type BlogPostMeta = ContentMeta;
export type BlogPost = ContentPost;

// Literal-scoped path so Turbopack's NFT tracer can statically scope blog
// filesystem access to content/blog only.
const reader = createContentReader({
  contentDir: path.join(process.cwd(), "content/blog"),
  defaultAuthor: "Purview Team",
  label: "Blog post",
});

export function getAllSlugs(): string[] {
  return reader.getAllSlugs();
}

export function getAllPosts(): BlogPostMeta[] {
  return reader.getAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | null {
  return reader.getPostBySlug(slug);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return reader.getPostsByCategory(category);
}

/**
 * Returns the raw MDX content (without frontmatter) for a slug. Used by the
 * markdown-mirror route handler so /blog/[slug].md serves clean markdown to
 * AI crawlers.
 */
export function getRawMarkdown(slug: string): string | null {
  return reader.getRawMarkdown(slug);
}

export function formatPublishedDate(iso: string): string {
  return formatPublishedDateImpl(iso);
}
