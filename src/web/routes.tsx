// src/web/routes.tsx
import { Routes, Route } from 'react-router-dom';
import { Grades } from './pages/Grades';
import { TeacherGrades } from './pages/teacher-grades';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/grades" element={<Grades />} />
      <Route path="/teacher-grades" element={<TeacherGrades />} />
      {/* Ajoutez d'autres routes ici */}
    </Routes>
  );
}