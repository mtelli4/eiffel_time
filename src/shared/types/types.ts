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
}

export interface PlannedHours {
  CM: number
  TD: number
  TP: number
}

export interface ModuleHours {
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
}

export type GradeStatus =
  | 'graded'
  | 'absent'
  | 'makeup'
  | 'ungraded'
  | 'not_submitted'
  | 'exempted'
  | 'pending_makeup'

export interface Module {
  id: string
  code: string
  name: string
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
}

export interface AddGradeModalProps {
  isOpen: boolean
  onClose: () => void
  modules: Module[]
  students: Student[]
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
}
