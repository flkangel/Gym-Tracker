# data/

Local-only input data for scripts (e.g. the Excel import in `scripts/import-excel`).

- `data/private/` is **never versioned** (see `.gitignore`). Put the source
  workbook `DOCUMENTO DE SEGUIMIENTO.xlsx` there. It contains personal data
  (body weight, measurements, progress photos) and must not leave this machine
  except into your own Supabase project.
- Anything that *is* safe to commit (synthetic test fixtures, public reference
  tables) lives outside `data/private/` and is reviewed before it is added.
