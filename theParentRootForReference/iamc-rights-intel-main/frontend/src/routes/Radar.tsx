import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function Radar(){
  const { data } = useQuery({ queryKey: ['classify'], queryFn: async()=> (await fetch(`${API}/classify/today`)).json() })
  const nav = useNavigate()
  const items = (data ?? []) as any[]
  const groups: Record<string, any[]> = { Policy:[], Industry:[], Advocacy:[], Risk:[] }
  for(const it of items){ (groups as any)[it.quadrant]?.push(it) }
  return (
    <div className="p-10 grid grid-cols-2 gap-8 min-h-screen bg-navy">
      {(['Policy','Industry','Advocacy','Risk'] as const).map(q => (
        <div key={q} className="card p-6">
          <div className="text-2xl font-bold mb-2">{q}</div>
          <div className="space-y-2">
            {groups[q].map(it => (
              <div key={it.id} className="p-3 bg-[#11253c] rounded-lg hover:bg-[#132a44] cursor-pointer"
                   onClick={()=> nav(`/issue/${it.id}`)}>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm opacity-70">Confidence: {Math.round(it.score*100)}%</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
