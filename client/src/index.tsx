import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './index.css';
import { Dishes, Root } from './pages';

(async () => {
  if (process.env.REACT_APP_WITH_MSW) {
    const { worker } = await import('./mocks/browser')
    worker.start()
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Меню на сегодня</NavLink>
          <NavLink to="/dishes">Список блюд</NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/"  element={<Root />} />
            <Route path="/dishes"  element={<Dishes />} />
          </Routes>
        </main>
        
      </BrowserRouter>
    </React.StrictMode>
  );
})()



