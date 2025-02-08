import React, {useState} from 'react';
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

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group: string;
}

interface Absence {
  id: string;
  studentId: string;
  date: string;
  module: {
    code: string;
    name: string;
  };
  professor: string;
  status: 'pending' | 'approved' | 'rejected';
  justification?: string;
  document?: string;
  submissionDate?: string;
}

// Mock data
const MOCK_STUDENTS: Student[] = [
  {id: '22001234', firstName: 'Jean', lastName: 'DUPONT', group: 'A1'},
  {id: '22001235', firstName: 'Marie', lastName: 'MARTIN', group: 'A2'},
];

const MOCK_ABSENCES: Absence[] = [
  {
    id: 'abs1',
    studentId: '22001234',
    date: '2024-03-15',
    module: {code: 'M5101', name: 'Développement Web'},
    professor: 'Dr. Martin',
    status: 'pending',
    justification: 'Certificat médical',
    document: 'https://example.com/justification.pdf',
    submissionDate: '2024-03-16',
  },
  {
    id: 'abs2',
    studentId: '22001235',
    date: '2024-03-20',
    module: {code: 'M5102', name: 'Base de données'},
    professor: 'Dr. Dubois',
    status: 'approved',
    justification: 'Rendez-vous médical',
    document: 'https://example.com/justification2.pdf',
    submissionDate: '2024-03-21',
  },
];

export function ManageAbsences() {
  const [absences, setAbsences] = useState<Absence[]>(MOCK_ABSENCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    Absence['status'] | 'all'
  >('all');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleApprove = (absenceId: string) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id === absenceId ? {...abs, status: 'approved'} : abs,
      ),
    );
  };

  const handleReject = (absenceId: string) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id === absenceId ? {...abs, status: 'rejected'} : abs,
      ),
    );
  };

  const handleExport = () => {
    console.log('Exporting absences...');
  };

  const filteredAbsences = absences.filter(absence => {
    const student = MOCK_STUDENTS.find(s => s.id === absence.studentId);
    const searchString =
      `${student?.firstName} ${student?.lastName} ${absence.module.code} ${absence.module.name}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || absence.status === selectedStatus;
    const matchesDateRange =
      (!startDate || absence.date >= startDate.toISOString().split('T')[0]) &&
      (!endDate || absence.date <= endDate.toISOString().split('T')[0]);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const getStatusStyle = (status: Absence['status']) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'approved':
        return styles.statusApproved;
      case 'rejected':
        return styles.statusRejected;
    }
  };

  const getStatusText = (status: Absence['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Validée';
      case 'rejected':
        return 'Refusée';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Feather name="download" size={20} color="#666" />
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
                {selectedStatus === 'all'
                  ? 'Tous les statuts'
                  : getStatusText(selectedStatus)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Date début</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowStartDatePicker(true)}>
              <Text>{startDate.toLocaleDateString('fr-FR')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Date fin</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setShowEndDatePicker(true)}>
              <Text>{endDate.toLocaleDateString('fr-FR')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.absencesContainer}>
        <ScrollView
          style={styles.absencesList}
          contentContainerStyle={{paddingBottom: 20}}>
          {filteredAbsences.map(absence => {
            const student = MOCK_STUDENTS.find(s => s.id === absence.studentId);
            return (
              <View key={absence.id} style={styles.absenceCard}>
                <View style={styles.absenceHeader}>
                  <View>
                    <Text style={styles.studentName}>
                      {student?.lastName} {student?.firstName}
                    </Text>
                    <Text style={styles.groupText}>
                      Groupe {student?.group}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(absence.status),
                    ]}>
                    <Text style={styles.statusText}>
                      {getStatusText(absence.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleCode}>{absence.module.code}</Text>
                  <Text style={styles.moduleName}>{absence.module.name}</Text>
                </View>

                <View style={styles.dateInfo}>
                  <Text style={styles.date}>
                    {new Date(absence.date).toLocaleDateString('fr-FR')}
                  </Text>
                  {absence.submissionDate && (
                    <Text style={styles.submissionDate}>
                      Soumis le{' '}
                      {new Date(absence.submissionDate).toLocaleDateString(
                        'fr-FR',
                      )}
                    </Text>
                  )}
                </View>

                <View style={styles.actions}>
                  {absence.document && (
                    <TouchableOpacity
                      onPress={() => {
                        /* Implement document viewer */
                      }}
                      style={styles.actionButton}>
                      <Feather name="file-text" size={20} color="#666" />
                    </TouchableOpacity>
                  )}
                  {absence.status === 'pending' && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleApprove(absence.id)}
                        style={styles.actionButton}>
                        <Feather name="check" size={20} color="#22c55e" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleReject(absence.id)}
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
      {/* {(Platform.OS === 'ios' ? showStartDatePicker : true) && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}

      {(Platform.OS === 'ios' ? showEndDatePicker : true) && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  exportButtonText: {
    marginLeft: 8,
    color: '#666',
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
  absencesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  absencesList: {
    flex: 1,
  },
  absenceCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
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
