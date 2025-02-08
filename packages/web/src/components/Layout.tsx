// src/web/components/Layout.tsx
import { useState } from 'react'
import { Sidebar } from './Navigation/Sidebar'

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
    case '/admin':
      return 'Administration'
    case '/settings':
      return 'Paramètres'
    default:
      return 'Page introuvable'
  }
}

export function Layout({ userRole, children }: LayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const pageTitle = getPageTitle(location.pathname)

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <Sidebar
        userRole={userRole}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />
      <div className={`flex-1 ${isSidebarVisible ? 'ml-[280px]' : 'ml-0'}`}>
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-start">
          <h1 className="text-2xl font-bold text-primary">{pageTitle}</h1>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
