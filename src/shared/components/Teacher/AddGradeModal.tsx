import { useState } from 'react'
import {
  Button,
  /*Picker,*/ Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { GradeStatus } from '../../../shared/types/types'

interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
}

interface Module {
  id: string
  code: string
  name: string
}

interface AddGradeModalProps {
  isOpen: boolean
  onClose: () => void
  modules: Module[]
  students: Student[]
}

const GRADE_STATUSES: GradeStatus[] = [
  'graded',
  'absent',
  'makeup',
  'ungraded',
  'not_submitted',
  'exempted',
  'pending_makeup',
]

export function AddGradeModal({
  isOpen,
  onClose,
  modules,
  students,
}: AddGradeModalProps) {
  console.log('AddGradeModal rendering, isOpen:', isOpen)

  const [formData, setFormData] = useState({
    moduleId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    maxValue: 20,
    coefficient: 1,
    grades: students.map((student) => ({
      studentId: student.id,
      value: null as number | null,
      status: 'ungraded' as GradeStatus,
    })),
  })

  const handleSubmit = () => {
    console.log('Submitting grades:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvelle évaluation</Text>
            <Button onPress={onClose} title="Fermer" />
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Module</Text>
              {/* <Picker
                selectedValue={formData.moduleId}
                onValueChange={(itemValue) => setFormData({ ...formData, moduleId: itemValue })}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionner un module" value="" />
                {modules.map(module => (
                  <Picker.Item key={module.id} label={`${module.code} - ${module.name}`} value={module.id} />
                ))}
              </Picker> */}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nom de l'évaluation</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) =>
                  setFormData({ ...formData, date: text })
                }
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Note maximale</Text>
              <TextInput
                style={styles.input}
                value={formData.maxValue.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, maxValue: parseInt(text) })
                }
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Coefficient</Text>
              <TextInput
                style={styles.input}
                value={formData.coefficient.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, coefficient: parseFloat(text) })
                }
                keyboardType="numeric"
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button onPress={onClose} title="Annuler" color="#007BFF" />
            <Button
              onPress={handleSubmit}
              title="Enregistrer"
              disabled={!formData.moduleId || !formData.name}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    maxHeight: '70%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
})
