import { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native'
import {
  API_URL,
  TeacherPlanning,
  TeacherPlanningForm,
} from '../../../../shared/src/types/types'
import { AttendanceTable } from '../../components/attendance/AttendanceTable'
import { Button } from '../../components/attendance/Button'
import { Card } from '../../components/attendance/Card'
import { HoursPlanning } from '../../components/attendance/HoursPlanning'
import { TeacherFilters } from '../../components/attendance/TeacherFilters'
import { FileDownButton } from '../../components/Button/FileDownButton'
import { PlusButton } from '../../components/Button/PlusButton'

// Définition des couleurs pour les deux thèmes
const colors = {
  light: {
    background: '#F9FAFB',
    text: '#111827',
    secondaryText: '#2C3E50',
    cardBackground: '#FFFFFF',
    buttonText: '#FFFFFF',
    buttonBackground: '#2C3E50',
    border: '#E5E7EB',
  },
  dark: {
    background: '#1F2937',
    text: '#d1d5db',
    secondaryText: '#d1d5db',
    cardBackground: '#111827',
    buttonText: '#F9FAFB',
    buttonBackground: '#4b5563',
    border: '#4B5563',
  },
}

export function TeacherAttendance() {
  const colorScheme = useColorScheme() || 'light'
  const theme = colorScheme === 'dark' ? colors.dark : colors.light

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
  const [showAttendanceForm, setShowAttendanceForm] = useState(false)

  const [AddAttendance, setAddAttendance] = useState<any>(null)

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { AddAttendance } = await import(
          '../../../../web/src/components/Attendance/AddAttendance.web'
        )
        setAddAttendance(() => AddAttendance)
      } else {
        const { AddAttendance } = await import(
          '../../../../mobile/src/components/Attendance/AddAttendance.native'
        )
        setAddAttendance(() => AddAttendance)
      }
    }

    loadComponents().then((r) => r)
  }, [])

  const [teachers, setTeachers] = useState<TeacherPlanning[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/teacher-attendance/`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau')
        return response.json() // Convertir la réponse en JSON
      })
      .then((data) => {
        const teacherAttendances = data.teacherAttendances
        const periodePerModuleFormatted = data.periodePerModuleFormatted
        const teachers = teacherAttendances.map((teacher: any) => {
          return {
            id_utilisateur: teacher.utilisateur.id_utilisateur,
            prenom: teacher.utilisateur.prenom,
            nom: teacher.utilisateur.nom,
            modules: teacher.enseignant_module.map((em: any) => {
              const module = em.module
              const heures = module.heures.split(',')
              const hours = em.heures.split(',')
              return {
                id_module: module.id_module,
                libelle: module.libelle,
                codeapogee: module.codeapogee,
                prevu: {
                  CM: parseInt(heures[0]),
                  TD: parseInt(heures[1]),
                  TP: parseInt(heures[2]),
                },
                effectue: {
                  CM: parseInt(hours[0]),
                  TD: parseInt(hours[1]),
                  TP: parseInt(hours[2]),
                },
                periodes: periodePerModuleFormatted[module.id_module],
              }
            }),
          }
        })
        setTeachers(teachers)
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération des données :', error)
      )
  }, [])

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.prenom} ${teacher.nom}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    console.log('Exporting data...')
  }

  const handleSubmit = async (data: TeacherPlanningForm) => {
    try {
      const response = await fetch(`${API_URL}/api/teacher-attendance/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Erreur réseau')
      }
      const newTeacher = await response.json()
      console.log('New teacher:', newTeacher.heures)
      setTeachers((prevTeachers) => {
        return prevTeachers.map((t) => {
          if (t.id_utilisateur === newTeacher.id_utilisateur) {
            return {
              ...t,
              modules: t.modules.map((module) => {
                if (module.id_module === newTeacher.id_module) {
                  return {
                    ...module,
                    effectue: {
                      CM: newTeacher.heures.CM,
                      TD: newTeacher.heures.TD,
                      TP: newTeacher.heures.TP,
                    },
                  }
                }
                return module
              }),
            }
          }
          return t
        })
      })
    } catch (error) {
      console.error('Erreur: ', error)
    }
  }

  const TeacherAttendanceContent = () => (
    <View style={[styles.content, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => setShowAttendanceForm(true)} variant="primary">
            <View style={styles.buttonContent}>
              <PlusButton />
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                Ajouter une présence
              </Text>
            </View>
          </Button>
          <View style={styles.buttonSpacing} />
          <Button onPress={handleExport} variant="outline">
            <View style={styles.buttonContent}>
              <FileDownButton color={'#2C3E50'} size={4} />
              <Text
                style={[
                  styles.exportButtonText,
                  { color: theme.buttonBackground },
                ]}
              >
                Exporter
              </Text>
            </View>
          </Button>
        </View>
      </View>

      <TeacherFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
      />

      {filteredTeachers.map(
        (teacher) =>
          teacher.modules.length > 0 && (
            <View key={teacher.id_utilisateur} style={styles.teacherContainer}>
              <View style={styles.teacherHeader}>
                <Text style={[styles.teacherName, { color: theme.text }]}>
                  {teacher.nom} {teacher.prenom}
                </Text>
              </View>

              <Card
                style={[
                  styles.planningCard,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <HoursPlanning modules={teacher.modules} theme={colorScheme} />
              </Card>

              <Card
                style={[
                  styles.tableCard,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <AttendanceTable teacher={teacher} theme={colorScheme} />
              </Card>
            </View>
          )
      )}
    </View>
  )

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {showAttendanceForm && AddAttendance && (
          <AddAttendance
            isOpen={showAttendanceForm}
            onClose={() => setShowAttendanceForm(false)}
            onSubmit={handleSubmit}
            teachers={teachers}
            theme={colorScheme}
          />
        )}
        <TeacherAttendanceContent />
      </View>
    )
  } else {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {showAttendanceForm && AddAttendance && (
          <AddAttendance
            isOpen={showAttendanceForm}
            onClose={() => setShowAttendanceForm(false)}
            teachers={teachers}
            theme={colorScheme}
          />
        )}
        <TeacherAttendanceContent />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // La couleur de fond est appliquée dynamiquement
  },
  content: {
    padding: 24,
    // La couleur de fond est appliquée dynamiquement
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // La couleur du texte est appliquée dynamiquement
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    // La couleur du texte est appliquée dynamiquement
  },
  exportButtonText: {
    // La couleur du texte est appliquée dynamiquement
  },
  buttonSpacing: {
    width: 12,
  },
  teacherContainer: {
    marginBottom: 32,
  },
  teacherHeader: {
    marginBottom: 24,
  },
  teacherName: {
    fontSize: 20,
    fontWeight: '600',
    // La couleur du texte est appliquée dynamiquement
  },
  planningCard: {
    marginBottom: 24,
    // La couleur de fond est appliquée dynamiquement
  },
  tableCard: {
    marginBottom: 24,
    width: '100%',
    // La couleur de fond est appliquée dynamiquement
  },
})
