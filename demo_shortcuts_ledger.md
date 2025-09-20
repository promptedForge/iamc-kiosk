# Demo Shortcuts Ledger

This document tracks shortcuts taken in the demo/kiosk track that need to be addressed when the production track becomes priority next week.

## Shortcuts Taken

### 1. Hypotheses API Mock (P1)
- **What**: Hypotheses are served from static JSON files instead of being generated
- **Where**: `backend/api/src/main.rs` lines 248-268
- **Recall**: Implement real hypothesis generation using StateSnapshotSource and AnomalyDetector traits
- **Files**: `backend/examples/hypotheses_*.json`

### 2. Export Gate Hardcoded Role Names
- **What**: Export gate checks for "Media Team" and "Strategy Head" hardcoded
- **Where**: `backend/api/src/main.rs` lines 186-190
- **Recall**: Use roles.v1.json contract to dynamically load signoff roles
- **Impact**: Low - works for demo but not flexible

### 3. Hypothesis Actions Logged to File
- **What**: Hypothesis actions (pin/investigate/reject) just append to log file
- **Where**: `backend/api/src/main.rs` lines 279-301
- **Recall**: Implement proper state management and persistence
- **Files**: `backend/examples/hypothesis_actions.log`

### 4. Static Mock Lens Briefs
- **What**: CEO/COO/Director perspectives are hardcoded responses
- **Where**: `backend/api/src/main.rs` lines 76-113
- **Recall**: Generate lens-specific content based on role and context

### 5. Evidence Links Hardcoded
- **What**: Evidence provenance URLs are static in brief JSON files
- **Where**: All `backend/examples/brief_*.json` files
- **Recall**: Integrate with actual source tracking system

### 6. Data Scientist Role UI-Only
- **What**: Data Scientist role has no backend functionality
- **Where**: Frontend only - no backend integration
- **Recall**: Implement read-only metrics access for Data Scientist role

### 7. Hardcoded Hypothesis Indicator (D2)
- **What**: Hypothesis count indicator hardcoded for farmers-20250919
- **Where**: `frontend/src/routes/Radar.tsx` line 201-204
- **Recall**: Dynamically fetch hypothesis counts for all issues
- **Impact**: Low - works for demo but not dynamic

### 8. Static Confidence Bars (D2)
- **What**: Hypothesis confidence visualization uses static percentages
- **Where**: `frontend/src/routes/Issue.tsx` hypothesis panel
- **Recall**: Add real-time confidence updates based on new signals

### 9. Export Formats Mock (D3)
- **What**: Export format options (PDF, CSV, JSON) are UI-only
- **Where**: `frontend/src/routes/Issue.tsx` lines 434-441, `frontend/src/routes/Export.tsx`
- **Recall**: Implement actual format conversion in backend
- **Impact**: Low - ZIP export works, other formats need implementation

### 10. Export Gate Hardcoded Roles (D3)
- **What**: Export validation checks for hardcoded "Media Team" role
- **Where**: `backend/api/src/main.rs` lines 189-193
- **Recall**: Load roles dynamically from roles.v1.json contract
- **Note**: Fixed from "Analyst" to "Media Team" but still hardcoded

### 11. CSS Variables for Production Polish (D3)
- **What**: Added CSS custom properties for consistent theming
- **Where**: `frontend/src/index.css` lines 2-15
- **Recall**: Consider dark/light theme switching in production
- **Impact**: Low - improves maintainability

## Recall Priority

1. **High**: Hypotheses generation (blocking for real anomaly detection)
2. **High**: Hypothesis state management (needed for learning loop)
3. **High**: Export format implementations (PDF, CSV, JSON)
4. **Medium**: Dynamic role loading from contracts
5. **Medium**: Lens-specific content generation
6. **Medium**: Dynamic hypothesis counts in radar
7. **Low**: Evidence link integration
8. **Low**: Data Scientist backend features
9. **Low**: Theme switching system

## Notes

- All shortcuts are isolated to mock mode (`--mock` flag)
- Production code paths exist but return empty/default responses
- Schema contracts are in place to prevent drift during recall
- UI components are built to handle dynamic data when available
