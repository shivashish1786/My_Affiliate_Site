import Link from "next/link";
import { site } from "../../lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

export default function PrivacyPolicy() {
  return (
    <div className="narrow prose legal">
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: {site.legalUpdated}</em>
      </p>

      <p>
        This Privacy Policy explains how {site.name} ("we", "us", "our"), available at{" "}
        {site.url}, collects, uses and shares information when you visit the site.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> If you use the Contact or Paid Promotion form,
          we receive your name, email address and the content of your message.
        </li>
        <li>
          <strong>Automatic information.</strong> Like most websites, our hosting provider may
          collect technical data such as your IP address, browser type, device, pages viewed and
          referring website. We may use privacy-focused analytics (for example, Vercel Analytics)
          to understand how the site is used.
        </li>
        <li>
          <strong>Cookies.</strong> This site itself uses few or no cookies. Third parties,
          including Amazon, may set cookies when you click an affiliate link (see below).
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To reply to your messages and promotion enquiries.</li>
        <li>To operate, secure and improve the site.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>3. Affiliate links and Amazon</h2>
      <p>
        {site.name} is a participant in the Amazon Associates Program. {site.amazonStatement} When
        you click an Amazon link on our site, you leave our site and go to Amazon. Amazon (and
        its advertising and tracking technologies) may use cookies to record that you came from
        our site so that we can be credited with a commission on qualifying purchases. Amazon's
        handling of your data is governed by Amazon's own Privacy Notice, which we encourage you
        to read. We do not receive your Amazon account details or payment information.
      </p>

      <h2>4. Third-party services</h2>
      <p>We use the following types of service providers to run the site:</p>
      <ul>
        <li>Hosting and delivery (Vercel Inc.).</li>
        <li>Email delivery for form submissions (Resend).</li>
        <li>Analytics, if enabled (for example Vercel Analytics or Google Analytics).</li>
        <li>Amazon, through affiliate links.</li>
      </ul>
      <p>
        These providers process data under their own privacy policies. We encourage you to review
        them.
      </p>

      <h2>5. How long we keep information</h2>
      <p>
        We keep messages sent through our forms only for as long as needed to respond and for
        reasonable record-keeping, then delete them.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live (for example under India's Digital Personal Data Protection Act,
        2023, or the EU/UK GDPR), you may have the right to access, correct or delete your personal
        data, withdraw consent, or complain to a regulator. To exercise these rights, please{" "}
        <Link href="/contact">contact us</Link> or email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>7. Children's privacy</h2>
      <p>
        This site is not directed to children under 13 and we do not knowingly collect personal
        information from children. If you believe a child has sent us information, please contact
        us and we will delete it.
      </p>

      <h2>8. Security</h2>
      <p>
        We take reasonable steps to protect your information, but no method of transmission over
        the internet is completely secure.
      </p>

      <h2>9. External links</h2>
      <p>
        This site links to third-party websites. We are not responsible for their content or
        privacy practices.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The "Last updated" date at the top shows when
        it was last changed.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use
        the <Link href="/contact">Contact page</Link>.
      </p>
    </div>
  );
}
