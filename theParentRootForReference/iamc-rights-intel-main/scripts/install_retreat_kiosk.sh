#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/retreat_kiosk"

echo "Installing IAMC Retreat Kiosk side-by-side (non-destructive)…"
echo "Source: $SRC"

test -d "$SRC/backend/api" || { echo "Missing $SRC/backend/api"; exit 1; }
test -d "$SRC/frontend" || { echo "Missing $SRC/frontend"; exit 1; }

echo "OK. Nothing overwritten in your existing sidecar."
echo ""
echo "Run locally:"
echo "  cd retreat_kiosk/backend/api && cargo run -- --mock --examples ../examples"
echo "  cd retreat_kiosk/frontend && cp .env.example .env && npm i && npm run dev"
echo ""
echo "Docker:"
echo "  cd retreat_kiosk/docker && docker compose up --build"
echo ""
echo "CI smoke is available at .github/workflows/retreat-kiosk-smoke.yml"
