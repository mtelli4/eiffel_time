import React, { useState } from 'react'
import { Users, BookOpen, Calendar, Building2, UserPlus } from 'lucide-react'
import { UserFilters } from '../components/admin/UserFilters'
import { UserTable } from '../components/admin/UserTable'
import { UserForm } from '../components/admin/UserForm'

type Tab = 'users' | 'courses' | 'schedule' | 'rooms'

interface User {
    id: string
    name: string
    email: string
    role: string
    formation?: string
    group?: string
    type?: string
}

const MOCK_USERS: User[] = [
    {
        id: '22001234',
        name: 'DUPONT Jean',
        email: 'jean.dupont@example.com',
        role: 'student',
        formation: 'Informatique',
        group: 'A1',
    },
    {
        id: 'P001',
        name: 'MARTIN Pierre',
        email: 'pierre.martin@example.com',
        role: 'teacher',
        type: 'permanent',
    },
]

export function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>('users')
    const [showUserForm, setShowUserForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>(MOCK_USERS)

    const tabs = [{ id: 'users' as const, label: 'Utilisateurs', icon: Users }]

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setShowUserForm(true)
    }

    const handleDeleteUser = (user: User) => {
        setUsers(users.filter((u) => u.id !== user.id))
    }

    const handleSubmitUser = (data: any) => {
        if (selectedUser) {
            setUsers(
                users.map((u) =>
                    u.id === selectedUser.id ? { ...u, ...data } : u
                )
            )
        } else {
            setUsers([...users, { ...data, id: `U${Date.now()}` }])
        }
        setShowUserForm(false)
        setSelectedUser(null)
    }

    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold text-[#2C3E50] mb-6">
                Administration
            </h1>

            <div className="flex space-x-4 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            activeTab === tab.id
                                ? 'bg-[#2C3E50] text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'users' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-[#2C3E50]">
                            Gestion des utilisateurs
                        </h2>
                        <button
                            onClick={() => {
                                setSelectedUser(null)
                                setShowUserForm(true)
                            }}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            Ajouter un utilisateur
                        </button>
                    </div>

                    <UserFilters
                        onRoleChange={() => {}}
                        onGroupChange={() => {}}
                        onFormationChange={() => {}}
                        onTypeChange={() => {}}
                        onSearch={() => {}}
                    />

                    <UserTable
                        users={users}
                        isAdmin={true}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                    />
                </div>
            )}

            {showUserForm && (
                <UserForm
                    isOpen={showUserForm}
                    onClose={() => {
                        setShowUserForm(false)
                        setSelectedUser(null)
                    }}
                    onSubmit={handleSubmitUser}
                    initialData={selectedUser}
                    isEdit={!!selectedUser}
                />
            )}
        </div>
    )
}
