import Link from "next/link";

export default function NotFound() {
  return (
    <div className="narrow empty">
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find that page.</p>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </div>
  );
}
