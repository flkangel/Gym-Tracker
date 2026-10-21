#!/usr/bin/env bash
# Runs once when the devcontainer is created.
set -euo pipefail

GITLEAKS_VERSION=8.30.1

sudo chown -R node:node /home/node/.local/share/pnpm

corepack enable pnpm
pnpm config set store-dir /home/node/.local/share/pnpm/store
pnpm install --frozen-lockfile

# gitleaks: required by the pre-commit hook (checksum-verified binary).
if ! command -v gitleaks >/dev/null 2>&1; then
  arch=$(dpkg --print-architecture)
  case "$arch" in amd64) arch=x64 ;; arm64) arch=arm64 ;; esac
  tmp=$(mktemp -d)
  base="https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}"
  tarball="gitleaks_${GITLEAKS_VERSION}_linux_${arch}.tar.gz"
  curl -fsSL -o "$tmp/$tarball" "$base/$tarball"
  curl -fsSL "$base/gitleaks_${GITLEAKS_VERSION}_checksums.txt" | grep " $tarball\$" |
    (cd "$tmp" && sha256sum -c -)
  tar -xzf "$tmp/$tarball" -C "$tmp" gitleaks
  sudo install -m 0755 "$tmp/gitleaks" /usr/local/bin/gitleaks
  rm -rf "$tmp"
fi

# WebKit + system libraries for Playwright (iPhone e2e).
pnpm exec playwright install --with-deps webkit

echo "Devcontainer ready. Copy .env.example to .env and run: pnpm dev"
