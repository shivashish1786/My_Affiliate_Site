import Link from "next/link";
import PostCard from "../components/PostCard";
import { getAllPosts, getCategories } from "../lib/posts";
import { site } from "../lib/site";

export default function Home() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="wrap">
      <section className="hero">
        <h1>{site.tagline}</h1>
        <p>
          Quick summaries in plain language. If a book sounds right for you, tap the button to read
          it on Kindle.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: 10 }}>
          {site.amazonStatement} <Link href="/affiliate-disclosure">Learn more</Link>
        </p>
      </section>

      {categories.length > 0 && (
        <div className="chips" aria-label="Categories">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="chip">
              {c.name} ({c.count})
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="empty">
          <p>No posts yet. New book summaries are coming soon!</p>
        </div>
      ) : (
        <div className="grid">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
