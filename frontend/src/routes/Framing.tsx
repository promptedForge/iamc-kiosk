import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import DemoHotkeys from '../components/DemoHotkeys'

export default function Framing(){
  const nav = useNavigate()
  const { setUserRole, userRole } = useStore()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (!userRole) {
      const timer = setTimeout(() => setShowLogin(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [userRole])

  useEffect(() => {
    if (userRole) {
      const timer = setTimeout(() => nav('/radar'), 1000)
      return () => clearTimeout(timer)
    }
  }, [userRole, nav])

  const handleRoleSelect = (role: 'Media Team' | 'Strategy Head' | 'Data Scientist') => {
    setUserRole(role)
  }

  return (
    <div className="grid place-items-center h-screen bg-gradient-to-b from-navy to-steel relative">
      <DemoHotkeys />
      <div className="text-center">
        <div className="text-5xl font-extrabold tracking-tight">From Noise → Clarity in 5 Minutes</div>
        <div className="opacity-80 mt-4 text-lg">What your team wakes up to daily.</div>
        
        {showLogin && !userRole && (
          <div className="mt-12 space-y-4 animate-fade-in">
            <div className="text-xl font-semibold mb-6">Sign in as:</div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => handleRoleSelect('Media Team')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Media Team
              </button>
              <button 
                onClick={() => handleRoleSelect('Strategy Head')}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Strategy Head
              </button>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => handleRoleSelect('Data Scientist')}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium text-base transition-all transform hover:scale-105 opacity-75"
              >
                Data Scientist (Read-only)
              </button>
            </div>
          </div>
        )}

        {userRole && (
          <div className="mt-12 animate-fade-in">
            <div className="text-xl">Welcome, <span className="font-bold text-blue-400">{userRole}</span></div>
            <div className="text-sm opacity-70 mt-2">Redirecting to your dashboard...</div>
          </div>
        )}
      </div>
    </div>
  )
}
