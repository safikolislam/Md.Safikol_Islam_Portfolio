"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal, SectionHeading } from "./Reveal";

function WhatsappIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const WHATSAPP_URL = `https://wa.me/${profile.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Safikol, I saw your portfolio and would like to talk.")}`;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const info = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: WhatsappIcon, label: "WhatsApp", value: "Chat on WhatsApp", href: WHATSAPP_URL },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="section">
      <SectionHeading eyebrow="Contact" title="Let's work together" sub="Have a role, project or question? Send me a message and I'll get back to you soon." />

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-4">
          {info.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-brand/50">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-cyan/20 text-brand-cyan">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-slate-500">{label}</div>
                  <div className="truncate text-sm font-medium text-white sm:text-base">{value}</div>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block">{inner}</a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
          <div className="flex gap-3 pt-2">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="glass grid h-12 w-12 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="glass grid h-12 w-12 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="glass grid h-12 w-12 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-emerald-400">
              <WhatsappIcon size={20} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={onSubmit} className="glass relative space-y-4 overflow-hidden rounded-3xl p-6 sm:p-8" noValidate={false}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">Your name</label>
                <input id="name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="John Doe" className="input" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">Email address</label>
                <input id="email" name="email" type="email" required maxLength={120} autoComplete="email" placeholder="you@company.com" className="input" />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-slate-400">Subject (optional)</label>
              <input id="subject" name="subject" maxLength={120} defaultValue={defaultSubject} placeholder="Job opportunity / Project inquiry" className="input" />
            </div>
            <div className="relative">
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">Message</label>
              <textarea id="message" name="message" required minLength={10} maxLength={3000} rows={6} placeholder="Write your message here…" className="input resize-none" />
            </div>
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <button type="submit" disabled={status === "loading"} className="btn-primary relative w-full disabled:opacity-70 sm:w-auto">
              {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {status === "loading" ? "Sending…" : "Send message"}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300" role="status">
                  <CheckCircle2 size={18} /> Thanks! Your message has been sent. I&apos;ll reply soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300" role="alert">
                  <TriangleAlert size={18} /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
