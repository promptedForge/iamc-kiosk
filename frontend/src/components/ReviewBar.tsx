import { useEffect, useState } from 'react'
import { useStore } from '../store'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'
export default function ReviewBar(){
  const [status, setStatus] = useState<any>(null)
  const { userRole, signoffs, updateSignoff } = useStore()

  async function refresh(){ 
    const data = await (await fetch(`${API}/review/status`)).json()
    setStatus(data)
    // Sync signoff status with global state
    if (data?.signoff) {
      updateSignoff('Analyst', data.signoff['Analyst'] || false)
      updateSignoff('Strategy Head', data.signoff['Strategy Head'] || false)
    }
  }
  
  useEffect(()=> { refresh(); const t = setInterval(refresh, 3000); return ()=> clearInterval(t) }, [])

  const analyst = signoffs.Analyst ? '✅' : '❌'
  const strat   = signoffs['Strategy Head'] ? '✅' : '❌'
  const paused  = status?.human_interrupt_active

  async function sign(role: 'Analyst'|'Strategy Head'){ 
    if (userRole === role) {
      await fetch(`${API}/review/signoff`, {
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({role, approve:true})
      })
      updateSignoff(role, true)
      refresh()
    }
  }
  
  async function interrupt(){ await fetch(`${API}/review/interrupt`, {method:'POST'}); refresh() }
  async function resume(){ await fetch(`${API}/review/resume`, {method:'POST'}); refresh() }

  return (
    <div className="fixed top-0 left-0 right-0 p-2 bg-black/40 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="opacity-80">Human Review:</span>
          <span className={`${paused?'text-yellow-300':'opacity-80'}`}>{paused? 'INTERRUPT ACTIVE' : 'idle'}</span>
          <button className="btn" onClick={()=> paused ? resume() : interrupt()}>{paused?'Resume':'Interrupt'}</button>
        </div>
        <div className="flex items-center gap-4">
          <span>Analyst: {analyst}</span>
          {userRole === 'Analyst' && !signoffs.Analyst && (
            <button className="btn" onClick={()=> sign('Analyst')}>Sign as Analyst</button>
          )}
          <span>Strategy Head: {strat}</span>
          {userRole === 'Strategy Head' && !signoffs['Strategy Head'] && (
            <button className="btn" onClick={()=> sign('Strategy Head')}>Sign as Strategy Head</button>
          )}
        </div>
      </div>
    </div>
  )
}
