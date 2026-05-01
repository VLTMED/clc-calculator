import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DirectionProvider } from '@radix-ui/react-direction'
import './index.css'
import App from './App.tsx'

document.documentElement.dir = 'rtl'
document.documentElement.lang = 'ar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider dir="rtl">
      <App />
    </DirectionProvider>
  </StrictMode>,
)
