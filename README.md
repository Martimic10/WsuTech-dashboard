# WSUTech Dashboard

Modern student portal inspired by Canvas, built with Next.js 15, Tailwind CSS, shadcn/ui, and Framer Motion.

## Stack

- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Lucide Icons
- Recharts
- React Hook Form + Zod
- Fake JSON backend (`/data`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Connect the GitHub repo to [Vercel](https://vercel.com) (Import Project → select this repo). Framework preset: **Next.js**. No env vars required for the demo data.

## Structure

```
app/                  # App Router routes
components/
  course/             # Course home, modules, grades
  dashboard/          # Dashboard cards and asides
  layout/             # App shell: sidebar, account tray
  ui/                 # shadcn primitives
  providers/          # Theme providers
data/                 # JSON mock backend
hooks/                # Shared React hooks
lib/                  # Utilities and data accessors
types/                # Shared TypeScript types
public/               # Static assets
```
