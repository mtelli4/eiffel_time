import { Edit2, Trash2 } from 'lucide-react';
import { Enseignant, Formation, FormationUtilisateur, Groupe, GroupeEtudiant, Utilisateur } from '@shared/backend/classes'
import { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import { groupe_etudiant } from '@prisma/client'

interface UserTableProps {
  users: Utilisateur[]
  isAdmin: boolean
  onEdit: (user: Utilisateur) => void
  onDelete: (user: Utilisateur) => void
  roleSelected: string
  groupSelected: string
  formationSelected: string
  typeTeachingSelected: string
  searchTerm: string
}

DataTable.use(DT);

export function UserTable({ users, isAdmin, onEdit, onDelete, roleSelected, groupSelected, formationSelected, typeTeachingSelected, searchTerm }: UserTableProps) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formationUsers, setFormationUsers] = useState<FormationUtilisateur[]>([]);
  const [etudiantGroupe, setEtudiantGroupe] = useState<GroupeEtudiant[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [loading, setLoading] = useState(true);

  /* roleSelected: string */

  useEffect(() => {
    // Effectuer la requête GET pour récupérer les utilisateurs
    fetch('http://localhost:4000/api/data') // URL de votre API
      .then((response) => {
        // Vérifier si la réponse est correcte
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        return response.json() // Convertir la réponse en JSON
      })
      .then((data) => {
        const formations = data.formations.map(
          (f: any) => new Formation(f)
        )
        setFormations(formations)

        const formationUsers = data.formation_utilisateur.map(
          (fu: any) => new FormationUtilisateur(fu)
        )
        setFormationUsers(formationUsers)

        const etudiantGroupe = data.groupe_etudiant.map(
          (eg: groupe_etudiant) => new GroupeEtudiant(eg)
        )
        setEtudiantGroupe(etudiantGroupe)

        const groupes = data.groupes.map((g: any) => { return new Groupe(g) })
        setGroupes(groupes)

        const enseignants = data.enseignants.map(
          (e: any) => new Enseignant(e, e.utilisateur)
        )
        setEnseignants(enseignants)

        setLoading(false)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error)
        setLoading(false)
      })
  }, []) // Le tableau vide [] signifie que l'effet se déclenche une seule fois, lors du premier rendu du composant

  let filteredData = users.filter(
    (user) =>
      user.getFullName().toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.getEmail().toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredData.sort((a, b) => a.getId() - b.getId());

  if (roleSelected) {
    filteredData = filteredData.filter((user) =>
      user.getStatut().toLowerCase() === roleSelected.toLowerCase()
    );
  }

  if (groupSelected) {
    filteredData = filteredData.filter((user) =>
      etudiantGroupe
        .filter(
          (eg) => eg.getIdUtilisateur() === user.getId() && eg.getIdGroupe() === parseInt(groupSelected)
        ).length > 0
    );
  }

  if (formationSelected) {
    filteredData = filteredData.filter((user) =>
      formationUsers
        .filter(
          (fu) => fu.getIdUtilisateur() === user.getId() && fu.getIdFormation() === parseInt(formationSelected)
        ).length > 0
    );
  }

  if (typeTeachingSelected) {
    filteredData = filteredData.filter((user) =>
      enseignants
        .filter((e) => e.getId() === user.getId())
        .map((e) => e.isVacataire() ? 'Vacataire' : 'Titulaire')[0] === typeTeachingSelected
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <p className="text-center py-4">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <DataTable className="w-full" options={{ paging: false, searching: false, info: false, language: { info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs', emptyTable: loading ? 'Chargement des données...' : 'Aucun utilisateur trouvé', } }}>
        <thead>
          <tr className="bg-[#ECF0F1] border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              ID
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Nom
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Prénom
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Email
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Rôle
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Formation(s)
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Groupes
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Type
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr
              key={user.getId()}
              className="border-b border-gray-100 hover:bg-[#ECF0F1]"
            >
              <td className="py-3 px-4">{user.getId()}</td>
              <td className="py-3 px-4">{user.getNom()}</td>
              <td className="py-3 px-4">{user.getPrenom()}</td>
              <td className="py-3 px-4">{user.getEmail()}</td>
              <td className="py-3 px-4">{user.getStatutName()}</td>
              <td className="py-3 px-4">
                {formationUsers
                  .filter(
                    (fu) =>
                      fu.getIdUtilisateur() ===
                      user.getId()
                  )
                  .map((fu) => {
                    const formation = formations.find(
                      (f) =>
                        f.getId() ===
                        fu.getIdFormation()
                    )
                    return formation
                      ? formation.getLibelle()
                      : ''
                  })
                  .sort()
                  .join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {etudiantGroupe
                  .filter(
                    (eg) =>
                      eg.getIdUtilisateur() ===
                      user.getId()
                  )
                  .map((eg) => {
                    const groupe = groupes.find(
                      (g) =>
                        g.getId() ===
                        eg.getIdGroupe()
                    )
                    return groupe
                      ? groupe.getLibelle()
                      : ''
                  })
                  .sort()
                  .join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {
                  enseignants
                    .filter((e) => e.getId() === user.getId())
                    .map((e) => e.isVacataire() ? 'Vacataire' : 'Titulaire')[0] || '-'
                }
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-[#3498DB] hover:text-[#2980B9] transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1 text-[#E74C3C] hover:text-[#C0392B] transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {/*<br/>*/}
      </DataTable>
    </div>
  )
}
