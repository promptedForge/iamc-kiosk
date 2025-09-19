# IAMC Human Rights Intelligence Platform

A dual-track intelligence platform for monitoring human rights compliance across global supply chains. This system demonstrates rapid prototyping (kiosk track) alongside production-grade development (Rust track).

## 🎯 Overview

This platform ingests real-time data from multiple sources to identify human rights risks, labor violations, and compliance issues across global operations. It provides role-based insights for different stakeholders and supports collaborative decision-making through a sign-off workflow.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd iamc_retreat_prototype_kiosk_v2

# Start with Docker (recommended)
cd docker
docker-compose up -d

# Access the platform
open http://localhost:5173
```

### Manual Setup (Development)
```bash
# Backend API
cd backend/api && cargo run -- --mock --examples ../examples

# Frontend UI  
cd frontend && npm install && npm run dev
```

## 📐 Architecture: Dual-Track Development

This project follows a strict dual-track development methodology:

### Track 1: Kiosk/Demo (Frontend)
- **Purpose**: Rapid prototyping and stakeholder demonstrations
- **Timeline**: 2-week sprints maximum
- **Technology**: React, TypeScript, Tailwind CSS
- **Location**: `/frontend`
- **Constraints**: No production dependencies, simplified state management

### Track 2: Production/MVP (Backend)
- **Purpose**: Robust, scalable backend services
- **Timeline**: Standard development cycles
- **Technology**: Rust, Axum, PyO3 bindings
- **Location**: `/backend`
- **Standards**: 80%+ test coverage, comprehensive error handling

## 🏗️ Project Structure

```
.
├── frontend/               # Kiosk/Demo track (React)
│   ├── src/
│   │   ├── routes/        # Page components
│   │   ├── components/    # Reusable UI components
│   │   └── store.ts       # Global state management
│   └── Dockerfile
├── backend/                # Production track (Rust)
│   ├── api/              # REST API service
│   ├── engine/           # Core business logic
│   └── examples/         # Mock data for demo
├── docker/                # Container orchestration
│   └── docker-compose.yml
└── *.CLAUDE.md           # Agent-specific constraints
```

## 🔑 Key Features

### For Analysts
- Real-time monitoring of labor violations and safety incidents
- Technical compliance tracking (cyber threats, operational risks)
- Detailed evidence chains and confidence scoring
- Export capabilities for detailed reports

### For Strategy Heads
- Strategic intelligence on M&A activities and market movements
- Competitor analysis and industry consolidation tracking
- ESG compliance and shareholder activism monitoring
- High-level executive briefings

### Platform Capabilities
- **Role-Based Access**: Different insights for Analysts vs Strategy Heads
- **Collaborative Sign-off**: Dual approval workflow for critical decisions
- **Real-time Intelligence**: Live data stream from global sources
- **Smart Prioritization**: Critical/High/Medium/Low issue classification
- **Multi-source Integration**: Reuters, Human Rights Watch, ILO, local news

## 🛠️ Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for frontend development)
- Rust 1.81+ (for backend development)

### Frontend Development (Kiosk Track)
```bash
cd frontend
npm install
npm run dev
# Access at http://localhost:5173
```

### Backend Development (Production Track)
```bash
cd backend
cargo build
cargo run --bin api -- --mock --examples ./examples
# API available at http://localhost:8787
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ingest/status` | GET | Current data ingestion status |
| `/classify/today` | GET | Today's classified issues by quadrant |
| `/brief/:id` | GET | Detailed brief for an issue |
| `/review/status` | GET | Current review/signoff status |
| `/review/signoff` | POST | Submit role-based approval |
| `/export/:id` | POST | Export issue package (requires dual signoff) |

## 🎮 User Interface Navigation

### Keyboard Shortcuts
- **F** - Toggle fullscreen
- **Space** - Advance to next screen
- **B** - Go back
- **R** - Reset role/sign out
- **⌘K/Ctrl+K** - Open command palette

### User Flows
1. **Sign In**: Choose role (Analyst or Strategy Head)
2. **Radar View**: See classified issues in 4 quadrants (Policy, Industry, Advocacy, Risk)
3. **Issue Details**: Deep dive into specific issues with recommendations
4. **ROI Dashboard**: View time savings and efficiency metrics
5. **Export**: Download full brief packages (requires dual sign-off)

## 🔐 Security & Compliance

- All data is encrypted in transit
- Role-based access control (RBAC)
- Audit trail for all sign-offs
- No production data in demo environment
- Isolated development tracks prevent cross-contamination

## 📚 Further Documentation

- [Frontend Development Guide](./frontend/README.md) - Kiosk track details
- [Backend Development Guide](./backend/README.md) - Production track details
- [API Documentation](./docs/API.md) - Detailed endpoint specifications
- [Docker Setup](./docker/README.md) - Container configuration
- [Agent Covenants](./docs/AGENTS.md) - AI agent constraints

## 🤝 Contributing

This project uses a dual-track methodology. Before contributing:

1. Determine which track your contribution belongs to
2. Review the relevant `*.CLAUDE.md` covenant file
3. Ensure your changes don't cross track boundaries
4. Follow the track-specific development guidelines

## 📄 License

[License details here]

---

Built with a focus on human rights compliance and ethical supply chain management.
