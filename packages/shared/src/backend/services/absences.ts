import { API_URL, ManageAbsencesAbsence } from "../../types/types"

const setAbsenceStatut = (absence: ManageAbsencesAbsence) => {
  if (absence.envoye && absence.valide) {
    return 'approved'
  } else if (absence.envoye && !absence.valide) {
    return 'rejected'
  } else {
    return 'pending'
  }
}

const processAbsenceData = (data: any): ManageAbsencesAbsence[] => {
  return data.map((absence: any) => ({
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
    },
    date: new Date(absence.cours.debut),
    envoye: absence.envoye,
    valide: absence.valide,
    updatedat: new Date(absence.updatedat),
    statut: setAbsenceStatut(absence),
    path: absence.justificatif,
  }))
}

export const fetchAbsences = async (): Promise<ManageAbsencesAbsence[]> => {
  const response = await fetch(`${API_URL}/api/absences`)
  if (!response.ok) {
    throw new Error('Erreur réseau')
  }
  const data = await response.json()
  return processAbsenceData(data)
}