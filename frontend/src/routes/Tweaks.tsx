import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function Tweaks(){
  const [samples, setSamples] = useState<any[]>([])
  const [notes, setNotes] = useState('')
  const nav = useNavigate()

  async function refresh(){ setSamples(await (await fetch(`${API}/learn/samples`)).json()) }
  useEffect(()=> { refresh() }, [])

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.currentTarget.files?.[0]; if(!f) return
    const b = await f.arrayBuffer(); const b64 = btoa(String.fromCharCode(...new Uint8Array(b)))
    await fetch(`${API}/learn/upload`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ filename: f.name, content_base64: b64 }) })
    refresh()
  }

  return (
    <div className="min-h-screen px-10 pt-28 pb-20 bg-navy text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-3xl font-extrabold">Last Week + Tweaks</div>
        <p className="opacity-80">Upload last week’s brief or marked-up example to guide this week’s output. This builds the learning loop (demo-safe; no publishing).</p>

        <div className="card p-4">
          <div className="font-semibold mb-2">Upload prior report</div>
          <input type="file" onChange={onUpload} />
          <div className="text-sm opacity-80 mt-2">PDF/HTML/ZIP accepted; stored as learning sample for reference.</div>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Annotate desired changes</div>
          <textarea value={notes} onChange={e=> setNotes(e.currentTarget.value)} placeholder="What missed the mark? What to adjust?"
                    className="w-full h-40 bg-[#0f2236] rounded p-3" />
          <div className="text-xs opacity-70 mt-1">These notes will be displayed to the operator; in production they’d inform template adaptation.</div>
        </div>

        <div className="card p-4">
          <div className="font-semibold mb-2">Stored samples</div>
          <ul className="space-y-1 text-sm opacity-90">
            {samples.map(s => <li key={s.id}>{s.filename} <span className="opacity-60">({new Date(s.uploaded_at).toLocaleString()})</span></li>)}
          </ul>
        </div>

        <div>
          <button className="btn" onClick={()=> nav('/radar')}>Back to Radar</button>
        </div>
      </div>
    </div>
  )
}
