import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { site } from "./site";

const postsDir = path.join(process.cwd(), "content", "posts");

// Amazon ASINs are 10 letters/digits (Kindle books usually start with B0).
const ASIN_RE = /^[A-Z0-9]{10}$/;

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Build the affiliate link for a post.
 * - `amazonUrl` (e.g. an amzn.to link copied from SiteStripe) wins if present.
 * - Otherwise a standard product link is built from the ASIN + your Tracking ID.
 * Returns null when no valid link can be built.
 */
export function affiliateUrl(post) {
  if (post.amazonUrl && /^https:\/\//.test(post.amazonUrl)) return post.amazonUrl;
  if (post.asin && ASIN_RE.test(String(post.asin).toUpperCase())) {
    return `https://${site.amazonDomain}/dp/${String(post.asin).toUpperCase()}?tag=${encodeURIComponent(
      site.associateTag
    )}`;
  }
  return null;
}

function normalize(slug, data, content) {
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || "");
  const post = {
    slug,
    title: data.title || slug,
    bookAuthor: data.bookAuthor || "",
    date,
    category: data.category || "General",
    excerpt: data.excerpt || "",
    image: data.image || "",
    asin: data.asin ? String(data.asin) : "",
    amazonUrl: data.amazonUrl || "",
    sponsored: Boolean(data.sponsored),
    draft: Boolean(data.draft),
    content,
  };
  post.link = affiliateUrl(post);
  return post;
}

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const isProd = process.env.NODE_ENV === "production";
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(raw);
      return normalize(slug, data, content);
    })
    // Safety net: in production, never publish drafts or posts without a valid affiliate link
    // (this keeps the placeholder sample posts from ever going live).
    .filter((p) => !isProd || (!p.draft && p.link))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getCategories() {
  const counts = {};
  for (const p of getAllPosts()) counts[p.category] = (counts[p.category] || 0) + 1;
  return Object.entries(counts).map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export async function renderMarkdown(markdown) {
  const file = await remark().use(html).process(markdown);
  return String(file);
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
