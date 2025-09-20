import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReviewBar from '../components/ReviewBar'
import Palette from '../components/Palette'
import NavigationController from '../components/NavigationController'
import DemoWalkthrough from '../components/DemoWalkthrough'
import { useStore } from '../store'
import { useIsMobile } from '../utils/responsive'

export default function App(){
  const nav = useNavigate()
  const { reset } = useStore()
  const [isKioskMode, setIsKioskMode] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [showIdleWarning, setShowIdleWarning] = useState(false)
  
  const IDLE_TIMEOUT = 5 * 60 * 1000 // 5 minutes
  const WARNING_TIMEOUT = 4 * 60 * 1000 // Show warning after 4 minutes
  
  const handleReset = () => {
    reset()
    nav('/')
    setShowIdleWarning(false)
    setLastActivity(Date.now())
  }
  
  const enterKioskMode = async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsKioskMode(true)
      // Hide cursor after 3 seconds of inactivity
      document.body.style.cursor = 'none'
      setTimeout(() => {
        document.body.style.cursor = 'auto'
      }, 3000)
    } catch (err) {
      console.error('Failed to enter fullscreen:', err)
    }
  }
  
  const exitKioskMode = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    setIsKioskMode(false)
    document.body.style.cursor = 'auto'
  }
  
  // Activity tracking
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now())
      setShowIdleWarning(false)
    }
    
    window.addEventListener('mousemove', updateActivity)
    window.addEventListener('keypress', updateActivity)
    window.addEventListener('click', updateActivity)
    
    return () => {
      window.removeEventListener('mousemove', updateActivity)
      window.removeEventListener('keypress', updateActivity)
      window.removeEventListener('click', updateActivity)
    }
  }, [])
  
  // Idle timeout check
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const idleTime = now - lastActivity
      
      if (idleTime > IDLE_TIMEOUT) {
        handleReset()
      } else if (idleTime > WARNING_TIMEOUT && !showIdleWarning) {
        setShowIdleWarning(true)
      }
    }, 10000) // Check every 10 seconds
    
    return () => clearInterval(interval)
  }, [lastActivity, showIdleWarning])
  
  useEffect(() => {
    function onKey(e: KeyboardEvent){
      // Enhanced keyboard shortcuts for kiosk mode
      if(e.key === 'f' || e.key === 'F'){ 
        if (!document.fullscreenElement) enterKioskMode()
        else exitKioskMode()
      }
      if(e.key === 'r' || e.key === 'R'){ handleReset() }
      if(e.key === 'Escape' && isKioskMode){ 
        e.preventDefault()
        // In kiosk mode, Escape goes back instead of exiting fullscreen
        nav(-1)
      }
      // Remove number key navigation - handled by arrow keys in NavigationController
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav, reset, isKioskMode])
  
  return (
    <div className="min-h-screen">
      <ReviewBar />
      {/* Spacer div to account for fixed ReviewBar height */}
      <div className="h-16 md:h-14" />
      <Palette />
      <NavigationController />
      <DemoWalkthrough />
      <Outlet />
      
      {/* Idle warning overlay */}
      {showIdleWarning && (
        <div className="fixed inset-0 bg-black/80 z-50 grid place-items-center animate-fade-in">
          <div className="text-center space-y-4 p-8 bg-card rounded-2xl border border-cyan-900/50 max-w-md">
            <div className="text-6xl">⏰</div>
            <h2 className="text-2xl font-bold">Session Timeout Warning</h2>
            <p className="opacity-80">Your session will reset in 1 minute due to inactivity.</p>
            <button 
              onClick={() => setLastActivity(Date.now())}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Continue Working
            </button>
          </div>
        </div>
      )}
      
      {/* Kiosk mode indicator */}
      {isKioskMode && (
        <div className="fixed top-4 right-4 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs animate-pulse z-30">
          Kiosk Mode Active
        </div>
      )}
      
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
            if (!document.fullscreenElement) enterKioskMode()
            else exitKioskMode()
          }}
          className="btn text-xs px-3 py-1 opacity-60 hover:opacity-100 transition-opacity"
          title="Toggle kiosk mode"
        >
          {isKioskMode ? 'Exit Kiosk' : 'Kiosk Mode'} (F)
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