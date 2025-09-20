# Production Recall Guide

This guide provides step-by-step instructions for transitioning from demo/kiosk mode to production.

## Overview

The codebase uses a dual-track architecture:
- **Demo/Kiosk Track**: Optimized for retreat demonstrations with mock data
- **Production Track**: Full-featured implementation with real data sources

## Production Modules Created

### 1. Hypothesis Generation (`backend/engine/src/hypothesis.rs`)
- **Traits**: `StateSnapshotSource`, `AnomalyDetector`
- **Classes**: `HypothesisGenerator`, `Hypothesis`, `StateSnapshot`
- **Integration Points**:
  - Replace `MockSnapshotSource` with real data source
  - Replace `MockAnomalyDetector` with ML-based detector
  - Wire up to actual CLI tools via `IAMC_CLI_INDEX` and `IAMC_CLI_RETRIEVE`

### 2. Role Management (`backend/engine/src/roles.rs`)
- **Classes**: `RoleManager`, `RoleContract`, `RoleCapabilities`
- **Integration Points**:
  - Update `backend/api/src/main.rs` export endpoint to use `RoleManager`
  - Load roles from `/contracts/roles.v1.json`
  - Replace hardcoded role checks throughout codebase

### 3. Export Handlers (`backend/engine/src/export.rs`)
- **Handlers**: `JsonExportHandler`, `CsvExportHandler`, `PdfExportHandler`
- **Integration Points**:
  - Wire up format parameter in export API endpoint
  - Configure `WKHTMLTOPDF_PATH` for PDF generation
  - Add format-specific routes if needed

### 4. Configuration Management (`backend/engine/src/config.rs`)
- **Classes**: `ConfigManager`, `KioskConfig`, `ProductionConfig`
- **Integration Points**:
  - Create config persistence endpoint in API
  - Wire up to KioskConfig component in frontend
  - Load from environment variables

## Migration Steps

### Phase 1: Backend Integration

1. **Update API Dependencies**
   ```toml
   # backend/api/Cargo.toml
   engine = { path = "../engine" }
   ```

2. **Replace Mock Hypothesis Endpoint**
   ```rust
   // backend/api/src/main.rs
   use engine::hypothesis::{HypothesisGenerator, YourSnapshotSource, YourDetector};
   
   async fn get_hypotheses(State(st): State<AppState>, Path(id): Path<String>) -> Result<Json<Vec<Hypothesis>>, (StatusCode, String)> {
       if st.cfg.mock {
           // Keep existing mock logic
       } else {
           let generator = HypothesisGenerator::new(
               Box::new(YourSnapshotSource::new()),
               Box::new(YourDetector::new())
           );
           let hypotheses = generator.generate_hypotheses(&id).await.map_err(err500)?;
           Ok(Json(hypotheses))
       }
   }
   ```

3. **Integrate Role Manager**
   ```rust
   // At startup
   let role_manager = RoleManager::from_contract_file("contracts/roles.v1.json")?;
   
   // In export endpoint
   if cfg_ui.require_dual_signoff {
       if !role_manager.has_required_signoffs(&rstate.signoff) {
           let missing = role_manager.get_missing_signoffs(&rstate.signoff);
           return Err((StatusCode::FORBIDDEN, 
               format!("Export blocked: Missing signoffs from: {}", missing.join(", "))));
       }
   }
   ```

4. **Wire Export Formats**
   ```rust
   use engine::export::{ExportManager, ExportFormat, ExportMetadata};
   
   async fn export_handler(
       State(st): State<AppState>, 
       Path(id): Path<String>,
       Query(params): Query<ExportParams>
   ) -> Result<(HeaderMap, Vec<u8>), (StatusCode, String)> {
       let format = params.format.unwrap_or(ExportFormat::Zip);
       let manager = ExportManager::new(&st.cfg);
       
       let metadata = ExportMetadata {
           format: format.clone(),
           created_at: Utc::now(),
           created_by: vec!["Media Team".into(), "Strategy Head".into()],
           version: "1.0".into(),
           includes_hypotheses: true,
       };
       
       let (path, content_type) = manager.export(format, &brief, &assets, &metadata, &tmp_path)?;
       // Read file and return with proper headers
   }
   ```

### Phase 2: Frontend Integration

1. **Update Query Client for Production**
   ```typescript
   // frontend/src/main.tsx
   const qc = new QueryClient({
     defaultOptions: {
       queries: {
         refetchInterval: import.meta.env.VITE_REFETCH_INTERVAL || 30000,
         // ... other production settings
       },
     },
   })
   ```

2. **Wire Kiosk Config Persistence**
   ```typescript
   // frontend/src/hooks/useKioskConfig.ts
   export function useKioskConfig() {
     const { data, mutate } = useMutation({
       mutationFn: async (config: KioskSettings) => {
         const res = await fetch(`${API}/config/kiosk`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(config),
         })
         return res.json()
       },
     })
     // ...
   }
   ```

3. **Implement Touch Detection**
   ```typescript
   // frontend/src/utils/touchDetection.ts
   export function isTouchDevice() {
     return ('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
   }
   
   // Apply in App.tsx
   useEffect(() => {
     if (isTouchDevice() && config.enableTouchMode) {
       document.body.classList.add('touch-mode')
     }
   }, [config.enableTouchMode])
   ```

### Phase 3: Environment Setup

1. **Copy and configure environment**
   ```bash
   cp .env.production.example .env.production
   # Edit with your values
   ```

2. **Set up contracts directory**
   ```bash
   mkdir -p contracts
   # Ensure roles.v1.json exists
   ```

3. **Configure external services**
   - Set up PostgreSQL/database if needed
   - Configure Sentry for error tracking
   - Set up analytics
   - Install wkhtmltopdf for PDF generation

### Phase 4: Testing

1. **Unit Tests**
   ```bash
   cd backend/engine
   cargo test
   ```

2. **Integration Tests**
   ```bash
   # With mock mode off
   IAMC_MOCK_MODE=false cargo test --test '*'
   ```

3. **End-to-End Tests**
   - Test hypothesis generation with real data
   - Verify role-based access control
   - Test all export formats
   - Verify kiosk mode with production data

## Rollback Plan

If issues arise:

1. **Quick Rollback**: Set `IAMC_MOCK_MODE=true` to revert to demo mode
2. **Feature Flags**: Disable specific features via environment:
   - `IAMC_FEATURE_HYPOTHESIS_GENERATION=false`
   - `IAMC_FEATURE_ADVANCED_EXPORT=false`

## Monitoring

Key metrics to track:
- Hypothesis generation latency
- Export success rate by format
- Role validation failures
- Kiosk session duration
- Auto-refresh performance impact

## Support

For production issues:
1. Check logs at configured log level
2. Review Sentry for errors
3. Use feature flags to isolate issues
4. Fallback to mock mode if needed