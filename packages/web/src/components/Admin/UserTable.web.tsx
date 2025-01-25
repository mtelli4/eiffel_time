import { statut_utilisateur } from '@prisma/client'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import DataTable from 'datatables.net-react'
import { Edit2, Trash2 } from 'lucide-react'
import { Utilisateur } from '../../../../shared/src/types/types'
import { roleFinder } from '../../../../shared/src/lib/utils'

interface UserTableProps {
  users: Utilisateur[]
  isAdmin: boolean
  onEdit: (user: Utilisateur) => void
  onDelete: (user: Utilisateur) => void
  filters: {
    role: string
    formation: string
    groupe: string
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
  /* sort in the formation names when */
  filteredData.sort((a, b) => a.formations.length - b.formations.length);

  if (filters.role) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.statut.toLowerCase() === filters.role.toLowerCase()
    );
  }

  if (filters.formation) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.formations.some(
          (f) => f.id_formation === parseInt(filters.formation)
        )
    );
  }

  if (filters.groupe) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.groupes.some(
          (g) => g.id_groupe === parseInt(filters.groupe)
        )
    );
  }

  if (filters.type) {
    filteredData = filteredData.filter(
      (utilisateur) => (utilisateur.vacataire ? 'Vacataire' : 'Titulaire') === filters.type && utilisateur.statut === statut_utilisateur.teacher
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <p className="text-center py-4">Chargement des données...</p>
      </div>
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
              <td className="py-3 px-4">{roleFinder(utilisateur.statut)}</td>
              <td className="py-3 px-4">{utilisateur.formations.map((f) => f.libelle).sort().join(', ') || '-'}</td>
              <td className="py-3 px-4">{utilisateur.groupes.map((g) => g.libelle).join(', ') || '-'}</td>
              <td className="py-3 px-4">{utilisateur.vacataire === undefined ? '-' : utilisateur.vacataire ? 'Vacataire' : 'Titulaire'}</td>
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
