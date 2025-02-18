import { Text, TouchableOpacity, View } from 'react-native'
import { Utilisateur } from '../../../../shared/src/types/types'
import { styles } from '../../../../shared/src/styles/Admin/AdminStyles'
import { FileUp } from 'lucide-react'

interface UserImportProps {
  users: Utilisateur[]
}

export function UserImport({ users }: UserImportProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Traitez le fichier ici
      console.log('Fichier sélectionné:', file)
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Importation des utilisateurs
        </Text>
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          className="btn btn-outline flex items-center gap-2"
        >
          <FileUp className="w-4 h-4" />
          Importer CSV/XLSX
        </button>
        <input
          id="file-input"
          type="file"
          accept=".csv, .xlsx"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <TouchableOpacity
          onPress={() => {}}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            Télécharger le fichier modèle CSV
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            Télécharger le fichier modèle XLSX
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}