import { dateFormatting, getTime } from '../../utils/stringUtils'
import { API_URL, ClassGradesModule } from '../../types/types'

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
      date: dateFormatting(new Date(evaluationItem.cours.debut), new Date(evaluationItem.cours.fin)),
      notemaximale: evaluationItem.notemaximale,
      coefficient: evaluationItem.coefficient,
      notes: evaluationItem.notes.map((noteItem: any) => ({
        id_utilisateur: noteItem.etudiant.utilisateur.id_utilisateur,
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
