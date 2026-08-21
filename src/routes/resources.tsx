import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { readingGroups, READING_PACK_URL, SHORT_URL } from "@/lib/reading-list";

type Status = "idle" | "sending" | "sent" | "error";

export function ResourcesPage() {
  const presentationUrl = import.meta.env.BASE_URL;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(apiUrl("/api/public/reading-list"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (response.ok && result.ok) {
        setStatus("sent");
        setMessage("Check your inbox — the reading list is on its way.");
      } else if (result.error === "invalid_email") {
        setStatus("error");
        setMessage("Please enter a valid email address.");
      } else {
        setStatus("error");
        setMessage("We could not send the email just now. The full list is below.");
      }
    } catch {
      setStatus("error");
      setMessage("We could not send the email just now. The full list is below.");
    }
  };

  const copyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(`https://${SHORT_URL}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="resources-page">
      <header className="resources-head">
        <p className="resources-kicker">Meta Trends // Companion</p>
        <h1>Go deeper</h1>
        <p className="resources-deck">The sources behind the conversation.</p>
      </header>

      <section className="resources-actions" aria-label="Get the reading list">
        <form className="resources-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">Email (optional)</label>
          <div className="resources-form-row">
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Email me the reading list"}
            </button>
          </div>
          <p className="resources-privacy">
            One email, sent only when you ask. No newsletter, no sharing, no selling.
          </p>
          {message ? (
            <p className={`resources-status ${status}`} role="status" aria-live="polite">
              {message}
            </p>
          ) : null}
        </form>

        <div className="resources-secondary">
          <a className="resources-download" href={READING_PACK_URL} download>
            Download the reading pack
          </a>
          <button type="button" className="resources-copy" onClick={copyShortUrl}>
            <span>{SHORT_URL}</span>
            <b>{copied ? "COPIED" : "COPY"}</b>
          </button>
        </div>
      </section>

      <section className="resources-list">
        {readingGroups.map((group) => (
          <article key={group.id} className="resources-group">
            <h2>{group.label}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer noopener">
                    {link.title}
                  </a>
                  <span>{link.author}</span>
                  <p>{link.note}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <footer className="resources-foot">
        <a href={presentationUrl}>← Back to the presentation</a>
        <span>EY Managers // Meta Trends</span>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Go deeper — Meta Trends reading list" },
      {
        name: "description",
        content:
          "The sources behind Meta Trends: intelligence, science and health, energy and civilisation, work and society. Read them, or have the list emailed to you.",
      },
      { property: "og:title", content: "Go deeper — Meta Trends reading list" },
      {
        property: "og:description",
        content: "The reading list behind the Meta Trends conversation, in four sections.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});
