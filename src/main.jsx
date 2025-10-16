import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./assets/style/input.css"
import { UserProvider } from './Contexts/UserContext.jsx'
import { ProductosProvider } from './Contexts/ProductosContext.jsx'
import { MovimientosProvider } from './Contexts/MovimientosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductosProvider>
          <MovimientosProvider>
            <App />
          </MovimientosProvider>
        </ProductosProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
