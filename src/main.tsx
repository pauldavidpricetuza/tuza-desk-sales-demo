import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { themeClass } from './theme/theme.css'
import './theme/fonts.css'
import './theme/global.css'
import App from './App'

const root = document.getElementById('root')!
root.classList.add(themeClass)
document.body.classList.add(themeClass)
document.documentElement.style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = '0'

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
