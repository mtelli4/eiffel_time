import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Calendar,
  ClipboardList,
  GraduationCap,
  MessageCircleMore,
  Settings,
  UserCheck,
  Users,
  Wrench,
  UserPlus
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../../shared/src/assets/logo.svg'
import { cn } from '../../../../shared/src/lib/utils'
import { ROLES } from '../../../../shared/src/types/types'
import { useUser } from '../../context/UserContext'

interface SidebarProps {
  userRole:
    | 'student'
    | 'teacher'
    | 'secretary'
    | 'director'
    | 'manager'
    | 'administrator'
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const navigationConfig = {
  student: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: UserCheck, label: 'Absences et retards', path: '/absences' },
    { icon: ClipboardList, label: 'Notes', path: '/grades' },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
  ],
  teacher: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
  ],
  secretary: [
    {
      icon: UserCheck,
      label: 'Absences et retards',
      path: '/manage-absences',
    },
    {
      icon: Users,
      label: 'Suivi des présences professeurs',
      path: '/teacher-attendance',
    },
    { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    { icon: UserPlus, label: 'Importation des utilisateurs', path: '/import-users' },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
  ],
  director: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    { icon: UserCheck, label: 'Absences et retards', path: '/manage-absences' },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
  ],
  manager: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    { icon: UserCheck, label: 'Absences', path: '/absences' },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
  ],
  administrator: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    {
      icon: UserCheck,
      label: 'Absences et retards',
      path: '/manage-absences',
    },
    {
      icon: Users,
      label: 'Suivi des présences des enseignants',
      path: '/teacher-attendance',
    },
    { icon: MessageCircleMore, label: 'Messages', path: '/messaging' },
    { icon: Wrench, label: 'Administration', path: '/admin' },
  ],
}

export function Sidebar({ userRole, isVisible, setIsVisible }: SidebarProps) {
  const [isManuallyOpened, setIsManuallyOpened] = useState(false)
  const navigation = navigationConfig[userRole]
  const { role, setRole } = useUser()

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (error) {
      console.error('Error parsing user data:', error)
      return {}
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate('/signin')
    }
  }, [user, navigate])

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(
      event.target.value as
        | 'student'
        | 'teacher'
        | 'secretary'
        | 'director'
        | 'manager'
        | 'administrator'
    )
  }

  useEffect(() => {
    const handleMouseEnter = () => {
      if (!isVisible) {
        setIsVisible(true)
      }
    }

    const handleMouseLeave = () => {
      if (!isManuallyOpened) {
        setIsVisible(false)
      }
    }

    const leftEdge = document.createElement('div')
    leftEdge.style.position = 'fixed'
    leftEdge.style.top = '0'
    leftEdge.style.left = '0'
    leftEdge.style.width = '10px'
    leftEdge.style.height = '100vh'
    leftEdge.style.zIndex = '9999'
    leftEdge.addEventListener('mouseenter', handleMouseEnter)
    document.body.appendChild(leftEdge)

    const sidebarElement = document.querySelector('.sidebar')
    if (sidebarElement) {
      sidebarElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      leftEdge.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeChild(leftEdge)
      if (sidebarElement) {
        sidebarElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isVisible, isManuallyOpened, setIsVisible])

  return (
    <div
      className={`sidebar h-screen w-[280px] bg-[#2E3494] dark:text-primary  text-white dark:text-white dark:border-primary fixed top-0 p-4 flex flex-col justify-between transition-transform ${
        isVisible ? 'left-0' : '-left-[280px]'
      }`}
    >
      <div>
        <NavLink to="/">
        <div className="flex items-center justify-start mb-8 pt-4 ml-9">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="ml-3 text-xl font-semibold">Eiffel Time</span>
        </div>
        </NavLink>

        {/* <div className="mb-6 px-4">
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {ROLES.map((role) => (
              <option
                value={role.value}
                key={role.value}
                className="text-gray-900"
              >
                {role.label}
              </option>
            ))}
          </select>
        </div> */}

        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  'hover:bg-white/10',
                  isActive
                    ? 'bg-white/20 dark:bg-white/10'
                    : 'text-white/80 dark:text-white/70'
                )
              }
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="text-[15px] font-medium text-left">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex justify-between items-end p-2">
        <NavLink to="/settings">
          <Settings className="w-6 h-6 cursor-pointer" />
        </NavLink>
        {isManuallyOpened ? (
          <ArrowLeftToLine
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setIsVisible(false)
              setIsManuallyOpened(false)
            }}
          />
        ) : (
          <ArrowRightToLine
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setIsVisible(true)
              setIsManuallyOpened(true)
            }}
          />
        )}
      </div>
    </div>
  )
}
