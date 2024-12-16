// src/web/routes.tsx
import { Routes, Route } from 'react-router-dom'
import { Grades } from './pages/Grades'
import { TeacherGrades } from './pages/TeacherGrades'
import { Averages } from './pages/Averages'
import { Admin } from './pages/Admin'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/grades" element={<Grades />} />
            <Route path="/teacher-grades" element={<TeacherGrades />} />
            <Route path="/averages" element={<Averages />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}
