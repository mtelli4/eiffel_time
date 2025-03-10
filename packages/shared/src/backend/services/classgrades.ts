import { dateFormatting } from '../../utils/stringUtils'
import { API_URL, ClassGradesModule } from '../../types/types'

// Fonction pour traiter les données brutes SQL
const processRawClassGradesData = (data: any): ClassGradesModule[] => {
  const modulesMap = new Map()
  
  data.forEach((row: any) => {
    if (!modulesMap.has(row.id_module)) {
      modulesMap.set(row.id_module, {
        id_module: row.id_module,
        libelle: row.libelle,
        codeapogee: row.codeapogee,
        evaluations: []
      })
    }

    const module = modulesMap.get(row.id_module)
    let evaluation = module.evaluations.find((e: any) => e.id_eval === row.id_eval)

    if (!evaluation) {
      evaluation = {
        id_eval: row.id_eval,
        libelle: row.eval_libelle,
        periode: row.periode,
        date: dateFormatting(new Date(row.debut), new Date(row.fin)),
        notemaximale: row.notemaximale,
        coefficient: row.coefficient,
        notes: []
      }
      module.evaluations.push(evaluation)
    }

    evaluation.notes.push({
      id_utilisateur: row.id_utilisateur,
      numero_etudiant: row.numeroetudiant,
      nom: row.nom,
      prenom: row.prenom,
      note: row.note,
      commentaire: row.commentaire
    })
  })

  return Array.from(modulesMap.values())
}

// Fonction pour récupérer les notes depuis l'API avec la requête brute
export const fetchClassGrades = async (): Promise<ClassGradesModule[]> => {
  const response = await fetch(`${API_URL}/api/classgrades/`)
  if (!response.ok) {
    throw new Error('Erreur réseau')
  }
  const data = await response.json()
  return processRawClassGradesData(data)
}