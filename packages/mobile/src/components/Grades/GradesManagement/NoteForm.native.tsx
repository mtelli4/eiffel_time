import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {FormNote, NoteFormProps} from '../../../../../shared/src/types/types';

export function NoteForm({
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  evaluation,
  students,
  note,
}: NoteFormProps) {
  const [formData, setFormData] = useState({
    id_eval: evaluation.id_eval,
    id_utilisateur: 0,
    note: '',
    commentaire: '',
  });

  useEffect(() => {
    if (isEdit && note) {
      formData.id_utilisateur = note.id_utilisateur;
      formData.note = note.note.toString();
      formData.commentaire = note.commentaire;
      setValueStudent(note.id_utilisateur);
    }
  }, [isEdit, note]);

  const [openStudent, setOpenStudent] = useState(false);
  const [valueStudent, setValueStudent] = useState(0);
  const [itemsStudent, setItemsStudent] = useState(
    isEdit
      ? students.map(s => ({
          label: `${note?.nom} ${note?.prenom}`,
          value: note?.id_utilisateur,
        }))
      : students.map(s => ({
          label: `${s.nom} ${s.prenom}`,
          value: s.id_utilisateur,
        })),
  );

  const handleSubmit = () => {
    formData.id_utilisateur = valueStudent;
    const note = parseFloat(formData.note);

    if (formData.id_utilisateur === 0) {
      Alert.alert('Un étudiant doit être sélectionné');
      return;
    }
    if (isNaN(note) || note < 0 || note > evaluation.notemaximale) {
      Alert.alert(
        `La note doit être comprise entre 0 et ${evaluation.notemaximale}`,
      );
      return;
    }
    const submittedNote: FormNote = {
      ...formData,
      note: note,
    };
    onSubmit(submittedNote);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEdit ? 'Modifier une note' : 'Ajouter une note'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome6 name="x" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Évaluation sélectionnée</Text>
              <TextInput
                style={styles.input}
                value={evaluation.libelle}
                editable={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Étudiant</Text>
              <DropDownPicker
                open={openStudent}
                value={valueStudent}
                items={itemsStudent}
                setOpen={setOpenStudent}
                setValue={setValueStudent}
                setItems={setItemsStudent}
                placeholder="Sélectionner un étudiant"
                disabled={isEdit}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                style={styles.input}
                value={formData.note}
                onChangeText={text => {
                  const regex = /^[0-9]*[.,]?[0-9]*$/;
                  if (regex.test(text)) {
                    setFormData({
                      ...formData,
                      note: text.replace(',', '.'), // Remplace la virgule par un point
                    });
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Commentaire</Text>
              <TextInput
                style={styles.input}
                value={formData.commentaire}
                onChangeText={text =>
                  setFormData({...formData, commentaire: text})
                }
              />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>
                  {isEdit ? 'Modifier' : 'Ajouter'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  form: {
    gap: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#2C3E50',
  },
  submitButton: {
    backgroundColor: '#2E3494',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
  },
});
