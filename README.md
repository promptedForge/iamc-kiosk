## IAMC Executive Kiosk — Retreat Prototype (Boardroom Mode)

**Purpose**
This prototype demonstrates how IAMC turns daily signal overload into **responsible, rapid advocacy**—moving **from noise to action** in minutes while keeping **human judgment and governance** in the loop. It exists to advance IAMC’s mission of **peace, pluralism, and social justice** through **strategic advocacy**, education/awareness, alliance-building, and a consistently **responsible voice**.

---

## What this does (at a glance)

* **Radar → Brief → Assets**: distills multi-source inputs into four stable lenses (Policy / Industry / Advocacy / Risk), a single **Issue of the Day** executive brief, and ready-to-edit outreach assets.
* **Integrity beats**: evidence and confidence are visible; nothing is hidden behind a black box.
* **Human-in-the-loop**: a persistent **Review Bar** provides **Interrupt** and **dual sign-off** (Analyst + Strategy Head). **Export is blocked** until controls are satisfied.
* **Learning loop**: **Last Week + Tweaks** accepts prior reports and notes to capture misses for future reference.
* **Cadence discipline**: a **Command Palette** (⌘K / Ctrl-K) sets cadence, time of day, audiences, and dual-signoff requirement.

This is a **boardroom-mode kiosk** designed for live presentation and controlled deploys—**not** an operator console.

---

## Repo layout

```
retreat_kiosk/
  backend/     # Axum sidecar + engine (Rust)
    api/       # HTTP endpoints (mockable)
    engine/    # dataset, review gates, exports, ROI
    examples/  # prebaked dataset + ui_config + runtime + learn/
  frontend/    # React/Vite kiosk UI (TypeScript + Tailwind)
    src/routes # Framing, Radar, Issue, ROI, Export, Tweaks
    src/components # ReviewBar, Command Palette
  openapi/     # OpenAPI contract for endpoints
  docker/      # docker-compose (sidecar + kiosk)
```

---

## Quick start (mock mode)

**Two terminals**

```bash
# 1) Sidecar API
cd retreat_kiosk/backend/api
cargo run -- --mock --examples ../examples

# 2) Kiosk UI
cd retreat_kiosk/frontend
cp .env.example .env        # defaults to http://localhost:8787
npm i
npm run dev                 # open http://localhost:5173
```

**One-shot Docker**

```bash
cd retreat_kiosk/docker
docker compose up --build
# kiosk: http://localhost:5173   |   api: http://localhost:8787
```

---

## Governance & safety (hard requirements)

* **Not published by default**: Nothing is disseminated without human action.
* **Interrupt**: When active, **export is blocked**.
* **Dual sign-off**: When enabled, **both** Analyst and Strategy Head must approve before export is allowed.
* **Evidence**: Source list and confidence appear on the brief.
* **Audit trail**: Export produces an archive with brief, assets, and an HTML/PDF report (if wkhtmltopdf is configured).

---

## Endpoints (stable for the demo)

```
GET  /ingest/status
GET  /classify/today
GET  /brief/:id                  # ?lens=ceo|coo|director
POST /assets/generate            # { brief, audience }
GET  /roi/today
POST /export/:id                 # gated by Interrupt + Dual sign-off
GET  /config                     # cadence, audiences, etc.
POST /config
GET  /review/status
POST /review/interrupt
POST /review/resume
POST /review/signoff             # { role: "Analyst"|"Strategy Head", approve: true }
GET  /learn/samples
POST /learn/upload               # base64 prior report
```

OpenAPI: `openapi/openapi.yaml`

---

## Dataset & configuration

* **`backend/examples/classify_today.json`**: list of issues for the radar.
* **`backend/examples/brief_<id>.json`**: the executive brief content per issue.
* **`backend/examples/ui_config.json`**: cadence, time-of-day, audiences, dual-signoff toggle.
* **`backend/examples/runtime.json`**: current interrupt + sign-offs.
* **`backend/examples/learn/`**: uploaded “Last Week + Tweaks” samples.

---

## Presenter mode & keyboard

* **Space**: advance (Framing → Radar → Issue → ROI → Export)
* **B**: back
* **F**: fullscreen
* **⌘K / Ctrl-K**: Command Palette (cadence, audiences, dual sign-off, Tweaks shortcut)

---

## ROI² note (simple math)

Displayed hours/FTE are illustrative in mock mode:

* **Before** (manual): `(issues * 0.5 day * 8h) / 4 roles`
* **After** (automated synthesis): `issues * 5 minutes`
* **FTE equiv**: `(before − after) / 40h`

Use realistic inputs when moving beyond demo data.

---

## Smoke test script

Add `scripts/smoke.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

API="${1:-http://localhost:8787}"

curl -fsS "$API/ingest/status" | jq .
curl -fsS "$API/classify/today" | jq .
ID=$(curl -fsS "$API/classify/today" | jq -r '.[0].id')
curl -fsS "$API/brief/$ID" | jq .
echo "OK"
```

---

## Production notes

* This kiosk is **presentation-first**. Wire the sidecar to production data sources only after internal sign-off and risk review.
* PDF embedding requires setting `WKHTMLTOPDF_PATH`.
* When integrating into your existing sidecar, port the config/review/learn logic and export gating semantics exactly as-is.
