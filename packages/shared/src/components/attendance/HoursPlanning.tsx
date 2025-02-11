// import { Clock } from 'lucide-react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Module } from '../../types/types'

interface HoursPlanningProps {
  modules: Module[]
}

export function HoursPlanning({ modules }: HoursPlanningProps) {
  const getTotalHours = (heures: { CM: number; TD: number; TP: number }) => {
    return heures.CM + heures.TD + heures.TP
  }

  const getTotalPlannedHours = () => {
    return modules.reduce((total, module) => {
      return total + getTotalHours(module.prevu)
    }, 0)
  }

  const getTotalCompletedHours = () => {
    return modules.reduce((total, module) => {
      return total + getTotalHours(module.effectue)
    }, 0)
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Prévisionnel des heures</Text>
          </View>

          <View style={styles.tableHeader}>
            <View style={styles.moduleColumn}>
              <Text style={styles.columnHeaderText}>Module</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.columnHeaderText}>CM</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.columnHeaderText}>TD</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.columnHeaderText}>TP</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.columnHeaderText}>Total</Text>
            </View>
            <View style={styles.completedColumn}>
              <Text style={styles.columnHeaderText}>Effectuées</Text>
            </View>
          </View>

          {modules.map((module) => (
            <View key={module.id_module} style={styles.tableRow}>
              <View style={styles.moduleColumn}>
                <Text style={styles.moduleCode}>{module.codeapogee}</Text>
                <Text style={styles.moduleName}>{module.libelle}</Text>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.prevu.CM}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.effectue.CM}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.prevu.TD}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.effectue.TD}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.prevu.TP}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.effectue.TP}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <Text style={styles.totalHourText}>
                  {getTotalHours(module.prevu)}h
                </Text>
              </View>
              <View style={styles.completedColumn}>
                <Text style={styles.totalHourText}>
                  {getTotalHours(module.effectue)}h
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.totalRow}>
            <View style={styles.moduleColumn}>
              <Text style={styles.totalText}>Total</Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>
                {modules.reduce(
                  (total, module) => total + module.prevu.CM,
                  0
                )}
                h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>
                {modules.reduce(
                  (total, module) => total + module.prevu.TD,
                  0
                )}
                h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>
                {modules.reduce(
                  (total, module) => total + module.prevu.TP,
                  0
                )}
                h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>{getTotalPlannedHours()}h</Text>
            </View>
            <View style={styles.completedColumn}>
              <Text style={styles.totalText}>{getTotalCompletedHours()}h</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  moduleColumn: {
    flex: 3,
    padding: 16,
  },
  hourColumn: {
    flex: 1,
    padding: 16,
  },
  completedColumn: {
    flex: 1,
    padding: 16,
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  moduleCode: {
    fontWeight: '500',
    color: '#111827',
  },
  moduleName: {
    fontSize: 14,
    color: '#6B7280',
  },
  centerContent: {
    alignItems: 'center',
  },
  hourText: {
    fontWeight: '500',
  },
  completedHourText: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalHourText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
  },
  totalText: {
    fontWeight: '500',
    textAlign: 'center',
  },
})
