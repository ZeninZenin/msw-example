import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import { Dishes, Root } from './pages';

if (import.meta.env.VITE_WITH_MSW) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/dishes',
    element: <Dishes />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
