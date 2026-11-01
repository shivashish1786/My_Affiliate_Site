import Link from "next/link";
import { site } from "../lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          {site.name}
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/paid-promotion">Paid Promotion</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
