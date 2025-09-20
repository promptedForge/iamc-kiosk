import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ReviewBar from '../components/ReviewBar'
import Palette from '../components/Palette'

export default function App(){
  const nav = useNavigate()
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
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav])
  return (
    <div className="min-h-screen">
      <ReviewBar />
      <Palette />
      <Outlet />
      <div className="kb">Keys: F (fullscreen) • Space (advance) • B (back) • ⌘K/Ctrl‑K (palette)</div>
    </div>
  )
}
