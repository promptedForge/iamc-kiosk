import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

interface Hypothesis {
  id: string
  event_id: string
  text: string
  confidence: number
  factors: {
    source_diversity: number
    persistence: number
    effect_size: number
    corroboration: number
  }
  lead_days: number
  scope_contrib: Record<string, number>
  utility: {
    predictive: string
    mapping: string
  }
  provenance: Array<{
    source: string
    url: string
    confidence: number
  }>
}

export default function Issue(){
  const { id } = useParams()
  const nav = useNavigate()
  const [lens, setLens] = useState<'ceo'|'coo'|'director'>('ceo')
  const [audience, setAudience] = useState<'CEO'|'COO'|'Director'|'Board'|'Members'>('CEO')
  const [editableContent, setEditableContent] = useState<Record<string, any>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { data: brief, error, isLoading } = useQuery({ 
    queryKey: ['brief', id], 
    queryFn: async() => {
      const response = await fetch(`${API}/brief/${id}`)
      if (!response.ok) {
        throw new Error('Brief not found')
      }
      const data = await response.json()
      setEditableContent(prev => ({
        ...prev,
        summary: data.summary,
        risks: [...data.risks],
        opportunities: [...data.opportunities],
        recommendations: [...data.recommendations]
      }))
      return data
    }
  })
  
  const { data: lensBrief } = useQuery({ 
    queryKey: ['lens', id, lens], 
    queryFn: async() => {
      const response = await fetch(`${API}/brief/${id}?lens=${lens}`)
      if (!response.ok) return null
      const data = await response.json()
      setEditableContent(prev => ({
        ...prev,
        [`actions_${lens}`]: [...data.actions],
        [`talking_points_${lens}`]: [...data.talking_points]
      }))
      return data
    },
    enabled: !!brief // Only run if brief exists
  })
  
  const { data: hypotheses = [] } = useQuery<Hypothesis[]>({
    queryKey: ['hypotheses', id],
    queryFn: async() => {
      const response = await fetch(`${API}/hypotheses/${id}`)
      if (!response.ok) return []
      return response.json()
    },
    enabled: !!brief
  })
  
  const [assets, setAssets] = useState<any>(null)
  const [showHypotheses, setShowHypotheses] = useState(true)
  const [exportFormat, setExportFormat] = useState<'zip' | 'pdf' | 'csv' | 'json'>('zip')
  const [isExporting, setIsExporting] = useState(false)
  
  if (isLoading) return <div className="grid place-items-center h-screen">Loading…</div>
  
  if (error || !brief) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <div className="text-xl mb-4">Brief not found</div>
          <button className="btn" onClick={() => nav('/radar')}>Back to Radar</button>
        </div>
      </div>
    )
  }

  async function genAssets(){
    setIsGenerating(true)
    // Simulated response since AI is offline
    setTimeout(() => {
      setAssets({
        linkedin: `${brief.title}\n\nKey insights:\n• ${editableContent.risks?.[0] || brief.risks[0]}\n• ${editableContent.opportunities?.[0] || brief.opportunities[0]}\n\n#HumanRights #IntelligenceBrief`,
        email_paragraph: `Team,\n\nThe draft introduces phased compliance that raises near-term uncertainty but opens avenues for pilot program funding.\n\nRecommended actions today: ${editableContent[`actions_${lens}`]?.[0] || lensBrief?.actions[0] || 'Publish neutral explainer within 2 hours'}`,
        press_excerpt: `${brief.title}. Immediate implications: ${editableContent.summary || brief.summary}`
      })
      setIsGenerating(false)
    }, 1000)
  }

  const updateContent = (field: string, value: any, index?: number) => {
    setEditableContent(prev => {
      if (index !== undefined && Array.isArray(prev[field])) {
        const updated = [...prev[field]]
        updated[index] = value
        return { ...prev, [field]: updated }
      }
      return { ...prev, [field]: value }
    })
  }

  const updateAsset = (field: string, value: string) => {
    setAssets((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleHypothesisAction = async (hypothesisId: string, action: 'pin' | 'investigate' | 'reject') => {
    try {
      await fetch(`${API}/hypotheses/${id}/${hypothesisId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })
      // In a real app, we'd update local state or refetch
      console.log(`${action} hypothesis ${hypothesisId}`)
    } catch (err) {
      console.error('Failed to perform hypothesis action:', err)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const endpoint = exportFormat === 'zip' ? `/export/${id}` : `/export/${id}?format=${exportFormat}`
      const response = await fetch(`${API}${endpoint}`, { method: 'POST' })
      
      if (!response.ok) {
        const errorText = await response.text()
        alert(errorText)
        return
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `iamc_export_${id}.${exportFormat}`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen px-10 py-20 bg-[radial-gradient(1000px_600px_at_10%_10%,#12345633,transparent)]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-3xl font-extrabold mb-3">{brief.title}</div>
            
            {/* Evidence strip */}
            {brief.evidence && brief.evidence.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {brief.evidence.map((evidence: any, idx: number) => (
                  <a
                    key={idx}
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#11253c] rounded-full text-xs hover:bg-[#1a3450] transition-colors"
                  >
                    <span className="opacity-70">{evidence.source}</span>
                    <span className="font-mono opacity-50">{Math.round(evidence.confidence * 100)}%</span>
                    <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            
            <textarea 
              className="w-full bg-[#11253c] rounded-lg p-3 text-sm opacity-90 min-h-[80px] resize-y"
              value={editableContent.summary || brief.summary}
              onChange={(e) => updateContent('summary', e.target.value)}
              placeholder="Brief summary..."
            />
          </div>
          <button 
            onClick={() => nav('/tweaks')}
            className="btn ml-4 bg-purple-600 hover:bg-purple-700 ring-2 ring-purple-400 shadow-lg"
            title="Adjust generation parameters"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Tweaks
            </span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <EditableCard 
            title="Risks" 
            items={editableContent.risks || brief.risks}
            onUpdate={(items) => updateContent('risks', items)}
          />
          <EditableCard 
            title="Opportunities" 
            items={editableContent.opportunities || brief.opportunities}
            onUpdate={(items) => updateContent('opportunities', items)}
          />
          <EditableCard 
            title="Recommendations" 
            items={editableContent.recommendations || brief.recommendations}
            onUpdate={(items) => updateContent('recommendations', items)}
          />
        </div>

        {/* Hypotheses panel */}
        {hypotheses.length > 0 && (
          <div className="card p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Candidate Hypotheses</h3>
                <span className="text-sm opacity-60">({hypotheses.length} anomaly patterns detected)</span>
              </div>
              <button 
                onClick={() => setShowHypotheses(!showHypotheses)}
                className="text-sm opacity-60 hover:opacity-100"
              >
                {showHypotheses ? '▼' : '▶'}
              </button>
            </div>
            
            {showHypotheses && (
              <div className="space-y-4">
                {hypotheses.map((hyp) => (
                  <div key={hyp.id} className="bg-[#0a1929] rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm mb-2">{hyp.text}</p>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="opacity-60">Confidence:</span>
                            <div className="w-24 h-2 bg-[#11253c] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                                style={{ width: `${hyp.confidence * 100}%` }}
                              />
                            </div>
                            <span className="font-mono">{Math.round(hyp.confidence * 100)}%</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="opacity-60">Lead time:</span>
                            <span className="font-mono text-cyan-400">{hyp.lead_days}d</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(hyp.factors).map(([factor, value]) => (
                            <span 
                              key={factor}
                              className="text-xs px-2 py-1 bg-[#11253c] rounded-full opacity-70"
                            >
                              {factor.replace(/_/g, ' ')}: {Math.round(value * 100)}%
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => handleHypothesisAction(hyp.id, 'pin')}
                          className="btn btn-sm bg-cyan-600 hover:bg-cyan-700"
                          title="Pin for monitoring"
                        >
                          📌 Pin
                        </button>
                        <button 
                          onClick={() => handleHypothesisAction(hyp.id, 'investigate')}
                          className="btn btn-sm bg-purple-600 hover:bg-purple-700"
                          title="Mark for investigation"
                        >
                          🔍 Investigate
                        </button>
                        <button 
                          onClick={() => handleHypothesisAction(hyp.id, 'reject')}
                          className="btn btn-sm opacity-60 hover:opacity-100"
                          title="Reject hypothesis"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    {hyp.provenance && hyp.provenance.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-xs opacity-60 mb-1">Provenance:</div>
                        <div className="flex flex-wrap gap-2">
                          {hyp.provenance.map((prov, idx) => (
                            <a
                              key={idx}
                              href={prov.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                            >
                              {prov.source} ({Math.round(prov.confidence * 100)}%)
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            {(['ceo','coo','director'] as const).map(k => (
              <button key={k} className={`btn ${k===lens?'ring-2 ring-spotlight':''}`} onClick={()=> setLens(k)}>
                {k.toUpperCase()}
              </button>
            ))}
          </div>
          {!!lensBrief && (
            <div className="grid grid-cols-2 gap-4">
              <EditableList
                title="Actions"
                items={editableContent[`actions_${lens}`] || lensBrief.actions}
                onUpdate={(items) => updateContent(`actions_${lens}`, items)}
              />
              <EditableList
                title="Talking Points"
                items={editableContent[`talking_points_${lens}`] || lensBrief.talking_points}
                onUpdate={(items) => updateContent(`talking_points_${lens}`, items)}
              />
            </div>
          )}
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="opacity-80">Audience:</span>
            {(["CEO","COO","Director","Board","Members"] as const).map(a => 
              <button key={a} className={`btn ${a===audience?"ring-2 ring-spotlight":""}`} onClick={()=> setAudience(a)}>{a}</button>
            )}
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Assets</div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-60">⚠️ AI currently offline - using templates</span>
              <button 
                className="btn relative" 
                onClick={genAssets}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
          {!!assets && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold mb-1">LinkedIn</div>
                <textarea 
                  className="w-full bg-[#11253c] rounded p-2 text-xs min-h-[120px] resize-y"
                  value={assets.linkedin}
                  onChange={(e) => updateAsset('linkedin', e.target.value)}
                />
              </div>
              <div>
                <div className="font-semibold mb-1">Email</div>
                <textarea 
                  className="w-full bg-[#11253c] rounded p-2 text-xs min-h-[120px] resize-y"
                  value={assets.email_paragraph}
                  onChange={(e) => updateAsset('email_paragraph', e.target.value)}
                />
              </div>
              <div>
                <div className="font-semibold mb-1">Press Excerpt</div>
                <textarea 
                  className="w-full bg-[#11253c] rounded p-2 text-xs min-h-[120px] resize-y"
                  value={assets.press_excerpt}
                  onChange={(e) => updateAsset('press_excerpt', e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="mt-4 text-xs opacity-50">
            Note: Local AI models and API integration planned for future release. Currently using template-based generation.
          </div>
        </div>

        {/* Export Gate Section */}
        <div className="card p-4 bg-gradient-to-br from-[#0f2236] to-[#0a1929] border-2 border-cyan-900/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                </svg>
                Export Intelligence Package
              </h3>
              <p className="text-sm opacity-60 mt-1">Export requires dual sign-off when enabled</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Format selector */}
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as typeof exportFormat)}
                className="bg-[#11253c] px-3 py-2 rounded-lg text-sm border border-cyan-900/30 focus:border-cyan-400/50 transition-colors"
              >
                <option value="zip">ZIP Package</option>
                <option value="pdf">PDF Report</option>
                <option value="csv">CSV Data</option>
                <option value="json">JSON Export</option>
              </select>
              
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="btn bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 font-semibold shadow-lg"
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Exporting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export {exportFormat.toUpperCase()}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="bg-[#11253c]/50 rounded-lg p-3">
              <div className="font-semibold text-cyan-300 mb-1">Included in Export</div>
              <ul className="space-y-1 text-xs opacity-70">
                <li>• Full intelligence brief</li>
                <li>• Evidence & hypotheses</li>
                <li>• Generated assets</li>
                <li>• Audit trail</li>
              </ul>
            </div>
            
            <div className="bg-[#11253c]/50 rounded-lg p-3">
              <div className="font-semibold text-cyan-300 mb-1">Export Formats</div>
              <ul className="space-y-1 text-xs opacity-70">
                <li>• ZIP: Complete package</li>
                <li>• PDF: Formatted report</li>
                <li>• CSV: Data tables</li>
                <li>• JSON: Structured data</li>
              </ul>
            </div>
            
            <div className="bg-[#11253c]/50 rounded-lg p-3">
              <div className="font-semibold text-cyan-300 mb-1">Requirements</div>
              <ul className="space-y-1 text-xs opacity-70">
                <li>• Media Team sign-off</li>
                <li>• Strategy Head sign-off</li>
                <li>• No active interrupt</li>
                <li>• Valid export window</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditableCard({ title, items, onUpdate }: { title: string, items: string[], onUpdate: (items: string[]) => void }){
  const updateItem = (index: number, value: string) => {
    const updated = [...items]
    updated[index] = value
    onUpdate(updated)
  }

  const addItem = () => {
    onUpdate([...items, 'New item...'])
  }

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index))
  }

  return (
    <div className="card p-4">
      <div className="font-semibold mb-2 flex justify-between items-center">
        {title}
        <button onClick={addItem} className="text-xs opacity-60 hover:opacity-100">+ Add</button>
      </div>
      <div className="space-y-2">
        {items.map((x, i) => (
          <div key={i} className="group flex items-start gap-2">
            <span className="opacity-60 text-xs mt-1">•</span>
            <textarea
              className="flex-1 bg-transparent resize-none text-sm opacity-90 focus:bg-[#11253c] rounded p-1 -ml-1"
              value={x}
              onChange={(e) => updateItem(i, e.target.value)}
              rows={2}
            />
            <button 
              onClick={() => removeItem(i)}
              className="opacity-0 group-hover:opacity-60 hover:opacity-100 text-xs text-red-400"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function EditableList({ title, items, onUpdate }: { title: string, items: string[], onUpdate: (items: string[]) => void }){
  const updateItem = (index: number, value: string) => {
    const updated = [...items]
    updated[index] = value
    onUpdate(updated)
  }

  return (
    <div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="space-y-1">
        {items.map((a: string, i: number) => (
          <div key={i} className="flex items-start gap-2 group">
            <span className="opacity-60 text-xs mt-1">•</span>
            <textarea
              className="flex-1 bg-transparent resize-none text-sm opacity-90 focus:bg-[#11253c] rounded p-1 -ml-1"
              value={a}
              onChange={(e) => updateItem(i, e.target.value)}
              rows={1}
            />
          </div>
        ))}
      </div>
    </div>
  )
}