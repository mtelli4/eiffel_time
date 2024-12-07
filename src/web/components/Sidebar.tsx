import { Calendar, ClipboardList, GraduationCap, Settings, UserCheck, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../../shared/assets/Logo.svg';
import { cn } from '../../shared/lib/utils';

interface SidebarProps {
  userRole: 'student' | 'teacher' | 'secretary' | 'manager' | 'admin';
}

const navigationConfig = {
  student: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: UserCheck, label: 'Absences', path: '/absences' },
    { icon: ClipboardList, label: 'Notes', path: '/grades' },
  ],
  teacher: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/averages' },
  ],
  secretary: [
    { icon: Users, label: 'Suivi des présences professeurs', path: '/teacher-attendance' },
    { icon: GraduationCap, label: 'Moyennes', path: '/averages' },
    { icon: UserCheck, label: 'Absences', path: '/absences' },
  ],
  manager: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/averages' },
    { icon: UserCheck, label: 'Absences', path: '/absences' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ],
  admin: [
    { icon: Calendar, label: 'Emploi du temps', path: '/schedule' },
    { icon: ClipboardList, label: 'Notes', path: '/grades' },
    { icon: GraduationCap, label: 'Moyennes', path: '/averages' },
    { icon: UserCheck, label: 'Absences et retards', path: '/absences' },
    { icon: Users, label: 'Suivi des présences des professeurs', path: '/teacher-attendance' },
    { icon: Settings, label: 'Administration', path: '/admin' },
  ],
};

export function Sidebar({ userRole }: SidebarProps) {
  const navigation = navigationConfig[userRole];

  return (
    <div className="h-screen w-[280px] bg-[#2E3494] text-white fixed left-0 top-0 p-4">
      <div className="flex items-center justify-start mb-8 pt-4 ml-9">
      <img src={logo} alt="Logo" className="w-10 h-10" />
      <span className="ml-3 text-xl font-semibold">Eiffel Time</span>
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
            <span className="text-[15px] font-medium text-left">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}