import { API_URL, Utilisateur } from '../../types/types'

// Fonction pour traiter les données utilisateur
const processUserData = (data: any): Utilisateur[] => {
  return data.map((utilisateur: any) => ({
    id_utilisateur: utilisateur.id_utilisateur,
    nom: utilisateur.nom,
    prenom: utilisateur.prenom,
    email: utilisateur.email,
    statut: utilisateur.statut,
    formations: utilisateur.formation_utilisateur.map((f: any) => f.formation),
    groupes: utilisateur.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
    vacataire: utilisateur.enseignant?.vacataire
  }))
}

// Fonction pour récupérer les utilisateurs depuis l'API
export const fetchUsers = async (): Promise<Utilisateur[]> => {
  const response = await fetch(`${API_URL}/api/admin/users`)
  if (!response.ok) {
    throw new Error('Erreur réseau')
  }
  const data = await response.json()
  return processUserData(data)
}
