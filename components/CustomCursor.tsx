"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor='hover']";
const TEXT = "input, textarea, select";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "hover" | "text">("idle");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const glowX = useSpring(x, { stiffness: 60, damping: 18, mass: 1 });
  const glowY = useSpring(y, { stiffness: 60, damping: 18, mass: 1 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      if (t?.closest?.(TEXT)) setMode("text");
      else if (t?.closest?.(INTERACTIVE)) setMode("hover");
      else setMode("idle");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === "hover" ? 68 : mode === "text" ? 6 : 38;
  const ringH = mode === "text" ? 30 : ringSize;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* soft spotlight */}
      <motion.div
        className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          background: "radial-gradient(circle, rgba(124,92,255,0.16), rgba(34,211,238,0.06) 45%, transparent 70%)",
        }}
      />
      {/* ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        animate={{
          width: ringSize,
          height: ringH,
          scale: pressed ? 0.8 : 1,
          borderColor: mode === "hover" ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.45)",
          backgroundColor: mode === "hover" ? "rgba(124,92,255,0.18)" : "rgba(255,255,255,0)",
          borderRadius: mode === "text" ? 4 : 999,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      {/* dot */}
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_3px_rgba(34,211,238,0.8)]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", opacity: visible && mode !== "text" ? 1 : 0 }}
      />
    </div>
  );
}
