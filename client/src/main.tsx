import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import './index.css'
import { Root, Dishes, WebSocketExample, AsyncExample } from './pages'
import { Space } from 'antd'
import('./socket')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <nav>
          <Space size={32}>
            <NavLink className="nav-link" to="/">Меню на сегодня</NavLink>
            <NavLink className="nav-link" to="/dishes">Список блюд</NavLink>
            <NavLink className="nav-link" to="/websocket">Пример WebSocket</NavLink>
            <NavLink className="nav-link" to="/async">Пример с подгрузкой моков</NavLink>
          </Space>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/websocket" element={<WebSocketExample />} />
            <Route path="/async" element={<AsyncExample />} />
          </Routes>
        </main>
      </BrowserRouter>
    </StrictMode>,
)
