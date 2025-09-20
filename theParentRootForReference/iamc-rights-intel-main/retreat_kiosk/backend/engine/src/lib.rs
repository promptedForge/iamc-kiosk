\
//! Engine library: loads example data, templating, ROI, export ZIP.

use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::{fs, path::Path};
use chrono::{DateTime, Utc};
use walkdir::WalkDir;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Config {
    pub examples_dir: String,
    pub mock: bool,
    pub cli_index: Option<String>,
    pub cli_retrieve: Option<String>,
    pub wkhtmltopdf_path: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct IngestStatus {
    pub count: usize,
    pub sources: Vec<String>,
    pub last_run: DateTime<Utc>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Issue {
    pub id: String,
    pub title: String,
    pub quadrant: String, // Policy | Industry | Advocacy | Risk
    pub score: f32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Brief {
    pub id: String,
    pub title: String,
    pub summary: String,
    pub risks: Vec<String>,
    pub opportunities: Vec<String>,
    pub recommendations: Vec<String>,
    pub evidence: Vec<Evidence>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Evidence {
    pub source: String,
    pub url: String,
    pub confidence: f32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LensBrief {
    pub lens: String,
    pub actions: Vec<String>,
    pub talking_points: Vec<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Assets {
    pub linkedin: String,
    pub email_paragraph: String,
    pub press_excerpt: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Roi {
    pub hours_saved: f32,
    pub fte_equiv: f32,
    pub before_hours: f32,
    pub after_minutes: f32,
}

impl Config {
    pub fn from_env(examples_dir: String, mock: bool) -> Self {
        Self {
            examples_dir,
            mock,
            cli_index: std::env::var("IAMC_CLI_INDEX").ok(),
            cli_retrieve: std::env::var("IAMC_CLI_RETRIEVE").ok(),
            wkhtmltopdf_path: std::env::var("WKHTMLTOPDF_PATH").ok(),
        }
    }
}

pub async fn load_ingest_status(cfg: &Config) -> Result<IngestStatus> {
    let mut count = 0usize;
    for entry in WalkDir::new(&cfg.examples_dir) {
        let entry = entry?;
        if entry.file_type().is_file() && entry.path().extension().and_then(|x| x.to_str()) == Some("json") {
            count += 1;
        }
    }
    let srcs_path = Path::new(&cfg.examples_dir).join("sources.json");
    let sources: Vec<String> = if srcs_path.exists() {
        serde_json::from_str(&fs::read_to_string(srcs_path)?)?
    } else {
        vec!["news.rss".into(), "twitter".into(), "press_releases".into()]
    };
    Ok(IngestStatus { count, sources, last_run: Utc::now() })
}

pub async fn classify_today(cfg: &Config) -> Result<Vec<Issue>> {
    let p = Path::new(&cfg.examples_dir).join("classify_today.json");
    let txt = fs::read_to_string(p)?;
    let issues: Vec<Issue> = serde_json::from_str(&txt)?;
    Ok(issues)
}

pub async fn load_brief(cfg: &Config, id: &str) -> Result<Brief> {
    let p = Path::new(&cfg.examples_dir).join(format!("brief_{}.json", id));
    let txt = fs::read_to_string(p)?;
    let brief: Brief = serde_json::from_str(&txt)?;
    Ok(brief)
}

pub async fn lens_brief(cfg: &Config, id: &str, lens: &str) -> Result<LensBrief> {
    let p = Path::new(&cfg.examples_dir).join(format!("brief_{}_{}.json", id, lens));
    if p.exists() {
        let txt = fs::read_to_string(p)?;
        let lb: LensBrief = serde_json::from_str(&txt)?;
        return Ok(lb);
    }
    let b = load_brief(cfg, id).await?;
    let actions = match lens {
        "ceo" => vec![
            format!("Position IAMC as proactive voice on '{}'", b.title),
            "Align coalition messaging with today’s risks".into(),
            "Brief key donors with opportunity framing".into(),
        ],
        "coo" => vec![
            "Task comms to publish neutral summary in 2 hrs".into(),
            "Schedule director huddle for operational risks".into(),
            "Prep contingency for member inquiries".into(),
        ],
        _ => vec![
            "Send staff talking points to field teams".into(),
            "Flag at-risk partners and draft responses".into(),
            "Collect counter-narratives for intelligence".into(),
        ],
    };
    let talking_points = vec![b.summary.clone()];
    Ok(LensBrief { lens: lens.into(), actions, talking_points })
}

pub async fn generate_assets(_cfg: &Config, brief: &Brief) -> Result<Assets> {
    let linkedin = format!(
        "Today’s update: {} — {}\nRisks: {}\nOpportunities: {}\n#IAMC #Policy",
        brief.title,
        brief.summary,
        brief.risks.get(0).cloned().unwrap_or_default(),
        brief.opportunities.get(0).cloned().unwrap_or_default()
    );
    let email_paragraph = format!(
        "Team,\n\n{}\nRecommended actions today: {}\n\n— IAMC Daily Brief",
        brief.summary,
        brief.recommendations.join("; ")
    );
    let press_excerpt = format!(
        "{} — IAMC underscores the importance of {} while preparing members for {}.",
        brief.title,
        brief.opportunities.get(0).cloned().unwrap_or_default(),
        brief.risks.get(0).cloned().unwrap_or_default()
    );
    Ok(Assets { linkedin, email_paragraph, press_excerpt })
}

pub async fn roi_today(_cfg: &Config, issues_count: usize) -> Result<Roi> {
    let before_hours = (issues_count as f32) * 0.5 * 8.0 / 4.0;
    let after_minutes = (issues_count as f32) * 5.0;
    let hours_saved = before_hours - (after_minutes/60.0);
    let fte_equiv = hours_saved / 40.0;
    Ok(Roi { hours_saved, fte_equiv, before_hours, after_minutes })
}

pub fn build_zip_export(brief: &Brief, assets: &Assets, out_path: &Path) -> Result<()> {
    use std::io::Write;
    let file = fs::File::create(out_path)?;
    let mut zip = zip::ZipWriter::new(file);
    let opts = zip::write::SimpleFileOptions::default().compression_method(zip::CompressionMethod::Deflated);

    zip.start_file("brief.json", opts)?;
    zip.write_all(serde_json::to_string_pretty(brief)?.as_bytes())?;

    zip.start_file("assets.json", opts)?;
    zip.write_all(serde_json::to_string_pretty(assets)?.as_bytes())?;

    let html = format!(r#"
<!doctype html>
<html><head><meta charset="utf-8"><title>{}</title>
<style>body{{font-family:system-ui;margin:40px;}}.h1{{font-size:28px;font-weight:700;}}</style></head>
<body>
<div class="h1">{}</div>
<p>{}</p>
<h2>Risks</h2><ul>{}</ul>
<h2>Opportunities</h2><ul>{}</ul>
<h2>Recommendations</h2><ul>{}</ul>
<h2>Assets</h2>
<h3>LinkedIn</h3><pre>{}</pre>
<h3>Email Paragraph</h3><pre>{}</pre>
<h3>Press Excerpt</h3><pre>{}</pre>
</body></html>
"#,
        brief.title,
        brief.title,
        brief.summary,
        brief.risks.iter().map(|r| format!("<li>{}</li>", r)).collect::<Vec<_>>().join(""),
        brief.opportunities.iter().map(|r| format!("<li>{}</li>", r)).collect::<Vec<_>>().join(""),
        brief.recommendations.iter().map(|r| format!("<li>{}</li>", r)).collect::<Vec<_>>().join(""),
        assets.linkedin, assets.email_paragraph, assets.press_excerpt
    );
    zip.start_file("report.html", opts)?;
    zip.write_all(html.as_bytes())?;

    zip.finish()?;
    Ok(())
}
