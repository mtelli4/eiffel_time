import { useEffect, useState } from 'react'
import { createUser, fetchUsers, updateUser } from '../../../../shared/src/backend/services/admin'
import { API_URL, Formation, Groupe, UserUpdate, Utilisateur } from '../../../../shared/src/types/types'
import UserFilters from '../../components/Admin/UserFilters.web'
import { UserForm } from '../../components/Admin/UserForm.web'
import { UserTable } from '../../components/Admin/UserTable.web'
import { UserImport } from '../ImportUser/UserImport.web'

type Tab = 'users' | 'import'

export function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('users')
  const [showUserForm, setShowUserForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const user = localStorage.getItem('user')
  const isAdmin = user ? JSON.parse(user).statut === 'administrator' : false

  // État unique pour les filtres
  const [filters, setFilters] = useState({
    role: '',
    formation: '',
    groupe: '',
    search: '',
  })
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [groupes, setGroupes] = useState<Groupe[]>([])
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null)

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const utilisateurs = await fetchUsers()
        setUtilisateurs(utilisateurs)
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error)
      } finally {
        setLoading(false)
      }
    }

    getUsers()

    Promise.all([
      fetch(`${API_URL}/api/all/formations`).then((response) => {
        if (!response.ok) throw new Error('Erreur réseau (formations)')
        return response.json()
      }),
      fetch(`${API_URL}/api/all/groupes`).then((response) => {
        if (!response.ok) throw new Error('Erreur réseau (groupes)')
        return response.json()
      }),
    ])
      .then(([formationsData, groupesData]) => {
        setFormations(
          formationsData.map((f: Formation) => ({
            value: f.id_formation.toString(),
            label: f.libelle,
          }))
        )

        setGroupes(
          groupesData.map((g: Groupe) => ({
            value: g.id_grp.toString(),
            label: g.libelle,
          }))
        )
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error)
      })
  }, [])

  const tabs = [
    { id: 'users' as const, label: 'Utilisateurs' },
    { id: 'import' as const, label: 'Importation' },
  ]

  const handleEditUser = (user: Utilisateur) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = (user: Utilisateur) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      fetch(`${API_URL}/api/admin/delete-user/${user.id_utilisateur}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur réseau')
          }
          setUtilisateurs(
            utilisateurs.filter((u) => u.id_utilisateur !== user.id_utilisateur)
          )
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de l'utilisateur:",
            error
          )
        })
    }
  }

  const handleSubmitUser = async (data: UserUpdate) => {
    if (selectedUser) {
      const updatedUser = await updateUser(data)
      setUtilisateurs((prev) => prev.map((u) => (u.id_utilisateur === data.id_utilisateur ? updatedUser : u)))
    } else {
      const createdUser = await createUser(data)
      setUtilisateurs((prev) => [...prev, createdUser])
    }
    setShowUserForm(false)
    setSelectedUser(null)
  }

  if (!UserFilters || !UserForm || !UserTable) {
    return <div>Chargement...</div> // Message ou spinner pendant le chargement
  }

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">
              Gestion des utilisateurs
            </h2>
            <button
              onClick={() => {
                setSelectedUser(null)
                setShowUserForm(true)
              }}
              className="flex items-center bg-primary dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Ajouter un utilisateur
            </button>
          </div>

          <UserFilters
            onFilterChange={handleFilterChange}
            formations={formations}
            groupes={groupes}
          />

          <UserTable
            users={utilisateurs}
            isAdmin={isAdmin}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            filters={filters}
            loading={loading}
          />
        </div>
      )}

      {activeTab === 'import' && <UserImport />}

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
          formations={formations}
          groupes={groupes}
        />
      )}
    </div>
  )
}
