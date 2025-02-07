// import { Clock } from 'lucide-react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ModuleHours, PlannedHours } from '../../types/types'

interface HoursPlanningProps {
  modules: ModuleHours[]
}

export function HoursPlanning({ modules }: HoursPlanningProps) {
  const getTotalHours = (hours: PlannedHours) => {
    return hours.CM + hours.TD + hours.TP
  }

  const getTotalPlannedHours = () => {
    return modules.reduce((total, module) => {
      return total + getTotalHours(module.planned)
    }, 0)
  }

  const getTotalCompletedHours = () => {
    return modules.reduce((total, module) => {
      return total + getTotalHours(module.completed)
    }, 0)
  }

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Clock size={20} color="#2C3E50" /> */}
          <Text style={styles.headerText}>Prévisionnel des heures</Text>
        </View>

        <View>
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
            <View key={module.code} style={styles.tableRow}>
              <View style={styles.moduleColumn}>
                <Text style={styles.moduleCode}>{module.code}</Text>
                <Text style={styles.moduleName}>{module.name}</Text>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.planned.CM}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.completed.CM}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.planned.TD}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.completed.TD}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text style={styles.hourText}>{module.planned.TP}h</Text>
                  <Text style={styles.completedHourText}>
                    {module.completed.TP}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <Text style={styles.totalHourText}>
                  {getTotalHours(module.planned)}h
                </Text>
              </View>
              <View style={styles.completedColumn}>
                <Text style={styles.totalHourText}>
                  {getTotalHours(module.completed)}h
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
                  (total, module) => total + module.planned.CM,
                  0
                )}
                h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>
                {modules.reduce(
                  (total, module) => total + module.planned.TD,
                  0
                )}
                h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text style={styles.totalText}>
                {modules.reduce(
                  (total, module) => total + module.planned.TP,
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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
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
    flex: 1,
    padding: 16,
  },
  hourColumn: {
    width: 80,
    padding: 16,
  },
  completedColumn: {
    width: 96,
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
