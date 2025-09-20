//! Export format handlers for PDF, CSV, JSON, and ZIP

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use chrono::{DateTime, Utc};
use crate::{Brief, LensBrief, Assets, Config};

/// Export format enum
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
pub enum ExportFormat {
    Zip,
    Pdf,
    Csv,
    Json,
}

/// Export metadata
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ExportMetadata {
    pub format: ExportFormat,
    pub created_at: DateTime<Utc>,
    pub created_by: Vec<String>, // Signoff roles
    pub version: String,
    pub includes_hypotheses: bool,
}

/// Trait for export format handlers
pub trait ExportHandler: Send + Sync {
    fn export(
        &self,
        brief: &Brief,
        assets: &Assets,
        metadata: &ExportMetadata,
        output_path: &Path,
    ) -> Result<PathBuf>;
    
    fn get_content_type(&self) -> &'static str;
    fn get_file_extension(&self) -> &'static str;
}

/// JSON export handler
pub struct JsonExportHandler;

impl ExportHandler for JsonExportHandler {
    fn export(
        &self,
        brief: &Brief,
        assets: &Assets,
        metadata: &ExportMetadata,
        output_path: &Path,
    ) -> Result<PathBuf> {
        #[derive(Serialize)]
        struct JsonExport<'a> {
            metadata: &'a ExportMetadata,
            brief: &'a Brief,
            assets: &'a Assets,
            export_date: DateTime<Utc>,
        }
        
        let export = JsonExport {
            metadata,
            brief,
            assets,
            export_date: Utc::now(),
        };
        
        let json = serde_json::to_string_pretty(&export)
            .context("Failed to serialize JSON export")?;
        
        let file_path = output_path.with_extension("json");
        std::fs::write(&file_path, json)
            .context("Failed to write JSON export file")?;
        
        Ok(file_path)
    }
    
    fn get_content_type(&self) -> &'static str {
        "application/json"
    }
    
    fn get_file_extension(&self) -> &'static str {
        "json"
    }
}

/// CSV export handler
pub struct CsvExportHandler;

impl ExportHandler for CsvExportHandler {
    fn export(
        &self,
        brief: &Brief,
        _assets: &Assets,
        _metadata: &ExportMetadata,
        output_path: &Path,
    ) -> Result<PathBuf> {
        use std::io::Write;
        
        let file_path = output_path.with_extension("csv");
        let mut file = std::fs::File::create(&file_path)
            .context("Failed to create CSV file")?;
        
        // Write header
        writeln!(file, "Section,Content,Confidence")?;
        
        // Write brief data
        writeln!(file, "Title,\"{}\",", csv_escape(&brief.title))?;
        writeln!(file, "Summary,\"{}\",", csv_escape(&brief.summary))?;
        
        for risk in &brief.risks {
            writeln!(file, "Risk,\"{}\",", csv_escape(risk))?;
        }
        
        for opp in &brief.opportunities {
            writeln!(file, "Opportunity,\"{}\",", csv_escape(opp))?;
        }
        
        for rec in &brief.recommendations {
            writeln!(file, "Recommendation,\"{}\",", csv_escape(rec))?;
        }
        
        for evidence in &brief.evidence {
            writeln!(
                file,
                "Evidence,\"{} - {}\",{}",
                csv_escape(&evidence.source),
                csv_escape(&evidence.url),
                evidence.confidence
            )?;
        }
        
        Ok(file_path)
    }
    
    fn get_content_type(&self) -> &'static str {
        "text/csv"
    }
    
    fn get_file_extension(&self) -> &'static str {
        "csv"
    }
}

/// PDF export handler
pub struct PdfExportHandler {
    wkhtmltopdf_path: Option<String>,
}

impl PdfExportHandler {
    pub fn new(config: &Config) -> Self {
        Self {
            wkhtmltopdf_path: config.wkhtmltopdf_path.clone(),
        }
    }
}

impl ExportHandler for PdfExportHandler {
    fn export(
        &self,
        brief: &Brief,
        assets: &Assets,
        metadata: &ExportMetadata,
        output_path: &Path,
    ) -> Result<PathBuf> {
        // Generate HTML first
        let html = generate_pdf_html(brief, assets, metadata)?;
        let html_path = output_path.with_extension("html");
        std::fs::write(&html_path, html)
            .context("Failed to write HTML for PDF")?;
        
        let pdf_path = output_path.with_extension("pdf");
        
        // Use wkhtmltopdf if available
        if let Some(wk_path) = &self.wkhtmltopdf_path {
            use std::process::Command;
            
            let output = Command::new(wk_path)
                .args(&[
                    "--page-size", "A4",
                    "--margin-top", "20mm",
                    "--margin-bottom", "20mm",
                    "--margin-left", "15mm",
                    "--margin-right", "15mm",
                    html_path.to_str().unwrap(),
                    pdf_path.to_str().unwrap(),
                ])
                .output()
                .context("Failed to run wkhtmltopdf")?;
            
            if !output.status.success() {
                anyhow::bail!(
                    "wkhtmltopdf failed: {}",
                    String::from_utf8_lossy(&output.stderr)
                );
            }
            
            // Clean up HTML file
            let _ = std::fs::remove_file(&html_path);
        } else {
            // Fallback: just rename HTML to PDF (mock for demo)
            std::fs::rename(&html_path, &pdf_path)
                .context("Failed to create PDF file")?;
        }
        
        Ok(pdf_path)
    }
    
    fn get_content_type(&self) -> &'static str {
        "application/pdf"
    }
    
    fn get_file_extension(&self) -> &'static str {
        "pdf"
    }
}

/// Export manager that delegates to specific handlers
pub struct ExportManager {
    handlers: HashMap<ExportFormat, Box<dyn ExportHandler>>,
}

impl ExportManager {
    pub fn new(config: &Config) -> Self {
        let mut handlers: HashMap<ExportFormat, Box<dyn ExportHandler>> = HashMap::new();
        
        handlers.insert(ExportFormat::Json, Box::new(JsonExportHandler));
        handlers.insert(ExportFormat::Csv, Box::new(CsvExportHandler));
        handlers.insert(ExportFormat::Pdf, Box::new(PdfExportHandler::new(config)));
        
        Self { handlers }
    }
    
    pub fn export(
        &self,
        format: ExportFormat,
        brief: &Brief,
        assets: &Assets,
        metadata: &ExportMetadata,
        output_path: &Path,
    ) -> Result<(PathBuf, &'static str)> {
        let handler = self.handlers.get(&format)
            .context("Unsupported export format")?;
        
        let file_path = handler.export(brief, assets, metadata, output_path)?;
        let content_type = handler.get_content_type();
        
        Ok((file_path, content_type))
    }
}

// Helper functions

fn csv_escape(s: &str) -> String {
    s.replace('"', "\"\"")
}

fn generate_pdf_html(brief: &Brief, assets: &Assets, metadata: &ExportMetadata) -> Result<String> {
    Ok(format!(
        r#"<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>IAMC Intelligence Brief - {}</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        h1 {{ color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }}
        h2 {{ color: #0052a3; margin-top: 30px; }}
        .metadata {{ background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 30px; }}
        .section {{ margin-bottom: 30px; }}
        ul {{ padding-left: 25px; }}
        .evidence {{ background: #f9f9f9; padding: 10px; margin: 10px 0; border-left: 3px solid #0066cc; }}
    </style>
</head>
<body>
    <h1>{}</h1>
    
    <div class="metadata">
        <p><strong>Export Date:</strong> {}</p>
        <p><strong>Authorized By:</strong> {}</p>
    </div>
    
    <div class="section">
        <h2>Executive Summary</h2>
        <p>{}</p>
    </div>
    
    <div class="section">
        <h2>Risks</h2>
        <ul>
            {}
        </ul>
    </div>
    
    <div class="section">
        <h2>Opportunities</h2>
        <ul>
            {}
        </ul>
    </div>
    
    <div class="section">
        <h2>Recommendations</h2>
        <ul>
            {}
        </ul>
    </div>
    
    <div class="section">
        <h2>Evidence Sources</h2>
        {}
    </div>
    
    <div class="section">
        <h2>Generated Assets</h2>
        <h3>LinkedIn Post</h3>
        <pre>{}</pre>
        
        <h3>Email Template</h3>
        <pre>{}</pre>
    </div>
</body>
</html>"#,
        brief.title,
        brief.title,
        metadata.created_at.format("%Y-%m-%d %H:%M UTC"),
        metadata.created_by.join(", "),
        brief.summary,
        brief.risks.iter().map(|r| format!("<li>{}</li>", r)).collect::<Vec<_>>().join("\n            "),
        brief.opportunities.iter().map(|o| format!("<li>{}</li>", o)).collect::<Vec<_>>().join("\n            "),
        brief.recommendations.iter().map(|r| format!("<li>{}</li>", r)).collect::<Vec<_>>().join("\n            "),
        brief.evidence.iter().map(|e| format!(
            r#"<div class="evidence">
                <strong>{}</strong> (Confidence: {:.0}%)<br>
                <a href="{}">{}</a>
            </div>"#,
            e.source,
            e.confidence * 100.0,
            e.url,
            e.url
        )).collect::<Vec<_>>().join("\n        "),
        &assets.linkedin,
        &assets.email_paragraph,
    ))
}