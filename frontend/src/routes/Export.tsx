import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function Export(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<'zip' | 'pdf' | 'csv' | 'json'>('zip')
  
  async function download(format: string = 'zip'){ 
    setIsExporting(true)
    try {
      const endpoint = format === 'zip' ? `/export/${id}` : `/export/${id}?format=${format}`
      const r = await fetch(`${API}${endpoint}`, { method:'POST' })
      
      if(!r.ok){ 
        alert(await r.text())
        return 
      } 
      
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `iamc_export_${id}.${format}`
      a.click()
      setTimeout(()=> URL.revokeObjectURL(url), 2000)
    } finally {
      setIsExporting(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-[radial-gradient(1000px_600px_at_50%_50%,#12345633,transparent)] grid place-items-center">
      <div className="max-w-4xl w-full px-8">
        <div className="card p-8 bg-gradient-to-br from-[#0f2236] to-[#0a1929] border-2 border-cyan-900/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-3 flex items-center justify-center gap-3">
              <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
              Export Intelligence Package
            </h1>
            <p className="text-lg opacity-80">Secure distribution of intelligence briefings and assets</p>
            <p className="text-sm opacity-60 mt-2">Export requires dual sign-off when enabled. Use the review bar to complete authorization.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#11253c]/50 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-300 mb-3">Export Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Media Team sign-off required</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Strategy Head sign-off required</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>No active interrupts</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Valid export window</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#11253c]/50 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-300 mb-3">Package Contents</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Full intelligence brief with analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Evidence sources & provenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Candidate hypotheses & confidence scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Generated communication assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Complete audit trail</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm opacity-80">Export Format:</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as typeof exportFormat)}
                className="bg-[#11253c] px-4 py-2 rounded-lg text-sm border border-cyan-900/30 focus:border-cyan-400/50 transition-colors"
              >
                <option value="zip">ZIP Package - Complete bundle</option>
                <option value="pdf">PDF Report - Formatted document</option>
                <option value="csv">CSV Data - Tabular export</option>
                <option value="json">JSON Export - Structured data</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <button 
                className="btn bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 px-8 py-3 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => download(exportFormat)}
                disabled={isExporting}
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Preparing Export...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download {exportFormat.toUpperCase()}
                  </span>
                )}
              </button>
              
              <button 
                className="btn opacity-80 hover:opacity-100" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
