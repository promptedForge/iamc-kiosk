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
  const [processingFeed, setProcessingFeed] = useState<Array<{text: string, status: 'incoming' | 'processing' | 'analyzed', timestamp: string}>>([])
  const [lastLoginTime] = useState(() => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - 5)
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  })

  // Filter items based on user role
  const allItems = (data ?? []) as any[]
  const items = allItems.filter(item => 
    !item.visibility || item.visibility.includes(userRole)
  )

  // Simulate processing feed with status transitions
  useEffect(() => {
    const rawFeeds = [
      "[Reuters] Breaking: Mass protests reported in Maharashtra farming districts",
      "[HRW] Alert: Child labor violations documented in Gujarat textile mills",
      "[NDTV] Worker safety incident at Bengaluru construction site - 12 injured",
      "[AI India] Tribal displacement in Odisha for mining project - 2000 families affected",
      "[The Wire] Women workers locked in factory overnight in Tamil Nadu",
      "[BBC] Environmental activists arrested under UAPA in Jharkhand",
      "[TOI] Bonded labor case filed - 47 workers freed from brick kiln",
      "[Scroll] Migrant worker deaths unreported in Mumbai construction",
      "[Express] Dalit student discrimination case in Karnataka university",
      "[Telegraph] Tea plantation workers unpaid for 3 months in Assam",
      "[Hindu] Manual scavenging deaths covered up in Rajasthan - RTI reveals",
      "[Mint] Tech workers forced to resign without severance in Hyderabad"
    ]
    
    let feedIndex = 0
    const addNewFeed = () => {
      const newFeed = {
        text: rawFeeds[feedIndex % rawFeeds.length],
        status: 'incoming' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }
      
      setProcessingFeed(prev => {
        const updated = [...prev.slice(-5), newFeed]
        // Transition older items through processing stages
        return updated.map((item, idx) => {
          if (idx < updated.length - 3 && item.status === 'incoming') {
            return { ...item, status: 'processing' }
          }
          if (idx < updated.length - 4 && item.status === 'processing') {
            return { ...item, status: 'analyzed' }
          }
          return item
        })
      })
      feedIndex++
    }
    
    // Initial population
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addNewFeed(), i * 100)
    }
    
    const interval = setInterval(addNewFeed, 3000)
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

  const otherRole = userRole === 'Media Team' ? 'Strategy Head' : 'Media Team'
  const canRequestSignoff = !signoffs[otherRole as 'Media Team' | 'Strategy Head']

  return (
    <div className="px-4 md:px-10 py-16 md:py-20 min-h-screen bg-navy relative">
      {/* Since last login header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Intelligence Brief</h1>
        <p className="text-lg opacity-80">Since your last login at {lastLoginTime}</p>
        <p className="text-sm opacity-60 mt-1">5 minutes to full clarity</p>
      </div>
      {/* User Role & Signoff Status */}
      <div className="fixed top-16 md:top-4 right-4 card p-3 md:p-4 bg-opacity-90 backdrop-blur text-sm md:text-base">
        <div className="text-sm opacity-70 mb-1">Signed in as</div>
        <div className="text-lg font-bold mb-3">{userRole}</div>
        <div className="space-y-1 text-sm">
          <div>Media Team: {signoffs['Media Team'] ? '✅' : '⬜'}</div>
          <div>Strategy Head: {signoffs['Strategy Head'] ? '✅' : '⬜'}</div>
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

      {/* Processing Feed */}
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 card p-3 md:p-4 bg-opacity-90 backdrop-blur max-w-5xl mx-auto">
        <div className="text-xs opacity-70 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 animate-pulse">⚡</span>
            <span className="font-semibold uppercase tracking-wider">Processing Feed</span>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> Incoming</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Processing</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full"></span> Analyzed</span>
          </div>
        </div>
        <div className="space-y-1">
          {processingFeed.map((item, idx) => (
            <div key={idx} className="text-xs md:text-sm animate-fade-in flex items-center justify-between p-2 rounded bg-black/30">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  item.status === 'incoming' ? 'bg-blue-400' :
                  item.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                  'bg-green-400'
                }`}></span>
                <span className={`font-mono text-xs opacity-60`}>{item.timestamp}</span>
                <span className={`${
                  item.status === 'analyzed' ? 'opacity-90' : 
                  item.status === 'processing' ? 'opacity-70' : 
                  'opacity-50'
                }`}>{item.text}</span>
              </div>
              <span className="text-xs opacity-40 uppercase">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analyzed Patterns Grid */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4 opacity-90">Analyzed Patterns & Trends</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-20">
        {(['Policy','Industry','Advocacy','Risk'] as const).map(q => (
          <div key={q} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold">{q}</div>
              <div className="text-xs opacity-60 uppercase">Pattern Analysis</div>
            </div>
            <div className="space-y-2">
              {groups[q].length === 0 ? (
                <div className="text-sm opacity-50 italic">Processing patterns...</div>
              ) : (
                groups[q].map(it => (
                  <div key={it.id} className="p-3 bg-[#11253c] rounded-lg hover:bg-[#132a44] cursor-pointer transition-all"
                       onClick={()=> nav(`/issue/${it.id}`)}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-semibold text-sm">{it.title}</div>
                      <div className={`text-xs font-bold ${getPriorityColor(it.priority)}`}>
                        {it.priority?.toUpperCase()}
                      </div>
                    </div>
                    {(it as any).trend && (
                      <div className="text-xs opacity-60 italic mb-1">↗ {(it as any).trend}</div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="text-xs opacity-70">Confidence: {Math.round(it.score*100)}%</div>
                      {it.visibility && it.visibility.length === 1 && (
                        <div className="text-xs opacity-50">
                          {it.visibility[0] === userRole ? '👁 Exclusive' : '🔒 Restricted'}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
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
