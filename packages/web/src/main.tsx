import { Admin } from '@shared/pages/Admin/Admin'
import { ClassAverages } from '@shared/pages/Averages/ClassAverages'
import { ClassGrades } from '@shared/pages/Grades/GradesManagement/ClassGrades'
import { Grades } from '@shared/pages/Student/Grades'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { Register } from '@shared/pages/Register'
// import { Login } from './pages/Login'
import { Schedule } from '@shared/pages/Schedule/Schedule'
import Root, { Error } from './root'
import './styles/App.css'
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/schedule',
        element: <Schedule />,
      },
      {
        path: '/grades',
        element: <Grades />,
      },
      {
        path: '/class-grades',
        element: <ClassGrades />,
      },
      {
        path: '/class-averages',
        element: <ClassAverages />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/register',
  //   element: <Register />,
  // },
])

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
