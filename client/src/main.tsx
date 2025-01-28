import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import './index.css'
import { Root, Dishes } from './pages'
import { config } from './config'

if (config.ENABLE_MSW) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const socket = new WebSocket(config.WS_URL)

socket.onopen = (e) => {
  console.log(e)
  socket.send('test')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Меню на сегодня</NavLink>
          <NavLink to="/dishes">Список блюд</NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/dishes" element={<Dishes />} />
          </Routes>
        </main>
        
      </BrowserRouter>
    </StrictMode>,
)
