use axum::{routing::{get, post}, Json, Router, extract::{Path, Query, State}};
use axum::http::StatusCode;
use clap::Parser;
use engine::{Config, IngestStatus, Issue, Brief, LensBrief, Assets, Roi, UiConfig, RuntimeState, load_ui_config, save_ui_config, load_runtime, save_runtime, list_learn_samples, save_learn_sample};
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{CorsLayer, Any};
use serde::{Deserialize, Serialize};
use tracing::{info, error};
use anyhow::Result;
use base64::Engine;

#[derive(Clone)]
struct AppState { cfg: Arc<Config> }

#[derive(Parser, Debug)]
#[command(name="iamc-sidecar", version, about="Axum sidecar for IAMC executive mode")]
struct Args {
    #[arg(long, default_value="0.0.0.0:8787")]
    addr: String,
    #[arg(long, default_value_t=false)]
    mock: bool,
    #[arg(long, default_value="../examples")]
    examples: String,
}

#[derive(Deserialize)] struct LensQuery { lens: Option<String>, mock: Option<bool> }
#[derive(Deserialize)] struct MockQuery { mock: Option<bool> }
#[derive(Deserialize)] struct ConfigBody { cadence: Option<String>, time_of_day: Option<String>, days_of_week: Option<Vec<String>>, audiences: Option<Vec<String>>, require_dual_signoff: Option<bool>, autopublish: Option<bool> }
#[derive(Deserialize)] struct SignoffBody { role: String, approve: bool }
#[derive(Deserialize)] struct UploadBody { filename: String, content_base64: String }
#[derive(Deserialize)] struct GenerateReq { brief: engine::Brief, audience: Option<String> }
#[derive(Deserialize)] struct HypothesisAction { action: String }

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
        .route("/config", get(get_config).post(set_config))
        .route("/review/status", get(review_status))
        .route("/review/interrupt", post(review_interrupt))
        .route("/review/resume", post(review_resume))
        .route("/review/signoff", post(review_signoff))
        .route("/learn/samples", get(learn_samples))
        .route("/learn/upload", post(learn_upload))
        .route("/hypotheses/:id", get(get_hypotheses))
        .route("/hypotheses/:id/:hid/action", post(post_hypothesis_action))
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
    // Mock data for demo
    if st.cfg.mock {
        if let Some(lens) = q.lens {
            // Mock lens brief
            let mock_lens_brief = serde_json::json!({
                "actions": match lens.as_str() {
                    "ceo" => vec![
                        "Schedule executive briefing within 2 hours",
                        "Prepare media statement for board approval",
                        "Initiate stakeholder communications protocol"
                    ],
                    "coo" => vec![
                        "Review operational impact assessment",
                        "Coordinate cross-functional response team",
                        "Update internal crisis management procedures"
                    ],
                    "director" => vec![
                        "Brief department heads immediately",
                        "Compile regulatory compliance checklist",
                        "Monitor industry peer responses"
                    ],
                    _ => vec!["Monitor situation", "Prepare response", "Update stakeholders"]
                },
                "talking_points": match lens.as_str() {
                    "ceo" => vec![
                        "We are monitoring the situation closely and taking proactive measures",
                        "Our commitment to human rights remains unwavering",
                        "We will work with all stakeholders to ensure positive outcomes"
                    ],
                    "coo" => vec![
                        "Operations team is fully briefed and prepared",
                        "All protocols are being followed to ensure compliance",
                        "We have contingency plans in place for various scenarios"
                    ],
                    "director" => vec![
                        "Teams are aware and monitoring developments",
                        "We are coordinating with relevant departments",
                        "Regular updates will be provided as situation evolves"
                    ],
                    _ => vec!["Situation under review", "Updates forthcoming", "Coordinating response"]
                }
            });
            return Ok(Json(mock_lens_brief));
        } else {
            // Mock regular brief based on the ID
            let mock_brief = match id.as_str() {
                "farmers-20250919" => serde_json::json!({
                    "id": "farmers-20250919",
                    "title": "Farmer Protests Gain Momentum in Maharashtra",
                    "summary": "Large-scale farmer protests in Maharashtra demanding MSP guarantees show signs of spreading to neighboring states. Government response pending.",
                    "risks": vec![
                        "Supply chain disruptions if protests expand",
                        "Negative media coverage of corporate agriculture partnerships",
                        "Political pressure for immediate policy changes"
                    ],
                    "opportunities": vec![
                        "Engage directly with farmer organizations",
                        "Showcase sustainable agriculture initiatives",
                        "Partner with government on MSP solution framework"
                    ],
                    "recommendations": vec![
                        "Issue neutral statement supporting dialogue",
                        "Review agricultural supply chain dependencies",
                        "Prepare CSR initiative for affected regions"
                    ]
                }),
                _ => serde_json::json!({
                    "id": id,
                    "title": "Human Rights Pattern Analysis",
                    "summary": "Comprehensive analysis of recent human rights developments and their potential impact on operations and reputation.",
                    "risks": vec![
                        "Potential reputational impact from association",
                        "Regulatory scrutiny may increase",
                        "Stakeholder concerns about corporate response"
                    ],
                    "opportunities": vec![
                        "Demonstrate leadership in human rights",
                        "Strengthen stakeholder relationships",
                        "Enhance ESG credentials"
                    ],
                    "recommendations": vec![
                        "Monitor situation closely",
                        "Prepare comprehensive response plan",
                        "Engage with relevant stakeholders"
                    ]
                })
            };
            return Ok(Json(mock_brief));
        }
    }
    
    // Original logic for non-mock mode
    if let Some(lens) = q.lens {
        let lb: LensBrief = engine::lens_brief(&st.cfg, &id, &lens).await.map_err(err500)?;
        Ok(Json(serde_json::to_value(lb).unwrap()))
    } else {
        let b: Brief = engine::load_brief(&st.cfg, &id).await.map_err(err500)?;
        Ok(Json(serde_json::to_value(b).unwrap()))
    }
}
async fn assets_generate(State(st): State<AppState>, Json(req): Json<GenerateReq>) -> Result<Json<Assets>, (StatusCode, String)> {
    engine::generate_assets(&st.cfg, &req.brief, req.audience.as_deref()).await.map(Json).map_err(err500)
}
async fn roi_today(State(st): State<AppState>) -> Result<Json<Roi>, (StatusCode, String)> {
    let issues = engine::classify_today(&st.cfg).await.map_err(err500)?;
    engine::roi_today(&st.cfg, issues.len()).await.map(Json).map_err(err500)
}
async fn export_zip(State(st): State<AppState>, Path(id): Path<String>) -> Result<(axum::http::HeaderMap, Vec<u8>), (StatusCode, String)> {
    // review gating
    let cfg_ui = load_ui_config(&st.cfg).map_err(err500)?;
    let rstate = load_runtime(&st.cfg).map_err(err500)?;
    if rstate.human_interrupt_active {
        return Err((StatusCode::CONFLICT, "Export blocked: Human interrupt active".into()));
    }
    if cfg_ui.require_dual_signoff {
        let a = rstate.signoff.get("Analyst").copied().unwrap_or(false);
        let s = rstate.signoff.get("Strategy Head").copied().unwrap_or(false);
        if !(a && s) {
            return Err((StatusCode::FORBIDDEN, "Export blocked: Dual signoff required".into()));
        }
    }
    use std::io::Read;
    let b = engine::load_brief(&st.cfg, &id).await.map_err(err500)?;
    let a = engine::generate_assets(&st.cfg, &b, None).await.map_err(err500)?;
    let tmp = tempfile::NamedTempFile::new().map_err(err500)?;
    let path = tmp.path().to_path_buf();
    engine::build_zip_export(&b, &a, &path).map_err(err500)?;
    let mut f = std::fs::File::open(path).map_err(err500)?;
    let mut buf = vec![]; f.read_to_end(&mut buf).map_err(err500)?;
    let mut headers = axum::http::HeaderMap::new();
    headers.insert(axum::http::header::CONTENT_TYPE, "application/zip".parse().unwrap());
    headers.insert(axum::http::header::CONTENT_DISPOSITION, format!("attachment; filename=iamc_export_{}.zip", id).parse().unwrap());
    Ok((headers, buf))
}

async fn get_config(State(st): State<AppState>) -> Result<Json<UiConfig>, (StatusCode, String)> {
    load_ui_config(&st.cfg).map(Json).map_err(err500)
}
async fn set_config(State(st): State<AppState>, Json(body): Json<ConfigBody>) -> Result<Json<UiConfig>, (StatusCode, String)> {
    let mut c = load_ui_config(&st.cfg).map_err(err500)?;
    if let Some(v)=body.cadence { c.cadence = v; }
    if let Some(v)=body.time_of_day { c.time_of_day = v; }
    if let Some(v)=body.days_of_week { c.days_of_week = v; }
    if let Some(v)=body.audiences { c.audiences = v; }
    if let Some(v)=body.require_dual_signoff { c.require_dual_signoff = v; }
    if let Some(v)=body.autopublish { c.autopublish = v; }
    save_ui_config(&st.cfg, &c).map_err(err500)?; Ok(Json(c))
}

async fn review_status(State(st): State<AppState>) -> Result<Json<RuntimeState>, (StatusCode, String)> {
    load_runtime(&st.cfg).map(Json).map_err(err500)
}
async fn review_interrupt(State(st): State<AppState>) -> Result<Json<RuntimeState>, (StatusCode, String)> {
    let mut r = load_runtime(&st.cfg).map_err(err500)?; r.human_interrupt_active = true; save_runtime(&st.cfg, &r).map_err(err500)?; Ok(Json(r))
}
async fn review_resume(State(st): State<AppState>) -> Result<Json<RuntimeState>, (StatusCode, String)> {
    let mut r = load_runtime(&st.cfg).map_err(err500)?; r.human_interrupt_active = false; save_runtime(&st.cfg, &r).map_err(err500)?; Ok(Json(r))
}
async fn review_signoff(State(st): State<AppState>, Json(b): Json<SignoffBody>) -> Result<Json<RuntimeState>, (StatusCode, String)> {
    let mut r = load_runtime(&st.cfg).map_err(err500)?; r.signoff.insert(b.role, b.approve); save_runtime(&st.cfg, &r).map_err(err500)?; Ok(Json(r))
}

async fn learn_samples(State(st): State<AppState>) -> Result<Json<Vec<engine::LearnSample>>, (StatusCode, String)> {
    list_learn_samples(&st.cfg).map(Json).map_err(err500)
}
async fn learn_upload(State(st): State<AppState>, Json(b): Json<UploadBody>) -> Result<Json<engine::LearnSample>, (StatusCode, String)> {
    let bytes = base64::engine::general_purpose::STANDARD.decode(b.content_base64).map_err(err500)?;
    let s = save_learn_sample(&st.cfg, &b.filename, &bytes).map_err(err500)?; Ok(Json(s))
}

fn err500<E: std::fmt::Display>(e: E) -> (StatusCode, String) {
    error!("error: {}", e); (StatusCode::INTERNAL_SERVER_ERROR, format!("{}", e))
}

async fn get_hypotheses(State(st): State<AppState>, Path(id): Path<String>) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    if st.cfg.mock {
        // Load from examples/hypotheses_<id>.json
        let filepath = format!("{}/hypotheses_{}.json", st.cfg.examples_dir, id);
        match tokio::fs::read_to_string(&filepath).await {
            Ok(content) => {
                match serde_json::from_str(&content) {
                    Ok(json) => Ok(Json(json)),
                    Err(e) => {
                        error!("Failed to parse hypotheses file {}: {}", filepath, e);
                        Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Invalid JSON: {}", e)))
                    }
                }
            }
            Err(e) => {
                info!("No hypotheses file found for {}: {}", id, e);
                // Return empty array if file doesn't exist
                Ok(Json(serde_json::json!([])))
            }
        }
    } else {
        // TODO: Implement real hypothesis generation
        Ok(Json(serde_json::json!([])))
    }
}

async fn post_hypothesis_action(
    State(st): State<AppState>, 
    Path((id, hid)): Path<(String, String)>, 
    Json(body): Json<HypothesisAction>
) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    info!("Hypothesis action: id={}, hid={}, action={}", id, hid, body.action);
    
    if st.cfg.mock {
        // Log to a file for demo purposes
        let log_entry = format!("{},{},{},{}\n", 
            chrono::Utc::now().to_rfc3339(), 
            id, 
            hid, 
            body.action
        );
        let log_path = format!("{}/hypothesis_actions.log", st.cfg.examples_dir);
        
        match tokio::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open(&log_path)
            .await
        {
            Ok(mut file) => {
                use tokio::io::AsyncWriteExt;
                let _ = file.write_all(log_entry.as_bytes()).await;
            }
            Err(e) => {
                error!("Failed to write action log: {}", e);
            }
        }
        
        // Return success response
        Ok(Json(serde_json::json!({
            "status": "ok",
            "action": body.action,
            "hypothesis_id": hid,
            "event_id": id
        })))
    } else {
        // TODO: Implement real hypothesis action handling
        Ok(Json(serde_json::json!({
            "status": "ok",
            "action": body.action
        })))
    }
}
