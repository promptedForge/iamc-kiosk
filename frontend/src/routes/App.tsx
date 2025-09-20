import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ReviewBar from '../components/ReviewBar'
import Palette from '../components/Palette'
import NavigationController from '../components/NavigationController'
import { useStore } from '../store'

export default function App(){
  const nav = useNavigate()
  const { reset } = useStore()
  
  const handleReset = () => {
    reset()
    nav('/')
  }
  
  useEffect(() => {
    function onKey(e: KeyboardEvent){
      if(e.key === 'f' || e.key === 'F'){ 
        if (!document.fullscreenElement) document.documentElement.requestFullscreen()
        else document.exitFullscreen() 
      }
      if(e.key === 'r' || e.key === 'R'){ handleReset() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav, reset])
  
  return (
    <div className="min-h-screen">
      <ReviewBar />
      <Palette />
      <NavigationController />
      <Outlet />
      
      {/* Bottom left controls */}
      <div className="fixed bottom-4 left-4 flex gap-2 z-20">
        <button 
          onClick={handleReset}
          className="btn text-xs px-3 py-1 opacity-60 hover:opacity-100 transition-opacity"
          title="Reset and change role"
        >
          Reset (R)
        </button>
        <button 
          onClick={() => {
            const event = new KeyboardEvent('keydown', { 
              key: 'k', 
              ctrlKey: true,
              metaKey: true 
            })
            window.dispatchEvent(event)
          }}
          className="btn text-xs px-3 py-1 opacity-60 hover:opacity-100 transition-opacity"
          title="Open command palette"
        >
          ⌘K
        </button>
      </div>
    </div>
  )
}