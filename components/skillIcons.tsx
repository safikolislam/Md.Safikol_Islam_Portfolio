import type { IconType } from "react-icons";
import {
  SiCss,
   SiExpress, SiFigma, SiFirebase, SiFramer, SiGit, SiGithub,
  SiHtml5, SiJavascript, SiJsonwebtokens, SiMongodb, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPostman, SiPrisma, SiReact, SiReactquery,
  SiRedux, SiShadcnui, SiStripe, SiTailwindcss, SiTypescript, SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const icons: Record<string, { icon: IconType; color: string }> = {
  "HTML5": { icon: SiHtml5, color: "#E34F26" },
  "CSS3": { icon: SiCss, color: "#1572B6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Next.js (App Router)": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Redux Toolkit": { icon: SiRedux, color: "#764ABC" },
  "TanStack Query": { icon: SiReactquery, color: "#FF4154" },
  "Shadcn UI": { icon: SiShadcnui, color: "#FFFFFF" },
  "Framer Motion": { icon: SiFramer, color: "#FFFFFF" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  "REST API": { icon: TbApi, color: "#22D3EE" },
  "JWT Auth": { icon: SiJsonwebtokens, color: "#F472B6" },
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Prisma ORM": { icon: SiPrisma, color: "#5A67D8" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Git": { icon: SiGit, color: "#F05032" },
  "GitHub": { icon: SiGithub, color: "#FFFFFF" },
  "Vercel": { icon: SiVercel, color: "#FFFFFF" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
  "Postman": { icon: SiPostman, color: "#FF6C37" },
};

export default function SkillIcon({ name, size = 16 }: { name: string; size?: number }) {
  const match = icons[name];
  if (!match) return null;
  const Icon = match.icon;
  return <Icon size={size} color={match.color} aria-hidden="true" className="shrink-0" />;
}