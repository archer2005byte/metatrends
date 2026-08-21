import { createServerFn } from "@tanstack/react-start";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const sendReadingList = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) {
      throw new Error("Please enter a valid email address.");
    }
    return { email };
  })
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    try {
      const result = await sendTemplateEmail("reading-list", data.email, {
        idempotencyKey: `reading-list-${data.email}`,
      });
      if (!result.sent) {
        return { ok: true as const, note: "suppressed" as const };
      }
      return { ok: true as const, note: "sent" as const };
    } catch (error) {
      console.error("reading-list send failed", error);
      return { ok: false as const, note: "failed" as const };
    }
  });
