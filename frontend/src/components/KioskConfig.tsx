import { useState } from 'react'

interface KioskConfigProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: KioskSettings) => void
  currentConfig: KioskSettings
}

export interface KioskSettings {
  autoRefreshInterval: number
  idleTimeoutMinutes: number
  showKeyboardShortcuts: boolean
  enableTouchMode: boolean
  defaultStartPage: string
}

export default function KioskConfig({ isOpen, onClose, onSave, currentConfig }: KioskConfigProps) {
  const [config, setConfig] = useState<KioskSettings>(currentConfig)
  
  if (!isOpen) return null
  
  const handleSave = () => {
    onSave(config)
    onClose()
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 grid place-items-center animate-fade-in">
      <div className="bg-card rounded-2xl p-8 max-w-2xl w-full mx-4 border border-cyan-900/50">
        <h2 className="text-2xl font-bold mb-6">Kiosk Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Auto-refresh Interval (seconds)</label>
            <select
              value={config.autoRefreshInterval}
              onChange={(e) => setConfig({ ...config, autoRefreshInterval: parseInt(e.target.value) })}
              className="w-full bg-[#11253c] px-4 py-2 rounded-lg border border-cyan-900/30"
            >
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={120}>2 minutes</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Idle Timeout (minutes)</label>
            <select
              value={config.idleTimeoutMinutes}
              onChange={(e) => setConfig({ ...config, idleTimeoutMinutes: parseInt(e.target.value) })}
              className="w-full bg-[#11253c] px-4 py-2 rounded-lg border border-cyan-900/30"
            >
              <option value={3}>3 minutes</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Default Start Page</label>
            <select
              value={config.defaultStartPage}
              onChange={(e) => setConfig({ ...config, defaultStartPage: e.target.value })}
              className="w-full bg-[#11253c] px-4 py-2 rounded-lg border border-cyan-900/30"
            >
              <option value="/">Role Selection</option>
              <option value="/radar">Radar View</option>
              <option value="/roi">ROI Dashboard</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={config.showKeyboardShortcuts}
                onChange={(e) => setConfig({ ...config, showKeyboardShortcuts: e.target.checked })}
                className="w-5 h-5 rounded border-cyan-900/50"
              />
              <span className="text-sm">Show keyboard shortcuts help</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={config.enableTouchMode}
                onChange={(e) => setConfig({ ...config, enableTouchMode: e.target.checked })}
                className="w-5 h-5 rounded border-cyan-900/50"
              />
              <span className="text-sm">Enable touch-friendly mode</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="btn opacity-80 hover:opacity-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}