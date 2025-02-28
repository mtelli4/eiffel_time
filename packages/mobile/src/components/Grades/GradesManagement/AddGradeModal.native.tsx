import { useState } from 'react';
import { Alert, Modal, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { AddGradeModalProps, FormEvaluation } from '../../../../../shared/src/types/types';
import { styles } from '../../../styles/Grades/GradesManagement/AddGradeModal';
import { dateFormatting } from '../../../../../shared/src/utils/stringUtils';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function MobileAddGradeModal({ isOpen, onClose, onSubmit, module, cours, }: AddGradeModalProps) {
  const [formData, setFormData] = useState<FormEvaluation>({
    libelle: '',
    coefficient: 1,
    notemaximale: 20,
    periode: 'Semestre_1',
    id_cours: 0,
    id_module: module.id_module,
  });

  const [openCourse, setOpenCourse] = useState(false);
  const [valueCourse, setValueCourse] = useState(formData.id_cours);
  const [itemsCourse, setItemsCourse] = useState(cours.filter(c => c.id_module === module.id_module).map(c => ({
    label: dateFormatting(new Date(c.debut), new Date(c.fin)),
    value: c.id_cours
  })));

  const [openPeriod, setOpenPeriod] = useState(false);
  const [valuePeriod, setValuePeriod] = useState(formData.periode);
  const [itemsPeriod, setItemsPeriod] = useState([
    { label: 'Semestre 1', value: 'Semestre_1' },
    { label: 'Semestre 2', value: 'Semestre_2' },
    { label: 'Semestre 3', value: 'Semestre_3' },
    { label: 'Semestre 4', value: 'Semestre_4' },
    { label: 'Semestre 5', value: 'Semestre_5' },
    { label: 'Semestre 6', value: 'Semestre_6' },
  ]);

  const handleSubmit = () => {
    setFormData({ ...formData, id_cours: valueCourse, periode: valuePeriod });
    if (!formData.libelle) {
      Alert.alert("Le nom de l'évaluation est requis");
      return;
    }
    if (!formData.id_module || formData.id_module === 0) {
      Alert.alert('Le module est requis');
      return;
    }
    if (!formData.id_cours || formData.id_cours === 0) {
      Alert.alert('Le cours est requis');
      return;
    }
    if (!formData.periode) {
      Alert.alert('La période est requise');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const renderItem = ({ item }: { item: { type: string } }) => {
    switch (item.type) {
      case 'module':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Module sélectionné</Text>
            <View style={styles.input}>
              <Text>{module.libelle ?? 'Aucun module sélectionné'}</Text>
            </View>
          </View>
        );
      case 'libelle':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom de l'évaluation</Text>
            <TextInput
              style={styles.input}
              value={formData.libelle}
              onChangeText={text => setFormData({ ...formData, libelle: text })}
            />
          </View>
        );
      case 'notemaximale':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Note maximale</Text>
            <TextInput
              style={styles.input}
              value={formData.notemaximale.toString()}
              onChangeText={text => setFormData({ ...formData, notemaximale: parseInt(text) })}
              keyboardType="numeric"
            />
          </View>
        );
      case 'coefficient':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Coefficient</Text>
            <TextInput
              style={styles.input}
              value={formData.coefficient.toString()}
              onChangeText={text => setFormData({ ...formData, coefficient: parseInt(text) })}
              keyboardType="numeric"
            />
          </View>
        );
      case 'cours':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Cours</Text>
            <DropDownPicker
              open={openCourse}
              value={valueCourse}
              items={itemsCourse}
              setOpen={setOpenCourse}
              setValue={setValueCourse}
              setItems={setItemsCourse}
              placeholder='Sélectionner un cours'
            />
          </View>
        );
      case 'periode':
        return (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Période</Text>
            <DropDownPicker
              open={openPeriod}
              value={valuePeriod}
              items={itemsPeriod}
              setOpen={setOpenPeriod}
              setValue={setValuePeriod}
              setItems={setItemsPeriod}
              placeholder='Sélectionner une période'
            />
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { type: 'module' },
    { type: 'libelle' },
    { type: 'cours' },
    { type: 'coefficient' },
    { type: 'notemaximale' },
    { type: 'periode' }
  ];

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvelle évaluation</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome6 name="x" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}  // Ensures that the FlatList expands
          />
          <View style={styles.modalFooter}>
            <TouchableOpacity style={customStyles.cancelButton} onPress={onClose}>
              <Text style={customStyles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={customStyles.submitButton} onPress={handleSubmit}>
              <Text style={customStyles.submitButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const customStyles = {
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
}
