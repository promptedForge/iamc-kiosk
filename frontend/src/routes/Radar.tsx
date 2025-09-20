import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useEffect, useState } from 'react'
import '../styles/radar.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function Radar(){
  const { data } = useQuery({ queryKey: ['classify'], queryFn: async()=> (await fetch(`${API}/classify/today`)).json() })
  const nav = useNavigate()
  const { userRole, signoffs, updateSignoff } = useStore()
  const [showRequestSignoff, setShowRequestSignoff] = useState(false)
  const [feedExpanded, setFeedExpanded] = useState(false)
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
      "[Mint] Tech workers forced to resign without severance in Hyderabad",
      "[Guardian] Caste-based violence surge in rural Bihar - 23 incidents",
      "[Reuters] Factory fire in Delhi industrial area - safety violations found",
      "[HRW] Forced evictions in Mumbai slums affecting 5000 families"
    ]
    
    let feedIndex = 0
    const addNewFeed = () => {
      const newFeed = {
        text: rawFeeds[feedIndex % rawFeeds.length],
        status: 'incoming' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }
      
      setProcessingFeed(prev => {
        const maxItems = feedExpanded ? 15 : 8
        const updated = [...prev.slice(-maxItems), newFeed]
        // Transition older items through processing stages
        return updated.map((item, idx) => {
          if (idx < updated.length - 3 && item.status === 'incoming') {
            return { ...item, status: 'processing' }
          }
          if (idx < updated.length - 5 && item.status === 'processing') {
            return { ...item, status: 'analyzed' }
          }
          return item
        })
      })
      feedIndex++
    }
    
    // Initial population
    for (let i = 0; i < 8; i++) {
      setTimeout(() => addNewFeed(), i * 100)
    }
    
    const interval = setInterval(addNewFeed, 3000)
    return () => clearInterval(interval)
  }, [feedExpanded])

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

  const displayedFeedItems = feedExpanded 
    ? processingFeed.slice(-15) 
    : processingFeed.slice(-2)

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden">
      {/* Cockpit-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      
      {/* Since last login header */}
      <div className="text-center pt-8 pb-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Intelligence Brief</h1>
        <p className="text-lg opacity-80">Since your last login at {lastLoginTime}</p>
        <p className="text-sm opacity-60 mt-1">5 minutes to full clarity</p>
      </div>

      {/* User Role & Signoff Status */}
      <div className="fixed top-16 md:top-4 right-4 card p-3 md:p-4 bg-opacity-90 backdrop-blur text-sm md:text-base z-30">
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

      {/* Cockpit-style Analyzed Patterns Grid */}
      <div className="px-4 md:px-12 pb-32">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 opacity-90">Analyzed Patterns & Trends</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-1000">
          {(['Policy','Industry','Advocacy','Risk'] as const).map((q, qIdx) => {
            const isLeft = qIdx % 2 === 0
            const isTop = qIdx < 2
            
            return (
              <div 
                key={q} 
                className="relative"
                style={{
                  transform: `
                    rotateY(${isLeft ? '1deg' : '-1deg'}) 
                    rotateX(${isTop ? '-1deg' : '1deg'})
                  `,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="card p-6 bg-[#0a1929]/90 backdrop-blur-md border border-cyan-900/30 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent pointer-events-none rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-cyan-100">{q}</div>
                      <div className="text-xs opacity-60 uppercase text-cyan-300">Pattern Analysis</div>
                    </div>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                      {groups[q].length === 0 ? (
                        <div className="text-sm opacity-50 italic">Processing patterns...</div>
                      ) : (
                        groups[q].map(it => (
                          <div 
                            key={it.id} 
                            className="relative p-3 bg-[#11253c]/80 rounded-lg hover:bg-[#132a44] cursor-pointer transition-all hover:scale-[1.02]"
                            onClick={()=> nav(`/issue/${it.id}`)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-semibold text-sm pr-2">{it.title}</div>
                              <div className={`text-xs font-bold ${getPriorityColor(it.priority)} shrink-0`}>
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
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Toggleable Processing Feed */}
      <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-40 ${
        feedExpanded ? 'w-[90%] max-w-4xl' : 'w-[80%] max-w-2xl'
      }`}>
        <div className={`bg-[#0a1929]/95 backdrop-blur-lg rounded-t-2xl shadow-2xl border border-cyan-900/50 transition-all ${
          feedExpanded ? 'h-[60vh]' : 'h-auto'
        }`}>
          {/* Feed Header with Toggle */}
          <div 
            className="p-4 border-b border-cyan-900/30 cursor-pointer hover:bg-cyan-900/10 transition-colors"
            onClick={() => setFeedExpanded(!feedExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 animate-pulse text-lg">⚡</span>
                <span className="font-bold uppercase tracking-wider text-sm text-cyan-100">Processing Feed</span>
                <span className="text-xs opacity-60">({processingFeed.length} items in queue)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> Incoming</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Processing</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full"></span> Analyzed</span>
                </div>
                <button className="text-cyan-300 hover:text-cyan-100 transition-colors">
                  <svg className={`w-6 h-6 transition-transform ${feedExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Feed Content */}
          <div className={`overflow-y-auto custom-scrollbar ${
            feedExpanded ? 'h-[calc(100%-64px)]' : 'max-h-32'
          }`}>
            <div className="p-4 space-y-2">
              {displayedFeedItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="text-xs md:text-sm animate-fade-in flex items-center justify-between p-3 rounded-lg bg-black/30 hover:bg-black/40 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === 'incoming' ? 'bg-blue-400' :
                      item.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                      'bg-green-400'
                    }`}></span>
                    <span className="font-mono text-xs opacity-60 shrink-0">{item.timestamp}</span>
                    <span className={`${
                      item.status === 'analyzed' ? 'opacity-90 text-cyan-100' : 
                      item.status === 'processing' ? 'opacity-70 text-yellow-100' : 
                      'opacity-50'
                    }`}>{item.text}</span>
                  </div>
                  <span className="text-xs opacity-40 uppercase ml-4 shrink-0">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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