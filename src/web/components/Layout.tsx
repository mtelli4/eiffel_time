import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  userRole: 'student' | 'teacher' | 'secretary' | 'manager' | 'admin';
}

export function Layout({ userRole }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <div className="flex-1 ml-[280px]">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-end">
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}