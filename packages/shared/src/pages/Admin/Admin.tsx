import { UserPlus, Users } from 'lucide-react'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { UserFilters } from '../../components/admin/UserFilters'
import { UserForm } from '../../components/admin/UserForm'
import { UserTable } from '../../components/admin/UserTable'
import { styles } from '../../styles/Admin/AdminStyles' // Import the styles

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
        users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
      )
    } else {
      setUsers([...users, { ...data, id: `U${Date.now()}` }])
    }
    setShowUserForm(false)
    setSelectedUser(null)
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
            <tab.icon style={styles.tabIcon} />
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
            <Text style={styles.subtitle}>Gestion des utilisateurs</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedUser(null)
                setShowUserForm(true)
              }}
              style={styles.addButton}
            >
              <UserPlus style={styles.addIcon} />
              <Text style={styles.addButtonText}>Ajouter un utilisateur</Text>
            </TouchableOpacity>
          </View>

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
