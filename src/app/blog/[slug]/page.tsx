import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import {
  formatPublishedDate,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/blog";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found | Purview Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const url = `https://getpurview.com/blog/${post.slug}`;
  const ogImage = post.ogImage ?? "/og-image.png";

  return {
    title: `${post.title} | Purview Blog`,
    description: post.description,
    alternates: {
      canonical: url,
      types: {
        "text/markdown": `https://getpurview.com/blog/${post.slug}.md`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      siteName: "Purview",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "plaintext",
} as const;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `https://getpurview.com/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Purview",
      url: "https://getpurview.com",
      logo: {
        "@type": "ImageObject",
        url: "https://getpurview.com/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: post.ogImage
      ? [`https://getpurview.com${post.ogImage}`]
      : ["https://getpurview.com/og-image.png"],
    keywords: post.tags?.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://getpurview.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://getpurview.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-bg relative overflow-x-hidden">
        {/* Atmospheric backdrop — radial glow + soft top gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 radial-glow"
        />

        <NavBar />

        <main id="main-content" className="relative z-10">
          <article className="max-w-3xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Blog
            </Link>

            <header className="mb-10 md:mb-14">
              {post.category && (
                <div className="mb-5">
                  <span className="premium-badge text-primary px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-[1.1] mb-6">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-8">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted font-mono pt-6 border-t border-border-dark/40">
                <span className="text-text-main/80">By {post.author}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.datePublished}>
                    {formatPublishedDate(post.datePublished)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </header>

            <div className="prose-content">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  // Content comes from our own repo so we trust JSX
                  // attribute expressions (e.g. <FAQSchema questions={[...]} />).
                  // blockDangerousJS stays at its default `true`, which still
                  // strips actually-dangerous calls like fetch() / import().
                  blockJS: false,
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                          properties: {
                            className: ["heading-anchor"],
                          },
                        },
                      ],
                      [rehypePrettyCode, prettyCodeOptions],
                    ],
                  },
                }}
              />
            </div>

            <div className="mt-16 pt-8 border-t border-border-dark/40">
              <div className="premium-card rounded-2xl p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold gradient-text mb-3">
                  Find out which laws apply to your business
                </h3>
                <p className="text-text-muted mb-6 max-w-md mx-auto text-sm md:text-base">
                  Take Purview&apos;s free 5-minute compliance quiz. No credit
                  card required.
                </p>
                <a
                  href="https://app.getpurview.com/quiz"
                  className="btn-primary text-white text-sm font-semibold px-6 py-3 rounded-xl inline-block"
                >
                  Take the Free Quiz
                </a>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Back to all posts
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
