import {useState} from 'react';
import {Button, Modal, ScrollView, Text, TextInput, View} from 'react-native';
import {AddGradeModalProps, FormData} from '../../../shared/src/types/types';
import {styles} from '../styles/AddGradeModal';

export function MobileAddGradeModal({
  isOpen,
  onClose,
  modules,
  students,
}: AddGradeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    moduleId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    maxValue: 20,
    coefficient: 1,
    grades: students.map(student => ({
      studentId: student.id,
      value: null,
      status: 'ungraded',
    })),
  });

  const handleSubmit = () => {
    console.log('Submitting grades:', formData);
    onClose();
  };

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
                onChangeText={text => setFormData({...formData, name: text})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={text => setFormData({...formData, date: text})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Note maximale</Text>
              <TextInput
                style={styles.input}
                value={formData.maxValue.toString()}
                onChangeText={text =>
                  setFormData({...formData, maxValue: parseInt(text)})
                }
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Coefficient</Text>
              <TextInput
                style={styles.input}
                value={formData.coefficient.toString()}
                onChangeText={text =>
                  setFormData({...formData, coefficient: parseFloat(text)})
                }
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
  );
}
