"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { projects } from "@/lib/data";
import { GithubIcon } from "./icons";
import ProjectVisual from "./ProjectVisual";

export default function ProjectsCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef} aria-roledescription="carousel" aria-label="Projects">
        <div className="-ml-5 flex">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="min-w-0 shrink-0 grow-0 basis-[92%] pl-5 sm:basis-[70%] lg:basis-[48%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${projects.length}`}
            >
              <article
                className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition-colors hover:border-white/30"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(380px circle at var(--mx,50%) var(--my,50%), ${p.accent[0]}26, transparent 60%)` }}
                />
                <Link href={`/projects/${p.slug}`} className="relative block" aria-label={`${p.title} details`}>
                  <ProjectVisual project={p} />
                </Link>

                <div className="relative mt-5 flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-cyan">{p.index} / {String(projects.length).padStart(2, "0")}</span>
                    <span className="text-xs text-slate-500">{p.category}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 6).map((t) => (
                      <span key={t} className="chip !px-2.5 !py-0.5 !text-[11px]">{t}</span>
                    ))}
                    {p.tech.length > 6 && <span className="chip !px-2.5 !py-0.5 !text-[11px]">+{p.tech.length - 6}</span>}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-1">
                    <Link href={`/projects/${p.slug}`} className="btn-primary !px-5 !py-2.5">
                      View details <ArrowRight size={15} />
                    </Link>
                    {p.links.live && (
                      <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2.5">
                        Live <ArrowUpRight size={15} />
                      </a>
                    )}
                    {p.links.frontend && (
                      <a href={p.links.frontend} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} frontend code`} className="btn-ghost !px-3.5 !py-2.5">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to ${p.title}`}
              aria-selected={selected === i}
              role="tab"
              className={`h-2 rounded-full transition-all duration-300 ${selected === i ? "w-10 bg-gradient-to-r from-brand to-brand-cyan" : "w-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => embla?.scrollPrev()} aria-label="Previous project" className="glass grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/10 active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => embla?.scrollNext()} aria-label="Next project" className="glass grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/10 active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
