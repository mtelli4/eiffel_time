// src/web/components/Layout.tsx
import { useEffect, useState } from 'react'
import { Sidebar } from './Navigation/Sidebar'
import { NotificationCenter } from './Notifications/NotificationCenter.web'
import { useTheme } from '@shared/hooks/useTheme'
import { useDateFormat } from '@shared/hooks/useDateFormat'
import { useLanguage } from '@shared/hooks/useLanguage'

interface LayoutProps {
  userRole:
    | 'student'
    | 'teacher'
    | 'secretary'
    | 'director'
    | 'manager'
    | 'administrator'
  children: React.ReactNode
}

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Accueil'
    case '/schedule':
      return 'Emploi du temps'
    case '/grades':
      return 'Notes'
    case '/absences':
      return 'Absences et retards'
    case '/class-grades':
      return 'Gestion des notes'
    case '/class-averages':
      return 'Moyennes'
    case '/manage-absences':
      return 'Gestion des absences'
    case '/teacher-attendance':
      return 'Suivi des présences des enseignants'
    case '/messaging':
      return 'Messagerie'
    case '/admin':
      return 'Administration'
    case '/settings':
      return 'Paramètres'
    case '/import-users':
      return 'Import des utilisateurs'
    default:
      return 'Page introuvable'
  }
}

export function Layout({ userRole, children }: LayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const pageTitle = getPageTitle(location.pathname)

  const { theme } = useTheme()
  const { dateFormat } = useDateFormat()
  const { language } = useLanguage()

  return (
    <div className="relative flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar
        userRole={userRole}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />
      <div className={`flex-1 ${isSidebarVisible ? 'ml-[280px]' : 'ml-0'}`}>
        <header className="h-16 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary dark:text-white">
            {pageTitle}
          </h1>
          <NotificationCenter />
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
