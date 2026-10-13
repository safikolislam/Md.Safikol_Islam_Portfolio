"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile, projects, skillGroups } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";
import TechLogo from "./TechLogo";

const RESUME_PATH = "/SAFIKOL_ISLAM_RESUME.pdf";

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1400);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((n) => n + 1);
          }
        }
      },
      del ? 35 : 75,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="font-mono text-brand-cyan">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-brand-cyan" />
    </span>
  );
}

const techCount = new Set(skillGroups.flatMap((g) => g.items)).size;

const stats = [
  { value: `${projects.length}`, label: "Full-stack projects" },
  { value: "2", label: "Databases (SQL + NoSQL)" },
  { value: `${techCount}+`, label: "Technologies" },
];

const fade = (d: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section id="home" className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div {...fade(0.05)} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to work · Available for new roles
          </motion.div>

          <motion.p {...fade(0.15)} className="mb-2 font-mono text-sm text-slate-400">
            Hi there, I&apos;m
          </motion.p>
          <motion.h1 {...fade(0.25)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>
          <motion.p {...fade(0.35)} className="mt-5 min-h-[2rem] text-xl sm:text-2xl">
            <Typewriter words={profile.roles} />
          </motion.p>
          <motion.p {...fade(0.45)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I build fast, secure and role-based full-stack web apps with{" "}
            <span className="text-white">Next.js, TypeScript, Node.js, Prisma</span> and{" "}
            <span className="text-white">PostgreSQL / MongoDB</span>, from pixel-perfect UI to REST APIs and cloud deployment.
          </motion.p>

          <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/#projects" className="btn-primary">
              <Sparkles size={16} /> View my projects
            </Link>
            <a href={RESUME_PATH} download="SAFIKOL_ISLAM_RESUME.pdf" className="btn-ghost">
              <Download size={16} /> Resume
            </a>
          </motion.div>

          <motion.div {...fade(0.65)} className="mt-8 flex items-center gap-4 text-slate-400">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="glass grid h-11 w-11 place-items-center rounded-full transition hover:-translate-y-1 hover:text-white">
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="glass grid h-11 w-11 place-items-center rounded-full transition hover:-translate-y-1 hover:text-white">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin size={14} /> {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[15rem] sm:max-w-[16rem] lg:max-w-[19rem]"
        >
          <div className="absolute -inset-4 animate-spinSlow rounded-[2.5rem] bg-[conic-gradient(from_0deg,#7c5cff,#22d3ee,#f472b6,#7c5cff)] opacity-60 blur-2xl" />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-brand via-brand-cyan to-brand-pink p-[2px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-surface">
              <Image
                src="/safikol.jpg"
                alt="Md. Safikol Islam, Full-stack Web Developer"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 320px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-brand/10 mix-blend-multiply" />
            </div>
          </div>

          {/* floating tech logos */}
          <TechLogo name="javascript" className="absolute -left-4 top-4 sm:-left-12 animate-float [animation-delay:0s]" />
          <TechLogo name="html5" className="absolute -right-4 top-12 sm:-right-12 animate-float [animation-delay:-1s]" />
          <TechLogo name="react" className="absolute -left-5 top-[40%] sm:-left-16 animate-float [animation-delay:-2s]" />
          <TechLogo name="mongodb" className="absolute -right-5 top-[56%] sm:-right-14 animate-float [animation-delay:-3s]" />
          <TechLogo name="nextjs" className="absolute -left-3 bottom-6 sm:-left-10 animate-float [animation-delay:-4s]" />
          <TechLogo name="postgresql" className="absolute -right-3 -bottom-4 sm:-right-10 animate-float [animation-delay:-5s]" />
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div {...fade(0.8)} className="mt-20 grid grid-cols-3 gap-3 sm:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 text-center sm:p-6">
            <div className="text-gradient font-display text-3xl font-bold sm:text-5xl">{s.value}</div>
            <div className="mt-1 text-[11px] leading-tight text-slate-400 sm:text-sm">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <Link href="/#about" aria-label="Scroll down" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-slate-500 hover:text-white md:block">
        <ArrowDown className="animate-bounce" size={22} />
      </Link>
    </section>
  );
}
