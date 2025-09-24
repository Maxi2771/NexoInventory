import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  
import App from './App.jsx'
import "./assets/style/input.css"

const repo = 'NexoInventory'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={repo}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
