import { Text, TouchableOpacity, View } from "react-native"
import { Utilisateur } from "../../../../shared/src/types/types"
import { styles } from "../../../../shared/src/styles/Admin/AdminStyles"

interface UserImportProps {
  users: Utilisateur[]
}

export function UserImport({ users }: UserImportProps) {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Importation des utilisateurs
        </Text>
        <TouchableOpacity
          onPress={() => {

          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            Importer un fichier CSV/XLSX
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
