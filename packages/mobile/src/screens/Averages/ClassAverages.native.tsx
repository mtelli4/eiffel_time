import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../../../../shared/src/styles/Averages/AveragesStyles';

// Data structures
interface Module {
  code: string;
  name: string;
}

interface UE {
  code: string;
  name: string;
  ects: number;
  modules: Module[];
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group: string;
  grades: Record<number, Record<string, number>>; // semester -> module -> grade
  ueAverages: Record<number, Record<string, number>>; // semester -> UE -> average
}

interface DropdownOption {
  value: string | number;
  label: string;
}

const SEMESTERS = [1, 2, 3, 4, 5, 6];
const GROUPS = ['all', 'A', 'B', 'C'];

const UES: UE[] = [
  {
    code: 'UE51',
    name: 'Semestre 5 BC1',
    ects: 10,
    modules: [
      {code: 'S5.A.01', name: 'Développement avancé'},
      {code: 'R5.A.04', name: 'Qualité algorithmique'},
      {code: 'R5.A.05', name: 'Programmation avancée'},
      {code: 'R5.A.06', name: 'Sensibilisation à la programmation multimédia'},
      {code: 'R5.A.07', name: 'Automatisation de la chaîne de production'},
      {code: 'R5.A.08', name: 'Qualité de développement'},
      {code: 'R5.A.09', name: 'Virtualisation avancée'},
      {code: 'R5.A.10', name: 'Nouveaux paradigmes de base de données'},
      {code: 'R5.A.13', name: 'Économie durable et numérique'},
      {code: 'R5.A.14', name: 'Anglais'},
    ],
  },
  {
    code: 'UE52',
    name: 'Semestre 5 BC2',
    ects: 10,
    modules: [
      {code: 'S5.A.01', name: 'Développement avancé'},
      {code: 'R5.A.04', name: 'Qualité algorithmique'},
      {code: 'R5.A.05', name: 'Programmation avancée'},
      {code: 'R5.A.06', name: 'Sensibilisation à la programmation multimédia'},
      {code: 'R5.A.08', name: 'Qualité de développement'},
      {code: 'R5.A.09', name: 'Virtualisation avancée'},
      {code: 'R5.A.10', name: 'Nouveaux paradigmes de base de données'},
      {
        code: 'R5.A.11',
        name: "Méthodes d'optimisation pour l'aide à la décision",
      },
      {code: 'R5.A.12', name: 'Modélisations mathématiques'},
      {code: 'R5.A.14', name: 'Anglais'},
    ],
  },
  {
    code: 'UE53',
    name: 'Semestre 5 BC6',
    ects: 10,
    modules: [
      {code: 'S5.A.01', name: 'Développement avancé'},
      {code: 'R5.01', name: 'Initiation au management'},
      {code: 'R5.02', name: 'Projet personnel et professionnel'},
      {code: 'R5.03', name: 'Politique de Communication'},
      {code: 'R5.A.06', name: 'Sensibilisation à la programmation multimédia'},
      {code: 'R5.A.07', name: 'Automatisation de la chaîne de production'},
      {code: 'R5.A.13', name: 'Économie durable et numérique'},
      {code: 'R5.A.14', name: 'Anglais'},
    ],
  },
];

const STUDENTS: Student[] = [
  {
    id: '22001234',
    firstName: 'Jean',
    lastName: 'DUPONT',
    group: 'A',
    grades: {
      5: {
        'S5.A.01': 15.5,
        'R5.A.04': 14.8,
        'R5.A.05': 16.2,
        'R5.A.06': 15.0,
        'R5.A.07': 14.5,
        'R5.A.08': 16.8,
        'R5.A.09': 15.2,
        'R5.A.10': 14.9,
        'R5.A.11': 15.7,
        'R5.A.12': 16.1,
        'R5.A.13': 15.4,
        'R5.A.14': 14.6,
        'R5.01': 15.8,
        'R5.02': 16.5,
        'R5.03': 15.3,
      },
    },
    ueAverages: {
      5: {
        UE51: 15.4,
        UE52: 15.7,
        UE53: 15.6,
      },
    },
  },
  {
    id: '22001235',
    firstName: 'Marie',
    lastName: 'DURAND',
    group: 'B',
    grades: {
      5: {
        'S5.A.01': 16.5,
        'R5.A.04': 15.8,
        'R5.A.05': 17.2,
        'R5.A.06': 16.0,
        'R5.A.07': 15.5,
        'R5.A.08': 17.8,
        'R5.A.09': 16.2,
        'R5.A.10': 15.9,
        'R5.A.11': 16.7,
        'R5.A.12': 17.1,
        'R5.A.13': 16.4,
        'R5.A.14': 15.6,
      },
    },
    ueAverages: {
      5: {
        UE51: 16.4,
        UE52: 16.7,
        UE53: 16.6,
      },
    },
  },
];

const semesterOptions: DropdownOption[] = [
  {value: 'all', label: 'Tous les semestres'},
  {value: 1, label: 'Semestre 1'},
  {value: 2, label: 'Semestre 2'},
  {value: 3, label: 'Semestre 3'},
  {value: 4, label: 'Semestre 4'},
  {value: 5, label: 'Semestre 5'},
  {value: 6, label: 'Semestre 6'},
];

const groupOptions: DropdownOption[] = [
  {value: 'all', label: 'Tous les groupes'},
  {value: 'A', label: 'Groupe Alpha'},
  {value: 'B', label: 'Groupe Beta'},
  {value: 'C', label: 'Groupe Gamma'},
];

export default function Averages() {
  const [selectedSemester, setSelectedSemester] = useState<string | number>(
    'all',
  );
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [expandedUEs, setExpandedUEs] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const toggleUE = (ueCode: string) => {
    setExpandedUEs(prev =>
      prev.includes(ueCode)
        ? prev.filter(code => code !== ueCode)
        : [...prev, ueCode],
    );
  };

  const handleExportXLSX = () => {
    console.log('Exporting to XLSX...');
  };

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
  };

  // Function to render table header for UE
  const renderUEHeader = (ue: UE) => {
    return (
      <React.Fragment key={`header-${ue.code}`}>
        <View
          style={[styles.ueHeaderCell, isDarkMode && styles.ueHeaderCellDark]}>
          <TouchableOpacity
            onPress={() => toggleUE(ue.code)}
            style={styles.ueHeaderButton}>
            <MaterialCommunityIcons
              name="chevron-down"
              color={isDarkMode ? '#fff' : '#2e3494'}
              size={16}
              style={[
                styles.chevronIcon,
                expandedUEs.includes(ue.code) && styles.chevronRotated,
              ]}
            />
            <Text style={[styles.ueCode, isDarkMode && styles.ueCodeDark]}>
              {ue.code} (ECTS: {ue.ects})
            </Text>
          </TouchableOpacity>
        </View>
        {expandedUEs.includes(ue.code) &&
          ue.modules.map(module => (
            <View
              key={module.code}
              style={[
                styles.moduleHeaderCell,
                isDarkMode && styles.moduleHeaderCellDark,
              ]}>
              <Text
                style={[
                  styles.moduleCode,
                  isDarkMode && styles.moduleCodeDark,
                ]}>
                {module.code}
              </Text>
            </View>
          ))}
      </React.Fragment>
    );
  };

  // Function to render table header for UE name
  const renderUENameHeader = (ue: UE) => {
    return (
      <React.Fragment key={`name-${ue.code}`}>
        <View
          style={[styles.ueHeaderCell, isDarkMode && styles.ueHeaderCellDark]}>
          <Text style={[styles.ueName, isDarkMode && styles.ueNameDark]}>
            {ue.name}
          </Text>
        </View>
        {expandedUEs.includes(ue.code) &&
          ue.modules.map(module => (
            <View
              key={module.code}
              style={[
                styles.moduleHeaderCell,
                isDarkMode && styles.moduleHeaderCellDark,
              ]}>
              <Text
                style={[
                  styles.moduleName,
                  isDarkMode && styles.moduleNameDark,
                ]}>
                {module.name}
              </Text>
            </View>
          ))}
      </React.Fragment>
    );
  };

  // Function to render student grades row
  const renderStudentRow = (student: Student) => {
    if (selectedGroup !== 'all' && student.group !== selectedGroup) {
      return null;
    }

    return (
      <View
        key={student.id}
        style={[styles.studentRow, isDarkMode && styles.studentRowDark]}>
        <View
          style={[
            styles.studentNameCell,
            isDarkMode && styles.studentNameCellDark,
          ]}>
          <Text
            style={[styles.studentName, isDarkMode && styles.studentNameDark]}>
            {student.lastName} {student.firstName}
          </Text>
        </View>
        {UES.map(ue => (
          <React.Fragment key={`${student.id}-${ue.code}`}>
            <View
              style={[
                styles.studentUECell,
                isDarkMode && styles.studentUECellDark,
              ]}>
              <Text style={[styles.ueGrade, isDarkMode && styles.ueGradeDark]}>
                {selectedSemester !== 'all'
                  ? student.ueAverages[selectedSemester as number]?.[
                      ue.code
                    ]?.toFixed(2) || '-'
                  : Object.keys(student.ueAverages)
                      .map(sem => student.ueAverages[parseInt(sem)]?.[ue.code])
                      .filter(grade => grade !== undefined)
                      .map(grade => grade.toFixed(2))
                      .join(', ') || '-'}
              </Text>
            </View>
            {expandedUEs.includes(ue.code) &&
              ue.modules.map(module => (
                <View
                  key={`${student.id}-${module.code}`}
                  style={[
                    styles.studentModuleCell,
                    isDarkMode && styles.studentModuleCellDark,
                  ]}>
                  <Text
                    style={[
                      styles.moduleGrade,
                      isDarkMode && styles.moduleGradeDark,
                    ]}>
                    {selectedSemester !== 'all'
                      ? student.grades[selectedSemester as number]?.[
                          module.code
                        ]?.toFixed(2) || '-'
                      : Object.keys(student.grades)
                          .map(
                            sem => student.grades[parseInt(sem)]?.[module.code],
                          )
                          .filter(grade => grade !== undefined)
                          .map(grade => grade.toFixed(2))
                          .join(', ') || '-'}
                  </Text>
                </View>
              ))}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // Filter students based on selected group
  const filteredStudents = STUDENTS.filter(
    student => selectedGroup === 'all' || student.group === selectedGroup,
  );

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
          </View>

          <View style={styles.filterItem}>
            <Text
              style={[
                styles.filterLabel,
                isDarkMode && styles.filterLabelDark,
              ]}>
              Groupe
            </Text>
          </View>
        </View>

        <ScrollView horizontal style={styles.tableContainer}>
          <View>
            {/* Table Header - Row 1 (UE Codes) */}
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
              {UES.map(ue => renderUEHeader(ue))}
            </View>

            {/* Table Header - Row 2 (UE Names) */}
            <View
              style={[styles.headerRow, isDarkMode && styles.headerRowDark]}>
              <View
                style={[
                  styles.studentHeaderCell,
                  isDarkMode && styles.studentHeaderCellDark,
                ]}
              />
              {UES.map(ue => renderUENameHeader(ue))}
            </View>

            {/* Table Body */}
            <ScrollView>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => renderStudentRow(student))
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
