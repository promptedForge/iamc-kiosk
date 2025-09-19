# Development Workflow Guide

This guide provides practical workflows for developing features in the IAMC Human Rights Intelligence Platform using the dual-track methodology.

## 🎯 Choosing the Right Track

### Quick Decision Tree

```
Is this feature needed for a demo in <2 weeks?
├─ YES → Kiosk Track (Frontend)
│   └─ Will it eventually need production implementation?
│       ├─ YES → Notify dual-track-architect for planning
│       └─ NO → Proceed with demo-only implementation
└─ NO → Production Track (Backend)
    └─ Does it need UI demonstration?
        ├─ YES → Implement API first, then request demo UI
        └─ NO → Pure backend implementation
```

## 🚀 Development Workflows

### Workflow 1: New Feature (Demo First)

**Scenario**: Stakeholder wants to see a new dashboard for supply chain risks

```bash
# 1. Start with demo implementation
cd frontend
npm run dev

# 2. Create mock data
echo '[
  {
    "id": "supply-001",
    "risk": "Supplier labor violation",
    "severity": "high",
    "location": "Vietnam"
  }
]' > src/mocks/supply-risks.json

# 3. Build UI component
# Create: src/routes/SupplyRisk.tsx

# 4. Test locally
# View at: http://localhost:5173/supply-risk

# 5. If approved, plan production version
# Notify dual-track-architect for backend implementation
```

### Workflow 2: API-First Feature

**Scenario**: Implement real-time data ingestion from news feeds

```bash
# 1. Design API contract first
cd backend

# 2. Create new endpoint in api/src/main.rs
# Route: /ingest/realtime

# 3. Implement business logic in engine/
cargo test

# 4. Test with curl
cargo run -- --mock
curl http://localhost:8787/ingest/realtime

# 5. Request UI from demo track
# Once API is stable
```

### Workflow 3: Full-Stack Feature

**Scenario**: Role-based analytics dashboard

```bash
# 1. Architect reviews requirements
# Decision: Both tracks needed

# 2. Backend implements API
cd backend
# Create: GET /analytics/:role
cargo test

# 3. Frontend creates UI (parallel)
cd frontend
# Mock the API response first
# Create: src/routes/Analytics.tsx

# 4. Integration
# Update frontend to use real API
# Test end-to-end flow

# 5. Deploy both services
docker-compose build
docker-compose up
```

## 🛠️ Common Development Tasks

### Adding a New Page (Frontend)

1. Create route component:
```typescript
// src/routes/NewFeature.tsx
export default function NewFeature() {
  return (
    <div className="min-h-screen px-10 py-20 bg-navy">
      <h1 className="text-3xl font-bold">New Feature</h1>
    </div>
  )
}
```

2. Add to router:
```typescript
// src/main.tsx
import NewFeature from './routes/NewFeature'

<Route path="/new-feature" element={<NewFeature />} />
```

3. Add navigation:
```typescript
// Add keyboard shortcut in App.tsx
if(e.key === 'n') nav('/new-feature')
```

### Adding an API Endpoint (Backend)

1. Define handler:
```rust
// api/src/main.rs
async fn new_endpoint(
    State(state): State<AppState>
) -> Result<Json<Response>, (StatusCode, String)> {
    Ok(Json(Response { data: "Hello" }))
}
```

2. Add route:
```rust
.route("/api/new", get(new_endpoint))
```

3. Test:
```bash
cargo run -- --mock
curl http://localhost:8787/api/new
```

### Working with Mock Data

1. Create mock file:
```json
// backend/examples/new_data.json
{
  "items": [
    {"id": 1, "value": "test"}
  ]
}
```

2. Load in engine:
```rust
// engine/src/lib.rs
pub async fn load_new_data(cfg: &Config) -> Result<Data> {
    let path = format!("{}/new_data.json", cfg.examples_dir);
    let json = tokio::fs::read_to_string(path).await?;
    Ok(serde_json::from_str(&json)?)
}
```

## 🐛 Debugging Tips

### Frontend Debugging

```javascript
// Add debug logging
console.log('Component rendered', { data, userRole })

// Use React DevTools
// Install browser extension

// Check network requests
// Browser DevTools > Network tab

// Inspect component state
const debug = useStore(state => state)
console.log('Store state:', debug)
```

### Backend Debugging

```rust
// Add tracing
use tracing::{info, debug};

#[instrument]
async fn handler() -> Result<()> {
    debug!("Handler called");
    info!(user_id = ?id, "Processing request");
}

// Enable debug logs
RUST_LOG=debug cargo run

// Use dbg! macro for quick debugging
dbg!(&variable);
```

## 🔄 Git Workflows

### Feature Branch Workflow

```bash
# 1. Create feature branch
git checkout -b feature/supply-risk-dashboard

# 2. Make changes
git add .
git commit -m "feat: add supply risk dashboard

- Add new route for supply chain risks
- Create mock data for demo
- Implement basic filtering

Implements: JIRA-123"

# 3. Push and create PR
git push origin feature/supply-risk-dashboard
```

### Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Add tests
- `chore`: Maintenance

Example:
```
feat(frontend): add role-based filtering to radar view

- Filter issues based on user role (Analyst/Strategy Head)
- Add visual indicators for role-specific content
- Update mock data with visibility fields

Closes #45
```

## 📋 Code Review Checklist

### Frontend (Demo Track)
- [ ] UI looks polished and professional
- [ ] Animations are smooth (60fps)
- [ ] Works on 1920x1080 resolution
- [ ] No console errors
- [ ] Mock data is realistic

### Backend (Production Track)
- [ ] All tests pass
- [ ] Error handling is comprehensive
- [ ] API documentation updated
- [ ] No clippy warnings
- [ ] Performance benchmarks run

### Both Tracks
- [ ] Code follows project style
- [ ] No sensitive data exposed
- [ ] Changes are focused (no scope creep)
- [ ] PR description is clear

## 🚢 Deployment Process

### Local Development
```bash
# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && cargo run -- --mock

# Full stack
docker-compose up
```

### Staging Deployment
```bash
# Build and tag images
docker-compose build
docker tag kiosk:latest registry/iamc/kiosk:staging
docker tag sidecar:latest registry/iamc/sidecar:staging

# Push to registry
docker push registry/iamc/kiosk:staging
docker push registry/iamc/sidecar:staging

# Deploy (platform specific)
kubectl apply -f k8s/staging/
```

### Production Deployment
```bash
# Requires dual sign-off
# 1. Create release PR
# 2. Get approvals from:
#    - Dual-track architect
#    - Security team
#    - Operations team

# 3. Merge and tag
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# 4. Automated deployment pipeline runs
```

## 🔥 Hotfix Process

For critical production issues:

```bash
# 1. Create hotfix branch from production
git checkout -b hotfix/security-patch production

# 2. Make minimal fix
# Only fix the specific issue

# 3. Test thoroughly
cargo test
npm test

# 4. Deploy to staging first
# Verify fix works

# 5. Fast-track to production
# Requires emergency approval
```

## 💡 Best Practices

### Do's ✅
- Keep PRs small and focused
- Write descriptive commit messages
- Test before pushing
- Update documentation
- Communicate blockers early

### Don'ts ❌
- Don't mix track changes in one PR
- Don't skip code review
- Don't deploy on Fridays
- Don't ignore test failures
- Don't commit secrets

## 📚 Resources

- [Frontend Guide](../frontend/README.md)
- [Backend Guide](../backend/README.md)
- [API Documentation](./API.md)
- [Agent Workflows](./AGENTS.md)

---

Remember: The dual-track methodology enables speed without sacrificing quality. Use each track's strengths appropriately!