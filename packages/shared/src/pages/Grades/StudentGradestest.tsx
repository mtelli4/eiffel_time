import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const MOCK_UES = [
  {
    id: 'ue1',
    code: 'UE51',
    name: 'Semestre 5 BC1',
    ects: 10,
    average: 15.4,
    modules: [
      {
        id: 'mod1',
        code: 'M5101',
        name: 'Développement Web',
        average: 15.5,
        hours: {
          CM: 10,
          TD: 20,
          TP: 20,
        },
        grades: [
          {
            id: 'grade1',
            value: 16,
            maxValue: 20,
            coefficient: 1,
            date: '2024-03-15',
            name: 'TP1 - React',
          },
          {
            id: 'grade2',
            value: 15,
            maxValue: 20,
            coefficient: 2,
            date: '2024-03-20',
            name: 'Contrôle Final',
          },
        ],
      },
      {
        id: 'mod2',
        code: 'M5102',
        name: 'Base de données',
        average: 14.8,
        hours: {
          CM: 15,
          TD: 15,
          TP: 15,
        },
        grades: [
          {
            id: 'grade3',
            value: 14,
            maxValue: 20,
            coefficient: 1,
            date: '2024-03-10',
            name: 'TP1 - SQL',
          },
          {
            id: 'grade4',
            value: 15,
            maxValue: 20,
            coefficient: 2,
            date: '2024-03-25',
            name: 'Contrôle Final',
          },
        ],
      },
    ],
  },
]

export const Grades = () => {
  const [expandedUEs, setExpandedUEs] = useState<string[]>([])
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const toggleUE = (ueId: string) => {
    setExpandedUEs((prev) =>
      prev.includes(ueId) ? prev.filter((id) => id !== ueId) : [...prev, ueId]
    )
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_UES}
        keyExtractor={(item) => item.id}
        renderItem={({ item: ue }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleUE(ue.id)}
              style={styles.header}
            >
              <View>
                <Text style={styles.title}>{`${ue.code} - ${ue.name}`}</Text>
                <Text style={styles.subtitle}>{`ECTS: ${
                  ue.ects
                } • Moyenne: ${ue.average.toFixed(2)}/20`}</Text>
              </View>
              <Icon
                name={
                  expandedUEs.includes(ue.id) ? 'chevron-up' : 'chevron-down'
                }
                size={24}
              />
            </TouchableOpacity>

            {expandedUEs.includes(ue.id) && (
              <FlatList
                data={ue.modules}
                keyExtractor={(item) => item.id}
                renderItem={({ item: module }) => (
                  <View style={styles.moduleCard}>
                    <TouchableOpacity
                      onPress={() => toggleModule(module.id)}
                      style={styles.moduleHeader}
                    >
                      <View>
                        <Text
                          style={styles.moduleTitle}
                        >{`${module.code} - ${module.name}`}</Text>
                        <Text
                          style={styles.moduleSubtitle}
                        >{`Moyenne: ${module.average.toFixed(2)}/20`}</Text>
                      </View>
                      <Icon
                        name={
                          expandedModules.includes(module.id)
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={20}
                      />
                    </TouchableOpacity>

                    {expandedModules.includes(module.id) && (
                      <View style={styles.moduleContent}>
                        <Text
                          style={styles.hours}
                        >{`${module.hours.CM}h CM, ${module.hours.TD}h TD, ${module.hours.TP}h TP`}</Text>
                        <FlatList
                          data={module.grades}
                          keyExtractor={(grade) => grade.id}
                          renderItem={({ item: grade }) => (
                            <View style={styles.gradeRow}>
                              <Text>
                                {new Date(grade.date).toLocaleDateString(
                                  'fr-FR'
                                )}
                              </Text>
                              <Text>{grade.name}</Text>
                              <Text>{`${grade.value}/${grade.maxValue}`}</Text>
                              <Text>{grade.coefficient}</Text>
                            </View>
                          )}
                        />
                      </View>
                    )}
                  </View>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  moduleCard: {
    marginTop: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  moduleSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  moduleContent: {
    padding: 16,
  },
  hours: {
    marginBottom: 16,
    fontSize: 12,
    color: '#666',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
})

export default Grades
