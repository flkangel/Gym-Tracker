# 0002. Supabase hosted only, one project, CI-validated migrations

- Status: Accepted
- Date: 2026-10-21

## Context

The backend is Supabase (Postgres + Auth + Storage). Running the full local
stack needs ~10 containers on a laptop that already runs other containers. The
app has a single user.

## Decision

- **No local Supabase stack.** The CLI (a dev dependency) is used against the
  hosted project for `migration new`, `db push`, `db diff` and `gen types`.
- **One hosted project** for development and production.
- The schema lives only in versioned migrations under `supabase/migrations/`;
  every table has RLS (`auth.uid() = user_id`).
- CI validates migrations on an **ephemeral Postgres on the GitHub runner**
  (`supabase db start` + `db reset --local` + `db lint`).

## Consequences

- Dev and prod share data: every migration runs `pnpm db:push:dry` first, and
  destructive migrations or the Excel import need a backup beforehand.
- `supabase db reset --linked` would wipe production — never run it.
- If a second user or riskier work appears, add a separate dev project
  (Supabase branching or a second free project) and supersede this ADR.
