type Nav = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function isCapableDevice(): boolean {
  if (typeof window === "undefined") return false;
  const mq = (q: string) => window.matchMedia(q).matches;
  if (mq("(prefers-reduced-motion: reduce)")) return false;
  if (!mq("(hover: hover) and (pointer: fine)")) return false;
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 4) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  return true;
}

export function measureFps(ms = 600): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      frames++;
      if (t - start >= ms) resolve((frames * 1000) / (t - start));
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}