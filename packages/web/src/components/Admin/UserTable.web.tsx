import { groupe_etudiant } from '@prisma/client'
import DT from 'datatables.net-dt'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import DataTable from 'datatables.net-react'
import { Edit2, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Enseignant,
  Formation,
  FormationUtilisateur,
  Groupe,
  GroupeEtudiant,
  Utilisateur,
} from '../../../../shared/src/backend/classes'
import { ROLES } from '@shared/types/types'

interface UserTableProps {
  users: UtilisateurProps[]
  isAdmin: boolean
  onEdit: (user: UtilisateurProps) => void
  onDelete: (user: UtilisateurProps) => void
  roleSelected: string
  groupSelected: string
  formationSelected: string
  typeTeachingSelected: string
  searchTerm: string
  filters: any
}

type FormationProps = {
  id_formation: number;
  libelle: string;
}

type GroupeProps = {
  id_groupe: number;
  libelle: string;
}

type UtilisateurProps = {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
  formations: FormationProps[];
  groupes: GroupeProps[];
  vacataire: boolean;
};

DataTable.use(DT)

export function UserTable({
  users,
  isAdmin,
  onEdit,
  onDelete,
  roleSelected,
  groupSelected,
  formationSelected,
  typeTeachingSelected,
  searchTerm,
  filters,
}: UserTableProps) {
  const [loading, setLoading] = useState(true)

  const [utilisateurs, setUtilisateurs] = useState<UtilisateurProps[]>([]);

  /* roleSelected: string */

  useEffect(() => {
    fetch('http://localhost:4000/api/users') // URL de votre API
      .then((response) => {
        // Vérifier si la réponse est correcte
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        return response.json() // Convertir la réponse en JSON
      })
      .then((data) => {
        const utilisateurs = data.map((user: any) => ({
            id_utilisateur: user.id_utilisateur,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            formations: user.formation_utilisateur.map((f: any) => f.formation),
            groupes: user.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
            vacataire: user.enseignant?.vacataire || null,
        }));
        setUtilisateurs(utilisateurs)
        console.log(utilisateurs)
        setLoading(false)
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error
        )
        setLoading(false)
      })
  }, []);

  let filteredData = utilisateurs.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredData.sort((a, b) => a.id_utilisateur - b.id_utilisateur);

  if (roleSelected) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.statut.toLowerCase() === roleSelected.toLowerCase()
    )
  }

  if (groupSelected) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.groupes.filter(
          (g) =>
            g.id_groupe === parseInt(groupSelected)
        ).length > 0
    )
  }
  
  if (formationSelected) {
    filteredData = filteredData.filter(
      (utilisateur) =>
        utilisateur.formations.filter(
          (f) =>
            f.id_formation === parseInt(formationSelected)
        ).length > 0
    )
  }
  
  if (typeTeachingSelected) {
    filteredData = filteredData.filter(
      (utilisateur) => 
        utilisateur.vacataire ? 'Vacataire' : 'Titulaire' === typeTeachingSelected
    )
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
              <td className="py-3 px-4">
                {ROLES.find((role) => role.value === utilisateur.statut)?.label || '-'}
              </td>
              <td className="py-3 px-4">
                {utilisateur.formations.map((f) => f.libelle).join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {utilisateur.groupes.map((g) => g.libelle).join(', ') || '-'}
              </td>
              <td className="py-3 px-4">
                {utilisateur.vacataire ? 'Vacataire' : 'Titulaire'}
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
