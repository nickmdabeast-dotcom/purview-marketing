import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { formatPublishedDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Purview — Privacy Compliance Insights",
  description:
    "Guides, analysis, and updates on US state privacy law compliance for small and mid-sized businesses.",
  alternates: {
    canonical: "https://getpurview.com/blog",
    types: {
      "text/markdown": "https://getpurview.com/blog.md",
    },
  },
  openGraph: {
    title: "Purview Blog — Privacy Compliance Insights",
    description:
      "Guides, analysis, and updates on US state privacy law compliance for small and mid-sized businesses.",
    type: "website",
    url: "https://getpurview.com/blog",
    siteName: "Purview",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Purview Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purview Blog — Privacy Compliance Insights",
    description:
      "Guides, analysis, and updates on US state privacy law compliance for small and mid-sized businesses.",
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Purview Blog",
    description:
      "Guides, analysis, and updates on US state privacy law compliance for SMBs.",
    url: "https://getpurview.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Purview",
      url: "https://getpurview.com",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      author: { "@type": "Person", name: post.author },
      url: `https://getpurview.com/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />

      <div className="min-h-screen bg-bg relative overflow-x-hidden">
        {/* Atmospheric backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-primary/[0.08] via-primary/[0.02] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 radial-glow"
        />

        <NavBar />

        <main id="main-content" className="relative z-10">
          <section className="max-w-[1100px] mx-auto px-6 pt-32 pb-20 md:pt-44 md:pb-28">
            <header className="mb-14 md:mb-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 premium-badge text-primary px-4 py-2 rounded-full text-xs font-mono mb-6 md:mb-8 glow-blue">
                <Tag className="w-3.5 h-3.5" />
                Purview Blog
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] gradient-text mb-6">
                Privacy compliance insights
              </h1>
              <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
                Guides, analysis, and updates on US state privacy law
                compliance — written for founders and operators, not lawyers.
              </p>
            </header>

            {posts.length === 0 ? (
              <EmptyState />
            ) : (
              <PostGrid posts={posts} />
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function PostGrid({
  posts,
}: {
  posts: ReturnType<typeof getAllPosts>;
}) {
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12 md:space-y-16">
      <FeaturedCard post={featured} />
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({
  post,
}: {
  post: ReturnType<typeof getAllPosts>[number];
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block premium-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="premium-badge text-primary px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.15em]">
            Featured
          </span>
          {post.category && (
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted">
              · {post.category}
            </span>
          )}
        </div>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-main mb-5 leading-[1.15] group-hover:gradient-text-blue transition-all max-w-3xl">
          {post.title}
        </h2>

        <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mb-8">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted font-mono">
          <span>By {post.author}</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <time dateTime={post.datePublished}>
              {formatPublishedDate(post.datePublished)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-primary group-hover:gap-2.5 transition-all">
            Read post
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({
  post,
}: {
  post: ReturnType<typeof getAllPosts>[number];
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block feature-card rounded-2xl p-6 md:p-7 h-full"
    >
      <div className="flex flex-col h-full">
        {post.category && (
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary">
              {post.category}
            </span>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 leading-snug group-hover:text-primary-light transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>

        <div className="mt-auto pt-5 border-t border-border-dark/50 flex items-center justify-between text-[11px] text-text-muted font-mono">
          <time dateTime={post.datePublished}>
            {formatPublishedDate(post.datePublished)}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="premium-card rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-surface-elevated to-surface border border-border-dark mb-6 glow-blue">
        <Tag className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
        No posts yet
      </h2>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        We&apos;re working on our first batch of privacy compliance guides.
        Check back soon, or scan your website in the meantime.
      </p>
      <a
        href="https://app.getpurview.com/scan"
        className="btn-primary text-white text-sm font-semibold px-6 py-3 rounded-xl inline-block"
      >
        Scan Your Website Free
      </a>
    </div>
  );
}
