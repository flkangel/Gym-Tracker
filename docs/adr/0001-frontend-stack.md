# 0001. Vite + React SPA, TypeScript strict, TanStack

- Status: Accepted
- Date: 2026-10-21

## Context

The app is a mobile-first PWA for iPhone that must later be wrapped with
Capacitor, which needs a static build. There is no server-side logic of our
own: Supabase is the backend. v1 used Next.js, which adds a server runtime we
would not use.

## Decision

- **Vite + React 19 SPA**, TypeScript with `strict`,
  `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- **TanStack Router** (file-based, type-safe, generated `src/routeTree.gen.ts`
  committed) and **TanStack Query** for server state.
- **React Hook Form + Zod** for forms and runtime validation (env included).
- **Tailwind CSS 4 + shadcn/ui** (Radix primitives, components copied into
  `src/components/ui`). Dark theme by default.
- **vite-plugin-pwa** (Workbox `generateSW`, prompt-to-update).
- Platform-specific code (camera, storage, notifications, haptics) goes behind
  `src/platform/` so Capacitor only swaps implementations.

Version pins: TypeScript stays on **6.0** until typescript-eslint supports
TS 7 (Dependabot ignores TS majors). ESLint is on 10 while
`eslint-plugin-jsx-a11y` still declares `<=9`; the peer range is relaxed in
`pnpm-workspace.yaml`.

## Consequences

- One static `dist/` serves Vercel and Capacitor alike.
- No SSR: first paint depends on JS; acceptable for an installed PWA, and the
  service worker makes repeat loads instant.
- Check both pins whenever typescript-eslint or jsx-a11y release.
