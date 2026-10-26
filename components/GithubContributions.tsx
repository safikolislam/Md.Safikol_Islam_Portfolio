import { profile } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const USERNAME = profile.github.split("/").filter(Boolean).pop() ?? "";

const LEVEL_CLASS = [
  "bg-white/[0.06]",
  "bg-brand/30",
  "bg-brand/55",
  "bg-brand/80",
  "bg-brand-cyan",
];

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return Array.isArray(json.contributions) ? (json.contributions as Day[]) : null;
  } catch {
    return null;
  }
}

export default async function GithubContributions() {
  const days = await getContributions();
  if (!days || days.length === 0) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);
  // প্রথম সপ্তাহ রবিবার থেকে শুরু করতে ফাঁকা ঘর যোগ
  const pad = new Date(days[0].date).getUTCDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];

  return (
    <section id="github" className="section">
      <SectionHeading
        eyebrow="GitHub"
        title="My contributions"
        sub={`${total.toLocaleString()} contributions in the last year`}
      />
      <Reveal>
        <div className="glass rounded-3xl p-5 sm:p-8">
          <div className="overflow-x-auto pb-2">
            <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
              {cells.map((d, i) =>
                d ? (
                  <div
                    key={d.date}
                    title={`${d.count} contributions on ${d.date}`}
                    className={`h-[11px] w-[11px] rounded-[3px] ${LEVEL_CLASS[d.level]}`}
                  />
                ) : (
                  <div key={`pad-${i}`} className="h-[11px] w-[11px]" />
                ),
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              @{USERNAME} on GitHub →
            </a>
            <div className="flex items-center gap-1.5">
              Less
              {LEVEL_CLASS.map((c) => (
                <span key={c} className={`h-[11px] w-[11px] rounded-[3px] ${c}`} />
              ))}
              More
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}