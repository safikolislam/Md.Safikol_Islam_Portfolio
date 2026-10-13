import { NextResponse } from "next/server";
import { z } from "zod";
import { mailConfigured, sendContactMail } from "@/lib/mail";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email.").max(120),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(3000),
  website: z.string().optional().default(""), // honeypot
});

// Tiny in-memory rate limit: 5 messages / 10 min / IP (per server instance)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, subject, message, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // bot: pretend success

  const hasDb = Boolean(process.env.DATABASE_URL);
  const hasMail = mailConfigured();
  if (!hasDb && !hasMail) {
    console.error("Neither DATABASE_URL nor SMTP_USER/SMTP_PASS is set; message not delivered.", { name, email });
    return NextResponse.json({ error: "Messaging is temporarily unavailable. Please email me directly." }, { status: 503 });
  }

  // Save to database and email you in parallel; succeed if at least one worked.
  const tasks: Promise<unknown>[] = [];
  if (hasDb) tasks.push(getPrisma().message.create({ data: { name, email, subject: subject || null, message } }));
  if (hasMail) tasks.push(sendContactMail({ name, email, subject, message }));
  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("Contact delivery step failed:", r.reason));

  if (results.some((r) => r.status === "fulfilled")) return NextResponse.json({ ok: true }, { status: 201 });
  return NextResponse.json({ error: "Could not send your message. Please email me directly." }, { status: 500 });
}
