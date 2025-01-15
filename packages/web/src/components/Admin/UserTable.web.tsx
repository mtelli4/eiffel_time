import { Edit2, Search, Trash2 } from 'lucide-react';
import { Formation, FormationUtilisateur, Utilisateur } from '@shared/backend/classes';
import { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-dt'

interface UserTableProps {
    users: Utilisateur[]
    isAdmin: boolean
    onEdit: (user: Utilisateur) => void
    onDelete: (user: Utilisateur) => void
    searchTerm: string
}

DataTable.use(DT);

export function UserTable({ users, isAdmin, onEdit, onDelete, searchTerm }: UserTableProps) {
    const [formations, setFormations] = useState<Formation[]>([]);
    const [formationUsers, setFormationUsers] = useState<FormationUtilisateur[]>([]);

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
            })
            .catch((error) => {
                console.error(
                    'Erreur lors de la récupération des utilisateurs:',
                    error
                )
            })
    }, []) // Le tableau vide [] signifie que l'effet se déclenche une seule fois, lors du premier rendu du composant

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#ECF0F1] border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
                            ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
                            Nom
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
                        {/*<th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
                        Groupe
                    </th>*/}
                        {/*<th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
                        Type
                    </th>*/}
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#2C3E50] cursor-pointer">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.getId()}
                            className="border-b border-gray-100 hover:bg-[#ECF0F1]"
                        >
                            <td className="py-3 px-4">{user.getId()}</td>
                            <td className="py-3 px-4">{user.getFullName()}</td>
                            <td className="py-3 px-4">{user.getEmail()}</td>
                            <td className="py-3 px-4">
                                {user.getStatutName()}
                            </td>
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
                                    .join(', ') || '-'}
                            </td>
                            {/*<td className="py-3 px-4">{user.group || '-'}</td>*/}
                            {/*<td className="py-3 px-4">{user.type || '-'}</td>*/}
                            <td className="py-3 px-4">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="p-1 text-[#3498DB] hover:text-[#2980B9] transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => onDelete(user)}
                                            className="p-1 text-[#E74C3C] hover:text-[#C0392B] transition-colors"
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
            </table>
        </div>
    )
}
