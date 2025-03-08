import {Modal, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {styles} from '../../styles/Schedule/CourseModal.native';
import {CourseModalProps} from '../../../../shared/src/types/types';

export default function NativeCourseModal({
  course,
  onClose,
  onPresenceCheck,
}: CourseModalProps) {
  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome6 name="x" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{course.summary}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Enseignant</Text>
              <Text style={styles.infoValue}>{course.teacher}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Salle</Text>
              <Text style={styles.infoValue}>{course.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Horaires</Text>
              <Text style={styles.infoValue}>
                {course.start} - {course.end}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Groupe(s)</Text>
              <Text style={styles.infoValue}>{course.group}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPresenceCheck} style={styles.qrButton}>
              <FontAwesome6 name="qrcode" size={20} color="white" />
              <Text style={styles.qrButtonText}>Afficher QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatButton}>
              <Feather name="message-square" size={20} color="#2E3494" />
              <Text style={styles.chatButtonText}>Chat du cours</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
