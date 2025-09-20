import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { uploadPastReport, tweaksPreview, getBrief } from '../lib_api'
import { useQuery } from '@tanstack/react-query'

export default function Tweaks(){
  const { id } = useParams()
  const { data: brief } = useQuery({ queryKey: ['brief', id], queryFn: ()=> getBrief(id!) })
  const [uploaded, setUploaded] = useState<any>(null)
  const [notes, setNotes] = useState('Tighten risk language; stronger coalition framing.')
  const [merged, setMerged] = useState<any>(null)

  async function onFile(e:any){
    const f = e.target.files?.[0]; if(!f) return
    const res = await uploadPastReport(f); setUploaded(res)
  }
  async function applyTweaks(){
    if(!brief) return
    const res = await tweaksPreview(brief, uploaded?.id, notes); setMerged(res)
  }

  if(!brief) return <div className="grid place-items-center h-screen">Loading…</div>
  return (
    <div className="min-h-screen p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-3xl font-extrabold">Last Week + Tweaks</div>
        <p className="opacity-80">Upload last week’s report (HTML/PDF/ZIP) and capture notes; we’ll merge tweaks into today’s brief.</p>

        <div className="card p-4">
          <div className="font-semibold mb-2">Upload past report</div>
          <input type="file" onChange={onFile} />
          {uploaded && <div className="mt-2 text-sm opacity-80">Uploaded: {uploaded.filename} — Preview: <code>{uploaded.preview}</code></div>}
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Notes / Markups</div>
          <textarea value={notes} onChange={e=> setNotes(e.target.value)} className="w-full h-28 bg-[#0d1f33] p-2 rounded"></textarea>
          <div className="mt-2"><button className="btn" onClick={applyTweaks}>Apply Tweaks</button></div>
        </div>

        {!!merged && (
          <div className="card p-4">
            <div className="font-semibold mb-2">Merged Preview</div>
            <div className="text-2xl font-bold">{merged.title}</div>
            <p className="opacity-90">{merged.summary}</p>
            <div className="grid grid-cols-3 gap-6 mt-3">
              <Card title="Risks" items={merged.risks} />
              <Card title="Opportunities" items={merged.opportunities} />
              <Card title="Recommendations" items={merged.recommendations} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Card({ title, items }:{ title:string, items:string[] }){
  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      <ul className="list-disc pl-5 opacity-90 space-y-1">
        {items.map((x,i)=>(<li key={i}>{x}</li>))}
      </ul>
    </div>
  )
}
