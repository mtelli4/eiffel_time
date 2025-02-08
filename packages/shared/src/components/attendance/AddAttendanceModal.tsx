// import { X } from 'lucide-react'
import { useState } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TeacherPlanning } from '../../types/types'
import { Button } from './Button'
import { Input } from './Input'

interface AddAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  teachers: TeacherPlanning[]
}

interface InputProps {
  value: string
  onChangeText: (value: string) => void
  placeholder: string
}

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  onPress: () => void
  disabled?: boolean
  children: React.ReactNode
}

const COURSE_TYPES = ['CM', 'TD', 'TP'] as const

export function AddAttendanceModal({
  isOpen,
  onClose,
  teachers,
}: AddAttendanceModalProps) {
  const [formData, setFormData] = useState({
    teacherId: '',
    date: new Date().toISOString().split('T')[0],
    courseName: '',
    type: 'CM' as (typeof COURSE_TYPES)[number],
    hours: 2,
    semester: 1,
    year: 1,
  })

  const handleSubmit = () => {
    console.log('Submitting attendance:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvelle présence</Text>
            <TouchableOpacity onPress={onClose}>
              {/* <X size={20} color="#6B7280" /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <Text style={styles.label}>Professeur</Text>
              <Input
                value={formData.teacherId}
                onChangeText={(value) =>
                  setFormData({ ...formData, teacherId: value })
                }
                placeholder="Sélectionner un professeur"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.columnField}>
                <Text style={styles.label}>Date</Text>
                <Input
                  value={formData.date}
                  onChangeText={(value) =>
                    setFormData({ ...formData, date: value })
                  }
                  placeholder="Date"
                />
              </View>

              <View style={styles.columnField}>
                <Text style={styles.label}>Type de cours</Text>
                <Input
                  value={formData.type}
                  onChangeText={(value) =>
                    setFormData({
                      ...formData,
                      type: value as (typeof COURSE_TYPES)[number],
                    })
                  }
                  placeholder="Type de cours"
                />
              </View>

              <View style={styles.columnField}>
                <Text style={styles.label}>Nombre d'heures</Text>
                <Input
                  value={formData.hours.toString()}
                  onChangeText={(value) =>
                    setFormData({ ...formData, hours: parseFloat(value) || 0 })
                  }
                  placeholder="Heures"
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Button variant="outline" onPress={onClose}>
              Annuler
            </Button>
            <View style={styles.buttonSpacing} />
            <Button
              variant="primary"
              onPress={handleSubmit}
              disabled={!formData.teacherId}
            >
              Ajouter
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    maxWidth: 672, // 2xl in tailwind
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  formContainer: {
    gap: 16,
  },
  formField: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  columnField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  buttonSpacing: {
    width: 12,
  },
})
