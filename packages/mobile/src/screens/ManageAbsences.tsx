import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import {fetchAbsences} from '../../../shared/src/backend/services/absences';
import {ManageAbsencesAbsence} from '../../../shared/src/types/types';
import {dateFormatting} from '../../../shared/src/utils/stringUtils';

const statusOptions = [
  {value: 'all', label: 'Tous les statuts'},
  {value: 'pending', label: 'En attente'},
  {value: 'approved', label: 'Validées'},
  {value: 'rejected', label: 'Refusées'},
  {value: 'unsent', label: 'Non envoyées'},
];

export function ManageAbsences() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [absences, setAbsences] = useState<ManageAbsencesAbsence[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [alertFrequency, setAlertFrequency] = useState('immediate');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [isStatutOpen, setIsStatutOpen] = useState(false);
  const [valueStatut, setValueStatut] = useState(null);
  const [itemsStatut, setItemsStatut] = useState(statusOptions);

  const [isFormationOpen, setIsFormationOpen] = useState(false);
  const [valueFormation, setValueFormation] = useState(null);
  const [itemsFormation, setItemsFormation] = useState<
    {value: string | number; label: string}[]
  >([{value: 'all', label: 'Toutes les formations'}]);

  useEffect(() => {
    fetchAbsences()
      .then(data => {
        setAbsences(data.absences);
        const itemsFormation = data.formations.map(formation => ({
          value: formation.id_formation,
          label: formation.libelle,
        }));
        setItemsFormation([
          {value: 'all', label: 'Toutes les formations'},
          ...itemsFormation,
        ]);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des absences:', error);
      });
  }, []);

  const handleApprove = (id_absence: number) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id_absence === id_absence ? {...abs, status: 'approved'} : abs,
      ),
    );
  };

  const handleReject = (id_absence: number) => {
    setAbsences(prev =>
      prev.map(abs =>
        abs.id_absence === id_absence ? {...abs, status: 'rejected'} : abs,
      ),
    );
  };

  const handleExport = () => {
    console.log('Exporting absences...');
  };

  const filteredAbsences = absences.filter(absence => {
    const student = absences.find(
      s => s.id_absence === absence.id_absence,
    )?.etudiant;
    const searchString =
      `${student?.prenom} ${student?.nom} ${absence.module.codeapogee} ${absence.module.libelle}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesStatut =
      valueStatut === null ||
      valueStatut === 'all' ||
      absence.statut === valueStatut;
    const matchesDateRange =
      (!startDate || absence.date >= startDate) &&
      (!endDate || absence.date <= endDate);
    const matchesFormation =
      valueFormation === null ||
      valueFormation === 'all' ||
      absence.module.formation.id_formation === valueFormation;
    return (
      matchesSearch && matchesStatut && matchesDateRange && matchesFormation
    );
  });

  const getStatusStyle = (statut: ManageAbsencesAbsence['statut']) => {
    switch (statut) {
      case 'pending':
        return {
          backgroundColor: isDark ? '#4a3f10' : '#fef3c7',
          ...(isDark && {borderColor: '#ca8a04', borderWidth: 1}),
        };
      case 'approved':
        return {
          backgroundColor: isDark ? '#064e3b' : '#d1fae5',
          ...(isDark && {borderColor: '#16a34a', borderWidth: 1}),
        };
      case 'rejected':
        return {
          backgroundColor: isDark ? '#450a0a' : '#fee2e2',
          ...(isDark && {borderColor: '#dc2626', borderWidth: 1}),
        };
      case 'unsent':
        return {
          backgroundColor: isDark ? '#2c3545' : '#f0f4f8',
          ...(isDark && {borderColor: '#4b5563', borderWidth: 1}),
        };
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
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View
        style={[styles.headerContainer, isDark && styles.darkHeaderContainer]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.exportButton, isDark && styles.darkExportButton]}
            onPress={handleExport}>
            <Feather
              name="download"
              size={20}
              color={isDark ? '#fff' : '#2E3494'}
            />
            <Text
              style={[
                styles.exportButtonText,
                isDark && styles.darkExportButtonText,
              ]}>
              Exporter
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputContainer,
              isDark && styles.darkSearchInputContainer,
            ]}>
            <Feather
              name="search"
              size={20}
              color={isDark ? '#aaa' : '#666'}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, isDark && styles.darkSearchInput]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher un étudiant, un module..."
              placeholderTextColor={isDark ? '#aaa' : '#666'}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, isDark && styles.darkFilterButton]}
            onPress={() => setShowFilters(!showFilters)}>
            <Feather name="filter" size={20} color={isDark ? '#aaa' : '#666'} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View
            style={[
              styles.filtersContainer,
              isDark && styles.darkFiltersContainer,
            ]}>
            <View style={styles.filterItem}>
              <Text
                style={[styles.filterLabel, isDark && styles.darkFilterLabel]}>
                Statut
              </Text>
              <DropDownPicker
                open={isStatutOpen}
                value={valueStatut}
                items={itemsStatut}
                setOpen={setIsStatutOpen}
                setValue={setValueStatut}
                setItems={setItemsStatut}
                style={[styles.picker, isDark && styles.darkPicker]}
                placeholder="Sélectionner un statut"
                placeholderStyle={isDark ? {color: '#aaa'} : undefined}
                textStyle={isDark ? {color: '#fff'} : undefined}
                dropDownContainerStyle={[
                  styles.picker,
                  isDark && styles.darkPickerDropdown,
                ]}
                ArrowUpIconComponent={() => (
                  <Feather
                    name="chevron-up"
                    size={20}
                    color={isDark ? '#aaa' : '#666'}
                  />
                )}
                ArrowDownIconComponent={() => (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={isDark ? '#aaa' : '#666'}
                  />
                )}
              />
            </View>

            <View style={styles.filterItem}>
              <Text
                style={[styles.filterLabel, isDark && styles.darkFilterLabel]}>
                Date début
              </Text>
              <Button
                title="Date début"
                onPress={() => setShowStartDatePicker(true)}
                color={isDark ? '#2E3494' : undefined}
              />
            </View>

            <View style={styles.filterItem}>
              <Text
                style={[styles.filterLabel, isDark && styles.darkFilterLabel]}>
                Date fin
              </Text>
              <TouchableOpacity
                style={[styles.picker, isDark && styles.darkPicker]}
                onPress={() => setShowEndDatePicker(true)}>
                <Text style={isDark ? {color: '#fff'} : undefined}>
                  {endDate ? endDate.toLocaleDateString('fr-FR') : 'Toutes'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterItem}>
              <Text
                style={[styles.filterLabel, isDark && styles.darkFilterLabel]}>
                Formation
              </Text>
              <DropDownPicker
                open={isFormationOpen}
                value={valueFormation}
                items={itemsFormation}
                setOpen={setIsFormationOpen}
                setValue={setValueFormation}
                setItems={setItemsFormation}
                style={[styles.picker, isDark && styles.darkPicker]}
                placeholder="Sélectionner une formation"
                placeholderStyle={isDark ? {color: '#aaa'} : undefined}
                textStyle={isDark ? {color: '#fff'} : undefined}
                dropDownContainerStyle={[
                  styles.picker,
                  isDark && styles.darkPickerDropdown,
                ]}
                ArrowUpIconComponent={() => (
                  <Feather
                    name="chevron-up"
                    size={20}
                    color={isDark ? '#aaa' : '#666'}
                  />
                )}
                ArrowDownIconComponent={() => (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={isDark ? '#aaa' : '#666'}
                  />
                )}
              />
            </View>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.absencesList}
        contentContainerStyle={styles.absencesListContent}>
        {filteredAbsences.map(absence => {
          return (
            absence.etudiant.groupes.length > 0 && (
              <View
                key={absence.id_absence}
                style={[styles.absenceCard, isDark && styles.darkAbsenceCard]}>
                <View style={styles.absenceHeader}>
                  <View>
                    <Text
                      style={[
                        styles.studentName,
                        isDark && styles.darkStudentName,
                      ]}>
                      {absence.etudiant.nom} {absence.etudiant.prenom}
                    </Text>
                    <Text
                      style={[
                        styles.groupText,
                        isDark && styles.darkGroupText,
                      ]}>
                      {absence.etudiant.groupes
                        .map(groupe => groupe.libelle)
                        .join(', ')}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(absence.statut),
                    ]}>
                    <Text
                      style={[
                        styles.statusText,
                        isDark && styles.darkstatusText,
                      ]}>
                      {getStatusText(absence.statut)}
                    </Text>
                  </View>
                </View>

                <View style={styles.moduleInfo}>
                  <Text
                    style={[
                      styles.moduleCode,
                      isDark && styles.darkModuleCode,
                    ]}>
                    {absence.module.formation.libelle}
                  </Text>
                  <Text
                    style={[
                      styles.moduleCode,
                      isDark && styles.darkModuleCode,
                    ]}>
                    {absence.module.codeapogee}
                  </Text>
                  <Text
                    style={[
                      styles.moduleName,
                      isDark && styles.darkModuleName,
                    ]}>
                    {absence.module.libelle}
                  </Text>
                </View>

                <View style={styles.dateInfo}>
                  <Text style={[styles.date, isDark && styles.darkDate]}>
                    {dateFormatting(absence.date)}
                  </Text>
                  {absence.updatedat && (
                    <Text
                      style={[
                        styles.submissionDate,
                        isDark && styles.darkSubmissionDate,
                      ]}>
                      Soumis le {dateFormatting(absence.updatedat)}
                    </Text>
                  )}
                </View>

                <View style={styles.dateInfo}>
                  <Text style={[styles.date, isDark && styles.darkDate]}>
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
                      <Feather
                        name="file-text"
                        size={20}
                        color={isDark ? '#fff' : '#666'}
                      />
                    </TouchableOpacity>
                  )}
                  {absence.statut === 'pending' && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleApprove(absence.id_absence)}
                        style={styles.actionButton}>
                        <Feather
                          name="check"
                          size={20}
                          color={isDark ? '#22c55e' : '#22c55e'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleReject(absence.id_absence)}
                        style={styles.actionButton}>
                        <Feather
                          name="x"
                          size={20}
                          color={isDark ? '#ef4444' : '#ef4444'}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )
          );
        })}
      </ScrollView>

      {showStartDatePicker && (
        <DatePicker
          modal
          open={showStartDatePicker}
          date={startDate || new Date()}
          onConfirm={date => {
            setStartDate(date);
            setShowStartDatePicker(false);
          }}
          onCancel={() => {
            setShowStartDatePicker(false);
          }}
          mode="date"
          theme={isDark ? 'dark' : 'light'}
        />
      )}

      {showEndDatePicker && (
        <DatePicker
          modal
          open={showEndDatePicker}
          date={endDate || new Date()}
          onConfirm={date => {
            setEndDate(date);
            setShowEndDatePicker(false);
          }}
          onCancel={() => {
            setShowEndDatePicker(false);
          }}
          mode="date"
          theme={isDark ? 'dark' : 'light'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  headerContainer: {
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  darkHeaderContainer: {
    backgroundColor: '#1f2937',
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
  darkExportButton: {
    borderColor: '#4a5af7',
    backgroundColor: '#2E3494',
  },
  exportButtonText: {
    marginLeft: 8,
    color: '#2E3494',
  },
  darkExportButtonText: {
    color: '#ffffff',
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
  darkSearchInputContainer: {
    backgroundColor: '#111827',
    borderColor: '#374151',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  darkSearchInput: {
    color: '#fff',
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
  darkFilterButton: {
    backgroundColor: '#111827',
    borderColor: '#374151',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
  },
  darkFiltersContainer: {
    backgroundColor: '#111827',
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
  darkFilterLabel: {
    color: '#e0e0e0',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  darkPicker: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
    color: '#fff',
  },
  darkPickerDropdown: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
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
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  darkAbsenceCard: {
    backgroundColor: '#111827',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
      },
      android: {
        elevation: 4,
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
  darkStudentName: {
    color: '#fff',
  },
  groupText: {
    fontSize: 14,
    color: '#6b7280',
  },
  darkGroupText: {
    color: '#9ca3af',
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
  darkStatusPending: {
    color: '#fcd34d',
  },
  darkStatusApproved: {
    color: '#34d399',
  },
  darkStatusRejected: {
    color: '#f87171',
  },
  darkStatusUnsent: {
    color: '#9ca3af',
  },
  darkstatusText: {
    color: 'white',
  },
  moduleInfo: {
    marginBottom: 12,
  },
  moduleCode: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  darkModuleCode: {
    color: '#e5e7eb',
  },
  moduleName: {
    fontSize: 14,
    color: '#6b7280',
  },
  darkModuleName: {
    color: '#9ca3af',
  },
  dateInfo: {
    marginBottom: 12,
  },
  date: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  darkDate: {
    color: '#e5e7eb',
  },
  submissionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  darkSubmissionDate: {
    color: '#9ca3af',
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
