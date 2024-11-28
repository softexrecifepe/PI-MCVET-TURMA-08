import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Materiais from './pages/Materiais'
import Pacientes from './pages/Pacientes'
import Internacao from './pages/Internacao'
import Cadastro from './pages/Cadastro'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/pacientes",
        element: <Pacientes />
      },
      {
        path:"/internacao",
        element: <Internacao />
      },
      {
        path: "/agenda",
        element: <Agenda />
      },
      {
        path: "/materiais",
        element: <Materiais />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
