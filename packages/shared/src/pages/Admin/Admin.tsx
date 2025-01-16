import { useEffect, useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { Utilisateur } from '../../backend/classes'
import { styles } from '../../styles/Admin/AdminStyles'

type Tab = 'users' | 'courses' | 'schedule' | 'rooms'

export function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>('users')
    const [showUserForm, setShowUserForm] = useState(false)

    const [role, setRole] = useState('') // État local pour le filtre par rôle
    const [groupe, setGroupe] = useState('') // État local pour le filtre par groupe
    const [formation, setFormation] = useState('') // État local pour le filtre par formation
    const [searchTerm, setSearchTerm] = useState('') // État local pour la recherche

    const handleRole = (role: string) => {
        setRole(role)
    }

    const handleGroup = (group: string) => {
        setGroupe(group)
    }

    const handleFormation = (formation: string) => {
        setFormation(formation)
    }

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }

    const [users, setUsers] = useState<Utilisateur[]>([])
    const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null)

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
                const utilisateurs = data.utilisateurs.map(
                    (u: any) => new Utilisateur(u)
                )
                setUsers(utilisateurs)
            })
            .catch((error) => {
                console.error(
                    'Erreur lors de la récupération des utilisateurs:',
                    error
                )
            })
    }, []) // Le tableau vide [] signifie que l'effet se déclenche une seule fois, lors du premier rendu du composant

    const [UserFilters, setUserFilters] = useState<any>(null)
    const [UserForm, setUserForm] = useState<any>(null)
    const [UserTable, setUserTable] = useState<any>(null)

    useEffect(() => {
        const loadComponents = async () => {
            if (Platform.OS === 'web') {
                const { UserFilters } = await import(
                    '../../../../web/src/components/Admin/UserFilters.web'
                )
                const { UserForm } = await import(
                    '../../../../web/src/components/Admin/UserForm.web'
                )
                const { UserTable } = await import(
                    '../../../../web/src/components/Admin/UserTable.web'
                )
                setUserFilters(() => UserFilters)
                setUserForm(() => UserForm)
                setUserTable(() => UserTable)
            } else {
                const { UserFilters } = await import(
                    '../../../../mobile/src/components/Admin/UserFilters.native'
                )
                const { UserForm } = await import(
                    '../../../../mobile/src/components/Admin/UserForm.native'
                )
                const { UserTable } = await import(
                    '../../../../mobile/src/components/Admin/UserTable.native'
                )
                setUserFilters(() => UserFilters)
                setUserForm(() => UserForm)
                setUserTable(() => UserTable)
            }
        }

        loadComponents()
    }, [])

    const tabs = [{ id: 'users' as const, label: 'Utilisateurs' }]

    const handleEditUser = (user: Utilisateur) => {
        setSelectedUser(user)
        setShowUserForm(true)
    }

    const handleDeleteUser = (user: Utilisateur) => {
        setUsers(users.filter((u) => u.getId() !== user.getId()))
    }

    const handleSubmitUser = (data: any) => {
        if (selectedUser) {
            setUsers(
                users.map((u) =>
                    u.getId() === selectedUser.getId() ? { ...u, ...data } : u
                )
            )
        } else {
            setUsers([...users, { ...data, id: `U${Date.now()}` }])
        }
        setShowUserForm(false)
        setSelectedUser(null)
    }

    if (!UserFilters || !UserForm || !UserTable) {
        return <Text>Chargement...</Text> // Message ou spinner pendant le chargement
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        style={[
                            styles.tabButton,
                            activeTab === tab.id
                                ? styles.activeTabButton
                                : styles.inactiveTabButton,
                        ]}
                    >
                        <Text
                            style={
                                activeTab === tab.id
                                    ? styles.activeTabText
                                    : styles.inactiveTabText
                            }
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {activeTab === 'users' && (
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.subtitle}>
                            Gestion des utilisateurs
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedUser(null)
                                setShowUserForm(true)
                            }}
                            style={styles.addButton}
                        >
                            <Text style={styles.addButtonText}>
                                Ajouter un utilisateur
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <UserFilters
                        onRoleChange={handleRole}
                        onGroupChange={handleGroup}
                        onFormationChange={handleFormation}
                        onTypeChange={() => {}}
                        onSearch={handleSearch}
                    />

                    <UserTable
                        users={users}
                        isAdmin={true}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                        roleSelected={role}
                        groupSelected={groupe}
                        formationSelected={formation}
                        searchTerm={searchTerm}
                    />
                </View>
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
        </View>
    )
}
