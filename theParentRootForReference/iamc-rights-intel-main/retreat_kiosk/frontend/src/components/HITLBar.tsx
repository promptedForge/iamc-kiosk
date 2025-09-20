import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReviewStatus, requestReview, signoff, resetReview } from '../lib_api'

export default function HITLBar(){
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey:['review'], queryFn: getReviewStatus, refetchInterval: 2000 })
  const req = useMutation({ mutationFn: requestReview, onSuccess:()=> qc.invalidateQueries({queryKey:['review']}) })
  const signA = useMutation({ mutationFn: ()=> signoff('admin'), onSuccess:()=> qc.invalidateQueries({queryKey:['review']}) })
  const signS = useMutation({ mutationFn: ()=> signoff('strategy'), onSuccess:()=> qc.invalidateQueries({queryKey:['review']}) })
  const reset = useMutation({ mutationFn: resetReview, onSuccess:()=> qc.invalidateQueries({queryKey:['review']}) })
  const awaiting = !(data?.admin_signed && data?.strategy_signed)
  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl mt-2 card p-2 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-semibold">HUMAN‑IN‑THE‑LOOP</span> — {data?.requested ? (awaiting? "Awaiting sign‑offs" : "Approved for export") : "Idle"}
          <span className="ml-3 opacity-80">Admin: {data?.admin_signed? "✓":"—"} | Strategy: {data?.strategy_signed? "✓":"—"}</span>
        </div>
        <div className="flex gap-2">
          {!data?.requested && <button className="btn" onClick={()=> req.mutate()}>Request Review</button>}
          {data?.requested && awaiting && <>
            <button className="btn" onClick={()=> signA.mutate()}>Sign as Admin</button>
            <button className="btn" onClick={()=> signS.mutate()}>Sign as Strategy</button>
          </>}
          {data?.requested && !awaiting && <button className="btn" onClick={()=> reset.mutate()}>Reset</button>}
        </div>
      </div>
    </div>
  )
}
