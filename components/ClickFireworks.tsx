"use client";

import { useEffect, useRef } from "react";
import { isCapableDevice, measureFps } from "../lib/devicePerf";
import { makeBurst, drawFrame, type Spark, type Ring } from "../lib/fireworks";

const MIN_FPS = 45;

export default function ClickFireworks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !isCapableDevice()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = 0, slow = 0;
    let running = false, cancelled = false, attached = false;
    let sparks: Spark[] = [];
    let rings: Ring[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const disable = () => {
      sparks = [];
      rings = [];
      ctx.clearRect(0, 0, w, h);
      window.removeEventListener("pointerdown", onDown);
      attached = false;
    };

    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      slow = dt > 34 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 12) { running = false; disable(); return; }

      const next = drawFrame(ctx, w, h, sparks, rings);
      sparks = next.sparks;
      rings = next.rings;
      if (sparks.length || rings.length) raf = requestAnimationFrame(loop);
      else { running = false; ctx.clearRect(0, 0, w, h); }
    };

    const onDown = (e: PointerEvent) => {
      const b = makeBurst(e.clientX, e.clientY);
      sparks.push(...b.sparks);
      rings.push(...b.rings);
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    measureFps().then((fps) => {
      if (cancelled || fps < MIN_FPS) return;
      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointerdown", onDown, { passive: true });
      attached = true;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (attached) window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />;
}
