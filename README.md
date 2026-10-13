# Md. Safikol Islam – Portfolio (Next.js + TypeScript + Prisma + PostgreSQL)

## Run
```bash
npm install
cp .env.example .env      # set DATABASE_URL and NEXT_PUBLIC_SITE_URL
npx prisma db push        # creates the Message table
npm run dev               # http://localhost:3000
```
## Customize
- `lib/data.ts` → GitHub / LinkedIn / resume URL, project Live / Frontend / Backend links, text.
- Put your resume PDF in `public/` and set `resumeUrl`.
- Messages are stored in the `Message` table (view with `npx prisma studio`).
- Deploy on Vercel: add `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` env vars.

## Receive messages by email
Set `SMTP_USER`, `SMTP_PASS` (Gmail App Password) and optionally `CONTACT_TO` in `.env` (and in Vercel env vars).
Every message is emailed to you (Reply goes to the visitor) and, if `DATABASE_URL` is set, also saved in PostgreSQL.

## Deploy on Vercel
1. Push the project to a GitHub repo.
2. Vercel → Add New → Project → import the repo (Framework: Next.js, defaults are fine).
3. Add Environment Variables: SMTP_USER, SMTP_PASS, CONTACT_TO, NEXT_PUBLIC_SITE_URL (your vercel.app/custom domain), and DATABASE_URL (optional).
4. Deploy. Optional DB: run `npx prisma db push` once locally with the production DATABASE_URL.
