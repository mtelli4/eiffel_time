// import { Search } from 'lucide-react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from './Input'

const YEARS = [1, 2, 3]
const SEMESTERS = [1, 2, 3, 4, 5, 6]

interface TeacherFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedYear: number | null
  onYearChange: (year: number | null) => void
  selectedSemester: number | null
  onSemesterChange: (semester: number | null) => void
}

// Étendre l'interface InputProps pour inclure les props manquantes
interface ExtendedInputProps {
  defaultValue?: string
  onChangeText: (value: string) => void
  placeholder: string
}

export function TeacherFilters({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  selectedSemester,
  onSemesterChange,
}: TeacherFiltersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.filterColumn}>
        <Text style={styles.label}>Rechercher un enseignant</Text>
        <View style={styles.inputContainer}>
          <Input
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Nom ou prénom..."
          />
          <View style={styles.searchIconContainer}>
            {/* <Search size={20} color="#9CA3AF" /> */}
          </View>
        </View>
      </View>

      {/* <View style={styles.filterColumn}>
        <Text style={styles.label}>Année</Text>
        <View style={styles.inputContainer}>
          <Input
            value={selectedYear?.toString() || ''}
            onChangeText={(value) => onYearChange(value ? Number(value) : null)}
            placeholder="Toutes les années"
          />
        </View>
      </View> */}

      <View style={styles.filterColumn}>
        <Text style={styles.label}>Semestre</Text>
        <View style={styles.inputContainer}>
          <Input
            value={selectedSemester?.toString() || ''}
            onChangeText={(value) =>
              onSemesterChange(value ? Number(value) : null)
            }
            placeholder="Tous les semestres"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  filterColumn: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    // Utilisation de marginTop au lieu de transform pour le centrage vertical
    marginTop: -10,
  },
})
