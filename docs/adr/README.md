# Architecture Decision Records

Short records of decisions that are expensive to reverse. One file per
decision, numbered, never rewritten: a changed decision gets a new ADR that
supersedes the old one.

| #                                    | Decision                                         | Status   |
| ------------------------------------ | ------------------------------------------------ | -------- |
| [0001](0001-frontend-stack.md)       | Vite + React SPA, TypeScript strict, TanStack    | Accepted |
| [0002](0002-supabase-hosted-only.md) | Supabase hosted only, one project, CI-validated  | Accepted |
| [0003](0003-offline-first-sync.md)   | Offline-first with Dexie, UUID v7 and LWW        | Accepted |
| [0004](0004-pnpm-corepack.md)        | pnpm pinned through Corepack                     | Accepted |
| [0005](0005-vercel-hosting.md)       | Vercel Git integration for previews / production | Accepted |

Template: [`0000-template.md`](0000-template.md).
