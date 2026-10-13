export type Tier = "static" | "lite" | "full";

type Nav = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function getTier(): Tier {
  const mq = (q: string) => window.matchMedia(q).matches;
  if (mq("(prefers-reduced-motion: reduce)")) return "static";
  if (!mq("(hover: hover) and (pointer: fine)")) return "static";
  if (window.innerWidth < 768) return "static";
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return "static";
  const weak =
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    (nav.hardwareConcurrency ?? 8) <= 4;
  return weak ? "lite" : "full";
}