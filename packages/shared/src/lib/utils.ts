import { statut_utilisateur } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roleFinder(role: string): string {
  const prismaRole = role as statut_utilisateur
  switch (prismaRole) {
    case statut_utilisateur.indefinite:
      return 'Indéfini'
    case statut_utilisateur.administrator:
      return 'Administrateur'
    case statut_utilisateur.director:
      return 'Directeur'
    case statut_utilisateur.teacher:
      return 'Enseignant'
    case statut_utilisateur.student:
      return 'Étudiant'
    case statut_utilisateur.manager:
      return 'Gestionnaire'
    case statut_utilisateur.secretary:
      return 'Secrétaire'
    default:
      return 'Indéfini'
  }
}
