import { useEffect, useState } from 'react'
import { fetchUsers } from '../../../../shared/src/backend/services/admin'
import {
  API_URL,
  Formation,
  Groupe,
  UserUpdate,
  Utilisateur,
} from '../../../../shared/src/types/types'
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
    type: false,
    search: '',
  })
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [formations, setFormations] = useState<
    { value: string; label: string }[]
  >([])
  const [groupes, setGroupes] = useState<{ value: string; label: string }[]>([])
  const [selectedUser, setSelectedUser] = useState<Utilisateur | undefined>(
    undefined
  )

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
      try {
        const response = await fetch(
          `${API_URL}/api/admin/update-user/${selectedUser.id_utilisateur}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )
        if (!response.ok) {
          const errorData = await response.json()
          console.error('Erreur API :', errorData)
          throw new Error('Erreur réseau : ' + errorData.message)
        }
        const updatedUser = await response.json()
        selectedUser.id_utilisateur = updatedUser.id_utilisateur
        selectedUser.nom = updatedUser.nom
        selectedUser.prenom = updatedUser.prenom
        selectedUser.email = updatedUser.email
        selectedUser.statut = updatedUser.statut
        selectedUser.formations = updatedUser.formations.map((f: any) => {
          return { id_formation: parseInt(f.value), libelle: f.label }
        })
        setUtilisateurs(
          utilisateurs.map((u) =>
            u.id_utilisateur === selectedUser.id_utilisateur ? selectedUser : u
          )
        )
      } catch (error) {
        console.error(
          "Erreur lors de la modification de l'utilisateur : ",
          error
        )
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/api/admin/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Erreur réseau')
        }

        const newUser = await response.json()
        const utilisateur: Utilisateur = {
          id_utilisateur: newUser.id_utilisateur,
          nom: newUser.nom,
          prenom: newUser.prenom,
          email: newUser.email,
          statut: newUser.statut,
          formations: newUser.formations.map((f: any) => {
            return { id_formation: f.value, libelle: f.label }
          }),
          groupes:
            newUser.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
          vacataire: newUser.enseignant?.vacataire,
        }
        setUtilisateurs((prev) => [...prev, utilisateur])
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur : ", error)
      }
    }
    setShowUserForm(false)
    setSelectedUser(undefined)
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
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.id
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
                setSelectedUser(undefined)
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
            setSelectedUser(undefined)
          }}
          onSubmit={handleSubmitUser}
          initialData={selectedUser}
          isEdit={!!selectedUser}
        />
      )}
    </div>
  )
}
