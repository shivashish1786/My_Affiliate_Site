import Link from "next/link";
import { site } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/paid-promotion">Paid Promotion</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
        </div>
        {/* Amazon requires this exact statement to be clearly visible on the site */}
        <p className="statement">{site.amazonStatement}</p>
        <p>
          Some links on this site are affiliate links. If you buy through them, we may earn a
          commission at no extra cost to you. See our{" "}
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
        </p>
        <p>
          Amazon, Kindle and the Amazon and Kindle logos are trademarks of Amazon.com, Inc. or its
          affiliates. {site.name} is an independent site and is not endorsed by or affiliated with
          Amazon.
        </p>
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
