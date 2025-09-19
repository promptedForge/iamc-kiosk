# Backend - Production/MVP Track

This is the production-grade Rust backend focused on robustness, scalability, and maintainability. This track emphasizes correctness, comprehensive testing, and professional engineering practices.

## 🎯 Track Philosophy

The production track operates under the principle: **"Build it right, test it thoroughly, scale it confidently."**

### Core Standards
- 🦀 **Memory-safe Rust** with zero unsafe blocks (unless documented)
- 🧪 **80%+ test coverage** with unit and integration tests
- 📚 **Comprehensive documentation** for all public APIs
- 🔒 **Security-first design** with proper error handling
- 🚀 **Performance benchmarks** for critical paths

## 🚀 Quick Start

```bash
# Build all workspace members
cargo build

# Run the API server with mock data
cargo run --bin api -- --mock --examples ./examples

# Run tests
cargo test

# Run with release optimizations
cargo run --release --bin api -- --mock --examples ./examples
```

## 🏗️ Architecture

```
backend/
├── Cargo.toml           # Workspace configuration
├── api/                 # REST API service (Axum)
│   ├── Cargo.toml
│   └── src/
│       └── main.rs      # API endpoints and server
├── engine/              # Core business logic
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs       # Domain models and logic
└── examples/            # Mock data for development
    ├── classify_today.json
    ├── brief_*.json
    └── runtime.json
```

## 🔧 Technology Stack

- **Web Framework**: [Axum](https://github.com/tokio-rs/axum) - Ergonomic and modular web framework
- **Async Runtime**: [Tokio](https://tokio.rs/) - Industry-standard async runtime
- **Serialization**: [Serde](https://serde.rs/) - Efficient serialization/deserialization
- **Error Handling**: [Anyhow](https://github.com/dtolnay/anyhow) + [Thiserror](https://github.com/dtolnay/thiserror)
- **Logging**: [Tracing](https://github.com/tokio-rs/tracing) - Structured, async-aware logging
- **CORS**: [Tower-HTTP](https://github.com/tower-rs/tower-http) - Middleware and services

## 📡 API Design

### RESTful Endpoints

```rust
let app = Router::new()
    .route("/ingest/status", get(ingest_status))
    .route("/classify/today", get(classify_today))
    .route("/brief/:id", get(brief))
    .route("/assets/generate", post(assets_generate))
    .route("/roi/today", get(roi_today))
    .route("/export/:id", post(export_zip))
    .route("/config", get(get_config).post(set_config))
    .route("/review/status", get(review_status))
    .route("/review/signoff", post(review_signoff))
    .with_state(shared_state)
    .layer(CorsLayer::very_permissive());
```

### Error Handling Pattern

```rust
// Custom error type with proper HTTP status codes
fn err500<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
}

// Result type for handlers
async fn handler() -> Result<Json<T>, (StatusCode, String)> {
    engine::operation()
        .await
        .map(Json)
        .map_err(err500)
}
```

## 🧪 Testing Strategy

### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_brief_parsing() {
        let json = include_str!("../examples/brief_test.json");
        let brief: Brief = serde_json::from_str(json).unwrap();
        assert_eq!(brief.id, "test-001");
    }

    #[tokio::test]
    async fn test_async_operation() {
        let result = async_function().await;
        assert!(result.is_ok());
    }
}
```

### Integration Tests
```rust
// tests/api_integration.rs
#[tokio::test]
async fn test_full_api_flow() {
    let app = create_test_app();
    
    let response = app
        .oneshot(Request::builder()
            .uri("/classify/today")
            .body(Body::empty())
            .unwrap())
        .await
        .unwrap();
        
    assert_eq!(response.status(), StatusCode::OK);
}
```

## 🔒 Security Best Practices

### Input Validation
```rust
#[derive(Deserialize, Validate)]
struct SignoffRequest {
    #[validate(length(min = 1, max = 50))]
    role: String,
    approve: bool,
}

async fn review_signoff(
    Json(payload): Json<SignoffRequest>,
) -> Result<Json<()>, (StatusCode, String)> {
    payload.validate().map_err(|e| {
        (StatusCode::BAD_REQUEST, e.to_string())
    })?;
    // Process validated input
}
```

### Secure Defaults
- CORS configured per environment
- All inputs sanitized
- Prepared statements for any DB queries
- Secrets never logged
- TLS required in production

## 🚀 Performance Optimization

### Concurrent Processing
```rust
use futures::future::join_all;

async fn process_multiple(ids: Vec<String>) -> Vec<Result<Brief, Error>> {
    let futures = ids.into_iter()
        .map(|id| async move {
            load_brief(&id).await
        });
    
    join_all(futures).await
}
```

### Caching Strategy
```rust
use std::sync::Arc;
use tokio::sync::RwLock;

type Cache<T> = Arc<RwLock<HashMap<String, (T, Instant)>>>;

struct AppState {
    brief_cache: Cache<Brief>,
    // ... other fields
}
```

## 📦 Deployment

### Docker Build
```dockerfile
# Multi-stage build for minimal image size
FROM rust:1.81 as builder
WORKDIR /work
COPY . .
RUN cargo build --release -p api

FROM debian:bookworm-slim
COPY --from=builder /work/target/release/api /usr/local/bin/
EXPOSE 8787
CMD ["api", "--addr", "0.0.0.0:8787"]
```

### Production Configuration
```rust
struct Config {
    pub addr: SocketAddr,
    pub examples_dir: String,
    pub mock: bool,
    pub max_connections: u32,
    pub timeout_seconds: u64,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        // Load from environment variables
        // with sensible defaults
    }
}
```

## 🔍 Monitoring & Observability

### Structured Logging
```rust
use tracing::{info, warn, error, instrument};

#[instrument(skip(state))]
async fn process_request(
    state: AppState,
    id: String,
) -> Result<Response> {
    info!("Processing request");
    
    match perform_operation(&id).await {
        Ok(result) => {
            info!(id = %id, "Operation successful");
            Ok(result)
        }
        Err(e) => {
            error!(id = %id, error = %e, "Operation failed");
            Err(e)
        }
    }
}
```

### Metrics Collection
```rust
// Prometheus-style metrics
static REQUEST_COUNTER: Lazy<IntCounter> = Lazy::new(|| {
    IntCounter::new("api_requests_total", "Total API requests")
        .expect("metric creation")
});

static RESPONSE_TIME: Lazy<Histogram> = Lazy::new(|| {
    Histogram::new("api_response_time_seconds", "API response time")
        .expect("metric creation")
});
```

## 🧰 Development Tools

### Cargo Commands
```bash
# Format code
cargo fmt

# Lint with clippy
cargo clippy -- -D warnings

# Security audit
cargo audit

# Generate documentation
cargo doc --open

# Run benchmarks
cargo bench

# Check for outdated dependencies
cargo outdated
```

### Git Hooks (recommended)
```bash
# .git/hooks/pre-commit
#!/bin/sh
cargo fmt --check
cargo clippy -- -D warnings
cargo test
```

## 📚 Code Style Guide

### Error Handling
```rust
// Use thiserror for library errors
#[derive(Debug, thiserror::Error)]
pub enum EngineError {
    #[error("Brief not found: {0}")]
    BriefNotFound(String),
    
    #[error("Invalid configuration: {0}")]
    ConfigError(String),
    
    #[error(transparent)]
    IoError(#[from] std::io::Error),
}

// Use anyhow for application errors
use anyhow::{Context, Result};

fn load_config() -> Result<Config> {
    std::fs::read_to_string("config.toml")
        .context("Failed to read config file")?
        .parse()
        .context("Failed to parse config")
}
```

### API Design
```rust
// Clear, RESTful routes
GET    /resources          // List
GET    /resources/:id      // Get one
POST   /resources          // Create
PUT    /resources/:id      // Update
DELETE /resources/:id      // Delete

// Consistent JSON responses
#[derive(Serialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    error: Option<String>,
}
```

## 🚨 Common Pitfalls & Solutions

### Async/Await Gotchas
```rust
// ❌ Don't block the runtime
let data = std::fs::read_to_string("file.txt")?;

// ✅ Use async alternatives
let data = tokio::fs::read_to_string("file.txt").await?;
```

### Memory Management
```rust
// ❌ Avoid unnecessary cloning
let items: Vec<String> = get_items();
for item in items.clone() { // Unnecessary clone!
    process(item);
}

// ✅ Use references when possible
let items: Vec<String> = get_items();
for item in &items {
    process(item);
}
```

## 🔮 Future Enhancements

### Planned Features
- [ ] GraphQL API alongside REST
- [ ] WebSocket support for real-time updates
- [ ] Database integration (PostgreSQL)
- [ ] Redis caching layer
- [ ] OpenTelemetry integration
- [ ] Python bindings via PyO3

### Performance Goals
- Sub-10ms response time for cached requests
- Support for 10,000+ concurrent connections
- Zero-downtime deployments
- Horizontal scaling ready

---

Remember: This track is about **building production-ready systems** that can scale, maintain, and evolve over time. Quality over speed, always!