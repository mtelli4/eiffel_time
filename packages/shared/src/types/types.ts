import { Cours, Module } from '@backend/classes'
import { Etudiant } from '@shared/backend/classes'

export interface CourseModalProps {
    course: Course
    onClose: () => void
    onPresenceCheck: () => void
    course: Course
    onClose: () => void
    onPresenceCheck: () => void
}
export interface Course {
    id: number
    subject: string
    professor: string
    room: string
    startTime: string
    endTime: string
    day: string
    type: string
    startHour: number
    duration: number
    id: number
    subject: string
    professor: string
    room: string
    startTime: string
    endTime: string
    day: string
    type: string
    startHour: number
    duration: number
}
export interface PlannedHours {
    CM: number
    TD: number
    TP: number
    CM: number
    TD: number
    TP: number
}

export interface ModuleHours {
    code: string
    name: string
    planned: PlannedHours
    completed: PlannedHours
    code: string
    name: string
    planned: PlannedHours
    completed: PlannedHours
}

export interface TeacherPlanning {
    id: string
    firstName: string
    lastName: string
    modules: ModuleHours[]
    id: string
    firstName: string
    lastName: string
    modules: ModuleHours[]
}

export type GradeStatus =
    | 'graded'
    | 'absent'
    | 'makeup'
    | 'ungraded'
    | 'not_submitted'
    | 'exempted'
    | 'pending_makeup'
    | 'graded'
    | 'absent'
    | 'makeup'
    | 'ungraded'
    | 'not_submitted'
    | 'exempted'
    | 'pending_makeup'

export interface Student {
    id: string
    firstName: string
    lastName: string
    group: string
    id: string
    firstName: string
    lastName: string
    group: string
}

export interface AddGradeModalProps {
    isOpen: boolean
    onClose: () => void
    modules: Module[]
    students: Etudiant[]
    cours: Cours[]
}

export interface FormData {
    moduleId: string
    name: string
    date: string
    maxValue: number
    coefficient: number
    grades: Array<{
        studentId: string
        value: number | null
        status: GradeStatus
    }>
    moduleId: string
    name: string
    date: string
    maxValue: number
    coefficient: number
    grades: Array<{
        studentId: string
        value: number | null
        status: GradeStatus
    }>
}

export interface UserFiltersProps {
    onRoleChange: (role: string | null) => void
    onGroupChange: (group: string | null) => void
    onFormationChange: (formation: string | null) => void
    onTypeChange: (type: string | null) => void
    onSearch: (query: string) => void
    onRoleChange: (role: string | null) => void
    onGroupChange: (group: string | null) => void
    onFormationChange: (formation: string | null) => void
    onTypeChange: (type: string | null) => void
    onSearch: (query: string) => void
}

export interface FormEvaluation {
    libelle: string
    coefficient: number
    notemaximale: number
    periode: string
    id_cours: number
    id_module: number
}
