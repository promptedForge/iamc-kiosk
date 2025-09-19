import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

type UiConfig = { cadence:'daily'|'weekly'|'monthly', time_of_day:string, days_of_week:string[], audiences:string[], require_dual_signoff:boolean, autopublish:boolean }

export default function Palette(){
  const [open, setOpen] = useState(false)
  const [cfg, setCfg] = useState<UiConfig | null>(null)
  const nav = useNavigate()
  const { reset } = useStore()

  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(()=>{ if(open) fetch(`${API}/config`).then(r=>r.json()).then(setCfg) }, [open])

  async function update(partial: Partial<UiConfig>){
    const r = await fetch(`${API}/config`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(partial) })
    setCfg(await r.json())
  }
  async function interrupt(){ await fetch(`${API}/review/interrupt`, {method:'POST'}); }
  async function resume(){ await fetch(`${API}/review/resume`, {method:'POST'}); }

  if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
      <div className="w-[720px] card p-6 text-white">
        <div className="text-lg font-semibold mb-3">Command Palette</div>
        {!cfg ? <div>Loading…</div> : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-sm opacity-80">Cadence</div>
                <div className="flex gap-2 mt-1">
                  {(['daily','weekly','monthly'] as const).map(c => (
                    <button key={c} className={`btn ${cfg.cadence===c?'ring-2 ring-spotlight':''}`} onClick={()=> update({cadence:c})}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm opacity-80">Time of day</div>
                <input defaultValue={cfg.time_of_day} onBlur={(e)=> update({time_of_day: e.currentTarget.value})}
                       className="bg-[#102234] rounded px-3 py-2 w-full" placeholder="07:30" />
              </div>
              <div>
                <div className="text-sm opacity-80">Audience</div>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {['CEO','COO','Director','Board','Members'].map(a => {
                    const sel = cfg.audiences.includes(a)
                    return <button key={a} className={`btn ${sel?'ring-2 ring-spotlight':''}`}
                                   onClick={()=> {
                                     const next = sel ? cfg.audiences.filter(x=>x!==a) : [...cfg.audiences, a]
                                     update({audiences: next})
                                   }}>{a}</button>
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.require_dual_signoff} onChange={(e)=> update({require_dual_signoff: e.currentTarget.checked})} />
                Require dual sign-off (Analyst + Strategy Head)
              </label>
              <label className="flex items-center gap-2 opacity-70">
                <input type="checkbox" checked={cfg.autopublish} onChange={(e)=> update({autopublish: e.currentTarget.checked})} disabled />
                Autopublish (disabled)
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="btn" onClick={()=> nav('/tweaks')}>Open "Last Week + Tweaks"</button>
              <button className="btn" onClick={interrupt}>Interrupt (Human in the loop)</button>
              <button className="btn" onClick={resume}>Resume</button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button className="btn" onClick={() => { reset(); nav('/'); setOpen(false); }}>Reset Role</button>
            </div>

            <div className="text-xs opacity-70">Tip: Press ⌘K / Ctrl‑K anytime to open.</div>
          </div>
        )}
      </div>
    </div>
  )
}
