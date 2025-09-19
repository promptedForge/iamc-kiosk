import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function Radar(){
  const { data } = useQuery({ queryKey: ['classify'], queryFn: async()=> (await fetch(`${API}/classify/today`)).json() })
  const nav = useNavigate()
  const { userRole, signoffs, updateSignoff } = useStore()
  const [showRequestSignoff, setShowRequestSignoff] = useState(false)
  const [realTimeUpdates, setRealTimeUpdates] = useState<Array<{text: string, source: string, location: string}>>([])

  // Filter items based on user role
  const allItems = (data ?? []) as any[]
  const items = allItems.filter(item => 
    !item.visibility || item.visibility.includes(userRole)
  )

  // Simulate real-time updates
  useEffect(() => {
    const messages = [
      { text: "Labor rights violation reported at facility", source: "Reuters", location: "Bangladesh, Dhaka" },
      { text: "New EU supply chain due diligence law passed", source: "EU Parliament", location: "Brussels, Belgium" },
      { text: "Worker strike over safety conditions", source: "Local News Network", location: "Myanmar, Yangon" },
      { text: "Child labor allegations in cobalt mines", source: "Human Rights Watch", location: "DRC, Katanga" },
      { text: "Forced overtime complaints filed with ILO", source: "ILO Database", location: "Vietnam, Ho Chi Minh" },
      { text: "Living wage protests at textile factories", source: "AFP", location: "Cambodia, Phnom Penh" },
      { text: "New California supply chain transparency act", source: "CA Legislature", location: "USA, California" },
      { text: "Migrant worker exploitation investigation", source: "Al Jazeera", location: "Qatar, Doha" },
      { text: "Factory audit reveals safety violations", source: "Fair Labor Association", location: "India, Tamil Nadu" },
      { text: "UN Global Compact compliance update", source: "UN News", location: "Global" }
    ]
    
    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setRealTimeUpdates(prev => [...prev.slice(-3), randomMsg])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const groups: Record<string, any[]> = { Policy:[], Industry:[], Advocacy:[], Risk:[] }
  for(const it of items){ (groups as any)[it.quadrant]?.push(it) }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const otherRole = userRole === 'Analyst' ? 'Strategy Head' : 'Analyst'
  const canRequestSignoff = !signoffs[otherRole as 'Analyst' | 'Strategy Head']

  return (
    <div className="px-10 py-20 min-h-screen bg-navy relative">
      {/* User Role & Signoff Status */}
      <div className="fixed top-4 right-4 card p-4 bg-opacity-90 backdrop-blur">
        <div className="text-sm opacity-70 mb-1">Signed in as</div>
        <div className="text-lg font-bold mb-3">{userRole}</div>
        <div className="space-y-1 text-sm">
          <div>Analyst: {signoffs.Analyst ? '✅' : '❌'}</div>
          <div>Strategy Head: {signoffs['Strategy Head'] ? '✅' : '❌'}</div>
        </div>
        {canRequestSignoff && (
          <button 
            className="btn mt-3 text-sm w-full"
            onClick={() => setShowRequestSignoff(true)}
          >
            Request {otherRole} Signoff
          </button>
        )}
      </div>

      {/* Real-time updates ticker */}
      <div className="fixed bottom-4 left-4 right-4 card p-4 bg-opacity-90 backdrop-blur max-w-4xl mx-auto">
        <div className="text-xs opacity-70 mb-2 flex items-center gap-2">
          <span className="text-green-400 animate-pulse">●</span>
          Live Data Stream - Human Rights Intelligence
        </div>
        <div className="space-y-2">
          {realTimeUpdates.map((update, idx) => (
            <div key={idx} className="text-sm animate-fade-in grid grid-cols-12 gap-2 items-start">
              <div className="col-span-7 flex items-start gap-2">
                <span className="text-blue-400 mt-1">▸</span>
                <span className="opacity-90">{update.text}</span>
              </div>
              <div className="col-span-3 opacity-60 text-xs">
                <div className="font-semibold">{update.source}</div>
              </div>
              <div className="col-span-2 opacity-60 text-xs text-right">
                📍 {update.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-8 mb-20">
        {(['Policy','Industry','Advocacy','Risk'] as const).map(q => (
          <div key={q} className="card p-6">
            <div className="text-2xl font-bold mb-2">{q}</div>
            <div className="space-y-2">
              {groups[q].map(it => (
                <div key={it.id} className="p-3 bg-[#11253c] rounded-lg hover:bg-[#132a44] cursor-pointer"
                     onClick={()=> nav(`/issue/${it.id}`)}>
                  <div className="flex justify-between items-start">
                    <div className="font-semibold">{it.title}</div>
                    <div className={`text-xs font-bold ${getPriorityColor(it.priority)}`}>
                      {it.priority?.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-sm opacity-70">Confidence: {Math.round(it.score*100)}%</div>
                  {it.visibility && it.visibility.length === 1 && (
                    <div className="text-xs mt-1 opacity-50">
                      {it.visibility[0] === userRole ? 'Your eyes only' : 'Not visible to you'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Request Signoff Modal */}
      {showRequestSignoff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRequestSignoff(false)}>
          <div className="card p-6 max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Request Signoff</h3>
            <p className="mb-4">
              Request {otherRole} to review and sign off on the current intelligence brief?
            </p>
            <div className="flex gap-3">
              <button className="btn flex-1" onClick={() => {
                // In real app, this would send a notification
                alert(`Signoff request sent to ${otherRole}`)
                setShowRequestSignoff(false)
              }}>
                Send Request
              </button>
              <button className="btn flex-1 opacity-70" onClick={() => setShowRequestSignoff(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
