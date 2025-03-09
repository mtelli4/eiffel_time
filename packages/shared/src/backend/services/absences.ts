import { API_URL, Formation, ManageAbsencesAbsence } from "../../types/types"

const setAbsenceStatut = (envoye: boolean | null, valide: boolean | null): string => {
  if (envoye && valide === null) {
    return 'pending'
  } else if (valide && envoye) {
    return 'approved'
  } else if (!valide && envoye) {
    return 'rejected'
  } else {
    return 'unsent'
  }
}

const processAbsenceData = (data: any): { absences: ManageAbsencesAbsence[], formations: Formation[] } => {
  const formationMap = new Map<number, Formation>() // Utilisation d'une Map pour éviter les doublons

  const absences = data.map((absence: any) => {
    const formation: Formation = {
      id_formation: absence.cours.module.module_bloc_competence[0].bloc_competence.formation.id_formation,
      libelle: absence.cours.module.module_bloc_competence[0].bloc_competence.formation.libelle,
    }

    formationMap.set(formation.id_formation, formation) // Assure l'unicité en utilisant l'ID comme clé

    return {
      id_absence: absence.id_absence,
      etudiant: {
        id_utilisateur: absence.etudiant.utilisateur.id_utilisateur,
        nom: absence.etudiant.utilisateur.nom,
        prenom: absence.etudiant.utilisateur.prenom,
        groupes: absence.etudiant.groupe_etudiant.map((groupe: any) => ({
          id_grp: groupe.groupe.id_grp,
          libelle: groupe.groupe.libelle,
        })),
      },
      module: {
        id_module: absence.cours.module.id_module,
        codeapogee: absence.cours.module.codeapogee,
        libelle: absence.cours.module.libelle,
        formation,
      },
      date: new Date(absence.cours.debut),
      message: absence.message,
      envoye: absence.envoye,
      valide: absence.valide,
      updatedat: new Date(absence.updatedat),
      statut: setAbsenceStatut(absence.envoye, absence.valide),
      path: absence.justificatif,
    }
  })

  return { absences, formations: Array.from(formationMap.values()) }
}

export const fetchAbsences = async (): Promise<{ absences: ManageAbsencesAbsence[], formations: Formation[] }> => {
  const response = await fetch(`${API_URL}/api/absences`)
  if (!response.ok) {
    throw new Error('Erreur réseau')
  }
  const data = await response.json()
  return processAbsenceData(data)
}

export const approveAbsence = async (id_absence: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/absences/${id_absence}/approve`, {
    method: 'PUT',
  })
  if (!response.ok) {
    console.error(`Erreur réseau: ${response.statusText}`)
    return false
  }

  return true
}

export const rejectAbsence = async (id_absence: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/absences/${id_absence}/reject`, {
    method: 'PUT',
  })
  if (!response.ok) {
    console.error(`Erreur réseau: ${response.statusText}`)
    return false
  }

  return true
}
