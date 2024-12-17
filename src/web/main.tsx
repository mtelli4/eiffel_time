import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { Error } from './root'
import { Grades } from './pages/Grades'
import { TeacherGrades } from '../shared/pages/TeacherGrades'
import { Averages } from '../shared/pages/Averages'
import { Admin } from '../shared/pages/Admin'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/grades',
        element: <Grades />,
      },
      {
        path: '/teacher-grades',
        element: <TeacherGrades />,
      },
      {
        path: '/averages',
        element: <Averages />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
