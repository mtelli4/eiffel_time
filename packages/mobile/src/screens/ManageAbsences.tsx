import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import { ManageAbsencesAbsence } from '../../../shared/src/types/types';
import { fetchAbsences } from '../../../shared/src/backend/services/absences';
import { dateFormatting } from '../../../shared/src/utils/stringUtils';

const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'pending', label: 'En attente' },
  { value: 'approved', label: 'Validées' },
  { value: 'rejected', label: 'Refusées' },
  { value: 'unsent', label: 'Non envoyées' },
]

export function ManageAbsences() {
  const [absences, setAbsences] = useState<ManageAbsencesAbsence[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatut, setSelectedStatut] = useState<ManageAbsencesAbsence['statut'] | 'all'>('all')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [alertFrequency, setAlertFrequency] = useState('immediate')
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    fetchAbsences()
      .then((data) => {
        setAbsences(data.absences)
      })
      .catch((error) => { console.error('Erreur lors de la récupération des absences:', error) })
  }, [])

  const handleApprove = (id_absence: number) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id_absence === id_absence ? { ...abs, status: 'approved' } : abs,
      ),
    );
  };

  const handleReject = (id_absence: number) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id_absence === id_absence ? { ...abs, status: 'rejected' } : abs,
      ),
    );
  };

  const handleExport = () => {
    console.log('Exporting absences...');
  };

  const filteredAbsences = absences.filter((absence) => {
    const student = absences.find((s) => s.id_absence === absence.id_absence)?.etudiant
    const searchString = `${student?.prenom} ${student?.nom} ${absence.module.codeapogee} ${absence.module.libelle}`.toLowerCase()
    const matchesSearch = searchString.includes(searchQuery.toLowerCase())
    const matchesStatut = selectedStatut === 'all' || absence.statut === selectedStatut
    const matchesDateRange = (!startDate || absence.date >= startDate) && (!endDate || absence.date <= endDate)
    return matchesSearch && matchesStatut && matchesDateRange
  })

  const getStatusStyle = (statut: ManageAbsencesAbsence['statut']) => {
    switch (statut) {
      case 'pending':
        return styles.statusPending;
      case 'approved':
        return styles.statusApproved;
      case 'rejected':
        return styles.statusRejected;
      case 'unsent':
        return styles.statusUnsent;
    }
  };

  const getStatusText = (statut: ManageAbsencesAbsence['statut']) => {
    switch (statut) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Validée';
      case 'rejected':
        return 'Refusée';
      case 'unsent':
        return 'Non envoyée';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Feather name="download" size={20} color="#2E3494" />
            <Text style={styles.exportButtonText}>Exporter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher un étudiant, un module..."
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}>
            <Feather name="filter" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Statut</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  /* Implement status picker modal */
                }}>
                <Text>
                  {selectedStatut === 'all'
                    ? 'Tous les statuts'
                    : getStatusText(selectedStatut)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Date début</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowStartDatePicker(true)}>
                <Text>{startDate ? startDate.toLocaleDateString('fr-FR') : 'Toutes'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Date fin</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowEndDatePicker(true)}>
                <Text>{endDate ? endDate.toLocaleDateString('fr-FR') : 'Toutes'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.absencesList}
        contentContainerStyle={styles.absencesListContent}>
        {filteredAbsences.map((absence) => {
          return absence.etudiant.groupes.length > 0 && (
            <View key={absence.id_absence} style={styles.absenceCard}>
              <View style={styles.absenceHeader}>
                <View>
                  <Text style={styles.studentName}>
                    {absence.etudiant.nom} {absence.etudiant.prenom}
                  </Text>
                  <Text style={styles.groupText}>
                    {absence.etudiant.groupes
                      .map((groupe) => groupe.libelle)
                      .join(', ')}
                  </Text>
                </View>
                <View
                  style={[styles.statusBadge, getStatusStyle(absence.statut)]}>
                  <Text style={styles.statusText}>
                    {getStatusText(absence.statut)}
                  </Text>
                </View>
              </View>

              <View style={styles.moduleInfo}>
                <Text style={styles.moduleCode}>{absence.module.codeapogee}</Text>
                <Text style={styles.moduleName}>{absence.module.libelle}</Text>
              </View>

              <View style={styles.dateInfo}>
                <Text style={styles.date}>
                  {dateFormatting(absence.date)}
                </Text>
                {absence.updatedat && (
                  <Text style={styles.submissionDate}>
                    Soumis le {dateFormatting(absence.updatedat)}
                  </Text>
                )}
              </View>

              <View style={styles.dateInfo}>
                <Text style={styles.date}>
                  {absence.message}
                </Text>
              </View>

              <View style={styles.actions}>
                {absence.path && (
                  <TouchableOpacity
                    onPress={() => {
                      /* Implement document viewer */
                    }}
                    style={styles.actionButton}>
                    <Feather name="file-text" size={20} color="#666" />
                  </TouchableOpacity>
                )}
                {absence.statut === 'pending' && (
                  <>
                    <TouchableOpacity
                      onPress={() => handleApprove(absence.id_absence)}
                      style={styles.actionButton}>
                      <Feather name="check" size={20} color="#22c55e" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleReject(absence.id_absence)}
                      style={styles.actionButton}>
                      <Feather name="x" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E3494',
    backgroundColor: 'white',
  },
  exportButtonText: {
    marginLeft: 8,
    color: '#2E3494',
  },
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
  },
  filterItem: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  absencesList: {
    flex: 1,
  },
  absencesListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  absenceCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  absenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  groupText: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusApproved: {
    backgroundColor: '#d1fae5',
  },
  statusRejected: {
    backgroundColor: '#fee2e2',
  },
  statusUnsent: {
    backgroundColor: '#f0f4f8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moduleInfo: {
    marginBottom: 12,
  },
  moduleCode: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  moduleName: {
    fontSize: 14,
    color: '#6b7280',
  },
  dateInfo: {
    marginBottom: 12,
  },
  date: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  submissionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});
