import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store'

export default function NavigationController() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { reset } = useStore()

  const handleNavigation = (direction: 'forward' | 'back') => {
    const path = location.pathname
    
    if (direction === 'forward') {
      if (path === '/') navigate('/radar')
      else if (path.startsWith('/radar')) {
        // Navigate to the first issue from mock data
        // Using a default ID that exists in our mock data
        navigate('/issue/farmers-20250919')
      }
      else if (path.startsWith('/issue')) navigate('/roi')
      else if (path.startsWith('/roi')) navigate('/export/latest')
    } else {
      history.back()
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  if (isOpen) {
    return (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/30 z-40" 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Controller */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-navy/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/10">
            {/* Directional Pad */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div />
              <button 
                onClick={() => navigate('/tweaks')}
                className="bg-purple-600/70 hover:bg-purple-600 rounded-lg px-3 py-2 transition-all text-xs font-medium"
                title="Tweaks"
              >
                Tweaks
              </button>
              <div />
              
              <button 
                onClick={() => handleNavigation('back')}
                className="bg-cyan-900/50 hover:bg-cyan-800 rounded-lg p-3 transition-all"
                title="Back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button 
                onClick={() => navigate('/radar')}
                className="bg-cyan-900/50 hover:bg-cyan-800 rounded-lg p-3 transition-all"
                title="Home"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <button 
                onClick={() => handleNavigation('forward')}
                className="bg-cyan-900/50 hover:bg-cyan-800 rounded-lg p-3 transition-all"
                title="Forward"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <div />
              <button 
                onClick={() => navigate('/export/latest')}
                className="bg-cyan-900/50 hover:bg-cyan-800 rounded-lg p-3 transition-all"
                title="Export"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div />
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { reset(); navigate('/'); setIsOpen(false) }}
                className="bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-xl p-3 text-sm font-medium transition-all"
              >
                Reset
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-gray-700 hover:bg-gray-800 active:scale-95 rounded-xl p-3 text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 bg-spotlight backdrop-blur-lg rounded-full w-14 h-14 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/20"
    >
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    </button>
  )
}

/**
 * App Screens Overview:
 * 
 * 1. "/" - Framing (Login/Role Selection)
 * 2. "/radar" - Main Intelligence Dashboard
 * 3. "/issue/:id" - Issue Detail/Brief Editor
 * 4. "/roi" - ROI Analysis
 * 5. "/export/:id" - Export Package
 * 6. "/tweaks" - Learning Loop/Upload Previous Reports
 * 
 * The navigation flows like a slideshow:
 * Login → Radar → Issue → ROI → Export
 * With Tweaks accessible from anywhere via the controller
 */