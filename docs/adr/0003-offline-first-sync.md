# 0003. Offline-first with Dexie, UUID v7 and last-write-wins

- Status: Accepted (implemented in Phase 4)
- Date: 2026-10-21

## Context

The gym has poor signal. Logging a set must never wait for the network.

## Decision

- Sets, check-ins and meals are written first to **IndexedDB via Dexie**, then
  synced to Supabase in the background through a pending queue with retries.
- IDs are generated on the client as **UUID v7** (time-ordered, index
  friendly), so rows exist before the server sees them.
- Conflicts resolve by **last-write-wins on `updated_at`**; deletes are soft
  (`deleted_at`) so they sync like any other change.
- The UI shows a visible "pendiente de sincronizar" state.

## Consequences

- Every synced table needs `id uuid`, `user_id`, `created_at`, `updated_at`,
  `deleted_at` (Phase 2 data model).
- LWW can lose a concurrent edit from two devices; acceptable for one user.
