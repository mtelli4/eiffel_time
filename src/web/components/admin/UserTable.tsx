import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'

interface User {
    id: string
    name: string
    email: string
    role: string
    formation?: string
    group?: string
    type?: string
}

interface UserTableProps {
    users: User[]
    isAdmin: boolean
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}

export function UserTable({
    users,
    isAdmin,
    onEdit,
    onDelete,
}: UserTableProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#ECF0F1] border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Nom
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Email
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Rôle
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Formation
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Groupe
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Type
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-[#2C3E50]">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b border-gray-100 hover:bg-[#ECF0F1]"
                        >
                            <td className="py-3 px-4">{user.id}</td>
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.role}</td>
                            <td className="py-3 px-4">
                                {user.formation || '-'}
                            </td>
                            <td className="py-3 px-4">{user.group || '-'}</td>
                            <td className="py-3 px-4">{user.type || '-'}</td>
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
            </table>
        </div>
    )
}
