GLYPHD — AI Project Memory Infrastructure

GLYPHD is a minimal, production-safe Next.js app for organizing projects, goals, and AI-assisted workflows. It ships with App Router, TypeScript, Tailwind, and ESLint, and is set up for clean deploys on Vercel.

Features

- Dashboard with project entry points (Projects, Memory Tree, Superintelligent, etc.)
- Consistent UI kit (Tailwind) and icons (lucide-react)
- Strong typing for core entities (projects, goals, files, health)
- Vercel-ready: zero custom config required

Tech Stack

- Next.js (App Router), React 18, TypeScript
- Tailwind CSS
- ESLint (next/core-web-vitals)

Getting Started (Local)

- Requirements: Node 18.18+ or 20.x, pnpm (or npm)
- Install: `pnpm i`
- Run dev: `pnpm dev` ? open http://localhost:3000
- Build: `pnpm build` and start: `pnpm start`

Environment Variables (Simple)

- Local only: put keys in `.env.local` (never commit this file)
- If using Supabase later:
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- If you add NextAuth later:
  - `NEXTAUTH_URL=https://your-site.vercel.app`
  - `NEXTAUTH_SECRET=...` (generate a long random string)

On Vercel (no file upload)

- Project ? Settings ? Environment Variables ? Add the same keys as separate entries
- Add to Production and Preview
- Only variables that start with `NEXT_PUBLIC_` are exposed to the browser

Project Structure

- `app/` — routes (`/`, `/dashboard`, etc.), layout, and global styles
- `public/` — static assets (e.g., `/GLYPHDlogo.svg`)
- `src/components/` — UI components
- `src/contexts/` — React context for project state
- `src/services/` — integration adapters and helpers
- `src/types/` — shared TypeScript types

Scripts

- `dev` — start dev server
- `build` — production build
- `start` — run built app
- `lint` — run ESLint
- `typecheck` — run TypeScript without emitting

Deployment

- New Vercel Project ? Import this GitHub repo ? Framework: Next.js
- Root directory: `/` (default)
- Build command: auto (`next build`)
- Output directory: auto (`.next`)
- Push to `main` to trigger deploys

Troubleshooting

- White page with Vite assets (vite.svg) ? domain still serving an old project; reattach domain to this project and clear caches
- ESLint failures on Vercel ? temporarily disabled during builds in `next.config.mjs` (re-enable after cleanup)

License

All rights reserved. See `LICENSE`.
