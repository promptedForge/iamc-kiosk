import { useEffect, useState } from 'react'
import { getConfig, postConfig } from '../lib_api'

export default function CommandPalette({ open, onClose }:{ open:boolean, onClose:()=>void }){
  const [cfg, setCfg] = useState<any>({frequency:'weekly', send_time:'09:00', audiences:['Members','Internal']})
  const [query, setQuery] = useState('')
  useEffect(()=>{
    if(open){
      getConfig().then(setCfg)
      const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') onClose() }
      window.addEventListener('keydown', onKey)
      return ()=> window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
  if(!open) return null
  const toggleAudience = (a:string)=>{
    setCfg((c:any)=>{
      const set = new Set(c.audiences||[]); set.has(a)? set.delete(a): set.add(a); 
      return {...c, audiences: Array.from(set)}
    })
  }
  const save = async ()=>{ await postConfig(cfg); onClose() }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-50">
      <div className="w-[720px] card p-4">
        <div className="flex items-center mb-2">
          <input autoFocus value={query} onChange={e=> setQuery(e.target.value)} placeholder="Type to filter commands…" className="flex-1 bg-[#0d1f33] p-2 rounded outline-none" />
          <button className="btn ml-2" onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-1">Cadence</div>
            <select value={cfg.frequency} onChange={e=> setCfg({...cfg, frequency:e.target.value})} className="bg-[#0d1f33] p-2 rounded w-full">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="mt-2">
              <label className="opacity-80 text-sm">Send time (local)</label>
              <input value={cfg.send_time} onChange={e=> setCfg({...cfg, send_time:e.target.value})} className="bg-[#0d1f33] p-2 rounded w-full" />
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Audiences</div>
            {['Members','Donors','Public','Internal'].map(a=> (
              <label key={a} className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.audiences?.includes(a)} onChange={()=> toggleAudience(a)} />
                <span>{a}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
