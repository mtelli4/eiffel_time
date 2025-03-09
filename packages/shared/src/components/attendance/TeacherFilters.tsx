import {
  ColorSchemeName,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
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

export function TeacherFilters({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  selectedSemester,
  onSemesterChange,
}: TeacherFiltersProps) {
  const theme = useColorScheme()
  const styles = getStyles(theme)

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
        </View>
      </View>

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

const getStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
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
      color: theme === 'dark' ? '#E5E7EB' : '#374151',
      marginBottom: 4,
    },
    inputContainer: {
      position: 'relative',
    },
  })
