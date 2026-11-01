import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="card">
      <div className="card-img">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={`Cover of ${post.title}`} loading="lazy" />
        ) : (
          <div className="ph">{post.title}</div>
        )}
      </div>
      <div className="card-body">
        <span className="tag">
          {post.category}
          {post.sponsored && <span className="badge">Sponsored</span>}
        </span>
        <h3>{post.title}</h3>
        {post.bookAuthor && <p>by {post.bookAuthor}</p>}
        {post.excerpt && <p>{post.excerpt}</p>}
      </div>
    </Link>
  );
}
