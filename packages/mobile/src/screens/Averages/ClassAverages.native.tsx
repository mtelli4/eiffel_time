import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../../../shared/src/styles/Averages/AveragesStyles';
import {API_URL} from '../../../../shared/src/types/types';

// Interfaces adaptées du composant web
interface Module {
  id_module: number;
  libelle: string;
  code?: string;
}

interface BlocCompetence {
  id_bloc_comp: number;
  libelle: string;
  code?: string;
  modules: Module[];
}

interface Student {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  moyennes: {id_module: number; moyenne: string}[];
  absences: number;
  moyenneGenerale: string;
  moyenneAvecMalus: string;
}

interface Groupe {
  id_grp: number;
  libelle: string;
}

interface Semestre {
  periode: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

export default function Averages() {
  const [students, setStudents] = useState<Student[]>([]);
  const [blocsCompetences, setBlocsCompetences] = useState<BlocCompetence[]>(
    [],
  );
  const [modules, setModules] = useState<Module[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [selectedGroupe, setSelectedGroupe] = useState('all');
  const [selectedSemestre, setSelectedSemestre] = useState('all');
  const [expandedBlocs, setExpandedBlocs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Récupération des données avec filtres dynamiques
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/api/averages?semestre=${selectedSemestre}&groupe=${selectedGroupe}`,
      );

      const data = response.data;
      setModules(data.modules);
      setStudents(data.students);
      setGroupes(data.groupes);
      setBlocsCompetences(data.blocsCompetences);
      setSemestres(data.semestres);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError('Erreur lors de la récupération des données');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedGroupe, selectedSemestre]);

  const toggleBloc = (blocId: number) => {
    setExpandedBlocs(prev =>
      prev.includes(blocId)
        ? prev.filter(id => id !== blocId)
        : [...prev, blocId],
    );
  };

  const handleExportXLSX = () => {
    console.log('Exporting to XLSX...');
  };

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
  };

  // Calcul de la moyenne d'un bloc pour un étudiant
  const calculateBlocAverage = (
    student: Student,
    bloc: BlocCompetence,
  ): string => {
    const moduleNotes = bloc.modules
      .map(module => {
        const note = student.moyennes.find(
          m => m.id_module === module.id_module,
        );
        return note ? parseFloat(note.moyenne) : null;
      })
      .filter(note => note !== null) as number[];

    if (moduleNotes.length === 0) return '-';

    const average =
      moduleNotes.reduce((sum, note) => sum + note, 0) / moduleNotes.length;
    return average.toFixed(2);
  };

  // Création des options pour les select
  const semestreOptions: DropdownOption[] = [
    {value: 'all', label: 'Tous les semestres'},
    ...(semestres?.map(sem => ({
      value: sem.periode,
      label: `Semestre ${sem.periode}`,
    })) || []),
  ];

  const groupeOptions: DropdownOption[] = [
    {value: 'all', label: 'Tous les groupes'},
    ...(groupes?.map(grp => ({
      value: grp.id_grp.toString(),
      label: grp.libelle,
    })) || []),
  ];

  // Fonction pour afficher l'en-tête d'un bloc de compétences
  const renderBlocHeader = (bloc: BlocCompetence) => {
    return (
      <React.Fragment key={`header-${bloc.id_bloc_comp}`}>
        <View
          style={[styles.ueHeaderCell, isDarkMode && styles.ueHeaderCellDark]}>
          <TouchableOpacity
            onPress={() => toggleBloc(bloc.id_bloc_comp)}
            style={styles.ueHeaderButton}>
            <MaterialCommunityIcons
              name="chevron-down"
              color={isDarkMode ? '#fff' : '#2e3494'}
              size={16}
              style={[
                styles.chevronIcon,
                expandedBlocs.includes(bloc.id_bloc_comp) &&
                  styles.chevronRotated,
              ]}
            />
            <Text style={[styles.ueCode, isDarkMode && styles.ueCodeDark]}>
              {bloc.code || `BC ${bloc.id_bloc_comp}`}
            </Text>
          </TouchableOpacity>
        </View>
        {expandedBlocs.includes(bloc.id_bloc_comp) &&
          bloc.modules.map(module => (
            <View
              key={module.id_module}
              style={[
                styles.moduleHeaderCell,
                isDarkMode && styles.moduleHeaderCellDark,
              ]}>
              <Text
                style={[
                  styles.moduleCode,
                  isDarkMode && styles.moduleCodeDark,
                ]}>
                {module.code || `Module ${module.id_module}`}
              </Text>
            </View>
          ))}
      </React.Fragment>
    );
  };

  // Fonction pour afficher le nom des blocs et modules
  const renderBlocNameHeader = (bloc: BlocCompetence) => {
    return (
      <React.Fragment key={`name-${bloc.id_bloc_comp}`}>
        <View
          style={[styles.ueHeaderCell, isDarkMode && styles.ueHeaderCellDark]}>
          <Text style={[styles.ueName, isDarkMode && styles.ueNameDark]}>
            {bloc.libelle}
          </Text>
        </View>
        {expandedBlocs.includes(bloc.id_bloc_comp) &&
          bloc.modules.map(module => (
            <View
              key={module.id_module}
              style={[
                styles.moduleHeaderCell,
                isDarkMode && styles.moduleHeaderCellDark,
              ]}>
              <Text
                style={[
                  styles.moduleName,
                  isDarkMode && styles.moduleNameDark,
                ]}>
                {module.libelle}
              </Text>
            </View>
          ))}
      </React.Fragment>
    );
  };

  // Fonction pour afficher une ligne d'étudiant avec ses notes
  const renderStudentRow = (student: Student) => {
    return (
      <View
        key={student.id_utilisateur}
        style={[styles.studentRow, isDarkMode && styles.studentRowDark]}>
        <View
          style={[
            styles.studentNameCell,
            isDarkMode && styles.studentNameCellDark,
          ]}>
          <Text
            style={[styles.studentName, isDarkMode && styles.studentNameDark]}>
            {student.nom} {student.prenom}
          </Text>
        </View>
        {blocsCompetences.map(bloc => (
          <React.Fragment
            key={`${student.id_utilisateur}-${bloc.id_bloc_comp}`}>
            <View
              style={[
                styles.studentUECell,
                isDarkMode && styles.studentUECellDark,
              ]}>
              <Text style={[styles.ueGrade, isDarkMode && styles.ueGradeDark]}>
                {calculateBlocAverage(student, bloc)}
              </Text>
            </View>
            {expandedBlocs.includes(bloc.id_bloc_comp) &&
              bloc.modules.map(module => {
                const studentModule = student.moyennes.find(
                  m => m.id_module === module.id_module,
                );
                return (
                  <View
                    key={`${student.id_utilisateur}-${module.id_module}`}
                    style={[
                      styles.studentModuleCell,
                      isDarkMode && styles.studentModuleCellDark,
                    ]}>
                    <Text
                      style={[
                        styles.moduleGrade,
                        isDarkMode && styles.moduleGradeDark,
                      ]}>
                      {studentModule ? studentModule.moyenne : '-'}
                    </Text>
                  </View>
                );
              })}
          </React.Fragment>
        ))}
        <View
          style={[
            styles.studentUECell,
            isDarkMode && styles.studentUECellDark,
          ]}>
          <Text style={[styles.ueGrade, isDarkMode && styles.ueGradeDark]}>
            {student.moyenneGenerale || '-'}
          </Text>
        </View>
        <View
          style={[
            styles.studentModuleCell,
            isDarkMode && styles.studentModuleCellDark,
          ]}>
          <Text
            style={[styles.moduleGrade, isDarkMode && styles.moduleGradeDark]}>
            {student.absences || '-'}
          </Text>
        </View>
        <View
          style={[
            styles.studentUECell,
            isDarkMode && styles.studentUECellDark,
          ]}>
          <Text style={[styles.ueGrade, isDarkMode && styles.ueGradeDark]}>
            {student.moyenneAvecMalus || '-'}
          </Text>
        </View>
      </View>
    );
  };

  // Interface pour les dropdowns
  const renderDropdownButton = (
    options: DropdownOption[],
    selectedValue: string,
    onSelect: (value: string) => void,
    placeholder: string,
  ) => {
    const selectedOption = options.find(opt => opt.value === selectedValue);

    return (
      <TouchableOpacity
        style={[styles.dropdown, isDarkMode && styles.dropdownDark]}
        onPress={() => {
          // Ici, vous devriez ouvrir un modal avec les options
          // Pour l'exemple, je simule juste un changement
          if (options.length > 0) {
            const nextIndex =
              options.findIndex(opt => opt.value === selectedValue) + 1;
            const nextOption = options[nextIndex % options.length];
            onSelect(nextOption.value);
          }
        }}>
        <Text
          style={[styles.dropdownText, isDarkMode && styles.dropdownTextDark]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          isDarkMode && styles.containerDark,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#fff' : '#2e3494'}
        />
        <Text style={{color: isDarkMode ? '#fff' : '#333', marginTop: 16}}>
          Chargement des données...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          isDarkMode && styles.containerDark,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{color: 'red', textAlign: 'center', marginBottom: 16}}>
          {error}
        </Text>
        <TouchableOpacity
          style={[styles.exportButton, isDarkMode && styles.exportButtonDark]}
          onPress={fetchData}>
          <Text
            style={[
              styles.exportButtonText,
              isDarkMode && styles.exportButtonTextDark,
            ]}>
            Réessayer
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={handleExportXLSX}
          style={[styles.exportButton, isDarkMode && styles.exportButtonDark]}>
          <MaterialCommunityIcons
            name="microsoft-excel"
            color={isDarkMode ? '#fff' : '#000'}
            size={16}
          />
          <Text
            style={[
              styles.exportButtonText,
              isDarkMode && styles.exportButtonTextDark,
            ]}>
            Exporter XLSX
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleExportPDF}
          style={[styles.exportButton, isDarkMode && styles.exportButtonDark]}>
          <MaterialCommunityIcons
            name="file-pdf-box"
            color={isDarkMode ? '#fff' : '#000'}
            size={16}
          />
          <Text
            style={[
              styles.exportButtonText,
              isDarkMode && styles.exportButtonTextDark,
            ]}>
            Exporter PDF
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <View style={styles.filtersContainer}>
          <View style={styles.filterItem}>
            <Text
              style={[
                styles.filterLabel,
                isDarkMode && styles.filterLabelDark,
              ]}>
              Semestre
            </Text>
            {renderDropdownButton(
              semestreOptions,
              selectedSemestre,
              setSelectedSemestre,
              'Sélectionner un semestre',
            )}
          </View>

          <View style={styles.filterItem}>
            <Text
              style={[
                styles.filterLabel,
                isDarkMode && styles.filterLabelDark,
              ]}>
              Groupe
            </Text>
            {renderDropdownButton(
              groupeOptions,
              selectedGroupe,
              setSelectedGroupe,
              'Sélectionner un groupe',
            )}
          </View>
        </View>

        <ScrollView horizontal style={styles.tableContainer}>
          <View>
            {/* En-tête de tableau - Ligne 1 (Codes des blocs) */}
            <View
              style={[styles.headerRow, isDarkMode && styles.headerRowDark]}>
              <View
                style={[
                  styles.studentHeaderCell,
                  isDarkMode && styles.studentHeaderCellDark,
                ]}>
                <Text
                  style={[
                    styles.headerText,
                    isDarkMode && styles.headerTextDark,
                  ]}>
                  Étudiant
                </Text>
              </View>
              {blocsCompetences.map(bloc => renderBlocHeader(bloc))}
              <View
                style={[
                  styles.ueHeaderCell,
                  isDarkMode && styles.ueHeaderCellDark,
                ]}>
                <Text style={[styles.ueCode, isDarkMode && styles.ueCodeDark]}>
                  Moyenne générale
                </Text>
              </View>
              <View
                style={[
                  styles.moduleHeaderCell,
                  isDarkMode && styles.moduleHeaderCellDark,
                ]}>
                <Text
                  style={[
                    styles.moduleCode,
                    isDarkMode && styles.moduleCodeDark,
                  ]}>
                  Absence (h)
                </Text>
              </View>
              <View
                style={[
                  styles.ueHeaderCell,
                  isDarkMode && styles.ueHeaderCellDark,
                ]}>
                <Text style={[styles.ueCode, isDarkMode && styles.ueCodeDark]}>
                  Moyenne avec malus
                </Text>
              </View>
            </View>

            {/* En-tête de tableau - Ligne 2 (Noms des blocs) */}
            <View
              style={[styles.headerRow, isDarkMode && styles.headerRowDark]}>
              <View
                style={[
                  styles.studentHeaderCell,
                  isDarkMode && styles.studentHeaderCellDark,
                ]}
              />
              {blocsCompetences.map(bloc => renderBlocNameHeader(bloc))}
              <View
                style={[
                  styles.ueHeaderCell,
                  isDarkMode && styles.ueHeaderCellDark,
                ]}
              />
              <View
                style={[
                  styles.moduleHeaderCell,
                  isDarkMode && styles.moduleHeaderCellDark,
                ]}
              />
              <View
                style={[
                  styles.ueHeaderCell,
                  isDarkMode && styles.ueHeaderCellDark,
                ]}
              />
            </View>

            {/* Corps du tableau */}
            <ScrollView>
              {students.length > 0 ? (
                students.map(student => renderStudentRow(student))
              ) : (
                <View
                  style={[
                    styles.emptyStateRow,
                    isDarkMode && styles.emptyStateRowDark,
                  ]}>
                  <Text
                    style={[
                      styles.emptyStateText,
                      isDarkMode && styles.emptyStateTextDark,
                    ]}>
                    Aucun étudiant trouvé
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
