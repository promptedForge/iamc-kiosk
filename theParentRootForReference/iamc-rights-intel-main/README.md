# IAMC Retreat Prototype (Executive Mode) — v2

Modern kiosk UI + Axum sidecar with mock dataset, human-in-the-loop interrupts, dual sign-off, cadence/audience config, and "Last Week + Tweaks" learning samples.

## Run (mock)
- API: `cd backend/api && cargo run -- --mock --examples ../examples`
- UI:  `cd frontend && cp .env.example .env && npm i && npm run dev`

## Docker
`cd docker && docker compose up --build`
