import { useState } from 'react'
import { Modal, View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native'
import { AddGradeModalProps, FormData } from '../../shared/types/types'

export function MobileAddGradeModal({isOpen, onClose, modules, students}: AddGradeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    moduleId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    maxValue: 20,
    coefficient: 1,
    grades: students.map((student) => ({
      studentId: student.id,
      value: null,
      status: 'ungraded',
    })),
  })

  const handleSubmit = () => {
    console.log('Submitting grades:', formData)
    onClose()
  }

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvelle évaluation</Text>
            <Button onPress={onClose} title="×" />
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Module</Text>
              {/* Add Picker component here */}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nom de l'évaluation</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => setFormData({...formData, date: text})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Note maximale</Text>
              <TextInput
                style={styles.input}
                value={formData.maxValue.toString()}
                onChangeText={(text) => setFormData({...formData, maxValue: parseInt(text)})}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Coefficient</Text>
              <TextInput
                style={styles.input}
                value={formData.coefficient.toString()}
                onChangeText={(text) => setFormData({...formData, coefficient: parseFloat(text)})}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button onPress={onClose} title="Annuler" />
            <Button onPress={handleSubmit} title="Enregistrer" />
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
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})