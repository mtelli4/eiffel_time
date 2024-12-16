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
