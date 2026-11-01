import Form from "../../components/Form";
import { site } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${site.name}.`,
};

const fields = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Your email", type: "email", required: true },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", type: "textarea", required: true },
];

export default function Contact() {
  return (
    <div className="narrow">
      <h1>Contact Me</h1>
      <p>
        Questions, corrections or book suggestions? Send me a message and I'll get back to you as
        soon as I can. You can also email me directly at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
        Looking to promote your book? Please use the{" "}
        <a href="/paid-promotion">Paid Promotion page</a> instead.
      </p>
      <Form endpoint="/api/contact" fields={fields} submitLabel="Send message" />
    </div>
  );
}
