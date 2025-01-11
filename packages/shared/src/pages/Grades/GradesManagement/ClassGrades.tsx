import { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import { GradeStatus } from '../../../types/types'

interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
}

interface Grade {
  id: string
  studentId: string
  value: number | null
  maxValue: number
  coefficient: number
  status: GradeStatus
  date: string
}

interface Evaluation {
  id: string
  name: string
  date: string
  maxValue: number
  coefficient: number
  grades: Grade[]
}

interface Module {
  id: string
  code: string
  name: string
  evaluations: Evaluation[]
}

const MOCK_MODULES: Module[] = [
  {
    id: 'mod1',
    code: 'M5101',
    name: 'Développement Web',
    evaluations: [
      {
        id: 'eval1',
        name: 'TP1 - React',
        date: '2024-03-15',
        maxValue: 20,
        coefficient: 1,
        grades: [
          {
            id: 'grade1',
            studentId: '22001234',
            value: 15,
            maxValue: 20,
            coefficient: 1,
            status: 'graded',
            date: '2024-03-15',
          },
        ],
      },
    ],
  },
]

const MOCK_STUDENTS: Student[] = [
  {
    id: '22001234',
    firstName: 'Jean',
    lastName: 'DUPONT',
    group: 'A1',
  },
]

export function ClassGrades() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddGrade = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setShowAddGrade(true)
  }

  const filteredModules = MOCK_MODULES.filter(
    (module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddGrade} style={styles.addButton}>
          {/* Replace with appropriate icon */}
          <Text style={styles.lblAddbtn}>Nouvelle évaluation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un module..."
          style={styles.searchInput}
        />
        {/* Replace with appropriate icon */}
      </View>

      <ScrollView>
        {filteredModules.map((module) => (
          <View key={module.id} style={styles.moduleCard}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleTitle}>
                {module.code} - {module.name}
              </Text>
            </View>

            {module.evaluations.map((evaluation) => (
              <View key={evaluation.id} style={styles.evaluationCard}>
                <View style={styles.evaluationHeader}>
                  <Text style={styles.evaluationTitle}>{evaluation.name}</Text>
                  <Text style={styles.evaluationSubtitle}>
                    Date :{' '}
                    {new Date(evaluation.date).toLocaleDateString('fr-FR')} •
                    Coefficient : {evaluation.coefficient}
                  </Text>
                </View>

                <View style={styles.table}>
                  {/* Implement table or list using React Native components */}
                  {evaluation.grades.map((grade) => {
                    const student = MOCK_STUDENTS.find(
                      (s) => s.id === grade.studentId
                    )
                    return (
                      <View key={grade.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{student?.id}</Text>
                        <Text style={styles.tableCell}>
                          {student?.lastName} {student?.firstName}
                        </Text>
                        <Text style={styles.tableCell}>
                          {grade.value !== null
                            ? `${grade.value}/${grade.maxValue}`
                            : '-'}
                        </Text>
                        <Text style={styles.tableCell}>
                          <Text style={styles.gradeStatus}>{grade.status}</Text>
                        </Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {showAddGrade && (
        <AddGradeModal
          isOpen={showAddGrade}
          onClose={() => {
            setShowAddGrade(false)
          }}
          modules={MOCK_MODULES}
          students={MOCK_STUDENTS}
        />
      )}
    </View>
  )
}
