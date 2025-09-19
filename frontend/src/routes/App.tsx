import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ReviewBar from '../components/ReviewBar'
import Palette from '../components/Palette'
import { useStore } from '../store'

export default function App(){
  const nav = useNavigate()
  const { userRole, reset } = useStore()
  
  const handleReset = () => {
    reset()
    nav('/')
  }
  
  useEffect(() => {
    function onKey(e: KeyboardEvent){
      if(e.key === 'f' || e.key === 'F'){ if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen() }
      if(e.key === ' '){ e.preventDefault(); const path = window.location.pathname
        if(path === '/') nav('/radar')
        else if(path.startsWith('/radar')) nav('/issue/energy-20250919')
        else if(path.startsWith('/issue')) nav('/roi')
        else if(path.startsWith('/roi')) nav('/export/energy-20250919')
      }
      if(e.key === 'b' || e.key === 'B'){ history.back() }
      if(e.key === 'r' || e.key === 'R'){ handleReset() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav, reset])
  
  return (
    <div className="min-h-screen">
      <ReviewBar />
      <Palette />
      <Outlet />
      {userRole && (
        <button 
          onClick={handleReset}
          className="fixed bottom-4 left-4 btn opacity-70 hover:opacity-100 text-sm"
          title="Reset and change role"
        >
          Reset (R)
        </button>
      )}
      <div className="kb">Keys: F (fullscreen) • Space (advance) • B (back) • R (reset) • ⌘K/Ctrl‑K (palette)</div>
    </div>
  )
}
