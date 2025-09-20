import { useQuery } from '@tanstack/react-query'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'
export default function ROI(){
  const { data } = useQuery({ queryKey: ['roi'], queryFn: async()=> (await fetch(`${API}/roi/today`)).json() })
  if(!data) return <div className="grid place-items-center h-screen">Loading…</div>
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center space-y-4">
        <div className="text-4xl font-extrabold">Impact Today</div>
        <div className="text-6xl font-black">{data.hours_saved.toFixed(1)} hours saved</div>
        <div className="opacity-80">≈ {data.fte_equiv.toFixed(2)} FTE</div>
        <div className="opacity-80">Manual: {data.before_hours.toFixed(1)} hrs → Automated: {(data.after_minutes/60).toFixed(1)} hrs</div>
      </div>
    </div>
  )
}
