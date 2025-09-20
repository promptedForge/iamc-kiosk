# IAMC Ops Sidecar — Retreat Kiosk Patch (v2)

**Target:** Your local Rust sidecar (NOT Streamlit). This runs side-by-side with your existing repo.

## What's included
- `retreat_kiosk/backend/` — Axum sidecar + engine with mock dataset, review gating, cadence/audience config, learn uploads
- `retreat_kiosk/frontend/` — React/Vite kiosk UI with Command Palette (⌘K/Ctrl‑K), Tweaks route, Review Bar
- `retreat_kiosk/openapi/` — OpenAPI contract
- `retreat_kiosk/docker/` — Compose for one‑shot demo
- `.github/workflows/retreat-kiosk-smoke.yml` — CI smoke

## Run (local)
- API: `cd retreat_kiosk/backend/api && cargo run -- --mock --examples ../examples`
- UI : `cd retreat_kiosk/frontend && cp .env.example .env && npm i && npm run dev`

## Docker (one-shot)
- `cd retreat_kiosk/docker && docker compose up --build`

## Integrate into your existing crates
Bring these modules and routes into `iamc_ops_sidecar`:
- **Engine:** UiConfig, RuntimeState, LearnSample, generate_assets(audience), roi_today, build_zip_export
- **API:** /config, /review/*, /learn/* + export gating (interrupt + dual signoff)
- **Kiosk:** keep as separate app hitting your sidecar base URL

> Governance rails are hard-coded: exports blocked if Interrupt is active or dual sign-off isn’t met.
