//! Production hypothesis generation module

use anyhow::Result;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

/// Represents a hypothesis about an issue with confidence and provenance
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Hypothesis {
    pub id: String,
    pub event_id: String,
    pub text: String,
    pub confidence: f32,
    pub factors: HypothesisFactors,
    pub lead_days: i32,
    pub scope_contrib: std::collections::HashMap<String, f32>,
    pub utility: HypothesisUtility,
    pub provenance: Vec<ProvenanceItem>,
    pub created_at: DateTime<Utc>,
    pub status: HypothesisStatus,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct HypothesisFactors {
    pub source_diversity: f32,
    pub persistence: f32,
    pub effect_size: f32,
    pub corroboration: f32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct HypothesisUtility {
    pub predictive: String,
    pub mapping: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ProvenanceItem {
    pub source: String,
    pub url: String,
    pub confidence: f32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum HypothesisStatus {
    Candidate,
    Pinned,
    UnderInvestigation,
    Rejected,
    Confirmed,
}

/// Trait for sources that can provide state snapshots for hypothesis generation
pub trait StateSnapshotSource: Send + Sync {
    fn get_current_snapshot(&self, issue_id: &str) -> Result<StateSnapshot>;
    fn get_historical_snapshots(&self, issue_id: &str, days_back: i32) -> Result<Vec<StateSnapshot>>;
}

/// State snapshot for a given point in time
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct StateSnapshot {
    pub timestamp: DateTime<Utc>,
    pub issue_id: String,
    pub signals: Vec<Signal>,
    pub metrics: std::collections::HashMap<String, f32>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Signal {
    pub source: String,
    pub content: String,
    pub strength: f32,
    pub url: Option<String>,
}

/// Trait for anomaly detection algorithms
pub trait AnomalyDetector: Send + Sync {
    fn detect_anomalies(&self, snapshots: &[StateSnapshot]) -> Result<Vec<Anomaly>>;
    fn calculate_confidence(&self, anomaly: &Anomaly, context: &[StateSnapshot]) -> Result<f32>;
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Anomaly {
    pub pattern_type: String,
    pub description: String,
    pub detected_at: DateTime<Utc>,
    pub signals: Vec<String>,
    pub severity: f32,
}

/// Production hypothesis generator
pub struct HypothesisGenerator {
    snapshot_source: Box<dyn StateSnapshotSource>,
    anomaly_detector: Box<dyn AnomalyDetector>,
}

impl HypothesisGenerator {
    pub fn new(
        snapshot_source: Box<dyn StateSnapshotSource>,
        anomaly_detector: Box<dyn AnomalyDetector>,
    ) -> Self {
        Self {
            snapshot_source,
            anomaly_detector,
        }
    }

    /// Generate hypotheses for a given issue
    pub async fn generate_hypotheses(&self, issue_id: &str) -> Result<Vec<Hypothesis>> {
        // Get current and historical snapshots
        let current = self.snapshot_source.get_current_snapshot(issue_id)?;
        let historical = self.snapshot_source.get_historical_snapshots(issue_id, 30)?;
        
        // Detect anomalies
        let mut all_snapshots = historical;
        all_snapshots.push(current.clone());
        let anomalies = self.anomaly_detector.detect_anomalies(&all_snapshots)?;
        
        // Convert anomalies to hypotheses
        let mut hypotheses = Vec::new();
        for anomaly in anomalies {
            let confidence = self.anomaly_detector.calculate_confidence(&anomaly, &all_snapshots)?;
            
            let hypothesis = Hypothesis {
                id: format!("hyp_{}", uuid::Uuid::new_v4()),
                event_id: issue_id.to_string(),
                text: anomaly.description.clone(),
                confidence,
                factors: self.calculate_factors(&anomaly, &current),
                lead_days: self.estimate_lead_time(&anomaly, &all_snapshots),
                scope_contrib: self.calculate_scope_contribution(&anomaly),
                utility: HypothesisUtility {
                    predictive: "Early warning indicator".to_string(),
                    mapping: "Risk landscape evolution".to_string(),
                },
                provenance: self.extract_provenance(&anomaly, &current),
                created_at: Utc::now(),
                status: HypothesisStatus::Candidate,
            };
            
            hypotheses.push(hypothesis);
        }
        
        Ok(hypotheses)
    }
    
    fn calculate_factors(&self, anomaly: &Anomaly, snapshot: &StateSnapshot) -> HypothesisFactors {
        // Production implementation would calculate real factors
        HypothesisFactors {
            source_diversity: 0.7,
            persistence: 0.8,
            effect_size: anomaly.severity,
            corroboration: 0.6,
        }
    }
    
    fn estimate_lead_time(&self, anomaly: &Anomaly, snapshots: &[StateSnapshot]) -> i32 {
        // Production implementation would analyze historical patterns
        7 // Default 7-day lead time
    }
    
    fn calculate_scope_contribution(&self, anomaly: &Anomaly) -> std::collections::HashMap<String, f32> {
        // Production implementation would map to actual scopes
        let mut contrib = std::collections::HashMap::new();
        contrib.insert("labor_rights".to_string(), 0.4);
        contrib.insert("supply_chain".to_string(), 0.3);
        contrib.insert("governance".to_string(), 0.3);
        contrib
    }
    
    fn extract_provenance(&self, anomaly: &Anomaly, snapshot: &StateSnapshot) -> Vec<ProvenanceItem> {
        snapshot.signals.iter()
            .filter(|s| anomaly.signals.contains(&s.source))
            .map(|s| ProvenanceItem {
                source: s.source.clone(),
                url: s.url.clone().unwrap_or_default(),
                confidence: s.strength,
            })
            .collect()
    }
}

/// Mock implementation for demo mode
pub struct MockSnapshotSource;

impl StateSnapshotSource for MockSnapshotSource {
    fn get_current_snapshot(&self, issue_id: &str) -> Result<StateSnapshot> {
        Ok(StateSnapshot {
            timestamp: Utc::now(),
            issue_id: issue_id.to_string(),
            signals: vec![
                Signal {
                    source: "Reuters".to_string(),
                    content: "Labor unrest reported".to_string(),
                    strength: 0.8,
                    url: Some("https://reuters.com/example".to_string()),
                },
            ],
            metrics: std::collections::HashMap::new(),
        })
    }
    
    fn get_historical_snapshots(&self, _issue_id: &str, _days_back: i32) -> Result<Vec<StateSnapshot>> {
        Ok(vec![])
    }
}

/// Mock anomaly detector for demo mode
pub struct MockAnomalyDetector;

impl AnomalyDetector for MockAnomalyDetector {
    fn detect_anomalies(&self, _snapshots: &[StateSnapshot]) -> Result<Vec<Anomaly>> {
        Ok(vec![])
    }
    
    fn calculate_confidence(&self, _anomaly: &Anomaly, _context: &[StateSnapshot]) -> Result<f32> {
        Ok(0.75)
    }
}