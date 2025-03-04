import { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { API_URL, Formation, Groupe, UserUpdate, Utilisateur } from '../../types/types'
import { styles } from '../../styles/Admin/AdminStyles'
import { fetchUsers, updateUser } from '../../backend/services/admin'
import { formation, groupe } from '@prisma/client'

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
    type: '',
    search: '',
  })
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [groupes, setGroupes] = useState<Groupe[]>([])
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null)
  const [UserFilters, setUserFilters] = useState<any>(null)
  const [UserForm, setUserForm] = useState<any>(null)
  const [UserTable, setUserTable] = useState<any>(null)
  const [UserImport, setUserImport] = useState<any>(null)

  const handleFilterChange = (filterName: string, value: string) => {
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
        if (!response.ok) throw new Error('Erreur réseau (formations)');
        return response.json();
      }),
      fetch(`${API_URL}/api/all/groupes`).then((response) => {
        if (!response.ok) throw new Error('Erreur réseau (groupes)');
        return response.json();
      })
    ])
      .then(([formationsData, groupesData]) => {
        setFormations(formationsData.map((f: formation) => ({ value: f.id_formation, label: f.libelle })));

        setGroupes(groupesData.map((g: groupe) => ({ value: g.id_grp, label: g.libelle })));
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, [])

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { default: UserFilters } = await import(
          '../../../../web/src/components/Admin/UserFilters.web'
        )
        const { UserForm } = await import(
          '../../../../web/src/components/Admin/UserForm.web'
        )
        const { UserTable } = await import(
          '../../../../web/src/components/Admin/UserTable.web'
        )
        const { UserImport } = await import(
          '../../../../web/src/pages/ImportUser/UserImport.web'
        )
        setUserFilters(() => UserFilters)
        setUserForm(() => UserForm)
        setUserTable(() => UserTable)
        setUserImport(() => UserImport)
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
        const { UserImport } = await import(
          '../../../../mobile/src/components/Admin/UserImport.native'
        )
        setUserFilters(() => UserFilters)
        setUserForm(() => UserForm)
        setUserTable(() => UserTable)
        setUserImport(() => UserImport)
      }
    }

    loadComponents().then((r) => r)
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
    setSelectedUser(null)
  }

  if (!UserFilters || !UserForm || !UserTable) {
    return <Text>Chargement...</Text> // Message ou spinner pendant le chargement
  }

  const content = (
    <View>
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
            <Text style={styles.subtitle}>Gestion des utilisateurs</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedUser(null)
                setShowUserForm(true)
              }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Ajouter un utilisateur</Text>
            </TouchableOpacity>
          </View>

          <UserFilters onFilterChange={handleFilterChange} formations={formations} groupes={groupes} />

          <UserTable
            users={utilisateurs}
            isAdmin={isAdmin}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            filters={filters}
            loading={loading}
          />
        </View>
      )}

      {activeTab === 'import' && <UserImport users={utilisateurs} />}

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
    </View>
  )

  if (Platform.OS === 'web') {
    return <View style={styles.container}>{content}</View>
  } else {
    return <ScrollView style={styles.container}>{content}</ScrollView>
  }
}
