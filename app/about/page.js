import Link from "next/link";
import { site } from "../../lib/site";

export const metadata = {
  title: "About",
  description: `About ${site.author} and why ${site.name} exists.`,
};

export default function About() {
  return (
    <div className="narrow prose">
      <h1>About Me</h1>

      {/* TODO: Replace this page with your real story. Real, personal details build trust
          (with readers, Google and Amazon). */}
      <p>
        Hi, I'm <strong>{site.author}</strong>, and I run {site.name}. I love reading, and I
        started this site to help people decide quickly whether a book is worth their time.
      </p>

      <h2>What you'll find here</h2>
      <p>
        Short, original summaries of books I've read or researched, written in my own words, so you
        can understand the main ideas before you buy. When a book sounds right for you, there's a
        button to read it on Kindle.
      </p>

      <h2>How the site makes money</h2>
      <p>
        {site.name} is a participant in the Amazon Associates Program. {site.amazonStatement} That
        means that if you click a link and buy something, I may earn a small commission at no extra
        cost to you. I also occasionally publish clearly labelled sponsored posts. Everything is
        explained on the <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> page.
      </p>

      <h2>My promise</h2>
      <ul>
        <li>My summaries are written by me, in my own words.</li>
        <li>Commissions and sponsorships never decide what I say about a book.</li>
        <li>I'll always tell you when a link is an affiliate link or a post is sponsored.</li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Have a book suggestion, a correction, or a question? Visit the{" "}
        <Link href="/contact">Contact page</Link>. Authors and publishers can learn about{" "}
        <Link href="/paid-promotion">paid promotion here</Link>.
      </p>
    </div>
  );
}
