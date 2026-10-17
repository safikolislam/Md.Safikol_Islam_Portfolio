import { ArrowUp, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { navLinks, profile, projects } from "@/lib/data";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-bg/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-cyan text-sm shadow-[0_0_25px_-4px_rgba(124,92,255,0.9)]">SI</span>
            <span>{profile.shortName}<span className="text-brand-cyan">.</span>dev</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Full-stack web developer crafting fast, secure and role-based web apps. Open to new opportunities.
          </p>
          <div className="mt-5 flex gap-3">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {profile.facebook && (
              <a href={profile.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            <a href={`mailto:${profile.email}`} aria-label="Email" className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-white">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-cyan">Navigate</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-slate-400 transition hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-cyan">Projects</h3>
          <ul className="space-y-2.5 text-sm">
            {projects.map((p) => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className="text-slate-400 transition hover:text-white">{p.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-cyan">Contact</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><a href={`mailto:${profile.email}`} className="break-all transition hover:text-white">{profile.email}</a></li>
            <li><a href={`tel:${profile.phone}`} className="transition hover:text-white">{profile.phone}</a></li>
            <li className="flex items-center gap-1.5"><MapPin size={14} /> {profile.location}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 text-sm text-slate-500 sm:px-8">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a href="#home" aria-label="Back to top" className="glass grid h-10 w-10 place-items-center rounded-full text-white transition hover:-translate-y-1 hover:border-brand-cyan/60">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
