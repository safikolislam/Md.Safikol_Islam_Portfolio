"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; tw: number };
type Star = { x: number; y: number; vx: number; vy: number; life: number };

const COLORS = ["167,139,250", "34,211,238", "244,114,182", "129,140,248"];

export default function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    let particles: P[] = [];
    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 9500), 170);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: Math.random() * 2.2 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const spawnStar = () => {
      const fromLeft = Math.random() > 0.5;
      stars.push({
        x: fromLeft ? Math.random() * w * 0.6 : w * (0.4 + Math.random() * 0.6),
        y: Math.random() * h * 0.5,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 6),
        vy: 3 + Math.random() * 4,
        life: 1,
      });
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const LINK = 150;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t + p.tw) * 0.15;
        p.y += p.vy + Math.cos(t * 0.8 + p.tw) * 0.15;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 170 && d > 0) {
          const f = (1 - d / 170) * 3;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }

        const pulse = 0.55 + Math.sin(t * 2 + p.tw) * 0.35;
        // glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, `rgba(${p.c},${0.35 * pulse})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${0.5 + pulse * 0.5})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.c},${(1 - dist / LINK) * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        if (d < 220) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 220) * 0.6})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // shooting stars
      if (Math.random() < 0.012) spawnStar();
      stars = stars.filter((s) => s.life > 0);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        const tail = 14;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
        grad.addColorStop(0, `rgba(255,255,255,${s.life})`);
        grad.addColorStop(1, "rgba(124,92,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };

    resize();
    if (reduce) { draw(); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
      <div className="aurora absolute -left-1/4 -top-1/4 h-[65vmax] w-[65vmax] rounded-full bg-brand/30 blur-[130px]" style={{ animationDuration: "14s" }} />
      <div className="aurora absolute -bottom-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full bg-brand-cyan/20 blur-[140px] [animation-delay:-6s]" style={{ animationDuration: "17s" }} />
      <div className="aurora absolute left-1/3 top-1/2 h-[40vmax] w-[40vmax] rounded-full bg-brand-pink/15 blur-[120px] [animation-delay:-10s]" style={{ animationDuration: "19s" }} />
      <div className="grid-bg absolute inset-0 animate-gridDrift" />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#05060d_105%)]" />
    </div>
  );
}
