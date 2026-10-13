import { KeyRound, Landmark, Pill } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/data";

const icons = { landmark: Landmark, key: KeyRound, pill: Pill };

/** Stylised app mock-up generated from the project's accent colours. */
export default function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const [a, b] = project.accent;
  const Icon = icons[project.icon];
  if (project.images?.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg/80 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <i className="h-2 w-2 rounded-full bg-red-400/80" />
          <i className="h-2 w-2 rounded-full bg-amber-300/80" />
          <i className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-3 h-4 flex-1 truncate rounded-md bg-white/5 px-2 text-[9px] leading-4 text-slate-500">
            {project.links.live.replace("https://", "") || project.title.toLowerCase()}
          </span>
        </div>
        <div className="relative aspect-[1400/640]">
          <Image
            src={project.images[0]}
            alt={`${project.title} screenshot`}
            fill
            sizes={large ? "(max-width: 1152px) 100vw, 1100px" : "(max-width: 640px) 90vw, 520px"}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  const bars = [42, 68, 52, 84, 60, 92, 74];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10"
      style={{ background: `linear-gradient(135deg, ${a}33, ${b}22 60%, #0b0d1a)` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${a}66` }} />
      <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full blur-3xl" style={{ background: `${b}55` }} />

      <div className={`relative p-4 ${large ? "sm:p-8" : ""}`}>
        {/* window chrome */}
        <div className="rounded-xl border border-white/10 bg-bg/80 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <i className="h-2 w-2 rounded-full bg-red-400/80" />
            <i className="h-2 w-2 rounded-full bg-amber-300/80" />
            <i className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-3 h-4 flex-1 rounded-md bg-white/5 px-2 text-[9px] leading-4 text-slate-500">
              {project.title.toLowerCase()}.vercel.app
            </span>
          </div>
          <div className="flex gap-3 p-3">
            <div className="hidden w-14 shrink-0 space-y-2 sm:block">
              <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
                <Icon size={16} className="text-white" />
              </div>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-2 rounded bg-white/10" style={{ width: `${70 - i * 10}%` }} />
              ))}
            </div>
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {project.highlights.map((h) => (
                  <div key={h.label} className="rounded-lg bg-white/5 p-2">
                    <div className="truncate text-[10px] font-bold text-white">{h.value}</div>
                    <div className="truncate text-[8px] text-slate-500">{h.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex h-20 items-end gap-1.5 rounded-lg bg-white/5 p-2 sm:h-24">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 animate-float rounded-t"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${a}, ${b})`,
                      animationDelay: `${i * -0.7}s`,
                      animationDuration: "5s",
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(project.flow ?? []).map((f) => (
                  <span key={f} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
