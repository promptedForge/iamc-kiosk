import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

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
  
  const [assets, setAssets] = useState<any>(null)
  
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

  return (
    <div className="min-h-screen px-10 py-20 bg-[radial-gradient(1000px_600px_at_10%_10%,#12345633,transparent)]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-3xl font-extrabold mb-3">{brief.title}</div>
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