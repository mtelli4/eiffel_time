import { useEffect, useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { UserUpdate, Utilisateur } from '../../types/types'
import { styles } from '../../styles/Admin/AdminStyles'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  const handleSubmitUser = async (data: UserUpdate) => {
    if (selectedUser) {
      try {
        const response = await fetch(`http://localhost:4000/api/update-user/${selectedUser.id_utilisateur}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        const updatedUser = await response.json()

        const message = []
        if (updatedUser.id_utilisateur !== selectedUser.id_utilisateur) {
          message.push(`ID : ${selectedUser.id_utilisateur} -> ${updatedUser.id_utilisateur}`)
        }
        if (updatedUser.nom !== selectedUser.nom) {
          message.push(`Nom : ${selectedUser.nom} -> ${updatedUser.nom}`)
        }
        if (updatedUser.prenom !== selectedUser.prenom) {
          message.push(`Prénom : ${selectedUser.prenom} -> ${updatedUser.prenom}`)
        }
        if (updatedUser.email !== selectedUser.email) {
          message.push(`Email : ${selectedUser.email} -> ${updatedUser.email}`)
        }
        if (updatedUser.statut !== selectedUser.statut) {
          message.push(`Rôle : ${selectedUser.statut} -> ${updatedUser.statut}`)
        }
        toast.success('L\'utilisateur a été modifié avec succès : ' + message.join(', '), {
          position: 'bottom-right',
          toastId: 'update-user' + selectedUser.id_utilisateur,
        });
        selectedUser.id_utilisateur = updatedUser.id_utilisateur
        selectedUser.nom = updatedUser.nom
        selectedUser.prenom = updatedUser.prenom
        selectedUser.email = updatedUser.email
        selectedUser.statut = updatedUser.statut
        setUtilisateurs(utilisateurs.map((u) => u.id_utilisateur === selectedUser.id_utilisateur ? selectedUser : u))
      } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur : ", error)
        toast.error('Erreur lors de la modification de l\'utilisateur', {
          position: 'bottom-right',
          toastId: 'update-user' + selectedUser.id_utilisateur,
        });
      }
    } else {
      console.log('Création d\'un utilisateur')
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
      <ToastContainer />
    </View>
    
  )
}
