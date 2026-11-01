import Link from "next/link";
import Form from "../../components/Form";
import { site } from "../../lib/site";

export const metadata = {
  title: "Paid Promotion",
  description: `Promote your book on ${site.name} with a clearly labelled sponsored post.`,
};

const fields = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Your email", type: "email", required: true },
  { name: "company", label: "Company / publisher (optional)" },
  {
    name: "type",
    label: "What are you interested in?",
    type: "select",
    options: ["Sponsored book summary post", "Featured placement on homepage", "Something else"],
  },
  { name: "bookTitle", label: "Book title", required: true },
  { name: "bookLink", label: "Link to the book (Amazon or other)", type: "url" },
  { name: "budget", label: "Budget (optional)" },
  {
    name: "message",
    label: "Tell me about the book and your goals",
    type: "textarea",
    required: true,
  },
  {
    name: "consent",
    type: "checkbox",
    required: true,
    label:
      "I understand that sponsored posts are clearly labelled as 'Sponsored', that the review reflects the author's honest opinion, and that a positive review is not guaranteed.",
  },
];

export default function PaidPromotion() {
  return (
    <div className="narrow">
      <h1>Paid Promotion</h1>
      <p>
        Are you an author or publisher? I publish sponsored book summaries for readers who love
        discovering new books. Fill in the form below and I'll reply with availability and rates.
      </p>

      <h2>How sponsored posts work</h2>
      <ul>
        <li>
          Every sponsored post is clearly labelled <strong>"Sponsored"</strong> at the top of the
          post and on the homepage card.
        </li>
        <li>
          Payment buys the placement, not a good opinion. I write honest summaries and may mention
          weaknesses.
        </li>
        <li>I only promote books I'm comfortable recommending to my readers.</li>
        <li>
          Links to Amazon are affiliate links and I may also earn a commission from purchases. See
          the <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
        </li>
        <li>Content must be lawful, original and must not mislead readers.</li>
      </ul>

      <h2>Send an enquiry</h2>
      <Form endpoint="/api/promo" fields={fields} submitLabel="Send enquiry" />
    </div>
  );
}
