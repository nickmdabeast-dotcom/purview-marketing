/**
 * Generic MDX content filesystem reader.
 *
 * Factory used by `src/lib/blog.ts` and `src/lib/guides.ts` to read MDX files
 * from a content subdirectory, parse frontmatter with gray-matter, and expose
 * typed accessors for routes. Slugs come from filenames so frontmatter doesn't
 * need to repeat them.
 *
 * A missing or empty content directory yields empty arrays — the build never
 * crashes on a fresh checkout.
 */

import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import readingTime from "reading-time";

export interface ContentFrontmatter {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  targetKeyword?: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
  published?: boolean;
}

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
  readingTime: string;
}

export interface ContentPost extends ContentMeta {
  targetKeyword?: string;
  content: string;
}

export interface ContentReaderOptions {
  /**
   * Absolute path to the content directory. Callers MUST build this with a
   * string literal (e.g. `path.join(process.cwd(), "content/blog")`) so
   * Turbopack's NFT tracer can statically scope the traced files to just
   * this subfolder instead of falling back to tracing the whole project.
   */
  contentDir: string;
  /** Fallback author when frontmatter omits one. */
  defaultAuthor?: string;
  /** Label used in error messages — e.g. "Blog post" or "Guide". */
  label?: string;
}

export interface ContentReader {
  getAllSlugs(): string[];
  getAllPosts(): ContentMeta[];
  getPostBySlug(slug: string): ContentPost | null;
  getPostsByCategory(category: string): ContentMeta[];
  getRawMarkdown(slug: string): string | null;
}

export function createContentReader(options: ContentReaderOptions): ContentReader {
  const {
    contentDir,
    defaultAuthor = "Purview Team",
    label = "Content entry",
  } = options;

  function dirExists(): boolean {
    try {
      return fs.statSync(contentDir).isDirectory();
    } catch {
      return false;
    }
  }

  function listMdxFiles(): string[] {
    if (!dirExists()) return [];
    return fs
      .readdirSync(contentDir)
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
  }

  function readFile(
    slug: string,
  ): { data: ContentFrontmatter; content: string } | null {
    // Prevent directory traversal attacks
    if (slug.includes('/') || slug.includes('\\') || slug.includes('..') || slug.includes('\0')) {
      return null;
    }
    const filePath = path.join(contentDir, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const fm = parsed.data as Partial<ContentFrontmatter>;

    if (!fm.title || !fm.description || !fm.datePublished) {
      console.warn(`[Content] Dropping "${slug}": Missing required frontmatter (title, description, datePublished) [${label}]`);
      return null;
    }

    // Skip unpublished drafts in production
    if (fm.published === false) {
      return null;
    }

    return {
      data: {
        title: fm.title,
        description: fm.description,
        datePublished: fm.datePublished,
        dateModified: fm.dateModified,
        author: fm.author ?? defaultAuthor,
        targetKeyword: fm.targetKeyword,
        category: fm.category,
        tags: fm.tags,
        ogImage: fm.ogImage,
        published: fm.published,
      },
      content: parsed.content,
    };
  }

  function toMeta(
    slug: string,
    data: ContentFrontmatter,
    content: string,
  ): ContentMeta {
    return {
      slug,
      title: data.title,
      description: data.description,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: data.author ?? defaultAuthor,
      category: data.category,
      tags: data.tags,
      ogImage: data.ogImage,
      readingTime: readingTime(content).text,
    };
  }

  function getAllSlugs(): string[] {
    return listMdxFiles().map((file) => file.replace(/\.mdx$/, ""));
  }

  function getAllPosts(): ContentMeta[] {
    return listMdxFiles()
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const parsed = readFile(slug);
        if (!parsed) return null;
        return toMeta(slug, parsed.data, parsed.content);
      })
      .filter((post): post is ContentMeta => post !== null)
      .sort(
        (a, b) =>
          new Date(b.datePublished).getTime() -
          new Date(a.datePublished).getTime(),
      );
  }

  function getPostBySlug(slug: string): ContentPost | null {
    const parsed = readFile(slug);
    if (!parsed) return null;
    const meta = toMeta(slug, parsed.data, parsed.content);
    return {
      ...meta,
      targetKeyword: parsed.data.targetKeyword,
      content: parsed.content,
    };
  }

  function getPostsByCategory(category: string): ContentMeta[] {
    return getAllPosts().filter((post) => post.category === category);
  }

  /**
   * Returns a markdown version of an entry with a header prepended and
   * frontmatter stripped — used by the markdown-mirror route handlers so
   * `/blog/[slug].md` and `/guides/[slug].md` serve clean markdown to AI crawlers.
   */
  function getRawMarkdown(slug: string): string | null {
    // Prevent directory traversal attacks
    if (slug.includes('/') || slug.includes('\\') || slug.includes('..') || slug.includes('\0')) {
      return null;
    }
    const parsed = readFile(slug);
    if (!parsed) return null;
    const author = parsed.data.author ?? defaultAuthor;
    const front = `# ${parsed.data.title}\n\n> ${parsed.data.description}\n\n_Published ${parsed.data.datePublished} by ${author}_\n\n`;
    return front + parsed.content.trim() + "\n";
  }

  return {
    getAllSlugs,
    getAllPosts,
    getPostBySlug,
    getPostsByCategory,
    getRawMarkdown,
  };
}

export function formatPublishedDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
