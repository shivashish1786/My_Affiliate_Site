import Link from "next/link";
import { site } from "../../lib/site";

export const metadata = {
  title: "Affiliate Disclosure",
  description: `How ${site.name} earns money through affiliate links and sponsored posts.`,
};

export default function AffiliateDisclosure() {
  return (
    <div className="narrow prose legal">
      <h1>Affiliate Disclosure</h1>
      <p>
        <em>Last updated: {site.legalUpdated}</em>
      </p>

      <div className="notice">
        <strong>{site.amazonStatement}</strong>
      </div>

      <h2>Amazon Associates</h2>
      <p>
        {site.name} is a participant in the Amazon Services LLC Associates Program (and its local
        equivalents, such as Amazon India's Associates Program), an affiliate advertising program
        designed to provide a means for sites to earn advertising fees by advertising and linking
        to Amazon sites.
      </p>
      <p>
        When you click a link to Amazon on this site, such as the "Read on Kindle" button, and then
        make a qualifying purchase, I may earn a small commission. <strong>It costs you
        nothing extra.</strong> The price you pay is the same whether or not you use my link.
      </p>

      <h2>How I mark affiliate links</h2>
      <ul>
        <li>Each post that contains an affiliate link has a disclosure at the top, above the link.</li>
        <li>Each affiliate button is followed by a short note that it is an affiliate link.</li>
        <li>The Amazon Associates statement appears in the footer of every page.</li>
      </ul>

      <h2>Sponsored posts</h2>
      <p>
        From time to time, authors or publishers pay me to publish a post about their book. These
        posts are always labelled <strong>"Sponsored"</strong>. Being paid does not change my
        opinion, and I will not promise a positive review. See{" "}
        <Link href="/paid-promotion">Paid Promotion</Link>.
      </p>

      <h2>Prices and availability</h2>
      <p>
        I do not display prices on this site. Prices, availability, Kindle Unlimited eligibility and
        product details can change at any time. Please check the Amazon page for the current
        information before you buy.
      </p>

      <h2>Honest opinions</h2>
      <p>
        My summaries are written in my own words and reflect my honest views. Affiliate commissions
        and sponsorships never decide which books I recommend or what I say about them.
      </p>

      <h2>Trademarks</h2>
      <p>
        Amazon, Kindle and the Amazon and Kindle logos are trademarks of Amazon.com, Inc. or its
        affiliates. This site is independent and is not endorsed by or affiliated with Amazon.
      </p>

      <h2>Questions?</h2>
      <p>
        If you have any questions about this disclosure, please <Link href="/contact">contact me</Link>.
      </p>
    </div>
  );
}
