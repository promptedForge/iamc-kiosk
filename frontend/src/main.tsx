import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './routes/App'
import Framing from './routes/Framing'
import Radar from './routes/Radar'
import Issue from './routes/Issue'
import ROI from './routes/ROI'
import Export from './routes/Export'
import Tweaks from './routes/Tweaks'

const router = createBrowserRouter([{ path: '/', element: <App />, children: [
  { index: true, element: <Framing /> },
  { path: 'radar', element: <Radar /> },
  { path: 'issue/:id', element: <Issue /> },
  { path: 'roi', element: <ROI /> },
  { path: 'export/:id', element: <Export /> },
  { path: 'tweaks', element: <Tweaks /> },
]}])

const qc = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}><RouterProvider router={router} /></QueryClientProvider>
  </React.StrictMode>
)
