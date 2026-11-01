import { makeHandler } from "../../../lib/handler";

export const POST = makeHandler({
  subject: "New paid promotion enquiry",
  required: ["name", "email", "bookTitle", "message", "consent"],
  labels: {
    name: "Name",
    email: "Email",
    company: "Company / Publisher",
    type: "Promotion type",
    bookTitle: "Book title",
    bookLink: "Book link",
    budget: "Budget",
    message: "Details",
  },
});
