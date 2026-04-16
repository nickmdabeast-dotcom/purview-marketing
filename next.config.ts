import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // TODO(security): Replace 'unsafe-inline' in script-src with a nonce-based
  // allowlist. See follow-up prompt `04-nonce-based-csp-followup.md`. The
  // current CSP is the minimum needed for Google Ads to function correctly;
  // nonces will tighten this further without breaking analytics.
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://app.getpurview.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://td.doubleclick.net https://stats.g.doubleclick.net; frame-ancestors 'self'`,
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    // Markdown mirror routes — each public page has a .md twin served by
    // /api/md/[slug]. Static-page mirrors live in src/lib/markdown-mirrors.ts;
    // blog-post mirrors are read from content/blog/*.mdx by /api/md/blog/[slug];
    // guide mirrors are read from content/guides/*.mdx by /api/md/guides/[slug].
    return [
      { source: "/index.md", destination: "/api/md/index" },
      { source: "/blog.md", destination: "/api/md/blog-index" },
      { source: "/guides.md", destination: "/api/md/guides-index" },
      { source: "/blog/:slug.md", destination: "/api/md/blog/:slug" },
      { source: "/guides/:slug.md", destination: "/api/md/guides/:slug" },
    ];
  },
};

export default nextConfig;
