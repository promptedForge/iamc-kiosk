import { useParams } from 'react-router-dom'
import { postExport } from '../lib_api'
import { useEffect, useState } from 'react'

export default function Export(){
  const { id } = useParams()
  const [ok, setOk] = useState(false)
  useEffect(()=>{
    fetch((import.meta as any).env.VITE_API_URL + '/review/status').then(r=>r.json()).then((s:any)=> setOk(!!(s.admin_signed && s.strategy_signed)))
  },[])
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center space-y-3">
        <div className="text-3xl font-extrabold">Export Package</div>
        <div className="opacity-80">Download the full brief + assets bundle.</div>
        <button className="btn" disabled={!ok} title={!ok? "Locked: dual sign‑off required": ""} onClick={()=> postExport(id!)}>Download ZIP</button>
        {!ok && <div className="opacity-70 text-sm">Awaiting Admin and Strategy sign‑off.</div>}
      </div>
    </div>
  )
}
