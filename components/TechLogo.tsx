import { siHtml5, siJavascript, siMongodb, siNextdotjs, siPostgresql, siReact } from "simple-icons";

const logos = {
  javascript: { icon: siJavascript, color: "#F7DF1E" },
  html5: { icon: siHtml5, color: "#E34F26" },
  react: { icon: siReact, color: "#61DAFB" },
  mongodb: { icon: siMongodb, color: "#47A248" },
  nextjs: { icon: siNextdotjs, color: "#FFFFFF" },
  postgresql: { icon: siPostgresql, color: "#4F87D6" },
} as const;

export type LogoName = keyof typeof logos;

/** Official brand logo (Simple Icons) in a glass tile. */
export default function TechLogo({ name, className = "" }: { name: LogoName; className?: string }) {
  const { icon, color } = logos[name];
  return (
    <div
      title={icon.title}
      className={`glass !bg-bg/80 z-10 grid h-12 w-12 place-items-center rounded-2xl shadow-lg sm:h-14 sm:w-14 ${className}`}
      style={{ boxShadow: `0 8px 30px -8px ${color}66` }}
    >
      <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill={color}>
        <path d={icon.path} />
      </svg>
    </div>
  );
}
