import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, renderMarkdown, formatDate, slugify } from "../../../lib/posts";
import { site } from "../../../lib/site";
import PostCard from "../../../components/PostCard";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const body = await renderMarkdown(post.content);
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author },
    image: post.image || undefined,
    description: post.excerpt,
  };

  return (
    <article className="narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="post-head">
        <Link href={`/category/${slugify(post.category)}`} className="tag">
          {post.category}
        </Link>
        {post.sponsored && <span className="badge">Sponsored</span>}
        <h1>{post.title}</h1>
        <p className="meta">
          {post.bookAuthor && <>Book by {post.bookAuthor} &middot; </>}
          Reviewed by {site.author} &middot; {formatDate(post.date)}
        </p>
      </header>

      {/* Disclosure placed BEFORE the affiliate link, near the top of the post */}
      <div className="notice">
        <strong>Disclosure:</strong> This post contains affiliate links. {site.amazonStatement}{" "}
        {post.sponsored && "This post is sponsored: the author or publisher paid for it, and my opinions are my own. "}
        <Link href="/affiliate-disclosure">Read more</Link>.
      </div>

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post-cover" src={post.image} alt={`Cover of ${post.title}`} />
      )}

      <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />

      {post.link && (
        <section className="cta" aria-label="Read this book">
          <a
            className="btn"
            href={post.link}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
          >
            Read on Kindle
          </a>
          <small>
            Affiliate link. {site.amazonStatement} Price and availability are shown on Amazon.
          </small>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ marginTop: 48 }}>
          <h2>More in {post.category}</h2>
          <div className="grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
