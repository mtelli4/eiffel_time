// src/web/components/Layout.tsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

interface LayoutProps {
    userRole: 'student' | 'teacher' | 'secretary' | 'manager' | 'admin'
    children: React.ReactNode
}

export function Layout({ userRole, children }: LayoutProps) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)

    return (
        <div className="relative flex min-h-screen bg-gray-50">
            <Sidebar
                userRole={userRole}
                isVisible={isSidebarVisible}
                setIsVisible={setIsSidebarVisible}
            />
            <div
                className={`flex-1 ${isSidebarVisible ? 'ml-[280px]' : 'ml-0'}`}
            >
                <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-end"></header>
                <main className="p-8">{children}</main>
            </div>
        </div>
    )
}
