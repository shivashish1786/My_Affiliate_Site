import { makeHandler } from "../../../lib/handler";

export const POST = makeHandler({
  subject: "New contact message",
  required: ["name", "email", "message"],
  labels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
});
