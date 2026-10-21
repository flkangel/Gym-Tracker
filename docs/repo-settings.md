# Repository, Vercel and Supabase settings

Settings that live outside the code and must be configured by hand (or with
`gh`). Keep this file in sync when they change.

## GitHub

### Branch protection for `main` (Settings → Rules → Rulesets → New branch ruleset)

- Target: default branch (`main`). Enforcement: active. Bypass list: empty
  (or yourself only, for the release-please caveat below).
- **Restrict deletions** and **Block force pushes**.
- **Require a pull request before merging** (0 approvals: single maintainer;
  "Require conversation resolution" on).
- **Require status checks to pass**, "require branches to be up to date" on:
  - `Lint, typecheck, test, build`
  - `Conventional commits`
  - `Secret scan (gitleaks)`
  - `Supabase migrations apply cleanly`
  - `Vercel` (appears after the first preview deployment)
- **Require linear history** (squash or rebase merges only).

### General settings

- Pull requests: allow **squash merging** only, default message "Pull request
  title and description"; enable **Automatically delete head branches**.
- Actions → General → Workflow permissions: **Read repository contents**, and
  tick **Allow GitHub Actions to create and approve pull requests** (needed by
  release-please).
- Code security: enable **Dependabot alerts / security updates**, **secret
  scanning + push protection** and **private vulnerability reporting** (all
  free because the repository is public).
- Actions → General → fork pull requests: require approval for **all external
  contributors**.

> release-please caveat: PRs opened with the default `GITHUB_TOKEN` do not
> trigger other workflows, so required checks never report on the release PR.
> Either merge it via the ruleset bypass, or later give release-please a
> fine-grained PAT (`RELEASE_PLEASE_TOKEN` secret, contents + pull requests
> write on this repo only).

### Token scope for pushing workflows

`gh` needs the `workflow` scope to push `.github/workflows/`:

```bash
gh auth refresh -h github.com -s workflow
```

## Vercel (personal account)

1. Add New → Project → import `flkangel/Gym-Tracker` (grant the Vercel GitHub
   app access to this repo only).
2. Framework preset **Vite**; leave build/install/output empty (they come from
   `vercel.json`). Root directory: `./`.
3. Environment variables (Production **and** Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

   Never add the secret / service-role key or the DB password.

4. Settings → Git: production branch `main`.
5. Settings → Deployment Protection: Vercel Authentication on previews is the
   default and fine; you log in once on the iPhone's Safari. For an installed
   PWA from a preview, either log in first or use the production URL.
6. The old v1 Vercel project (linked to `Angel-SimpleIT/Gym-Tracker`) can be
   deleted once v2 deploys.

## Supabase (hosted project)

- Authentication → URL Configuration:
  - Site URL: the Vercel production URL (`https://<project>.vercel.app`).
  - Redirect URLs: `http://localhost:5173/**`,
    `https://<project>.vercel.app/**` and the preview wildcard
    `https://gym-tracker-*-personal-angel1.vercel.app/**`.
- Project Settings → API Keys: use the **publishable** key in the app.
- Before any destructive migration: Database → Backups (or `pg_dump`) first,
  then `pnpm db:push:dry`.
