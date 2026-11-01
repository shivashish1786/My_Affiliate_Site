import { getAllPosts, getCategories } from "../lib/posts";
import { site } from "../lib/site";

export default function sitemap() {
  const staticPages = ["", "/about", "/contact", "/paid-promotion", "/privacy-policy", "/affiliate-disclosure"].map(
    (p) => ({ url: `${site.url}${p}`, lastModified: new Date() })
  );
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/posts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  const categories = getCategories().map((c) => ({ url: `${site.url}/category/${c.slug}` }));
  return [...staticPages, ...posts, ...categories];
}
