import { Platform } from 'react-native'
import { IP_ADDRESS } from '../utils/ip_address'

const ANDROID_IP_ADDRESS = IP_ADDRESS || '10.0.2.2'

export const API_URL = Platform.select({
  web: `http://localhost:4000`,
  ios: `http://localhost:4000`,
  android: `http://${ANDROID_IP_ADDRESS}:4000`, // Si vous utilisez un appareil physique Android, utilisez l'IP de votre machine
  // Si vous utilisez un appareil physique Android, utilisez l'IP de votre machine
  // android: 'http://192.168.1.XX:4000', // 10.0.2.2
})

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

export const COURSE_TYPES = ['CM', 'TD', 'TP']

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
  vacataire: true | false | null
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
  course: COURSE
  onClose: () => void
  onPresenceCheck: () => void
}

export type COURSE = {
  id: string
  summary: string
  teacher: string
  location: string
  start: string
  end: string
  group: string
  day: string
  date: Date
  duration?: number
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

export type ClassGradesNote = {
  id_eval: number
  id_utilisateur: number
  numero_etudiant: string
  nom: string
  prenom: string
  note: number
  commentaire: string
}

export type ClassGradesEvaluation = {
  id_eval: number
  libelle: string
  periode: string
  date: string
  notemaximale: number
  coefficient: number
  notes: ClassGradesNote[]
  id_module: number
}

export type ClassGradesModule = {
  id_module: number
  libelle: string
  codeapogee: string
  evaluations: ClassGradesEvaluation[]
}

export type ClassGradesCours = {
  id_cours: number
  debut: string
  fin: string
  type: string
  id_module: number
}

export type ClassGradesStudent = {
  id_utilisateur: number
  nom: string
  prenom: string
  numero_etudiant: string
}

export interface AddGradeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormEvaluation) => void
  module: ClassGradesModule
  cours: ClassGradesCours[]
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
  formations: Formation[]
  groupes: Groupe[]
}

export interface FormEvaluation {
  libelle: string
  coefficient: number
  notemaximale: number
  periode: string
  id_cours: number
  id_module: number
}

export interface FormNote {
  id_eval: number
  id_utilisateur: number
  note: number
  commentaire: string
}

export interface NoteFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormNote) => void
  isEdit: boolean
  evaluation: ClassGradesEvaluation
  students: ClassGradesStudent[]
  note?: ClassGradesNote
}

export interface ModuleHours {
  code: string
  name: string
  planned: PlannedHours
  completed: PlannedHours
}

export type Module = {
  id_module: number
  libelle: string
  codeapogee: string
  prevu: { CM: number; TD: number; TP: number }
  effectue: { CM: number; TD: number; TP: number }
  periodes: string[]
}

export type TeacherPlanning = {
  id_utilisateur: number
  prenom: string
  nom: string
  modules: Module[]
}

export interface TeacherPlanningForm {
  id_utilisateur: number
  id_module: number
  type: any
  presences: number // It's the number of hours to add for the selected type
}

export const periodeLabels: Record<string, string> = {
  Semestre_1: 'Semestre 1',
  Semestre_2: 'Semestre 2',
  Semestre_3: 'Semestre 3',
  Semestre_4: 'Semestre 4',
  Semestre_5: 'Semestre 5',
  Semestre_6: 'Semestre 6',
}

export type MessagingUtilisateur = {
  id_utilisateur: number
  nom: string
  prenom: string
  statut: string
  avatar:
    | string
    | 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
  status: 'online' | 'offline'
  lastSeen?: string
}

export type MessagingMessage = {
  id_message: number
  emetteur: number
  recepteur: number
  message: string
  date: string
  vu: boolean
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

export type MessagingConversation = {
  utilisateur: MessagingUtilisateur
  last_message: MessagingMessage
  unread: number
}

export type ImportUser = {
  nom: string
  prenom: string
  email: string
  statut: string
  groupes?: string
}

export interface ManageAbsencesAbsence {
  id_absence: number
  etudiant: {
    id_utilisateur: number
    nom: string
    prenom: string
    groupes: Groupe[]
  }
  module: {
    id_module: number
    codeapogee: string
    libelle: string
    formation: Formation
  }
  date: Date
  message: string
  envoye: boolean
  valide: boolean
  updatedat: Date
  statut: 'pending' | 'approved' | 'rejected' | 'unsent'
  path?: string
}

export interface NotificationSettingsProps {
  isDark?: boolean
}

export interface SecuritySettingsProps {
  isDark?: boolean
}

export interface MessagesProps {
  isDark?: boolean
}
