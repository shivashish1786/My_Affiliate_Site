// Central site settings. Everything here can be overridden with environment variables
// (see .env.example), so you rarely need to edit this file.

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "BookNook Summaries",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Short, honest book summaries to help you pick your next read.",
  description:
    "Original, easy-to-read summaries of popular books, with links to read them on Kindle.",
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Your Name",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "you@example.com",
  associateTag: process.env.NEXT_PUBLIC_AMAZON_TAG || "yourname-21",
  amazonDomain: process.env.NEXT_PUBLIC_AMAZON_DOMAIN || "www.amazon.in",
  // Exact wording Amazon requires you to show on your site.
  amazonStatement: "As an Amazon Associate I earn from qualifying purchases.",
  // Update this date whenever you change the legal pages.
  legalUpdated: "1 November 2026",
};
