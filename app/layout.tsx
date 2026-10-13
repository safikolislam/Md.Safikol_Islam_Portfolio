import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { profile, SITE_URL } from "@/lib/data";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const description =
  "Md. Safikol Islam is a Full-stack Web Developer from Dhaka, Bangladesh, building role-based web apps with Next.js, TypeScript, Node.js, Express, Prisma, PostgreSQL and MongoDB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Md. Safikol Islam | Full-stack Web Developer (Next.js, Node.js, PostgreSQL)",
    template: "%s | Md. Safikol Islam",
  },
  description,
  keywords: [
    "Md. Safikol Islam",
    "Full-stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Express.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Portfolio",
    "Bangladesh",
    "Dhaka",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${profile.name} Portfolio`,
    title: "Md. Safikol Islam | Full-stack Web Developer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Safikol Islam | Full-stack Web Developer",
    description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#05060d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  image: `${SITE_URL}/safikol.png`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Express.js", "Prisma", "PostgreSQL", "MongoDB"],
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
     
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat></WhatsAppFloat>
      </body>
    </html>
  );
}
