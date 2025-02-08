import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../../../shared/src/styles/Averages/AveragesStyles'; // Import the styles

// import { ChevronDown } from 'lucide-react-native'; // Assurez-vous que cette bibliothèque existe pour React Native

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
  grades: Record<string, number>;
  ueAverages: Record<string, number>;
}

const SEMESTERS = [1, 2, 3, 4, 5, 6];
const GROUPS = ['A1', 'A2', 'B1', 'B2'];

const UES: UE[] = [
  {
    code: 'UE51',
    name: 'Semestre 5 BC1',
    ects: 10,
    modules: [
      {code: 'S5.A.01', name: 'Développement avancé'},
      {code: 'R5.A.04', name: 'Qualité algorithmique'},
      {code: 'R5.A.05', name: 'Programmation avancée'},
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
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
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
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
      {
        code: 'R5.A.06',
        name: 'Sensibilisation à la programmation multimédia',
      },
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
    group: 'A1',
    grades: {
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
    ueAverages: {
      UE51: 15.4,
      UE52: 15.7,
      UE53: 15.6,
    },
  },
  {
    id: '22001235',
    firstName: 'Marie',
    lastName: 'MARTIN',
    group: 'A1',
    grades: {
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
      'R5.01': 16.8,
      'R5.02': 17.5,
      'R5.03': 16.3,
    },
    ueAverages: {
      UE51: 16.4,
      UE52: 16.7,
      UE53: 16.6,
    },
  },
];

export default function ClassAverages() {
  const [selectedSemester, setSelectedSemester] = useState<number>();
  const [selectedGroup, setSelectedGroup] = useState<string>('A1');
  const [expandedUEs, setExpandedUEs] = useState<string[]>([]);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleExportXLSX} style={styles.btnXLSX}>
            <Text style={styles.btnText}>Exporter XLSX</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExportPDF} style={styles.btnPDF}>
            <Text style={styles.btnText}>Exporter PDF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Semestre</Text>
          {/*
 <Picker
            selectedValue={selectedSemester}
            onValueChange={(itemValue: string | number) =>
              setSelectedSemester(itemValue ? Number(itemValue) : undefined)
            }
            style={styles.picker}
          >
            <Picker.Item label="Tous les semestres" value="" />
            {SEMESTERS.map((semester: number) => (
              <Picker.Item
                key={semester}
                label={`Semestre ${semester}`}
                value={semester}
              />
            ))}
          </Picker> */}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Groupe</Text>
          {/* <Picker
            selectedValue={selectedGroup}
            onValueChange={(itemValue: string) => setSelectedGroup(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Tous les groupes" value="" />
            {GROUPS.map((group: string) => (
              <Picker.Item
                key={group}
                label={`Groupe ${group}`}
                value={group}
              />
            ))}
          </Picker> */}
        </View>

        <ScrollView horizontal={true} style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Étudiant</Text>
              {UES.map(ue => (
                <React.Fragment key={ue.code}>
                  <TouchableOpacity
                    onPress={() => toggleUE(ue.code)}
                    style={[styles.tableHeaderCell, styles.headerButton]}>
                    <View style={styles.headerContent}>
                      {/* <ChevronDown
                        style={[
                          styles.chevron,
                          expandedUEs.includes(ue.code) &&
                            styles.chevronRotated,
                        ]}
                      /> */}
                      <Text style={styles.headerText}>
                        {ue.code} (ECTS: {ue.ects})
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {expandedUEs.includes(ue.code) &&
                    ue.modules.map(module => (
                      <Text key={module.code} style={styles.tableHeaderCell}>
                        {module.code}
                      </Text>
                    ))}
                </React.Fragment>
              ))}
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}></Text>
              {UES.map(ue => (
                <React.Fragment key={ue.code}>
                  <Text style={styles.tableHeaderCell}>{ue.name}</Text>
                  {expandedUEs.includes(ue.code) &&
                    ue.modules.map(module => (
                      <Text key={module.code} style={styles.tableHeaderCell}>
                        {module.name}
                      </Text>
                    ))}
                </React.Fragment>
              ))}
            </View>
            {STUDENTS.filter(student => student.group === selectedGroup).map(
              student => (
                <View key={student.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>
                    {student.lastName} {student.firstName}
                  </Text>
                  {UES.map(ue => (
                    <React.Fragment key={ue.code}>
                      <Text style={styles.tableCell}>
                        {student.ueAverages[ue.code]?.toFixed(2) || '-'}
                      </Text>
                      {expandedUEs.includes(ue.code) &&
                        ue.modules.map(module => (
                          <Text key={module.code} style={styles.tableCell}>
                            {student.grades[module.code]?.toFixed(2) || '-'}
                          </Text>
                        ))}
                    </React.Fragment>
                  ))}
                </View>
              ),
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
