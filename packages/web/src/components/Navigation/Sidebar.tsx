import {
    ArrowLeftToLine,
    ArrowRightToLine,
    Calendar,
    ClipboardList,
    GraduationCap,
    Settings,
    UserCheck,
    Users,
    Wrench,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../../shared/src/assets/logo.svg'
import { cn } from '../../../../shared/src/lib/utils'
import { useUser } from '../../context/UserContext'
import { ROLES } from '../../../../shared/src/types/types'

interface SidebarProps {
    userRole: 'student' | 'teacher' | 'secretary' | 'director' | 'manager' | 'admin'
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
}

const navigationConfig = {
    student: [
        { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
        { icon: UserCheck, label: 'Absences', path: '/absences' },
        { icon: ClipboardList, label: 'Notes', path: '/grades' },
    ],
    teacher: [
        { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
        { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
        { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
    ],
    secretary: [
        {
            icon: Users,
            label: 'Suivi des présences professeurs',
            path: '/teacher-attendance',
        },
        { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
        { icon: UserCheck, label: 'Absences', path: '/absences' },
    ],
    director: [
        { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
        { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
        { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
        { icon: UserCheck, label: 'Absences et retards', path: '/manage-absences', },
    ],
    manager: [
        { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
        { icon: ClipboardList, label: 'Notes', path: '/class-grades' },
        { icon: GraduationCap, label: 'Moyennes', path: '/class-averages' },
        { icon: UserCheck, label: 'Absences', path: '/absences' },
    ],
    admin: [
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
            label: 'Suivi des présences des professeurs',
            path: '/teacher-attendance',
        },
        { icon: Wrench, label: 'Administration', path: '/admin' },
    ],
}

export function Sidebar({ userRole, isVisible, setIsVisible }: SidebarProps) {
    const [isManuallyOpened, setIsManuallyOpened] = useState(false)
    const navigation = navigationConfig[userRole]
    const { role, setRole } = useUser()

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(
            event.target.value as
                | 'admin'
                | 'student'
                | 'teacher'
                | 'secretary'
                | 'director'
                | 'manager'
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
                sidebarElement.removeEventListener(
                    'mouseleave',
                    handleMouseLeave
                )
            }
        }
    }, [isVisible, isManuallyOpened, setIsVisible])

    return (
        <div
            className={`sidebar h-screen w-[280px] bg-[#2E3494] text-white fixed top-0 p-4 flex flex-col justify-between transition-transform ${
                isVisible ? 'left-0' : '-left-[280px]'
            }`}
        >
            <div>
                <div className="flex items-center justify-start mb-8 pt-4 ml-9">
                    <img src={logo} alt="Logo" className="w-10 h-10" />
                    <span className="ml-3 text-xl font-semibold">
                        Eiffel Time
                    </span>
                </div>

                <nav className="space-y-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                                    'hover:bg-white/10',
                                    isActive ? 'bg-white/20' : 'text-white/80'
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
            <div className="text-black">
                <select
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primar"
                    value={role}
                    onChange={handleRoleChange}
                >
                    { ROLES.map((role) => (<option value={role.value}>{role.label}</option>)) }
                </select>
            </div>
            <div className="flex justify-between items-end p-2">
                <Settings className="w-6 h-6 cursor-pointer" />
                {isManuallyOpened ? (
                    <ArrowLeftToLine
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                            setIsVisible(true)
                            setIsManuallyOpened(true)
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
