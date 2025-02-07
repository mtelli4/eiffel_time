// import { FileDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AddAttendanceModal } from '../../components/absences/AddAttendanceModal'
import { AttendanceTable } from '../../components/absences/AttendanceTable'
import { Button } from '../../components/absences/Button'
import { Card } from '../../components/absences/Card'
import { HoursPlanning } from '../../components/absences/HoursPlanning'
import { TeacherFilters } from '../../components/absences/TeacherFilters'
import { TeacherPlanning } from '../../types/types'

const TEACHERS_PLANNING: TeacherPlanning[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'MARTIN',
    modules: [
      {
        code: 'M5101',
        name: 'Développement Web',
        planned: { CM: 10, TD: 20, TP: 20 },
        completed: { CM: 8, TD: 16, TP: 12 },
      },
      {
        code: 'M5102',
        name: 'Base de données',
        planned: { CM: 15, TD: 15, TP: 15 },
        completed: { CM: 10, TD: 10, TP: 10 },
      },
    ],
  },
]

export function TeacherAttendance() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
  const [showAttendanceForm, setShowAttendanceForm] = useState(false)

  const filteredTeachers = TEACHERS_PLANNING.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    console.log('Exporting data...')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => setShowAttendanceForm(true)}
              variant="primary"
            >
              <View style={styles.buttonContent}>
                {/* <Plus size={16} color="#FFFFFF" /> */}
                <Text style={styles.buttonText}>Ajouter une présence</Text>
              </View>
            </Button>
            <View style={styles.buttonSpacing} />
            <Button onPress={handleExport} variant="outline">
              <View style={styles.buttonContent}>
                {/* <FileDown size={16} color="#2C3E50" /> */}
                <Text style={styles.exportButtonText}>Exporter</Text>
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

        {filteredTeachers.map((teacher) => (
          <View key={teacher.id} style={styles.teacherContainer}>
            <View style={styles.teacherHeader}>
              <Text style={styles.teacherName}>
                {teacher.lastName} {teacher.firstName}
              </Text>
            </View>

            <Card style={styles.planningCard}>
              <HoursPlanning modules={teacher.modules} />
            </Card>

            <Card style={styles.tableCard}>
              <AttendanceTable teacher={teacher} />
            </Card>
          </View>
        ))}

        {showAttendanceForm && (
          <AddAttendanceModal
            isOpen={showAttendanceForm}
            onClose={() => setShowAttendanceForm(false)}
            teachers={TEACHERS_PLANNING}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
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
    color: '#111827',
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
    color: '#FFFFFF',
  },
  exportButtonText: {
    color: '#2C3E50',
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
    color: '#111827',
  },
  planningCard: {
    marginBottom: 24,
  },
  tableCard: {
    marginBottom: 24,
  },
})
