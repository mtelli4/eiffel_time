import { API_URL, ImportUser, UserUpdate, Utilisateur } from '../../types/types'

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

// Fonction pour créer un utilisateur
export const createUser = async (data: UserUpdate): Promise<Utilisateur> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Erreur réseau')
    }

    const newUser = await response.json()
    return {
      id_utilisateur: newUser.id_utilisateur,
      nom: newUser.nom,
      prenom: newUser.prenom,
      email: newUser.email,
      statut: newUser.statut,
      formations: newUser.formations,
      groupes: newUser.groupes,
      vacataire: newUser.vacataire,
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur : ", error)
    throw error
  }
}

// Fonction pour modifier un utilisateur
export const updateUser = async (data: UserUpdate): Promise<Utilisateur> => {
  try {
    const response = await fetch(`${API_URL}/api/admin/update-user/${data.id_utilisateur}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error('Erreur réseau : ' + errorData.message)
    }
    const updatedUser = await response.json()
    return {
      id_utilisateur: updatedUser.id_utilisateur,
      nom: updatedUser.nom,
      prenom: updatedUser.prenom,
      email: updatedUser.email,
      statut: updatedUser.statut,
      formations: updatedUser.formations,
      groupes: updatedUser.groupes,
      vacataire: updatedUser.vacataire
    }
  } catch (error) {
    console.error('Erreur lors de la modification de l\'utilisateur : ', error)
    throw error
  }
}

// Fonction pour importer les utilisateurs
export const importUsers = async (users: ImportUser[]): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/admin/import-users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(users)
  })
  if (!response.ok) {
    const errorData = await response.json()
    console.error('Erreur lors de l\'importation des utilisateurs : ', errorData.message)
    return false
  }
  return true
}
