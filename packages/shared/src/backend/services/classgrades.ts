import { getTime } from '../../utils/stringUtils'
import { API_URL, ClassGradesModule } from '../../types/types'

// // Fonction pour traiter les données utilisateur
// const processUserData = (data: any): Utilisateur[] => {
//   return data.map((utilisateur: any) => ({
//     id_utilisateur: utilisateur.id_utilisateur,
//     nom: utilisateur.nom,
//     prenom: utilisateur.prenom,
//     email: utilisateur.email,
//     statut: utilisateur.statut,
//     formations: utilisateur.formation_utilisateur.map((f: any) => f.formation),
//     groupes: utilisateur.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
//     vacataire: utilisateur.enseignant?.vacataire
//   }))
// }

// // Fonction pour récupérer les utilisateurs depuis l'API
// export const fetchUsers = async (): Promise<Utilisateur[]> => {
//   const response = await fetch(`${API_URL}/api/admin/users`)
//   if (!response.ok) {
//     throw new Error('Erreur réseau')
//   }
//   const data = await response.json()
//   return processUserData(data)
// }

// fetch(`${API_URL}/api/classgrades/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setModuleEvalNotes(data.map((module: any) => {
//           return {
//             id_module: module.id_module,
//             libelle: module.libelle,
//             codeapogee: module.codeapogee,
//             evaluations: module.evaluation.map((evaluationItem: any) => {
//               return {
//                 id_eval: evaluationItem.id_eval,
//                 libelle: evaluationItem.libelle,
//                 periode: evaluationItem.periode,
//                 date: getTime(new Date(evaluationItem.cours.debut), new Date(evaluationItem.cours.fin)),
//                 notemaximale: evaluationItem.notemaximale,
//                 coefficient: evaluationItem.coefficient,
//                 notes: evaluationItem.notes.map((noteItem: any) => {
//                   return {
//                     numero_etudiant: noteItem.etudiant.numeroetudiant,
//                     nom: noteItem.etudiant.utilisateur.nom,
//                     prenom: noteItem.etudiant.utilisateur.prenom,
//                     note: noteItem.note,
//                     commentaire: noteItem.commentaire
//                   }
//                 })
//               }
//             })
//           }
//         }))
//       })
//       .catch((error) => {
//         console.error('Erreur lors de la récupération des modules:', error)
//       })

// Fonction pour traiter les données de notes
const processClassGradesData = (data: any): ClassGradesModule[] => {
  return data.map((module: any) => ({
    id_module: module.id_module,
    libelle: module.libelle,
    codeapogee: module.codeapogee,
    evaluations: module.evaluation.map((evaluationItem: any) => ({
      id_eval: evaluationItem.id_eval,
      libelle: evaluationItem.libelle,
      periode: evaluationItem.periode,
      date: getTime(new Date(evaluationItem.cours.debut), new Date(evaluationItem.cours.fin)),
      notemaximale: evaluationItem.notemaximale,
      coefficient: evaluationItem.coefficient,
      notes: evaluationItem.notes.map((noteItem: any) => ({
        numero_etudiant: noteItem.etudiant.numeroetudiant,
        nom: noteItem.etudiant.utilisateur.nom,
        prenom: noteItem.etudiant.utilisateur.prenom,
        note: noteItem.note,
        commentaire: noteItem.commentaire
      }))
    }))
  }))
}

// Fonction pour récupérer les notes depuis l'API
export const fetchClassGrades = async (): Promise<ClassGradesModule[]> => {
  const response = await fetch(`${API_URL}/api/classgrades/`)
  if (!response.ok) {
    throw new Error('Erreur réseau')
  }
  const data = await response.json()
  return processClassGradesData(data)
}
