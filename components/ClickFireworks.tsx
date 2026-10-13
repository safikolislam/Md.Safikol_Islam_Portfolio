"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number; trail: boolean };
type Ring = { x: number; y: number; r: number; life: number; color: string };

const PALETTE = ["#7c5cff", "#22d3ee", "#f472b6", "#fbbf24", "#34d399", "#ffffff", "#fb7185"];

/** Firework burst (বাজি) wherever the visitor clicks / taps. */
export default function ClickFireworks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, running = false;
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

    const burst = (x: number, y: number) => {
      const main = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const second = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      rings.push({ x, y, r: 4, life: 1, color: main });
      // big radial burst
      const n = 46;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const sp = 3 + Math.random() * 5.5;
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.012 + Math.random() * 0.012, color: i % 3 ? main : second, size: 1.6 + Math.random() * 1.8, trail: true });
      }
      // glitter
      for (let i = 0; i < 26; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = Math.random() * 3.5;
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 1, decay: 0.01 + Math.random() * 0.01, color: PALETTE[Math.floor(Math.random() * PALETTE.length)], size: 1 + Math.random() * 1.4, trail: false });
      }
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      rings = rings.filter((r) => r.life > 0);
      for (const r of rings) {
        r.r += 4.5;
        r.life -= 0.045;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(r.life, 0) * 0.7;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        const px = s.x, py = s.y;
        s.vx *= 0.975;
        s.vy = s.vy * 0.975 + 0.09; // drag + gravity
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        if (s.trail) {
          ctx.lineWidth = s.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (0.6 + Math.random() * 0.8), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (sparks.length || rings.length) raf = requestAnimationFrame(loop);
      else { running = false; ctx.clearRect(0, 0, w, h); }
    };

    const onDown = (e: PointerEvent) => burst(e.clientX, e.clientY);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />;
}
