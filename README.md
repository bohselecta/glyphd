GLYPHD Dashboard (Next.js App Router)

Minimal, production-safe Next.js app (App Router + TypeScript + Tailwind + ESLint) that typechecks, lints, builds, and deploys cleanly on Vercel.

Getting Started

- Prereqs: Node 18.18+ or 20.x, pnpm or npm
- Install: `pnpm i` (or `npm i`)
- Dev: `pnpm dev` (or `npm run dev`) then open http://localhost:3000

Quality Gates

- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint` (add `--fix` to auto-fix where safe)
- Build: `pnpm build`

Deployment

- Vercel: This repo is compatible with Vercel zero-config builds.
- If already linked in Vercel, pushes to `main` will trigger deploys.
- Add environment variables (e.g., auth) in Vercel Project Settings → Environment Variables. Do not commit secrets.

Project Structure

- `app/` – App Router pages, layout, and global styles
- `public/` – Static assets (e.g., `/GLYPHDlogo.svg`)
- `src/components/` – Reusable components (header, sidebar, etc.)

Environment Variables

- Local: keep using your existing `.env.local` (it’s ignored by git).
- Pattern: `NEXT_PUBLIC_...` for client-safe vars; server-only secrets should NOT use `NEXT_PUBLIC`.

Auth Setup (Short)

- Keep your current `.env.local` as-is; add the following if using Supabase Auth:
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
  - Optional (server-only): `SUPABASE_SERVICE_ROLE=...` (never expose to client)
- Vercel: add the same keys in Project → Settings → Environment Variables and redeploy.
- If using NextAuth instead (or later):
  - `NEXTAUTH_URL=https://your-domain` (or `http://localhost:3000` locally)
  - `NEXTAUTH_SECRET=...`
  - Add provider keys (e.g., `GITHUB_ID`, `GITHUB_SECRET`) as needed.

Ignore/Exclusions

- Node and Next.js artifacts are excluded via `.gitignore`:
  - `node_modules/`
  - `.next/`
  - `.env*` (e.g., `.env.local`)
  - `.vercel/`
  - `.turbo/`
  - `coverage/`, `dist/`

Scripts

- `dev` – Next.js dev server
- `build` – Production build
- `start` – Start the production server
- `lint` – ESLint (next/core-web-vitals)
- `typecheck` – TypeScript noEmit check

License

All rights reserved. See `LICENSE` for details.
