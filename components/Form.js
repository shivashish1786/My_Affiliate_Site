"use client";

import { useState } from "react";

export default function Form({ endpoint, fields, submitLabel = "Send" }) {
  const [state, setState] = useState({ status: "idle", message: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Checkboxes: FormData only includes checked boxes
    for (const f of fields) if (f.type === "checkbox") data[f.name] = data[f.name] ? "Yes" : "";

    setState({ status: "sending", message: "" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setState({ status: "ok", message: "Thank you! Your message has been sent. We'll reply soon." });
    } catch (err) {
      setState({ status: "err", message: err.message });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {fields.map((f) => {
        if (f.type === "checkbox") {
          return (
            <label key={f.name} className="check">
              <input type="checkbox" name={f.name} required={f.required} />
              <span>{f.label}</span>
            </label>
          );
        }
        return (
          <label key={f.name}>
            <span>
              {f.label}
              {f.required ? " *" : ""}
            </span>
            {f.type === "textarea" ? (
              <textarea name={f.name} rows={6} required={f.required} placeholder={f.placeholder} />
            ) : f.type === "select" ? (
              <select name={f.name} required={f.required} defaultValue={f.options[0]}>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type || "text"}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                maxLength={300}
              />
            )}
          </label>
        );
      })}

      {/* Honeypot field for bots - hidden from real users */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn" type="submit" disabled={state.status === "sending"}>
        {state.status === "sending" ? "Sending..." : submitLabel}
      </button>

      {state.message && (
        <div className={`status ${state.status}`} role="status">
          {state.message}
        </div>
      )}
    </form>
  );
}
