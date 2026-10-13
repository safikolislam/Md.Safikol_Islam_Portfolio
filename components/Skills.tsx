import { skillGroups, softSkills } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

const all = skillGroups.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="Skills" title="My tech stack" sub="Tools and technologies I use to design, build and ship full-stack applications." />

      {/* marquee */}
      <Reveal className="relative mb-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="glass whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <div className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition hover:border-white/25">
              <div className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${g.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />
              <h3 className="relative mb-5 flex items-center gap-3 font-display text-xl font-semibold text-white">
                <span className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${g.accent}`} />
                {g.title}
              </h3>
              <div className="relative flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-5">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan">Soft skills</span>
          {softSkills.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
