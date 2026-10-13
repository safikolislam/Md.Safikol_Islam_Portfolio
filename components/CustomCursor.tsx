"use client";

import { useEffect, useRef } from "react";
import "./cursor.css";

const HOVER = "a, button, [role='button'], summary, label, [data-cursor='hover']";
const TEXT = "input, textarea, select";

export default function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!fine || !el) return;
    document.documentElement.classList.add("has-custom-cursor");

    let tx = 0, ty = 0, rx = 0, ry = 0, gx = 0, gy = 0;
    let raf = 0, last = 0, first = true;
    let lastTarget: EventTarget | null = null;

    const put = (n: HTMLElement | null, x: number, y: number) => {
      if (n) n.style.transform = `translate3d(${x}px,${y}px,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const kr = reduce ? 1 : 1 - Math.pow(1 - 0.2, dt / 16.67);
      const kg = reduce ? 1 : 1 - Math.pow(1 - 0.07, dt / 16.67);
      rx += (tx - rx) * kr; ry += (ty - ry) * kr;
      gx += (tx - gx) * kg; gy += (ty - gy) * kg;
      put(ring.current, rx, ry);
      put(glow.current, gx, gy);
      const gap = Math.abs(tx - rx) + Math.abs(ty - ry) + Math.abs(tx - gx) + Math.abs(ty - gy);
      raf = gap > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      put(dot.current, tx, ty);
      if (first) {
        first = false;
        rx = gx = tx; ry = gy = ty;
        el.dataset.visible = "1";
      }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      if (e.target === lastTarget) return;
      lastTarget = e.target;
      const t = e.target as Element | null;
      el.dataset.mode = t?.closest?.(TEXT) ? "text" : t?.closest?.(HOVER) ? "hover" : "idle";
    };
    const down = () => { el.dataset.down = "1"; };
    const up = () => { delete el.dataset.down; };
    const leave = () => { delete el.dataset.visible; first = true; };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={root} className="cursor-root" data-mode="idle" aria-hidden="true">
      <div ref={glow} className="c-pos"><div className="c-glow" /></div>
      <div ref={ring} className="c-pos"><div className="c-ring" /></div>
      <div ref={dot} className="c-pos"><div className="c-dot" /></div>
    </div>
  );
}
