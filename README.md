# Gym-Tracker

Personal training, body-composition, recovery and nutrition tracker.
Mobile-first PWA for iPhone (Safari / home screen), built to be packaged later
with Capacitor. Replaces a spreadsheet-based tracking workflow.

## Status

**Rewrite in progress — Phase 1 (development foundations).** The v1 Next.js
prototype lives on at tag `v1.0.0` / branch `legacy/v1`; see
[`docs/legacy/`](docs/legacy/).

| Phase | Scope                                                        | State   |
| ----- | ------------------------------------------------------------ | ------- |
| 0     | Repo hygiene and security                                    | Done    |
| 1     | Devcontainer, quality gates, CI, Vercel                      | Current |
| 2     | Data model: Supabase migrations with RLS                     |         |
| 3     | Spreadsheet import script                                    |         |
| 4     | MVP: today's workout, body, photos, recovery, food, progress |         |
| 5     | PWA polish, notifications, Capacitor iOS                     |         |

## Stack

Vite + React 19 + TypeScript (strict) · TanStack Router / Query · React Hook
Form + Zod · Tailwind CSS 4 + shadcn/ui · vite-plugin-pwa · Supabase (Postgres,
Auth, Storage) · Vitest + Testing Library · Playwright (WebKit iPhone) ·
Vercel. Rationale in [`docs/adr/`](docs/adr/).

## Setup

Develop inside WSL2 (never under OneDrive / `\\wsl.localhost` from Windows
editors) or in the devcontainer.

### Option A — devcontainer (VS Code / Codespaces)

1. Open the repo in VS Code → _Dev Containers: Reopen in Container_.
2. `post-create` installs dependencies, gitleaks and Playwright WebKit.
3. `cp .env.example .env`, fill it in, `pnpm dev`.

### Option B — directly in WSL2 Ubuntu

```bash
fnm install 24 && fnm use 24      # Node version comes from .nvmrc
corepack enable pnpm               # pnpm version comes from package.json
pnpm install                       # also installs the git hooks
cp .env.example .env               # then fill it in
pnpm dev
```

Also install [gitleaks](https://github.com/gitleaks/gitleaks/releases) on your
`PATH` (the pre-commit hook refuses to run without it) and, for e2e,
`pnpm exec playwright install --with-deps webkit`.

Git hooks run outside your interactive shell (e.g. VS Code Source Control). If
Node comes from fnm, let Husky load it via `~/.config/husky/init.sh`:

```bash
export PATH="$HOME/.local/share/fnm:$HOME/.local/bin:$PATH"
eval "$(fnm env --shell bash)"
```

### Environment variables

See [`.env.example`](.env.example). Only `VITE_*` variables reach the browser
and all of them are public; the app validates them at startup and shows a
"Falta configuración" screen if any is missing.

## Scripts

| Command                        | What it does                                                |
| ------------------------------ | ----------------------------------------------------------- |
| `pnpm dev`                     | Vite dev server on `:5173` (no service worker)              |
| `pnpm build`                   | Type-check + production build with service worker           |
| `pnpm preview`                 | Serve `dist/` on `:4173`                                    |
| `pnpm lint` / `lint:fix`       | ESLint                                                      |
| `pnpm format` / `format:check` | Prettier                                                    |
| `pnpm typecheck`               | `tsc -b`                                                    |
| `pnpm test` / `test:watch`     | Vitest                                                      |
| `pnpm test:coverage`           | Vitest with v8 coverage                                     |
| `pnpm test:e2e`                | Playwright on WebKit, iPhone 15 viewport, against the build |
| `pnpm lhci`                    | Lighthouse CI over `dist/`                                  |
| `pnpm secrets:scan`            | gitleaks over the whole git history                         |
| `pnpm db:new <name>`           | New migration in `supabase/migrations/`                     |
| `pnpm db:push:dry`             | Show what `db push` would apply to the hosted project       |
| `pnpm db:push`                 | Apply pending migrations to the hosted project              |
| `pnpm db:diff`                 | Diff the hosted schema against local migrations             |
| `pnpm db:types`                | Regenerate `src/lib/database.types.ts`                      |

## Database migrations

Supabase runs **hosted only** — there is no local stack
([ADR 0002](docs/adr/0002-supabase-hosted-only.md)). One project serves dev and
prod, so be careful:

```bash
pnpm exec supabase login                          # once (or SUPABASE_ACCESS_TOKEN)
pnpm exec supabase link --project-ref <ref>       # once; asks for the DB password
pnpm db:new add_something                         # write SQL incl. RLS policies
git push                                          # CI applies it on an ephemeral DB
pnpm db:push:dry && pnpm db:push                  # after review / merge
pnpm db:types
```

Back up before destructive migrations. Never run `supabase db reset --linked`
(it wipes the hosted database).

## Testing on the iPhone

Service workers need HTTPS, so `pnpm dev` over the LAN is not enough for PWA
behaviour.

- **Vercel preview (recommended):** every pushed branch / PR gets a preview
  URL (posted on the PR). Open it in Safari → Share → _Agregar a pantalla de
  inicio_. Production is served from `main`.
- **Tunnel (quick checks):** `pnpm build && pnpm preview`, then
  `cloudflared tunnel --url http://localhost:4173` and open the printed
  `https://….trycloudflare.com` URL. Add it to Supabase Auth redirect URLs if
  you need to log in.

Both point at the single hosted Supabase project. One-time Vercel and Supabase
settings: [`docs/repo-settings.md`](docs/repo-settings.md).

## Contributing workflow

Branch per phase (`phase-N/...`), Conventional Commits (enforced by
commitlint), PR into `main` with green CI. release-please keeps
`CHANGELOG.md` and version tags. Rules for AI assistants and humans alike are in
[`CLAUDE.md`](CLAUDE.md).

## Personal data policy

This project handles sensitive personal data (body weight, measurements,
progress photos). None of it is versioned:

- Source spreadsheets go in `data/private/` (git-ignored, see
  [`data/README.md`](data/README.md)).
- Secrets live in `.env*` files (git-ignored); only `.env.example` is committed.
- Runtime data lives only in your own Supabase project, protected by Row Level
  Security. See [`SECURITY.md`](SECURITY.md).
