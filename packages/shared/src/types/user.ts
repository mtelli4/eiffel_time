export type UserRole = 'student' | 'teacher' | 'secretary' | 'director' | 'manager' | 'administrator'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    formation?: string
    group?: string
    type?: 'permanent' | 'temporary'
}
