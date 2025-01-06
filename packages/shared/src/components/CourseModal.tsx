import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
// import { X, MessageSquare, QrCode } from 'lucide-react-native';
import { Course } from '../types/types'

interface CourseModalProps {
  course: Course
  onClose: () => void
  onPresenceCheck: () => void
}

export function CourseModal({
  course,
  onClose,
  onPresenceCheck,
}: CourseModalProps) {
  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            {/* <X style={styles.closeIcon} /> */}
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{course.subject}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Professeur</Text>
              <Text style={styles.infoValue}>{course.professor}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Salle</Text>
              <Text style={styles.infoValue}>{course.room}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Horaires</Text>
              <Text style={styles.infoValue}>
                {course.startTime} - {course.endTime}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{course.type}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={onPresenceCheck}
              title="Scanner QR Code"
              color="#3B82F6"
            />
            <Button title="Chat du cours" color="#3B82F6" />
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
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})
