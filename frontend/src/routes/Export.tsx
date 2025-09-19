import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'
export default function Export(){
  const { id } = useParams()
  async function download(){ const r = await fetch(`${API}/export/${id}`, { method:'POST' }); if(!r.ok){ alert(await r.text()); return } const blob = await r.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `iamc_export_${id}.zip`; a.click(); setTimeout(()=> URL.revokeObjectURL(url), 2000) }
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center space-y-3">
        <div className="text-3xl font-extrabold">Export Package</div>
        <div className="opacity-70 text-sm">Export requires dual sign-off if enabled. Use the review bar above to sign as Media Team and Strategy Head.</div>
        <div className="opacity-80">Download the full brief + assets bundle.</div>
        <button className="btn" onClick={download}>Download ZIP</button>
      </div>
    </div>
  )
}
