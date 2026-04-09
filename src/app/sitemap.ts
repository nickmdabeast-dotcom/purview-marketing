import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllGuides } from "@/lib/guides";

const SITE_URL = "https://getpurview.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const guideEntries: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified ?? guide.datePublished),
    // Reference guides are cornerstone content — slightly higher priority than blog.
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...guideEntries, ...blogEntries];
}
