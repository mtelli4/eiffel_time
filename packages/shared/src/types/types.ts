import { Cours, Etudiant, Module } from '@shared/backend/classes'
import { Platform } from 'react-native';

export const API_URL = Platform.select({
  web: 'http://localhost:4000',
  ios: 'http://localhost:4000',
  android: 'http://10.0.2.2:4000', // Pour l'émulateur Android
  // Si vous utilisez un appareil physique Android, utilisez l'IP de votre machine
  // android: 'http://192.168.1.XX:4000',
});

export const ROLES = [
  { value: 'student', label: 'Étudiant' },
  { value: 'teacher', label: 'Enseignant' },
  { value: 'secretary', label: 'Secrétaire' },
  { value: 'director', label: 'Directeur' },
  { value: 'manager', label: 'Gestionnaire' },
  { value: 'administrator', label: 'Administrateur' },
]

export const TEACHER_TYPES = [
  { value: false, label: 'Titulaire' },
  { value: true, label: 'Vacataire' },
  { value: null, label: 'Non spécifié' },
]

export type Formation = {
  id_formation: number
  libelle: string
}

export type Groupe = {
  id_grp: number
  libelle: string
}

export type Utilisateur = {
  id_utilisateur: number
  nom: string
  prenom: string
  email: string
  statut: string
  formations: Formation[]
  groupes: Groupe[]
  vacataire?: boolean | null
}

export interface UserUpdate {
  id_utilisateur: number
  nom: string
  prenom: string
  email: string
  statut: string
  formations: Formation[]
  groupes: Groupe[]
  vacataire?: boolean | null
}

export interface CourseModalProps {
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
}
export interface PlannedHours {
  CM: number
  TD: number
  TP: number
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
}

export interface UserFiltersProps {
  onFilterChange: (filterName: string, value: string) => void
}

export interface FormEvaluation {
  libelle: string
  coefficient: number
  notemaximale: number
  periode: string
  id_cours: number
  id_module: number
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
