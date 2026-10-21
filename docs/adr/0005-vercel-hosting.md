# 0005. Vercel Git integration for previews and production

- Status: Accepted
- Date: 2026-10-21

## Context

Service workers and installable PWAs require HTTPS, so testing on the iPhone
needs a real HTTPS URL. Options considered: Vercel, Cloudflare Pages, a tunnel.

## Decision

- **Vercel** (personal account) hosts the static build, connected through the
  **Vercel Git integration**: a preview deployment per PR / branch push and
  production from `main`. No deploy workflow in GitHub Actions and no Vercel
  token stored in GitHub.
- `vercel.json` holds the SPA rewrite, cache headers (service worker and
  `index.html` always revalidate) and security headers (CSP limited to self +
  `*.supabase.co`).
- Only `VITE_*` (public) variables are configured in Vercel.

## Consequences

- Preview URLs must be allowed as Supabase Auth redirect URLs (wildcard).
- Vercel builds independently of CI; branch protection on `main` is what keeps
  a red build out of production.
- Any new external origin (e.g. Open Food Facts) needs a CSP update.
