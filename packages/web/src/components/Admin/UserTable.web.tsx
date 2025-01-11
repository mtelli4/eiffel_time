import { Edit2, Trash2 } from 'lucide-react';
import { Utilisateur } from '../../../../../backend/classes';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

interface UserTableProps {
    users: Utilisateur[]
    isAdmin: boolean
    onEdit: (user: Utilisateur) => void
    onDelete: (user: Utilisateur) => void
}

DataTable.use(DT);

export function UserTable({ users, isAdmin, onEdit, onDelete, }: UserTableProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <DataTable className="w-full" options={{ paging: false, searching: false, info: false, language: { info: 'Affichage de _START_ à _END_ sur _TOTAL_ utilisateurs' } }}>
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
                        <td className="py-3 px-4">{user.getStatutName()}</td>
                        <td className="py-3 px-4">{user.getFormations().map(f => f.getLibelle()).join(', ') || '-'}</td>
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
            </DataTable>
        </div>
    )
}
