import { createFileRoute } from "@tanstack/react-router";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/reading-list")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { headers: corsHeaders }),
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}) as any);
        const email = String(body?.email ?? "").trim().toLowerCase();

        if (!EMAIL_RE.test(email) || email.length > 254) {
          return json({ ok: false, error: "invalid_email" }, 400);
        }

        try {
          const { sendTemplateEmail } = await import(
            "@/lib/email-templates/send-email"
          );
          const result = await sendTemplateEmail("reading-list", email, {
            idempotencyKey: `reading-list-${email}`,
          });
          return json({ ok: true, note: result.sent ? "sent" : "suppressed" });
        } catch (error) {
          console.error("reading-list send failed", error);
          return json({ ok: false, error: "send_failed" }, 502);
        }
      },
    },
  },
});
