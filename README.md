# Gym-Tracker

Personal training, body-composition, recovery and nutrition tracker.
Mobile-first PWA for iPhone (Safari / home screen), built to be packaged later
with Capacitor. Replaces a spreadsheet-based tracking workflow.

## Status

**Rewrite in progress — Phase 0 (repo hygiene).** The v1 Next.js prototype was
removed from `main`; it is preserved at tag `v1.0.0` and branch `legacy/v1`.
See [`docs/legacy/`](docs/legacy/) for its design notes. The v2 stack
(Vite + React + TypeScript, Supabase, offline-first) and the development setup
land in Phase 1.

## Personal data policy

This project handles sensitive personal data (body weight, measurements,
progress photos). None of it is versioned:

- Source spreadsheets go in `data/private/` (git-ignored, see
  [`data/README.md`](data/README.md)).
- Secrets live in `.env*` files (git-ignored); only `.env.example` is committed.
- Runtime data lives only in your own Supabase project, protected by Row Level
  Security.

## Roadmap

1. **Phase 0** — repo hygiene and security *(this)*
2. **Phase 1** — development foundations: devcontainer, quality gates, CI
3. **Phase 2** — data model: Supabase migrations with RLS
4. **Phase 3** — spreadsheet import script
5. **Phase 4** — MVP: today's workout, body, photos, recovery, nutrition, progress
6. **Phase 5** — PWA polish, notifications, Capacitor iOS
