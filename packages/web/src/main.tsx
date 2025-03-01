import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Admin } from '../../shared/src/pages/Admin/Admin'
import { Absences } from '../../shared/src/pages/Attendance/StudentAbsences'
import { TeacherAttendance } from '../../shared/src/pages/Attendance/TeacherAttendance'
import { ClassAverages } from '../../shared/src/pages/Averages/ClassAverages'
import { ClassGrades } from '../../shared/src/pages/Grades/GradesManagement/ClassGrades'
import { Grades } from '../../shared/src/pages/Grades/StudentGrades'
import { Login } from '../../shared/src/pages/Login/SignIn'
import { SignUp } from '../../shared/src/pages/Login/SignUp'
import { Home } from '../../shared/src/pages/Home/Home'
import { Schedule } from '../../shared/src/pages/Schedule/Schedule'
import { Settings } from '../../shared/src/pages/Settings/Settings'
import { ManageAbsences } from './pages/Attendance/ManageAbsences'
import { Messages } from './pages/Messaging/Messages'
import Root, { Error } from './root'
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/schedule',
        element: <Schedule />,
      },
      {
        path: '/grades',
        element: <Grades />,
      },
      {
        path: '/class-averages',
        element: <ClassAverages />,
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
        path: '/manage-absences',
        element: <ManageAbsences />,
      },
      {
        path: '/teacher-attendance',
        element: <TeacherAttendance />,
      },
      {
        path: '/messaging',
        element: <Messages />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/settings',
        element: <Settings />,
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
