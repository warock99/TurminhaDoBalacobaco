import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './styles/global.css'
import App from './App.jsx'

// Marca quando um campo de texto está em foco (teclado aberto) para pausar animações pesadas.
const isField = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')
document.addEventListener('focusin', (e) => {
  if (isField(e.target)) document.body.classList.add('typing')
})
document.addEventListener('focusout', (e) => {
  if (isField(e.target)) document.body.classList.remove('typing')
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
