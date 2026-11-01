// Shared logic for the Contact and Paid Promotion form endpoints.

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function sendMail({ subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  if (!key || !to) throw new Error("Email is not configured on the server.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Email provider error: ${await res.text()}`);
}

/**
 * makeHandler({ subject, required, labels })
 * - `required`: field names that must be non-empty
 * - `labels`: { fieldName: "Human label" } in the order they should appear in the email
 */
export function makeHandler({ subject, required, labels }) {
  return async function POST(request) {
    let data;
    try {
      data = await request.json();
    } catch {
      return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: real visitors never fill this hidden field, bots do.
    if (data.website) return Response.json({ ok: true });

    for (const field of required) {
      if (!String(data[field] ?? "").trim()) {
        return Response.json(
          { ok: false, error: "Please fill in all required fields." },
          { status: 400 }
        );
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || ""))) {
      return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    // Basic size limit
    for (const v of Object.values(data)) {
      if (String(v).length > 5000) {
        return Response.json({ ok: false, error: "Message is too long." }, { status: 400 });
      }
    }

    const rows = Object.entries(labels)
      .filter(([key]) => data[key])
      .map(([key, label]) => `<p><strong>${esc(label)}:</strong><br>${esc(data[key]).replace(/\n/g, "<br>")}</p>`)
      .join("");

    try {
      await sendMail({
        subject: `${subject} - ${String(data.name || "").slice(0, 60)}`,
        html: rows,
        replyTo: data.email,
      });
      return Response.json({ ok: true });
    } catch (err) {
      console.error(err);
      return Response.json(
        { ok: false, error: "Could not send your message right now. Please email us directly." },
        { status: 500 }
      );
    }
  };
}
