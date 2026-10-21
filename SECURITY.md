# Security policy

Gym-Tracker is a personal project that stores sensitive health data (body
weight, measurements, progress photos). Security issues are taken seriously.

## Reporting a vulnerability

Please **do not open a public issue**. Use GitHub's private vulnerability
reporting (_Security → Report a vulnerability_) on this repository, or contact
the owner, [@flkangel](https://github.com/flkangel), directly. Expect an answer
within a week.

## Design rules

- Every table has Row Level Security (`auth.uid() = user_id`); the client only
  ever holds the Supabase **publishable** key. The secret / service-role key is
  never shipped to the browser, never prefixed with `VITE_` and never committed.
- Progress photos live in a private Storage bucket under `user_id/…` and are
  served through short-lived signed URLs.
- Personal data is never committed: `data/private/`, spreadsheets and `.env*`
  are git-ignored, and gitleaks runs in the pre-commit hook and in CI.
- Dependencies are kept current by Dependabot.

## If a secret leaks

1. Rotate it immediately in the Supabase dashboard (API keys / DB password /
   access token).
2. Then clean history if needed; history rewrites need an explicit decision by
   the owner (see `CLAUDE.md`).
