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
      updateSignoff('Media Team', data.signoff['Media Team'] || false)
      updateSignoff('Strategy Head', data.signoff['Strategy Head'] || false)
    }
  }
  
  useEffect(()=> { refresh(); const t = setInterval(refresh, 3000); return ()=> clearInterval(t) }, [])

  const mediaTeam = signoffs['Media Team'] ? '✅' : '⬜'
  const strat   = signoffs['Strategy Head'] ? '✅' : '⬜'
  const paused  = status?.human_interrupt_active

  async function sign(role: 'Media Team'|'Strategy Head'){ 
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
    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur z-40">
      <div className="w-full px-2 py-2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="opacity-80 hidden sm:inline">Human Review:</span>
          <span className="opacity-80 sm:hidden">HR:</span>
          <span className={`${paused?'text-yellow-300':'opacity-80'} text-xs sm:text-sm`}>{paused? 'ACTIVE' : 'idle'}</span>
          <button className="btn text-xs sm:text-sm px-2 sm:px-3 py-1" onClick={()=> paused ? resume() : interrupt()}>
            {paused?'Resume':'Interrupt'}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm hidden sm:inline">Media Team:</span>
            <span className="text-xs sm:text-sm sm:hidden">MT:</span>
            <span>{mediaTeam}</span>
          </div>
          {userRole === 'Media Team' && !signoffs['Media Team'] && (
            <button className="btn text-xs px-2 py-1" onClick={()=> sign('Media Team')}>Sign</button>
          )}
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm hidden sm:inline">Strategy Head:</span>
            <span className="text-xs sm:text-sm sm:hidden">SH:</span>
            <span>{strat}</span>
          </div>
          {userRole === 'Strategy Head' && !signoffs['Strategy Head'] && (
            <button className="btn text-xs px-2 py-1" onClick={()=> sign('Strategy Head')}>Sign</button>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
