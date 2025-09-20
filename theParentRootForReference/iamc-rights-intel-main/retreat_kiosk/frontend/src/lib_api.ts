const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export async function getIngestStatus(){
  const r = await fetch(`${API}/ingest/status`); return r.json()
}
export async function getClassifyToday(){
  const r = await fetch(`${API}/classify/today`); return r.json()
}
export async function getBrief(id: string, lens?: 'ceo'|'coo'|'director'){
  const u = new URL(`${API}/brief/${id}`); if(lens) u.searchParams.set('lens', lens); 
  const r = await fetch(u); return r.json()
}
export async function postAssetsGenerate(brief: any){
  const r = await fetch(`${API}/assets/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(brief)})
  return r.json()
}
export async function getRoiToday(){
  const r = await fetch(`${API}/roi/today`); return r.json()
}
export async function postExport(id: string){
  const r = await fetch(`${API}/export/${id}`, { method:'POST' })
  const blob = await r.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `iamc_export_${id}.zip`; a.click()
  setTimeout(()=> URL.revokeObjectURL(url), 2000)
}

// Config & Review & Upload
export async function getConfig(){ const r = await fetch(`${API}/config`); return r.json() }
export async function postConfig(cfg:any){ const r = await fetch(`${API}/config`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(cfg)}); return r.json() }
export async function getReviewStatus(){ const r = await fetch(`${API}/review/status`); return r.json() }
export async function requestReview(){ const r = await fetch(`${API}/review/request`, {method:'POST'}); return r.json() }
export async function signoff(role:'admin'|'strategy'){ const r = await fetch(`${API}/review/signoff`, {method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({role})}); return r.json() }
export async function resetReview(){ const r = await fetch(`${API}/review/reset`, {method:'POST'}); return r.json() }
export async function uploadPastReport(file: File){
  const fd = new FormData(); fd.append('file', file)
  const r = await fetch(`${API}/upload/past_report`, { method:'POST', body: fd })
  return r.json()
}
export async function tweaksPreview(brief:any, past_report_id?:string, notes?:string){
  const r = await fetch(`${API}/tweaks/preview`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({brief, past_report_id, notes}) })
  return r.json()
}
