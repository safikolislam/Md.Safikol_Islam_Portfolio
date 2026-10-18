export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");


export const profile = {
  name: "Md. Safikol Islam",
  shortName: "Safikol",
  title: "Full-stack Web Developer",
  email: "safikolislam72@gmail.com",
  phone: "+8801881799990",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/safikolislam", // e.g. "https://github.com/your-username"
  linkedin: "https://www.linkedin.com/in/mdsafikolislam/",
 // replace the PDF in /public with the same name to update
  facebook: "https://www.facebook.com/md.safikol.islam.ashik",
   twitter: "https://x.com/SafikolIslam4",
  roles: [
    "Full-stack Web Developer",
    "Next.js & TypeScript Engineer",
    "Node.js · Express · REST APIs",
    "PostgreSQL · Prisma · MongoDB",
  ],
  objective:
    "Full-stack Web Developer with hands-on experience in React.js, Next.js, Express.js, PostgreSQL, Prisma ORM and Redux Toolkit. Proficient in building role-based, full-stack web applications with REST APIs, JWT authentication and cloud deployment on Vercel. Seeking a challenging role to apply my technical skills and grow within a collaborative development team.",
  education: {
    degree: "BSc (Pass) in Physics, Mathematics & Botany",
    note: "Expected Graduation: 2027",
  },
  languages: [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Conversational" },
  ],
  highlights: [
    { title: "Role-based Systems", text: "Separate dashboards, protected routes and permission flows for every user type." },
    { title: "Payments", text: "Stripe & payment tracking with success / cancellation handling." },
    { title: "REST APIs + JWT", text: "Secure Node.js / Express backends with PostgreSQL & MongoDB." },
    { title: "Cloud Deployment", text: "Production-ready apps shipped on Vercel." },
  ],
};

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */
export const skillGroups = [
  {
    title: "Front-End",
    accent: "from-violet-500 to-fuchsia-500",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "React.js", "Next.js (App Router)", "Redux Toolkit", "TanStack Query", "Shadcn UI", "Framer Motion"],
  },
  {
    title: "Back-End",
    accent: "from-cyan-400 to-blue-500",
    items: ["Node.js", "Express.js", "REST API", "JWT Auth", "Stripe"],
  },
  {
    title: "Database",
    accent: "from-emerald-400 to-teal-500",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "Firebase"],
  },
  {
    title: "Tools & Tech",
    accent: "from-amber-400 to-orange-500",
    items: ["Git", "GitHub", "Vercel", "Figma", "Postman"],
  },
];

export const softSkills = ["Team Collaboration", "Problem Solving", "Time Management", "Continuous Learning"];

/* ------------------------------------------------------------------ */
/*  PROJECTS – add live / frontend / backend URLs                      */
/* ------------------------------------------------------------------ */
export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  accent: [string, string];
  icon: "landmark" | "key" | "pill";
  images?: string[];
  links: { live: string; frontend: string; backend: string };
  flow?: string[];
  roles?: string[];
  highlights: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "cityfix",
    index: "01",
    title: "CityFix",
    category: "City Complaint & Service Request Platform",
    tagline: "A role-based platform that turns citizen complaints into tracked, resolved service requests.",
    description:
      "CityFix connects citizens, officers, technicians and admins on one platform. Citizens submit complaints and pay complaint fees, officers assign work, technicians resolve it, and admins monitor everything through analytics and audit logs, with real-time status updates across the complete lifecycle.",
    features: [
      "Role-based system: Admin, Officer, Technician and Citizen, each with a separate dashboard",
      "Complaint lifecycle: Pending → Assigned → In Progress → Resolved",
      "Payment integration with complaint fee tracking and history",
      "Admin analytics dashboard, audit logs and real-time status updates",
    ],
    tech: ["Next.js (App Router)", "TanStack Query", "TypeScript", "Shadcn UI", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "Prisma ORM", "PostgreSQL", "JWT", "Vercel"],
    accent: ["#7c5cff", "#22d3ee"],
    icon: "landmark",
    images: ["/projects/cityfix-home.jpg", "/projects/cityfix-citizen.jpg", "/projects/cityfix-admin.jpg", "/projects/cityfix-roles.jpg"],
    links: { live: "https://city-complaint-frontend-gamma.vercel.app/", frontend: "https://github.com/safikolislam/city-complaint-frontend", backend: "https://github.com/safikolislam/city-complaint-backend" },
    flow: ["Pending", "Assigned", "In Progress", "Resolved"],
    roles: ["Admin", "Officer", "Technician", "Citizen"],
    highlights: [
      { label: "User roles", value: "4" },
      { label: "Lifecycle stages", value: "4" },
      { label: "Database", value: "PostgreSQL" },
    ],
  },
  {
    slug: "rentnest",
    index: "02",
    title: "RentNest",
    category: "Rental Property Marketplace",
    tagline: "A rental marketplace where tenants and landlords manage properties and requests in one place.",
    description:
      "RentNest is a rental property marketplace with protected, role-based dashboards for tenants and landlords. Tenants browse and filter properties and send rental requests; landlords approve or reject them. Payments are handled securely through Stripe, including success and cancellation flows.",
    features: [
      "Role-based dashboards for Tenant and Landlord with protected routes",
      "Property browsing, filtering and rental requests with approve / reject flow",
      "Stripe payment integration with success and cancellation handling",
    ],
    tech: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Shadcn UI", "Node.js", "Express.js", "Prisma ORM", "PostgreSQL", "JWT", "Stripe", "Vercel"],
    accent: ["#f472b6", "#7c5cff"],
    icon: "key",
    images: ["/projects/rentnest-home.jpg", "/projects/rentnest-requests.jpg", "/projects/rentnest-detail.jpg"],
    links: { live: "https://rentnest-frontend-weld.vercel.app/", frontend: "https://github.com/safikolislam/rentnest-frontend", backend: "https://github.com/safikolislam/rentnest-backend" },
    flow: ["Browse", "Request", "Approve / Reject", "Pay with Stripe"],
    roles: ["Tenant", "Landlord"],
    highlights: [
      { label: "User roles", value: "2" },
      { label: "Payments", value: "Stripe" },
      { label: "Database", value: "PostgreSQL" },
    ],
  },
  {
    slug: "medinest",
    index: "03",
    title: "MediNest",
    category: "Medicine Selling E-commerce Website",
    tagline: "A medicine e-commerce site with secure auth, payments and downloadable sales reports.",
    description:
      "MediNest is a medicine-selling e-commerce website with role-based authentication using JWT, full CRUD operations and payment integration. Sellers and admins can download PDF / Excel files and view sales reporting to keep track of the business.",
    features: [
      "Role-based authentication using JWT",
      "CRUD operations and payment integration",
      "PDF / Excel download and sales reporting",
    ],
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Shadcn UI", "Node.js", "Express.js", "MongoDB", "Firebase", "JWT"],
    accent: ["#22d3ee", "#34d399"],
    icon: "pill",
    images: ["/projects/medinest-shop.jpg", "/projects/medinest-dashboard.jpg", "/projects/medinest-categories.jpg"],
    links: {
      live: "https://admirable-taffy-bafd88.netlify.app/",
      frontend: "https://github.com/safikolislam/MediNest-Client",
      backend: "https://github.com/safikolislam/medinest-server",
    },
    flow: ["Browse", "Cart", "Pay", "Report"],
    roles: ["Admin", "Seller", "Customer"],
    highlights: [
      { label: "Exports", value: "PDF / Excel" },
      { label: "Auth", value: "JWT" },
      { label: "Database", value: "MongoDB" },
    ],
  },
];

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];
