# Kindle Book Summary Affiliate Site (Next.js + Vercel)

Book-summary posts with a "Read on Kindle" affiliate button, plus About, Contact, Paid Promotion,
Privacy Policy and Affiliate Disclosure pages, built to meet Amazon Associates requirements.

## Quick start

```bash
npm install
cp .env.example .env.local     # then edit the values
npm run dev                    # http://localhost:3000
```

## Publishing a new post (your daily workflow)

1. `npm run new-post "Book Title"` creates `content/posts/book-title.md`.
2. Open the file and fill in:
   - `asin` (10-character ID from the book's Amazon page) **or** `amazonUrl` (SiteStripe link)
   - `image` (cover URL from SiteStripe's Image link; do not download and re-host it)
   - `category`, `excerpt`, `bookAuthor`
   - your **own** summary text (see rules below)
3. Set `draft: false`.
4. `git add . && git commit -m "Add book-title" && git push`.
5. Vercel rebuilds automatically; the post is live in about a minute.

Posts that are drafts or have no valid affiliate link are hidden in production automatically.
Delete the two sample posts (`atomic-habits.md`, `deep-work.md`) before launch, or give them real ASINs.

## Deploying on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com -> Add New -> Project -> import the repo (framework auto-detected as Next.js).
3. Add the environment variables from `.env.example` (Settings -> Environment Variables).
4. Deploy. Then add your custom domain (Settings -> Domains) and set `NEXT_PUBLIC_SITE_URL` to it.
5. Optional: enable Web Analytics in the Vercel dashboard (privacy-friendly).

## Making the forms work

Contact and Paid Promotion forms email you through [Resend](https://resend.com) (free tier):
create an account, create an API key, put it in `RESEND_API_KEY`, and set `CONTACT_TO_EMAIL`.
To send from your own domain, verify the domain in Resend and set `CONTACT_FROM_EMAIL`.

## Amazon Associates checklist

Before applying
- [ ] Site is live on its own domain with several original posts (aim for 10-15) and all legal pages.
- [ ] Replace the About page text with your real story; use a real name and contact email.
- [ ] Domain/site name does not contain "Amazon" or "Kindle".
- [ ] Apply with the **marketplace you will promote**. From India: Amazon.in Associates
      (affiliate-program.amazon.in). Each marketplace has its own account and Tracking ID.

After approval (provisional)
- [ ] You must refer **3 qualifying sales from real customers within 180 days** or the account closes.
      Your own purchases do not count.
- [ ] Put your Tracking ID in `NEXT_PUBLIC_AMAZON_TAG` and the marketplace in `NEXT_PUBLIC_AMAZON_DOMAIN`.
- [ ] Keep the exact statement "As an Amazon Associate I earn from qualifying purchases." visible
      (this site puts it in the footer, at the top of every post, and under every button).

Ongoing rules (read Amazon's Program Policies and Operating Agreement; they change)
- [ ] **Never** show prices, "deals" or discounts from memory. Only Amazon's own tools may display prices.
- [ ] **No link cloaking or third-party shorteners.** Use full Amazon links or Amazon's amzn.to links.
- [ ] **Do not put affiliate links in emails, PDFs, ebooks or offline material.**
- [ ] Do not copy Amazon descriptions, reviews or images into your own files. Use SiteStripe image links.
- [ ] Do not copy a publisher's blurb or text from the book. Write your own summary.
- [ ] Do not offer cashback, rewards or incentives for clicking or buying.
- [ ] Do not click your own links or ask friends to buy just to hit the 3-sale target.
- [ ] Do not make false claims about a book, a price or Amazon.
- [ ] Disclose sponsored posts (`sponsored: true`), and keep disclosures near the links.
- [ ] Use `rel="sponsored nofollow"` on affiliate links (already done in this project).
- [ ] Disclaimer in the footer that Amazon and Kindle are trademarks of Amazon.com, Inc. (already done).

## Getting your first 3 sales (180-day clock)

- Submit the site to Google Search Console (`/sitemap.xml` is generated automatically).
- Write about books people actively search for ("Atomic Habits summary", "books like ...").
- Share posts on Pinterest, Instagram, Telegram/WhatsApp channels, Quora and Reddit where allowed.
  Check each platform's rules, and always disclose affiliate links.
- Keep publishing consistently, a few posts per week.

## Legal note

The Privacy Policy and Disclosure pages are good-faith templates, not legal advice. Have them reviewed
if you collect more data than a contact form, or run ads/analytics that set cookies (you may then need
a cookie consent banner).

## Project structure

```
app/                 pages (home, posts, category, about, contact, paid-promotion, legal, api)
components/          Header, Footer, PostCard, Form
content/posts/       your posts as Markdown files
lib/site.js          site name, Amazon tag, disclosure text
lib/posts.js         reads posts, builds affiliate links
scripts/new-post.mjs post template generator
```
