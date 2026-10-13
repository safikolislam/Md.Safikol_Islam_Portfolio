import { Code2, CreditCard, GraduationCap, Languages, Rocket, ShieldCheck } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

const icons = [ShieldCheck, CreditCard, Code2, Rocket];

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="About me" title="Building products, end to end" />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-slate-300">{profile.objective}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.highlights.map((h, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={h.title} className="glass group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-brand/50">
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-cyan/20 text-brand-cyan transition group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{h.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{h.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="space-y-5">
          <div className="glass rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-3 text-white">
              <GraduationCap className="text-brand-cyan" size={22} />
              <h3 className="font-display text-lg font-semibold">Education</h3>
            </div>
            <p className="font-medium text-slate-200">{profile.education.degree}</p>
            <p className="mt-1 text-sm text-slate-400">{profile.education.note}</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3 text-white">
              <Languages className="text-brand-cyan" size={22} />
              <h3 className="font-display text-lg font-semibold">Languages</h3>
            </div>
            <ul className="space-y-3">
              {profile.languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">{l.name}</span>
                  <span className="chip">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
