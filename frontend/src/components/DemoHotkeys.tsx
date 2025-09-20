import { useState } from 'react'

export default function DemoHotkeys() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-4 z-30">
      <div className="bg-black/60 backdrop-blur-md rounded-lg border border-cyan-900/30 p-3">
        {/* Compact horizontal view */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-cyan-300 font-medium">Demo Controls:</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">→</kbd>
              <span className="ml-1">Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">↑</kbd>
              <span className="ml-1">Tweaks</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">↓</kbd>
              <span className="ml-1">Export</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">F</kbd>
              <span className="ml-1">Kiosk Mode</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#162b44] rounded text-[10px]">⌥⌘/</kbd>
              <span className="ml-1">Controller</span>
            </div>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="ml-auto text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="Toggle detailed view"
          >
            <svg 
              className={`w-4 h-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expanded detailed view */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-cyan-900/30 text-xs space-y-4">
            <div>
              <h3 className="text-cyan-300 font-semibold mb-2">Intelligence Platform Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                This platform demonstrates a proactive intelligence monitoring system designed for human rights protection. 
                By analyzing multilingual data streams and detecting anomalies in societal, infrastructure, and economic indicators, 
                the system provides early warning capabilities for potential violations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-cyan-300 font-medium mb-2">Core Capabilities</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">•</span>
                    <span>Real-time pattern analysis across Hindi, English, and regional languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">•</span>
                    <span>Anomaly detection using temporal correlation analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">•</span>
                    <span>Language-agnostic meaning extraction to reduce bias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-0.5">•</span>
                    <span>Predictive modeling with 10-minute to 1-week lead times</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-cyan-300 font-medium mb-2">Demo Features</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span><strong>Radar View:</strong> Real-time issue monitoring dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span><strong>Brief Editor:</strong> Rapid intelligence synthesis tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span><strong>ROI Analysis:</strong> Impact measurement framework</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span><strong>Export System:</strong> Multi-format report generation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-cyan-900/20 rounded p-3 border border-cyan-900/30">
              <h4 className="text-cyan-300 font-medium mb-1">Human-Centered Design</h4>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                The platform prioritizes human oversight with dual sign-off requirements, transparent decision paths, 
                and immediate feedback loops. This ensures accountability while maintaining operational efficiency 
                in time-critical situations.
              </p>
            </div>

            <p className="text-gray-400 text-[10px] italic text-center">
              Built on proven methodologies from cross-sector anomaly detection systems
            </p>
          </div>
        )}
      </div>
    </div>
  )
}