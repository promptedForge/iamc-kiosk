import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { getLLMService, initializeLLMService, type RequestyModel } from '../services/llm'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'
const REQUESTY_API_KEY = import.meta.env.VITE_REQUESTY_API_KEY || 'sk-MbEMvUXwQpuHBM++j4KOh6Uyc1uLOdNvyAKAE1RFNq036e/fUVp9GGi16gcKUTo6An8oJ5BRh1rFbctkP4iCy/Y5tDPIWWuvhrXEyXfFvgk='

type UiConfig = { 
  cadence:'daily'|'weekly'|'monthly', 
  time_of_day:string, 
  days_of_week:string[], 
  audiences:string[], 
  require_dual_signoff:boolean, 
  autopublish:boolean,
  selected_model?: string
}

export default function Palette(){
  const [open, setOpen] = useState(false)
  const [cfg, setCfg] = useState<UiConfig | null>(null)
  const [models, setModels] = useState<RequestyModel[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const nav = useNavigate()
  const { reset } = useStore()
  
  // Initialize LLM service on mount
  useEffect(() => {
    initializeLLMService(REQUESTY_API_KEY)
  }, [])

  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ 
        e.preventDefault()
        setOpen(o => !o)
      }
      if(e.key === 'Escape' && open){
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(()=>{ 
    if(open) {
      fetch(`${API}/config`).then(r=>r.json()).then(setCfg)
      // Fetch available models
      setLoadingModels(true)
      getLLMService().getModels()
        .then(setModels)
        .catch(console.error)
        .finally(() => setLoadingModels(false))
    }
  }, [open])

  async function update(partial: Partial<UiConfig>){
    const r = await fetch(`${API}/config`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(partial) })
    setCfg(await r.json())
  }
  async function interrupt(){ await fetch(`${API}/review/interrupt`, {method:'POST'}); setOpen(false) }
  async function resume(){ await fetch(`${API}/review/resume`, {method:'POST'}); setOpen(false) }

  if(!open) return null
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm grid place-items-center z-50 animate-fade-in" onClick={() => setOpen(false)}>
      <div className="w-[800px] max-h-[90vh] overflow-y-auto bg-[#0a1929] rounded-2xl shadow-2xl border border-cyan-900/30" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-[#0a1929] border-b border-cyan-900/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-cyan-100">Command Palette</h2>
            <button 
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-200 p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {!cfg ? (
          <div className="px-6 py-8 text-center">
            <div className="animate-pulse">Loading configuration...</div>
          </div>
        ) : (
          <div className="px-6 py-6 space-y-6">
            {/* Scheduling Section */}
            <section className="bg-[#11253c]/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                Scheduling Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Cadence</label>
                  <div className="flex gap-2">
                    {(['daily','weekly','monthly'] as const).map(c => (
                      <button 
                        key={c} 
                        className={`px-4 py-2 rounded-lg capitalize transition-all ${
                          cfg.cadence===c
                            ? 'bg-cyan-600 text-white ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0a1929]'
                            : 'bg-[#162b44] hover:bg-[#1b334f] text-gray-300'
                        }`} 
                        onClick={()=> update({cadence:c})}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Time of Day</label>
                  <input 
                    defaultValue={cfg.time_of_day} 
                    onBlur={(e)=> update({time_of_day: e.currentTarget.value})}
                    className="w-full bg-[#162b44] border border-cyan-900/30 rounded-lg px-4 py-2 focus:border-cyan-400 focus:outline-none transition-colors" 
                    placeholder="07:30"
                    type="time"
                  />
                </div>
              </div>
            </section>

            {/* Audience Section */}
            <section className="bg-[#11253c]/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                Target Audience
              </h3>
              <div className="flex gap-2 flex-wrap">
                {['CEO','COO','Director','Board','Members'].map(a => {
                  const sel = cfg.audiences.includes(a)
                  return (
                    <button 
                      key={a} 
                      className={`px-4 py-2 rounded-lg transition-all ${
                        sel
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400 ring-offset-2 ring-offset-[#0a1929]'
                          : 'bg-[#162b44] hover:bg-[#1b334f] text-gray-300'
                      }`}
                      onClick={()=> {
                        const next = sel ? cfg.audiences.filter(x=>x!==a) : [...cfg.audiences, a]
                        update({audiences: next})
                      }}
                    >
                      {a}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Security Settings */}
            <section className="bg-[#11253c]/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                Security & Publishing
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={cfg.require_dual_signoff} 
                    onChange={(e)=> update({require_dual_signoff: e.currentTarget.checked})}
                    className="w-5 h-5 rounded border-cyan-900/50 bg-[#162b44] text-cyan-500 focus:ring-2 focus:ring-cyan-400"
                  />
                  <span className="group-hover:text-cyan-100 transition-colors">
                    Require dual sign-off (Media Team + Strategy Head)
                  </span>
                  {cfg.require_dual_signoff && (
                    <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </label>
                
                <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                  <input 
                    type="checkbox" 
                    checked={cfg.autopublish} 
                    onChange={(e)=> update({autopublish: e.currentTarget.checked})} 
                    disabled
                    className="w-5 h-5 rounded border-gray-700 bg-[#162b44]"
                  />
                  <span>Autopublish</span>
                  <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </label>
              </div>
            </section>

            {/* AI Model Selection */}
            <section className="bg-[#11253c]/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                AI Model Configuration
              </h3>
              {loadingModels ? (
                <div className="text-center py-4">
                  <div className="animate-pulse">Loading available models...</div>
                </div>
              ) : models.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Selected Model</label>
                    <select 
                      value={cfg.selected_model || ''} 
                      onChange={(e) => update({ selected_model: e.target.value })}
                      className="w-full bg-[#162b44] border border-cyan-900/30 rounded-lg px-4 py-2 focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      <option value="">Auto-select (Recommended)</option>
                      <optgroup label="Reasoning Models">
                        {models.filter(m => m.supports_reasoning).map(model => (
                          <option key={model.id} value={model.id}>
                            {model.id} - ${model.input_price}/1K tokens
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Fast Models">
                        {models.filter(m => m.id.includes('mini') || m.id.includes('flash') || m.id.includes('haiku')).map(model => (
                          <option key={model.id} value={model.id}>
                            {model.id} - ${model.input_price}/1K tokens
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Standard Models">
                        {models.filter(m => 
                          !m.supports_reasoning && 
                          !m.id.includes('mini') && 
                          !m.id.includes('flash') && 
                          !m.id.includes('haiku')
                        ).map(model => (
                          <option key={model.id} value={model.id}>
                            {model.id} - ${model.input_price}/1K tokens
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  {cfg.selected_model && (() => {
                    const selectedModel = models.find(m => m.id === cfg.selected_model)
                    return selectedModel ? (
                      <div className="bg-[#0a1929]/50 rounded-lg p-3 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="opacity-60">Context Window:</span>
                          <span>{selectedModel.context_window.toLocaleString()} tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Max Output:</span>
                          <span>{selectedModel.max_output_tokens.toLocaleString()} tokens</span>
                        </div>
                        {selectedModel.supports_caching && (
                          <div className="text-green-400 text-[10px] mt-1">✓ Supports auto-caching</div>
                        )}
                        {selectedModel.description && (
                          <div className="mt-2 opacity-70 italic">{selectedModel.description}</div>
                        )}
                      </div>
                    ) : null
                  })()}
                  <div className="text-xs opacity-60 flex items-center gap-2">
                    <span className="text-yellow-400">⚠️</span>
                    <span>All models use Requesty.ai routing - data is NOT PRIVATE</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm opacity-60">No models available</div>
              )}
            </section>

            {/* Quick Actions */}
            <section className="bg-[#11253c]/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  className="group relative overflow-hidden bg-[#162b44] hover:bg-[#1b334f] px-4 py-3 rounded-lg transition-all hover:scale-[1.02]"
                  onClick={()=> { nav('/tweaks'); setOpen(false) }}
                >
                  <div className="relative z-10">
                    <div className="font-medium">Last Week + Tweaks</div>
                    <div className="text-xs text-gray-400 mt-1">Adjust generation params</div>
                  </div>
                </button>
                
                <button 
                  className="group relative overflow-hidden bg-yellow-900/30 hover:bg-yellow-900/40 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] border border-yellow-600/30"
                  onClick={interrupt}
                >
                  <div className="relative z-10">
                    <div className="font-medium text-yellow-200">Interrupt</div>
                    <div className="text-xs text-yellow-300/70 mt-1">Human in the loop</div>
                  </div>
                </button>
                
                <button 
                  className="group relative overflow-hidden bg-green-900/30 hover:bg-green-900/40 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] border border-green-600/30"
                  onClick={resume}
                >
                  <div className="relative z-10">
                    <div className="font-medium text-green-200">Resume</div>
                    <div className="text-xs text-green-300/70 mt-1">Continue automation</div>
                  </div>
                </button>
              </div>
            </section>

            {/* System Actions */}
            <section className="border-t border-cyan-900/20 pt-4">
              <div className="flex items-center justify-between">
                <button 
                  className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all"
                  onClick={() => { reset(); nav('/'); setOpen(false); }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset Role
                  </div>
                </button>
                
                <div className="text-xs text-gray-500">
                  Press <kbd className="px-2 py-1 bg-[#162b44] rounded">ESC</kbd> to close
                </div>
              </div>
            </section>
          </div>
        )}
        
        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0a1929]/95 backdrop-blur border-t border-cyan-900/30 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div>
              Press <kbd className="px-2 py-0.5 bg-[#162b44] rounded">⌘K</kbd> / <kbd className="px-2 py-0.5 bg-[#162b44] rounded">Ctrl+K</kbd> anytime to open
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Configuration saved automatically</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}