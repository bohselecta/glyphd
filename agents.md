# Build Agents for a Clean Next.js App (App Router + TS + Tailwind + ESLint)

> Single mission: Produce a minimal, production-safe Next.js app that **typechecks, lints, builds, and deploys to Vercel with zero errors**.

## Roles

### 1) Scaffolder
- Create the project with the official CLI:
  ```bash
  npx create-next-app@latest my-app \
    --typescript --tailwind --eslint --app
