import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import { GithubIcon } from "@/components/icons";
import ProjectVisual from "@/components/ProjectVisual";
import { Reveal } from "@/components/Reveal";
import { profile, projects, SITE_URL } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.title}: ${p.category}`;
  return {
    title,
    description: p.tagline + " Built with " + p.tech.slice(0, 6).join(", ") + ".",
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title, description: p.tagline, url: `${SITE_URL}/projects/${p.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: p.tagline },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    url: `${SITE_URL}/projects/${p.slug}`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    keywords: p.tech.join(", "),
  };

  const links = [
    { label: "Live site", href: p.links.live, icon: ArrowUpRight },
    { label: "Frontend code", href: p.links.frontend, icon: null },
    { label: "Backend code", href: p.links.backend, icon: null },
  ].filter((l) => l.href);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto w-full max-w-6xl px-5 pb-8 pt-28 sm:px-8 md:pt-36">
        <Reveal>
          <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft size={16} /> Back to projects
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan">Project {p.index}</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
            <span className="text-gradient">{p.title}</span>
          </h1>
          <p className="mt-3 text-xl text-slate-300">{p.category}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{p.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.length === 0 && <span className="chip">Links coming soon</span>}
            {links.map((l, idx) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={idx === 0 ? "btn-primary" : "btn-ghost"}>
                {l.icon ? <l.icon size={16} /> : <GithubIcon className="h-4 w-4" />} {l.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProjectVisual project={p} large />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-white">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{p.description}</p>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-bold text-white">Key features</h2>
              <ul className="mt-5 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="glass flex gap-3 rounded-2xl p-4 text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-cyan" size={20} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {p.images && p.images.length > 1 && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-white">Screenshots</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {p.images.slice(1).map((src, n) => (
                    <div key={src} className="glass overflow-hidden rounded-2xl p-2 sm:[&:last-child:nth-child(odd)]:col-span-2">
                      <div className="relative aspect-[1400/640] overflow-hidden rounded-xl">
                        <Image src={src} alt={`${p.title} screenshot ${n + 2}`} fill sizes="(max-width: 640px) 90vw, 420px" className="object-cover object-top" />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {p.flow && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-white">Workflow</h2>
                <ol className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {p.flow.map((f, idx) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-cyan text-xs font-bold">{idx + 1}</span>
                        {f}
                      </span>
                      {idx < p.flow!.length - 1 && <ArrowRight size={16} className="hidden text-slate-600 sm:block" />}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-lg font-semibold text-white">Tech stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            {p.roles && (
              <Reveal delay={0.08}>
                <div className="glass rounded-3xl p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                    <Users size={18} className="text-brand-cyan" /> User roles
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {p.roles.map((r) => (
                      <li key={r} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </aside>
        </div>

        <Reveal className="mt-20 grid gap-4 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="glass group rounded-2xl p-6 transition hover:border-brand/50">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500"><ArrowLeft size={14} /> Previous</span>
            <span className="mt-2 block font-display text-xl font-semibold text-white">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="glass group rounded-2xl p-6 text-right transition hover:border-brand/50">
            <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-slate-500">Next <ArrowRight size={14} /></span>
            <span className="mt-2 block font-display text-xl font-semibold text-white">{next.title}</span>
          </Link>
        </Reveal>
      </article>

      <Contact defaultSubject={`About ${p.title}`} />
    </>
  );
}
