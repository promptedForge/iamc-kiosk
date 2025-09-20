import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Framing(){
  const nav = useNavigate()
  useEffect(()=>{
    const t = setTimeout(()=> nav('/radar'), 1600)
    return ()=> clearTimeout(t)
  }, [nav])
  return (
    <div className="grid place-items-center h-screen bg-gradient-to-b from-navy to-steel">
      <div className="text-center">
        <div className="text-5xl font-extrabold tracking-tight">From Noise → Clarity in 5 Minutes</div>
        <div className="opacity-80 mt-4 text-lg">What your team wakes up to daily.</div>
      </div>
    </div>
  )
}
