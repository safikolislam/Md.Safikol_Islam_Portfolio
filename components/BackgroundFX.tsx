// "use client";

// import { useEffect, useRef, useState } from "react";
// import { getTier, type Tier } from "../lib/bgTier";
// import { makeParticles, drawParticles, drawStars, type P, type Star } from "../lib/bgParticles";

// export default function BackgroundFX() {
//   const ref = useRef<HTMLCanvasElement>(null);
//   const [tier, setTier] = useState<Tier>("static");

//   useEffect(() => {
    
//     const desktop = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
//     setTier(desktop ? getTier() : "static");
//   }, []);

//   useEffect(() => {
//     const canvas = ref.current;
//     const ctx = canvas?.getContext("2d");
//     if (tier === "static" || !canvas || !ctx) return;

//     const full = tier === "full";
//     const dpr = full ? Math.min(window.devicePixelRatio || 1, 2) : 1;
//     const mouse = { x: -9999, y: -9999 };
//     let w = 0, h = 0, raf = 0, t = 0, last = 0;
//     let ps: P[] = [];
//     let stars: Star[] = [];

//     const resize = () => {
//       w = window.innerWidth;
//       h = window.innerHeight;
//       canvas.width = w * dpr;
//       canvas.height = h * dpr;
//       canvas.style.width = `${w}px`;
//       canvas.style.height = `${h}px`;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       ps = makeParticles(w, h, full);
//     };

//     const loop = (now: number) => {
//       raf = requestAnimationFrame(loop);
//       if (!full && now - last < 33) return;
//       last = now;
//       t += 0.016;
//       ctx.clearRect(0, 0, w, h);
//       drawParticles(ctx, ps, t, mouse, full, w, h);
//       if (full) stars = drawStars(ctx, stars, w, h);
//     };

//     const onVis = () => {
//       cancelAnimationFrame(raf);
//       if (!document.hidden) raf = requestAnimationFrame(loop);
//     };
//     const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
//     const onLeave = () => { mouse.x = mouse.y = -9999; };

//     resize();
//     raf = requestAnimationFrame(loop);
//     window.addEventListener("resize", resize);
//     window.addEventListener("pointermove", onMove, { passive: true });
//     document.addEventListener("visibilitychange", onVis);
//     document.documentElement.addEventListener("mouseleave", onLeave);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("pointermove", onMove);
//       document.removeEventListener("visibilitychange", onVis);
//       document.documentElement.removeEventListener("mouseleave", onLeave);
//     };
//   }, [tier]);

//   return (
//     <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
//       <div className="absolute inset-0 md:hidden bg-[radial-gradient(circle_at_15%_10%,rgba(124,92,255,0.28),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_50%_55%,rgba(244,114,182,0.10),transparent_40%)]" />
//       <div className="aurora absolute -left-1/4 -top-1/4 hidden h-[65vmax] w-[65vmax] rounded-full bg-brand/30 blur-[130px] md:block" style={{ animationDuration: "14s" }} />
//       <div className="aurora absolute -bottom-1/3 -right-1/4 hidden h-[60vmax] w-[60vmax] rounded-full bg-brand-cyan/20 blur-[140px] [animation-delay:-6s] md:block" style={{ animationDuration: "17s" }} />
//       <div className="aurora absolute left-1/3 top-1/2 hidden h-[40vmax] w-[40vmax] rounded-full bg-brand-pink/15 blur-[120px] [animation-delay:-10s] md:block" style={{ animationDuration: "19s" }} />
//       <div className="grid-bg absolute inset-0 md:animate-gridDrift" />
//       {tier !== "static" && <canvas ref={ref} className="absolute inset-0" />}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#05060d_105%)]" />
//     </div>
//   );
// }
