# 0004. pnpm pinned through Corepack

- Status: Accepted
- Date: 2026-10-21

## Decision

pnpm is the only package manager. Its exact version is pinned in
`package.json#packageManager` and provided by Corepack locally, in the
devcontainer, in CI (`pnpm/action-setup` reads the same field) and on Vercel.
pnpm settings live in `pnpm-workspace.yaml`.

## Consequences

Strict, content-addressed installs and one lockfile format everywhere. Node 25+
no longer bundles Corepack; when moving past Node 24, install it explicitly.
