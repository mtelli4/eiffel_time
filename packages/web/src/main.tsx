import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Absences } from '../../shared/src/pages/Absences/StudentAbsences'
import { Admin } from '../../shared/src/pages/Admin/Admin'
import { ClassAverages } from '../../shared/src/pages/Averages/ClassAverages'
import { ClassGrades } from '../../shared/src/pages/Grades/GradesManagement/ClassGrades'
import { Grades } from '../../shared/src/pages/Grades/StudentGrades'
import { Login } from '../../shared/src/pages/Login/SignIn'
import { SignUp } from '../../shared/src/pages/Login/SignUp'
import { Schedule } from '../../shared/src/pages/Schedule/Schedule'
import Root, { Error } from './root'
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
        path: '/absences',
        element: <Absences />,
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
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
