import React from 'react'
import ReactDOM from 'react-dom/client'
import TayKayWebsite from './TayKayWebsite'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TayKayWebsite />
    <SpeedInsights />
  </React.StrictMode>,
)
