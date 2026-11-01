import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "../../../components/PostCard";
import { getAllPosts, getCategories, slugify } from "../../../lib/posts";

export function generateStaticParams() {
  return getCategories().map((c) => ({ name: c.slug }));
}

export function generateMetadata({ params }) {
  const cat = getCategories().find((c) => c.slug === params.name);
  return cat ? { title: `${cat.name} Book Summaries` } : {};
}

export default function CategoryPage({ params }) {
  const categories = getCategories();
  const current = categories.find((c) => c.slug === params.name);
  if (!current) notFound();
  const posts = getAllPosts().filter((p) => slugify(p.category) === current.slug);

  return (
    <div className="wrap">
      <section className="hero">
        <h1>{current.name}</h1>
        <p>
          {current.count} book summar{current.count === 1 ? "y" : "ies"} in this category.
        </p>
      </section>
      <div className="chips">
        <Link href="/" className="chip">
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`chip ${c.slug === current.slug ? "active" : ""}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="grid">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
