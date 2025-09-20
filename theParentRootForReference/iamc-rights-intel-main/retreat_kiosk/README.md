# IAMC Retreat Prototype (Executive Mode) – v2

**Now with:**
- Expanded dataset (8 issues across quadrants)
- Command Palette / Config (cadence + audiences) — ⌘/Ctrl+K
- “Last Week + Tweaks” flow (upload prior report + notes → merged preview)
- Human‑in‑the‑Loop banner with **dual‑role sign‑off** gating export

## Run locally (mock)
Terminal 1:
```bash
cd backend/api
cargo run -- --mock --examples ../examples
```
Terminal 2:
```bash
cd frontend
cp .env.example .env
npm i
npm run dev   # http://localhost:5173
```
