import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { palette } from './theme/colors'
import './index.css'
import App from './App.jsx'

// Apply palette as CSS variables so the app style is driven by src/theme/colors.js
function applyPalette() {
  const root = document.documentElement
  root.style.setProperty('--color-peach', palette.peach.DEFAULT)
  root.style.setProperty('--color-peach-light', palette.peach.light)
  root.style.setProperty('--color-peach-dark', palette.peach.dark)
  root.style.setProperty('--color-coral', palette.coral.DEFAULT)
  root.style.setProperty('--color-coral-light', palette.coral.light)
  root.style.setProperty('--color-coral-dark', palette.coral.dark)
}
applyPalette()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
