\
use axum::{routing::{get, post}, Json, Router, extract::{Path, Query, State}, extract::Multipart};
use axum::http::StatusCode;
use clap::Parser;
use engine::{Config, IngestStatus, Issue, Brief, LensBrief, Assets, Roi};
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{CorsLayer, Any};
use serde::Deserialize;
use tracing::{info, error};
use anyhow::Result;

#[derive(Clone)]
struct AppState {
    cfg: Arc<Config>,
}

#[derive(Parser, Debug)]
#[command(name="iamc-sidecar", version, about="Axum sidecar for IAMC executive mode")]
struct Args {
    /// Serve address
    #[arg(long, default_value="0.0.0.0:8787")]
    addr: String,
    /// Use mock mode (no external calls)
    #[arg(long, default_value_t=false)]
    mock: bool,
    /// Examples dir
    #[arg(long, default_value="../examples")]
    examples: String,
}

#[derive(Deserialize)]
struct LensQuery { lens: Option<String>, mock: Option<bool> }
#[derive(Deserialize)]
struct MockQuery { mock: Option<bool> }

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt().with_env_filter("info").init();
    let args = Args::parse();
    let cfg = Config::from_env(args.examples.clone(), args.mock);
    let state = AppState { cfg: Arc::new(cfg) };

    let cors = CorsLayer::new().allow_methods(Any).allow_headers(Any).allow_origin(Any);
    let app = Router::new()
        .route("/ingest/status", get(ingest_status))
        .route("/classify/today", get(classify_today))
        .route("/brief/:id", get(brief))
        .route("/assets/generate", post(assets_generate))
        .route("/roi/today", get(roi_today))
        .route("/export/:id", post(export_zip))
        .route("/config", get(get_config).post(post_config))
        .route("/review/status", get(get_review))
        .route("/review/request", post(request_review))
        .route("/review/signoff", post(signoff_review))
        .route("/review/reset", post(reset_review))
        .route("/upload/past_report", post(upload_past_report))
        .route("/tweaks/preview", post(tweaks_preview))
        .with_state(state)
        .layer(cors);

    let addr: SocketAddr = args.addr.parse().expect("valid addr");
    info!("Serving on http://{}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await?, app).await?;
    Ok(())
}

async fn ingest_status(State(st): State<AppState>, Query(_): Query<MockQuery>) -> Result<Json<IngestStatus>, (StatusCode, String)> {
    engine::load_ingest_status(&st.cfg).await.map(Json).map_err(err500)
}

async fn classify_today(State(st): State<AppState>, Query(_): Query<MockQuery>) -> Result<Json<Vec<Issue>>, (StatusCode, String)> {
    engine::classify_today(&st.cfg).await.map(Json).map_err(err500)
}

async fn brief(State(st): State<AppState>, Path(id): Path<String>, Query(q): Query<LensQuery>) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    if let Some(lens) = q.lens {
        let lb: LensBrief = engine::lens_brief(&st.cfg, &id, &lens).await.map_err(err500)?;
        Ok(Json(serde_json::to_value(lb).unwrap()))
    } else {
        let b: Brief = engine::load_brief(&st.cfg, &id).await.map_err(err500)?;
        Ok(Json(serde_json::to_value(b).unwrap()))
    }
}

async fn assets_generate(State(st): State<AppState>, Json(b): Json<Brief>) -> Result<Json<Assets>, (StatusCode, String)> {
    engine::generate_assets(&st.cfg, &b).await.map(Json).map_err(err500)
}

async fn roi_today(State(st): State<AppState>) -> Result<Json<Roi>, (StatusCode, String)> {
    let issues = engine::classify_today(&st.cfg).await.map_err(err500)?;
    engine::roi_today(&st.cfg, issues.len()).await.map(Json).map_err(err500)
}

async fn export_zip(State(st): State<AppState>, Path(id): Path<String>) -> Result<(axum::http::HeaderMap, Vec<u8>), (StatusCode, String)> {
    use std::io::Read;
    let b = engine::load_brief(&st.cfg, &id).await.map_err(err500)?;
    let a = engine::generate_assets(&st.cfg, &b).await.map_err(err500)?;
    let tmp = tempfile::NamedTempFile::new().map_err(err500)?;
    let path = tmp.path().to_path_buf();
    engine::build_zip_export(&b, &a, &path).map_err(err500)?;
    let mut f = std::fs::File::open(path).map_err(err500)?;
    let mut buf = vec![];
    f.read_to_end(&mut buf).map_err(err500)?;
    let mut headers = axum::http::HeaderMap::new();
    headers.insert(axum::http::header::CONTENT_TYPE, "application/zip".parse().unwrap());
    headers.insert(axum::http::header::CONTENT_DISPOSITION, format!("attachment; filename=iamc_export_{}.zip", id).parse().unwrap());
    Ok((headers, buf))
}

fn err500<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    error!("error: {}", e);
    (StatusCode::INTERNAL_SERVER_ERROR, format!("{}", e))
}

// ===== Config & Review & Upload & Tweaks =====

#[derive(serde::Serialize, serde::Deserialize, Clone, Default)]
struct CadenceConfig {
    frequency: String, // daily|weekly|monthly
    send_time: String, // "09:00"
    audiences: Vec<String>, // ["Members","Donors","Public","Internal"]
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Default)]
struct ReviewState {
    requested: bool,
    admin_signed: bool,
    strategy_signed: bool,
}

fn cfg_path(base: &str) -> std::path::PathBuf { std::path::Path::new(base).join("config_state.json") }
fn review_path(base: &str) -> std::path::PathBuf { std::path::Path::new(base).join("review_state.json") }

async fn load_cfg(base: &str) -> CadenceConfig {
    let p = cfg_path(base);
    if p.exists() {
        serde_json::from_str(&std::fs::read_to_string(p).unwrap_or_default()).unwrap_or_default()
    } else {
        CadenceConfig { frequency: "weekly".into(), send_time: "09:00".into(), audiences: vec!["Members".into(), "Internal".into()] }
    }
}
async fn save_cfg(base: &str, cfg: &CadenceConfig) -> anyhow::Result<()> {
    std::fs::write(cfg_path(base), serde_json::to_string_pretty(cfg)?)?; Ok(())
}
async fn load_review(base: &str) -> ReviewState {
    let p = review_path(base);
    if p.exists() {
        serde_json::from_str(&std::fs::read_to_string(p).unwrap_or_default()).unwrap_or_default()
    } else { ReviewState::default() }
}
async fn save_review(base: &str, s: &ReviewState) -> anyhow::Result<()> {
    std::fs::write(review_path(base), serde_json::to_string_pretty(s)?)?; Ok(())
}

// Config endpoints
async fn get_config(State(st): State<AppState>) -> Result<Json<CadenceConfig>, (StatusCode, String)> {
    Ok(Json(load_cfg(&st.cfg.examples_dir).await))
}
async fn post_config(State(st): State<AppState>, Json(cfg): Json<CadenceConfig>) -> Result<Json<CadenceConfig>, (StatusCode, String)> {
    save_cfg(&st.cfg.examples_dir, &cfg).await.map_err(err500)?;
    Ok(Json(cfg))
}

// Review endpoints
async fn get_review(State(st): State<AppState>) -> Result<Json<ReviewState>, (StatusCode, String)> {
    Ok(Json(load_review(&st.cfg.examples_dir).await))
}
async fn request_review(State(st): State<AppState>) -> Result<Json<ReviewState>, (StatusCode, String)> {
    let mut s = load_review(&st.cfg.examples_dir).await;
    s.requested = true; s.admin_signed = false; s.strategy_signed = false;
    save_review(&st.cfg.examples_dir, &s).await.map_err(err500)?;
    Ok(Json(s))
}
#[derive(Deserialize)]
struct Signoff { role: String }
async fn signoff_review(State(st): State<AppState>, Json(b): Json<Signoff>) -> Result<Json<ReviewState>, (StatusCode, String)> {
    let mut s = load_review(&st.cfg.examples_dir).await;
    match b.role.as_str() { "admin" => s.admin_signed = true, "strategy" => s.strategy_signed = true, _ => {} }
    save_review(&st.cfg.examples_dir, &s).await.map_err(err500)?;
    Ok(Json(s))
}
async fn reset_review(State(st): State<AppState>) -> Result<Json<ReviewState>, (StatusCode, String)> {
    let s = ReviewState::default(); save_review(&st.cfg.examples_dir, &s).await.map_err(err500)?; Ok(Json(s))
}

// Upload past report
async fn upload_past_report(State(st): State<AppState>, mut multipart: Multipart) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    let mut meta = serde_json::json!({"ok": true});
    let base = std::path::Path::new(&st.cfg.examples_dir).join("past_reports");
    std::fs::create_dir_all(&base).ok();
    while let Some(field) = multipart.next_field().await.map_err(err500)? {
        let fname = field.file_name().map(|s| s.to_string()).unwrap_or_else(|| "report.html".into());
        let data = field.bytes().await.map_err(err500)?;
        let id = format!("{}", uuid::Uuid::new_v4());
        let path = base.join(format!("{id}_{fname}"));
        std::fs::write(&path, &data).map_err(err500)?;
        let head = String::from_utf8_lossy(&data[..std::cmp::min(200, data.len())]).to_string();
        meta = serde_json::json!({"ok": true, "id": id, "filename": fname, "preview": head});
    }
    Ok(Json(meta))
}

// Tweaks preview
#[derive(Deserialize)]
struct TweaksBody { brief: engine::Brief, past_report_id: Option<String>, notes: Option<String> }
async fn tweaks_preview(State(st): State<AppState>, Json(b): Json<TweaksBody>) -> Result<Json<engine::Brief>, (StatusCode, String)> {
    let mut brief = b.brief;
    if let Some(n) = b.notes {
        brief.summary = format!("{} | Tweaks: {}", brief.summary, n);
        brief.recommendations.push(format!("Incorporate tweaks: {}", n));
    }
    Ok(Json(brief))
}
