//! Dynamic role management based on contracts

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::Path;

/// Role contract schema
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RoleContract {
    pub signoff_roles: Vec<String>,
    pub operational_roles: Vec<String>,
    pub ui_role_aliases: HashMap<String, String>,
}

/// Role permissions and capabilities
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RoleCapabilities {
    pub can_signoff: bool,
    pub can_export: bool,
    pub can_view_hypotheses: bool,
    pub can_action_hypotheses: bool,
    pub read_only: bool,
}

/// Role manager for loading and querying roles
pub struct RoleManager {
    contract: RoleContract,
    capabilities: HashMap<String, RoleCapabilities>,
}

impl RoleManager {
    /// Load roles from contract file
    pub fn from_contract_file<P: AsRef<Path>>(path: P) -> Result<Self> {
        let contents = std::fs::read_to_string(&path)
            .with_context(|| format!("Failed to read role contract from {:?}", path.as_ref()))?;
        
        let contract: RoleContract = serde_json::from_str(&contents)
            .context("Failed to parse role contract JSON")?;
        
        let mut capabilities = HashMap::new();
        
        // Set capabilities for signoff roles
        for role in &contract.signoff_roles {
            capabilities.insert(role.clone(), RoleCapabilities {
                can_signoff: true,
                can_export: true,
                can_view_hypotheses: true,
                can_action_hypotheses: true,
                read_only: false,
            });
        }
        
        // Set capabilities for operational roles
        for role in &contract.operational_roles {
            capabilities.insert(role.clone(), RoleCapabilities {
                can_signoff: false,
                can_export: false,
                can_view_hypotheses: true,
                can_action_hypotheses: false,
                read_only: true,
            });
        }
        
        Ok(Self {
            contract,
            capabilities,
        })
    }
    
    /// Get canonical role name from alias
    pub fn resolve_alias(&self, alias: &str) -> String {
        self.contract.ui_role_aliases
            .get(alias)
            .cloned()
            .unwrap_or_else(|| alias.to_string())
    }
    
    /// Check if role can perform signoff
    pub fn can_signoff(&self, role: &str) -> bool {
        let canonical = self.resolve_alias(role);
        self.capabilities
            .get(&canonical)
            .map(|c| c.can_signoff)
            .unwrap_or(false)
    }
    
    /// Check if role can export
    pub fn can_export(&self, role: &str) -> bool {
        let canonical = self.resolve_alias(role);
        self.capabilities
            .get(&canonical)
            .map(|c| c.can_export)
            .unwrap_or(false)
    }
    
    /// Get all signoff roles
    pub fn get_signoff_roles(&self) -> &[String] {
        &self.contract.signoff_roles
    }
    
    /// Get all operational roles
    pub fn get_operational_roles(&self) -> &[String] {
        &self.contract.operational_roles
    }
    
    /// Check if all required signoffs are present
    pub fn has_required_signoffs(&self, signoffs: &HashMap<String, bool>) -> bool {
        self.contract.signoff_roles.iter().all(|role| {
            signoffs.get(role).copied().unwrap_or(false)
        })
    }
    
    /// Get missing signoffs
    pub fn get_missing_signoffs(&self, signoffs: &HashMap<String, bool>) -> Vec<String> {
        self.contract.signoff_roles.iter()
            .filter(|role| !signoffs.get(*role).copied().unwrap_or(false))
            .cloned()
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;
    
    #[test]
    fn test_role_loading() {
        let contract = RoleContract {
            signoff_roles: vec!["Media Team".to_string(), "Strategy Head".to_string()],
            operational_roles: vec!["Data Scientist".to_string()],
            ui_role_aliases: {
                let mut aliases = HashMap::new();
                aliases.insert("Analyst".to_string(), "Media Team".to_string());
                aliases.insert("analyst".to_string(), "Media Team".to_string());
                aliases
            },
        };
        
        let mut tmpfile = NamedTempFile::new().unwrap();
        write!(tmpfile, "{}", serde_json::to_string(&contract).unwrap()).unwrap();
        
        let manager = RoleManager::from_contract_file(tmpfile.path()).unwrap();
        
        assert!(manager.can_signoff("Media Team"));
        assert!(manager.can_signoff("Analyst")); // Via alias
        assert!(!manager.can_signoff("Data Scientist"));
        
        let mut signoffs = HashMap::new();
        signoffs.insert("Media Team".to_string(), true);
        assert!(!manager.has_required_signoffs(&signoffs));
        
        signoffs.insert("Strategy Head".to_string(), true);
        assert!(manager.has_required_signoffs(&signoffs));
    }
}