import CommandPalette from '../components/CommandPalette'
import { useEffect, useState } from 'react'

export default function Config(){
  const [open, setOpen] = useState(true)
  useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); setOpen(x=> !x) }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <div className="text-3xl font-extrabold mb-2">Cadence & Audience</div>
        <div className="opacity-80">Press ⌘K / Ctrl+K to toggle the command palette.</div>
      </div>
      <CommandPalette open={open} onClose={()=> setOpen(false)} />
    </div>
  )
}
