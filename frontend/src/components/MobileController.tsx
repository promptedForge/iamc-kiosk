import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function MobileController() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const { reset } = useStore()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  if (isOpen) {
    return (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Controller */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-navy/95 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-white/10">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button 
                onClick={() => navigate('/tweaks')}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl p-4 text-sm font-medium transition-all flex flex-col items-center gap-1"
              >
                <span className="text-lg">⚙️</span>
                <span>Tweaks</span>
              </button>
              <button 
                onClick={() => { reset(); navigate('/'); setIsOpen(false) }}
                className="bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-xl p-4 text-sm font-medium transition-all flex flex-col items-center gap-1"
              >
                <span className="text-lg">🔄</span>
                <span>Reset</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => navigate('/radar')}
                className="bg-green-600 hover:bg-green-700 active:scale-95 rounded-xl p-4 text-sm font-medium transition-all flex flex-col items-center gap-1"
              >
                <span className="text-lg">📡</span>
                <span>Radar</span>
              </button>
              <button 
                onClick={() => navigate('/export/latest')}
                className="bg-orange-600 hover:bg-orange-700 active:scale-95 rounded-xl p-4 text-sm font-medium transition-all flex flex-col items-center gap-1"
              >
                <span className="text-lg">📥</span>
                <span>Export</span>
              </button>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full bg-gray-700 hover:bg-gray-800 active:scale-95 rounded-xl p-3 text-sm transition-all"
            >
              ✕ Close
            </button>
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  )
}