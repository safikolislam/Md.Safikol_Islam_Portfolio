import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-brand-cyan">404</p>
      <h1 className="text-gradient mt-3 font-display text-5xl font-bold">Page not found</h1>
      <p className="mt-4 text-slate-400">The page you are looking for doesn&apos;t exist or was moved.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
