import { useEffect, useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { Utilisateur } from '../../types/types'
import { styles } from '../../styles/Admin/AdminStyles'

type Tab = 'users' | 'courses' | 'schedule' | 'rooms'

export function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('users')
  const [showUserForm, setShowUserForm] = useState(false)
  const [loading, setLoading] = useState(true)

  // État unique pour les filtres
  const [filters, setFilters] = useState({
    role: '',
    formation: '',
    groupe: '',
    type: '',
    search: ''
  })

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }))
  }

  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null)

  useEffect(() => {
    document.title = 'Eiffel Time | Administration - Gestion des utilisateurs' // TODO: Inverser entre les deux et mettre un titre partout
    fetch('http://localhost:4000/api/users') // URL de votre API
      .then((response) => {
        // Vérifier si la réponse est correcte
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        return response.json() // Convertir la réponse en JSON
      })
      .then((data) => {
        const utilisateurs = data.map((utilisateur: any) => ({
            id_utilisateur: utilisateur.id_utilisateur,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
            statut: utilisateur.statut,
            formations: utilisateur.formation_utilisateur.map((f: any) => f.formation),
            groupes: utilisateur.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
            vacataire: utilisateur.enseignant?.vacataire
        }));
        setUtilisateurs(utilisateurs)
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

    loadComponents().then(r => r)
  }, [])

  const tabs = [{ id: 'users' as const, label: 'Utilisateurs' }]

  const handleEditUser = (user: Utilisateur) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = (user: Utilisateur) => {
    setUtilisateurs(utilisateurs.filter((u) => u.id_utilisateur !== user.id_utilisateur))
  }

  const handleSubmitUser = async (data: any) => {
    if (selectedUser) {
      try {
        const response = await fetch(`https://localhost:4000/api/update-user/${selectedUser.id_utilisateur}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de l'utilisateur");
        }

        const updatedUser: Utilisateur = {
          id_utilisateur: selectedUser.id_utilisateur,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          statut: data.statut,
          formations: data.formations,
          groupes: data.groupes,
          vacataire: data.vacataire
        }
        setUtilisateurs(utilisateurs.map((u) => u.id_utilisateur === updatedUser.id_utilisateur ? updatedUser : u));
      } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur : ", error)
      }
    } else {
      setUtilisateurs([...utilisateurs, { ...data, id: `U${Date.now()}` }])
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
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          <UserTable
            users={utilisateurs}
            isAdmin={true}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            filters={filters}
            loading={loading}
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
