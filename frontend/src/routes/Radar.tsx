import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useEffect, useState } from 'react'
import '../styles/radar.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

interface PatternItem {
  id: string
  title: string
  quadrant: string
  score: number
  visibility?: string[]
  priority: string
  trend?: string
  requiresSignoff?: boolean
  signoffs?: Record<string, boolean>
}

export default function Radar(){
  const { data } = useQuery({ queryKey: ['classify'], queryFn: async()=> (await fetch(`${API}/classify/today`)).json() })
  const nav = useNavigate()
  const { userRole, signoffs: globalSignoffs } = useStore()
  const [feedExpanded, setFeedExpanded] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [localSignoffs, setLocalSignoffs] = useState<Record<string, Record<string, boolean>>>({})
  const [processingFeed, setProcessingFeed] = useState<Array<{text: string, status: 'incoming' | 'processing' | 'analyzed', timestamp: string}>>([])
  const [lastLoginTime] = useState(() => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - 5)
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  })

  // Filter items based on user role
  const allItems = (data ?? []) as PatternItem[]
  const items = allItems.filter(item => 
    !item.visibility || item.visibility.includes(userRole || '')
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

  const groups: Record<string, PatternItem[]> = { Policy:[], Industry:[], Advocacy:[], Risk:[] }
  for(const it of items){ 
    const quadrant = it.quadrant
    if (groups[quadrant]) {
      groups[quadrant].push(it)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const handleSignoff = async (itemId: string, role: string) => {
    // In real app, this would make an API call
    setLocalSignoffs(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [role]: true
      }
    }))
  }

  const displayedFeedItems = feedExpanded 
    ? processingFeed.slice(-15) 
    : processingFeed.slice(-2)

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden">
      {/* Cockpit-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      
      {/* Since last login header */}
      <div className="text-center pt-20 pb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Intelligence Brief</h1>
        <p className="text-lg opacity-80">Since your last login at {lastLoginTime}</p>
        <p className="text-sm opacity-60 mt-1">5 minutes to full clarity</p>
      </div>

      {/* Cockpit-style Analyzed Patterns Grid */}
      <div className="px-6 md:px-16 pb-32">
        <div className="mb-6">
          <h2 className="text-xl font-semibold opacity-90">Analyzed Patterns & Trends</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 perspective-1000">
          {(['Policy','Industry','Advocacy','Risk'] as const).map((q, qIdx) => {
            const isLeft = qIdx % 2 === 0
            const isTop = qIdx < 2
            
            return (
              <div 
                key={q} 
                className="relative"
                style={{
                  transform: `
                    rotateY(${isLeft ? '0.5deg' : '-0.5deg'}) 
                    rotateX(${isTop ? '-0.5deg' : '0.5deg'})
                  `,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="card p-8 bg-[#0a1929]/90 backdrop-blur-md border border-cyan-900/30 shadow-2xl min-h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent pointer-events-none rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-2xl font-bold text-cyan-100">{q}</div>
                      <div className="text-xs opacity-60 uppercase text-cyan-300">Pattern Analysis</div>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                      {groups[q].length === 0 ? (
                        <div className="text-sm opacity-50 italic">Processing patterns...</div>
                      ) : (
                        groups[q].map(it => {
                          const isExpanded = expandedItem === it.id
                          const itemSignoffs = localSignoffs[it.id] || {}
                          const needsSignoff = it.priority === 'critical' || it.priority === 'high'
                          
                          return (
                            <div 
                              key={it.id} 
                              className="relative"
                            >
                              <div 
                                className="p-4 bg-[#11253c]/80 rounded-lg hover:bg-[#132a44] cursor-pointer transition-all hover:scale-[1.01]"
                                onClick={()=> nav(`/issue/${it.id}`)}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-semibold text-sm pr-2">{it.title}</div>
                                  <div className={`text-xs font-bold ${getPriorityColor(it.priority)} shrink-0`}>
                                    {it.priority?.toUpperCase()}
                                  </div>
                                </div>
                                {it.trend && (
                                  <div className="text-xs opacity-60 italic mb-2">↗ {it.trend}</div>
                                )}
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="text-xs opacity-70">Confidence: {Math.round(it.score*100)}%</div>
                                    {/* Show hypothesis indicator for specific high-priority items */}
                                    {(it.priority === 'critical' || it.priority === 'high') && it.id === 'farmers-20250919' && (
                                      <div className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full animate-pulse">
                                        2 candidate hypotheses →
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {it.visibility && it.visibility.length === 1 && (
                                      <div className="text-xs opacity-50">
                                        {it.visibility[0] === userRole ? '👁 Exclusive' : '🔒 Restricted'}
                                      </div>
                                    )}
                                    {needsSignoff && (
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setExpandedItem(isExpanded ? null : it.id)
                                        }}
                                        className="text-xs bg-cyan-900/50 hover:bg-cyan-800/50 px-2 py-1 rounded transition-all"
                                      >
                                        {itemSignoffs[userRole || ''] ? '✅ Signed' : 'Sign off'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Signoff Drawer */}
                              {isExpanded && needsSignoff && (
                                <div className="mt-2 p-3 bg-[#0a1929]/80 rounded-lg border border-cyan-900/30">
                                  <div className="text-xs font-semibold mb-2">Signoffs Required:</div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs">Media Team:</span>
                                      {userRole === 'Media Team' && !itemSignoffs['Media Team'] ? (
                                        <button 
                                          onClick={() => handleSignoff(it.id, 'Media Team')}
                                          className="text-xs btn px-2 py-0.5"
                                        >
                                          Sign
                                        </button>
                                      ) : (
                                        <span className="text-xs">{itemSignoffs['Media Team'] ? '✅' : '⬜'}</span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs">Strategy Head:</span>
                                      {userRole === 'Strategy Head' && !itemSignoffs['Strategy Head'] ? (
                                        <button 
                                          onClick={() => handleSignoff(it.id, 'Strategy Head')}
                                          className="text-xs btn px-2 py-0.5"
                                        >
                                          Sign
                                        </button>
                                      ) : (
                                        <span className="text-xs">{itemSignoffs['Strategy Head'] ? '✅' : '⬜'}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })
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
        feedExpanded ? 'w-[90%] max-w-5xl' : 'w-[80%] max-w-3xl'
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
    </div>
  )
}