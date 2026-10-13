# Md. Safikol Islam | Portfolio

A fast, responsive, dark-theme developer portfolio with animated backgrounds, a project carousel, project detail pages and a contact form that saves messages to a database and emails them to me.

**Live:** https://YOUR-SITE.vercel.app
**Author:** [Md. Safikol Islam](https://github.com/safikolislam), Full-stack Web Developer, Dhaka, Bangladesh

## Features

- Dark theme, animated particle background, aurora glow and click fireworks (desktop)
- Light mode for phones: cheaper background, no fireworks, 30 fps canvas, so it stays smooth on any device
- Custom animated cursor (desktop only)
- Hero with typewriter roles, floating tech logos and resume download
- Skills marquee, project carousel and a details page for every project (`/projects/[slug]`)
- Contact form: saves to PostgreSQL (Prisma) **and** emails me through Gmail SMTP, with honeypot and rate limiting
- Floating WhatsApp button
- SEO: metadata, Open Graph / Twitter cards, JSON-LD, `sitemap.xml`, `robots.txt`, generated icon and OG image
- Fully responsive (mobile, tablet, desktop)

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Embla Carousel · Prisma 6 · PostgreSQL · Nodemailer · Zod

## Projects shown

| Project | Stack | Live |
|---|---|---|
| CityFix, city complaint platform | Next.js, TypeScript, Express, Prisma, PostgreSQL | [Open](https://city-complaint-frontend-gamma.vercel.app/) |
| RentNest, rental marketplace | Next.js, TypeScript, Express, Prisma, PostgreSQL, Stripe | [Open](https://rentnest-frontend-weld.vercel.app/) |
| MediNest, medicine e-commerce | React, Express, MongoDB, Firebase | [Open](https://admirable-taffy-bafd88.netlify.app/) |

## Getting started

```bash
npm install
cp .env.example .env     # then fill in the values below
npx prisma generate
npx prisma db push       # creates the Message table
npm run dev              # http://localhost:3000
```

## Environment variables

Create a `.env` file (never commit it):

```env
# Database (Prisma Postgres, use the DIRECT connection string)
DATABASE_URL="postgres://USER:PASSWORD@db.prisma.io:5432/?sslmode=require"

# Public URL of the site (used for SEO, sitemap and Open Graph)
NEXT_PUBLIC_SITE_URL="https://YOUR-SITE.vercel.app"

# Email notifications (Gmail App Password, 16 characters, no spaces)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="you@gmail.com"
SMTP_PASS="xxxxxxxxxxxxxxxx"
CONTACT_TO="you@gmail.com"
```

The contact form works if **either** the database **or** the email settings are present. With both set, every message is saved and emailed (Reply goes to the visitor).

Gmail App Password: turn on 2-Step Verification, then create one at https://myaccount.google.com/apppasswords

## Customize

| What | Where |
|---|---|
| Name, email, phone, GitHub, LinkedIn, resume link, skills, projects | `lib/data.ts` |
| Resume PDF | replace `public/Md_Safikol_Islam_Resume.pdf` (keep the same file name) |
| Profile photo | `public/safikol.jpg` |
| Project screenshots | `public/projects/` (and list them in `lib/data.ts`) |
| Colors and animations | `tailwind.config.ts`, `app/globals.css` |
| WhatsApp button | `components/WhatsAppFloat.tsx` |

## Deploy on Vercel

1. Push the project to GitHub (make sure `.env` is in `.gitignore`).
2. Vercel → **Add New → Project** → import the repository (Framework: Next.js).
3. Add all environment variables from above.
4. Deploy, then set `NEXT_PUBLIC_SITE_URL` to your real link and **Redeploy**.
5. Send a test message from the live contact form.

`postinstall` and `build` run `prisma generate`, so no extra setup is needed on Vercel.

## Updating the live site

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel redeploys automatically after every push.

## View saved messages

```bash
npx prisma studio
```

Open the `Message` table.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Generate Prisma client and build for production |
| `npm start` | Run the production build |
| `npm run db:push` | Sync the Prisma schema to the database |

## Contact

- Email: safikolislam72@gmail.com
- GitHub: https://github.com/safikolislam
- LinkedIn: https://www.linkedin.com/in/mdsafikolislam/
