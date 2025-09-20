//! Configuration persistence and management

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use chrono::{DateTime, Utc};

/// Kiosk configuration settings
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct KioskConfig {
    pub auto_refresh_interval: u32, // seconds
    pub idle_timeout_minutes: u32,
    pub show_keyboard_shortcuts: bool,
    pub enable_touch_mode: bool,
    pub default_start_page: String,
    pub last_updated: DateTime<Utc>,
}

impl Default for KioskConfig {
    fn default() -> Self {
        Self {
            auto_refresh_interval: 30,
            idle_timeout_minutes: 5,
            show_keyboard_shortcuts: true,
            enable_touch_mode: false,
            default_start_page: "/".to_string(),
            last_updated: Utc::now(),
        }
    }
}

/// Production configuration with environment variable support
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ProductionConfig {
    // API endpoints
    pub api_base_url: String,
    pub index_cli_path: Option<String>,
    pub retrieve_cli_path: Option<String>,
    
    // Export settings
    pub wkhtmltopdf_path: Option<String>,
    pub export_formats_enabled: Vec<String>,
    
    // Security settings
    pub require_dual_signoff: bool,
    pub signoff_timeout_hours: u32,
    
    // Performance settings
    pub cache_ttl_seconds: u32,
    pub max_concurrent_requests: u32,
    
    // Feature flags
    pub features: HashMap<String, bool>,
}

impl ProductionConfig {
    /// Load configuration from environment variables with defaults
    pub fn from_env() -> Self {
        Self {
            api_base_url: std::env::var("IAMC_API_BASE_URL")
                .unwrap_or_else(|_| "http://localhost:8787".to_string()),
            
            index_cli_path: std::env::var("IAMC_CLI_INDEX").ok(),
            retrieve_cli_path: std::env::var("IAMC_CLI_RETRIEVE").ok(),
            
            wkhtmltopdf_path: std::env::var("WKHTMLTOPDF_PATH").ok(),
            export_formats_enabled: std::env::var("IAMC_EXPORT_FORMATS")
                .map(|s| s.split(',').map(String::from).collect())
                .unwrap_or_else(|_| vec!["zip".to_string(), "json".to_string()]),
            
            require_dual_signoff: std::env::var("IAMC_REQUIRE_DUAL_SIGNOFF")
                .map(|s| s == "true" || s == "1")
                .unwrap_or(true),
            signoff_timeout_hours: std::env::var("IAMC_SIGNOFF_TIMEOUT_HOURS")
                .ok()
                .and_then(|s| s.parse().ok())
                .unwrap_or(24),
            
            cache_ttl_seconds: std::env::var("IAMC_CACHE_TTL_SECONDS")
                .ok()
                .and_then(|s| s.parse().ok())
                .unwrap_or(300),
            max_concurrent_requests: std::env::var("IAMC_MAX_CONCURRENT_REQUESTS")
                .ok()
                .and_then(|s| s.parse().ok())
                .unwrap_or(10),
            
            features: Self::load_features(),
        }
    }
    
    fn load_features() -> HashMap<String, bool> {
        let mut features = HashMap::new();
        
        features.insert(
            "hypothesis_generation".to_string(),
            std::env::var("IAMC_FEATURE_HYPOTHESIS_GENERATION")
                .map(|s| s == "true" || s == "1")
                .unwrap_or(false),
        );
        
        features.insert(
            "touch_mode".to_string(),
            std::env::var("IAMC_FEATURE_TOUCH_MODE")
                .map(|s| s == "true" || s == "1")
                .unwrap_or(false),
        );
        
        features.insert(
            "advanced_export".to_string(),
            std::env::var("IAMC_FEATURE_ADVANCED_EXPORT")
                .map(|s| s == "true" || s == "1")
                .unwrap_or(false),
        );
        
        features
    }
}

/// Configuration manager for persisting and loading configs
pub struct ConfigManager {
    config_dir: PathBuf,
}

impl ConfigManager {
    pub fn new(config_dir: PathBuf) -> Result<Self> {
        std::fs::create_dir_all(&config_dir)
            .context("Failed to create config directory")?;
        Ok(Self { config_dir })
    }
    
    /// Save kiosk configuration
    pub fn save_kiosk_config(&self, config: &mut KioskConfig) -> Result<()> {
        config.last_updated = Utc::now();
        
        let path = self.config_dir.join("kiosk.json");
        let json = serde_json::to_string_pretty(config)
            .context("Failed to serialize kiosk config")?;
        
        std::fs::write(&path, json)
            .with_context(|| format!("Failed to write kiosk config to {:?}", path))?;
        
        Ok(())
    }
    
    /// Load kiosk configuration
    pub fn load_kiosk_config(&self) -> Result<KioskConfig> {
        let path = self.config_dir.join("kiosk.json");
        
        if !path.exists() {
            return Ok(KioskConfig::default());
        }
        
        let contents = std::fs::read_to_string(&path)
            .with_context(|| format!("Failed to read kiosk config from {:?}", path))?;
        
        let config: KioskConfig = serde_json::from_str(&contents)
            .context("Failed to parse kiosk config")?;
        
        Ok(config)
    }
    
    /// Save production configuration
    pub fn save_production_config(&self, config: &ProductionConfig) -> Result<()> {
        let path = self.config_dir.join("production.json");
        let json = serde_json::to_string_pretty(config)
            .context("Failed to serialize production config")?;
        
        std::fs::write(&path, json)
            .with_context(|| format!("Failed to write production config to {:?}", path))?;
        
        Ok(())
    }
    
    /// Load production configuration (with env overrides)
    pub fn load_production_config(&self) -> Result<ProductionConfig> {
        let path = self.config_dir.join("production.json");
        
        if !path.exists() {
            return Ok(ProductionConfig::from_env());
        }
        
        let contents = std::fs::read_to_string(&path)
            .with_context(|| format!("Failed to read production config from {:?}", path))?;
        
        let mut config: ProductionConfig = serde_json::from_str(&contents)
            .context("Failed to parse production config")?;
        
        // Apply environment variable overrides
        if let Ok(url) = std::env::var("IAMC_API_BASE_URL") {
            config.api_base_url = url;
        }
        
        // Apply other env overrides as needed...
        
        Ok(config)
    }
}

/// Helper to create default config directory
pub fn default_config_dir() -> Result<PathBuf> {
    let home = dirs::home_dir()
        .context("Failed to determine home directory")?;
    
    Ok(home.join(".iamc").join("config"))
}