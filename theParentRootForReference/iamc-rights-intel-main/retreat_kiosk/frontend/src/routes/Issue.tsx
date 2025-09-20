import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBrief, postAssetsGenerate } from '../lib_api'
import { useState } from 'react'

export default function Issue(){
  const { id } = useParams()
  const [lens, setLens] = useState<'ceo'|'coo'|'director'>('ceo')
  const { data: brief } = useQuery({ queryKey: ['brief', id], queryFn: () => getBrief(id!) })
  const { data: lensBrief } = useQuery({ queryKey: ['lens', id, lens], queryFn: () => getBrief(id!, lens) })
  const [assets, setAssets] = useState<any>(null)
  if(!brief) return <div className="grid place-items-center h-screen">Loading…</div>

  async function genAssets(){
    const a = await postAssetsGenerate(brief)
    setAssets(a)
  }

  return (
    <div className="min-h-screen p-10 bg-[radial-gradient(1000px_600px_at_10%_10%,#12345633,transparent)]">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold">{brief.title}</div>
          <a className="btn" href={`/tweaks/${brief.id}`}>Last Week + Tweaks</a>
        </div>
        <p className="opacity-90">{brief.summary}</p>

        <div className="grid grid-cols-3 gap-6">
          <Card title="Risks" items={brief.risks} />
          <Card title="Opportunities" items={brief.opportunities} />
          <Card title="Recommendations" items={brief.recommendations} />
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            {(['ceo','coo','director'] as const).map(k => (
              <button key={k} className={`btn ${k===lens?'ring-2 ring-spotlight':''}`} onClick={()=> setLens(k)}>
                {k.toUpperCase()}
              </button>
            ))}
          </div>
          {!!lensBrief && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-1">Actions</div>
                <ul className="list-disc pl-5 opacity-90 space-y-1">
                  {lensBrief.actions.map((a:string,i:number)=><li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Talking Points</div>
                <ul className="list-disc pl-5 opacity-90 space-y-1">
                  {lensBrief.talking_points.map((a:string,i:number)=><li key={i}>{a}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Assets</div>
            <button className="btn" onClick={genAssets}>Generate</button>
          </div>
          {!!assets && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><div className="font-semibold">LinkedIn</div><pre className="whitespace-pre-wrap">{assets.linkedin}</pre></div>
              <div><div className="font-semibold">Email</div><pre className="whitespace-pre-wrap">{assets.email_paragraph}</pre></div>
              <div><div className="font-semibold">Press Excerpt</div><pre className="whitespace-pre-wrap">{assets.press_excerpt}</pre></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Card({ title, items }:{ title:string, items:string[] }){
  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">{title}</div>
      <ul className="list-disc pl-5 opacity-90 space-y-1">
        {items.map((x,i)=>(<li key={i}>{x}</li>))}
      </ul>
    </div>
  )
}
