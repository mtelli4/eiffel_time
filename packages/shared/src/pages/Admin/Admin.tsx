import { useEffect, useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { API_URL, UserUpdate, Utilisateur } from '../../types/types'
import { styles } from '../../styles/Admin/AdminStyles'

type Tab = 'users' | 'import' | 'courses' | 'schedule' | 'rooms'

export function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('users' as const)
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
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null)
  const [UserFilters, setUserFilters] = useState<any>(null)
  const [UserForm, setUserForm] = useState<any>(null)
  const [UserTable, setUserTable] = useState<any>(null)

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }))
  }

  useEffect(() => {
    fetch(`${API_URL}/api/admin/users`) // URL de votre API
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau');
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
  }, [])

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

  const tabs = [{ id: 'users' as const, label: 'Utilisateurs' }, { id: 'import' as const, label: 'Importation' }]

  const handleEditUser = (user: Utilisateur) => {
    setSelectedUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = (user: Utilisateur) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      fetch(`${API_URL}/api/admin/delete-user/${user.id_utilisateur}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur réseau')
          }
          setUtilisateurs(utilisateurs.filter((u) => u.id_utilisateur !== user.id_utilisateur))
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error)
        })
    }
  }

  const handleSubmitUser = async (data: UserUpdate) => {
    if (selectedUser) {
      try {
        // alert(`Données valides: ${JSON.stringify(data)}`)
        const response = await fetch(`${API_URL}/api/admin/update-user/${selectedUser.id_utilisateur}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API :", errorData);
          throw new Error('Erreur réseau : ' + errorData.message);
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
        setUtilisateurs(utilisateurs.map((u) => u.id_utilisateur === selectedUser.id_utilisateur ? selectedUser : u))
      } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur : ", error)
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/api/admin/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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
          formations: newUser.formations.map((f: any) => { return { id_formation: f.value, libelle: f.label } }),
          groupes: newUser.etudiant?.groupe_etudiant.map((g: any) => g.groupe) || [],
          vacataire: newUser.enseignant?.vacataire
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

      {activeTab === 'import' && (
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Importation des utilisateurs
            </Text>
          </View>
          <View /* style={styles.importContainer} */>
            <Text /* style={styles.importText} */>
              Pour importer des utilisateurs, veuillez utiliser le fichier XLSX suivant :
            </Text>
            <TouchableOpacity
              onPress={() => {
                /* Implement file upload */
              }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>
                Importer un fichier
              </Text>
            </TouchableOpacity>
          </View>
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
