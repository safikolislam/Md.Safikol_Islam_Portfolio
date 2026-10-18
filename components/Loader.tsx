"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
   
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 1800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg px-5"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]" />

          <motion.h1
            initial={{ opacity: 0, y: 14, letterSpacing: "0.35em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient relative text-center font-display text-4xl font-bold sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative mt-3 font-mono text-xs tracking-[0.25em] text-slate-400 sm:text-sm"
          >
            {profile.title.toUpperCase()}
          </motion.p>

          <div className="relative mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand via-brand-cyan to-brand-pink"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}