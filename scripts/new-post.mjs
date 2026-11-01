// Usage: npm run new-post "Atomic Habits"
// Creates content/posts/atomic-habits.md with a ready-to-fill template.
import fs from "fs";
import path from "path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Please give a book title, e.g.  npm run new-post "Atomic Habits"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");
const file = path.join(process.cwd(), "content", "posts", `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const template = `---
title: "${title} - Book Summary"
bookAuthor: "Author Name"
date: ${today}
category: "Self-Improvement"
excerpt: "One or two sentences that make people want to read the summary."
# Paste the book cover image URL from Amazon SiteStripe (Image link). Do NOT download and re-host Amazon images.
image: ""
# The 10-character ASIN from the book's Amazon page (Product information section). Kindle books usually start with B0.
asin: ""
# Optional: paste an Amazon SiteStripe short link (amzn.to/...) instead of using the ASIN.
amazonUrl: ""
sponsored: false   # set to true if the publisher/author paid you for this post
draft: true        # change to false when you are ready to publish
---

Write your OWN summary here. Do not copy the publisher's description, the Amazon blurb, or text from the book.

## What this book is about

## Key ideas

- Idea one
- Idea two
- Idea three

## Who should read it

## My take
`;

fs.writeFileSync(file, template);
console.log(`Created ${path.relative(process.cwd(), file)}`);
console.log("Fill in the details, set draft: false, then commit and push to publish.");
