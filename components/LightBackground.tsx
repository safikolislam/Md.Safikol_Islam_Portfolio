"use client";
import { motion, MotionConfig } from "framer-motion";

const dots = "radial-gradient(rgba(255,255,255,.22) 1px, transparent 1px)";
const fade = "radial-gradient(ellipse at center, #000 35%, transparent 100%)";
const glow = (c: string) => `radial-gradient(closest-side, ${c}, transparent)`;

/** Ultra-light full-screen background: dot grid + two soft glows that gently breathe (opacity only). */
export default function LightBackground() {
  const pulse = (d: number, delay = 0) => ({ animate: { opacity: [0.55, 1, 0.55] }, transition: { duration: d, delay, repeat: Infinity, ease: "easeInOut" as const } });
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-bg">
        <div className="absolute inset-0" style={{ backgroundImage: dots, backgroundSize: "28px 28px", WebkitMaskImage: fade, maskImage: fade }} />
        <motion.div className="absolute left-1/2 top-[-25%] h-[75vh] w-[95vw] max-w-5xl -translate-x-1/2 will-change-[opacity]" style={{ background: glow("rgba(124,92,255,.38)") }} {...pulse(8)} />
        <motion.div className="absolute bottom-[-30%] left-1/2 h-[70vh] w-[95vw] max-w-5xl -translate-x-1/2 will-change-[opacity]" style={{ background: glow("rgba(34,211,238,.24)") }} {...pulse(10, 2)} />
      </div>
    </MotionConfig>
  );
}