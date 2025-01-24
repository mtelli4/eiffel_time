import { statut_utilisateur } from '@prisma/client'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import DataTable from 'datatables.net-react'
import { Edit2, Trash2 } from 'lucide-react'
import { Utilisateur } from '../../../../shared/src/types/types'

function roleFinder(role: string): string {
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

interface UserTableProps {
  users: Utilisateur[]
  isAdmin: boolean
  onEdit: (user: Utilisateur) => void
  onDelete: (user: Utilisateur) => void
  filters: {
    role: string
    groupe: string
    formation: string
    type: string
    search: string
  },
  loading: boolean
}

DataTable.use(DT)

export function UserTable({
  users,
  isAdmin,
  onEdit,
  onDelete,
  filters,
  loading,
}: UserTableProps) {

  /* roleSelected: string */

  let filteredData = users.filter((user) =>
    user.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
    user.prenom.toLowerCase().includes(filters.search.toLowerCase()) ||
    user.email.toLowerCase().includes(filters.search.toLowerCase())
  );

  filteredData.sort((a, b) => a.id_utilisateur - b.id_utilisateur);

  if (filters.role) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.statut.toLowerCase() === filters.role.toLowerCase()
    )
  }

  if (filters.groupe) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.groupes.filter(
          (g) =>
            g.id_groupe === parseInt(filters.groupe)
        ).length > 0
    )
  }
  
  if (filters.formation) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.formations.filter(
          (f) =>
            f.id_formation === parseInt(filters.formation)
        ).length > 0
    )
  }
  
  if (filters.type) {
    filteredData = filteredData.filter(
      (utilisateur) => 
        utilisateur.vacataire ? 'Vacataire' : 'Titulaire' === filters.type
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <DataTable
        className="w-full"
        options={{
          paging: false,
          searching: false,
          info: false,
          language: {
            info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs',
            emptyTable: loading
              ? 'Chargement des données...'
              : 'Aucun utilisateur trouvé',
          },
        }}
      >
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
          {filteredData.map((utilisateur) => (
            <tr
              key={utilisateur.id_utilisateur}
              className="border-b border-gray-100 hover:bg-[#ECF0F1]"
            >
              <td className="py-3 px-4">{utilisateur.id_utilisateur}</td>
              <td className="py-3 px-4">{utilisateur.nom}</td>
              <td className="py-3 px-4">{utilisateur.prenom}</td>
              <td className="py-3 px-4">{utilisateur.email}</td>
              <td className="py-3 px-4">
                {roleFinder(utilisateur.statut)}
              </td>
              <td className="py-3 px-4">
                {utilisateur.formations.map((f) => f.libelle).join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {utilisateur.groupes.map((g) => g.libelle).join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {/*utilisateur.statut != statut_utilisateur.teacher && */utilisateur.vacataire === undefined 
                  ? '-' // Si vacataire est null, afficher un tiret
                  : utilisateur.vacataire 
                    ? 'Vacataire' // Si vacataire est true, afficher "Vacataire"
                    : 'Titulaire' // Sinon, afficher "Titulaire"
                }
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(utilisateur)}
                    className="p-1 text-[#3498DB] hover:text-[#2980B9] transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(utilisateur)}
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
