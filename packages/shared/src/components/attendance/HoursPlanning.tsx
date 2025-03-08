// import { Clock } from 'lucide-react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Module } from '../../types/types'

interface HoursPlanningProps {
  modules: Module[]
  theme?: 'light' | 'dark'
}

// Définition des couleurs pour les deux thèmes
const colors = {
  light: {
    headerText: '#2C3E50',
    moduleCode: '#111827',
    moduleName: '#6B7280',
    columnHeader: '#6B7280',
    completedHourText: '#6B7280',
    borderBottom: '#E5E7EB',
    rowBorder: '#F3F4F6',
    totalRowBackground: '#EEF2FF',
    totalText: '#111827',
    hourText: '#111827',
    tableBackground: '#FFFFFF',
  },
  dark: {
    headerText: '#E5E7EB',
    moduleCode: '#F9FAFB',
    moduleName: '#9CA3AF',
    columnHeader: '#9CA3AF',
    completedHourText: '#9CA3AF',
    borderBottom: '#4B5563',
    rowBorder: '#374151',
    totalRowBackground: '#1F2937',
    totalText: '#F9FAFB',
    hourText: '#F9FAFB',
    tableBackground: '#111827',
  },
}

export function HoursPlanning({
  modules,
  theme = 'light',
}: HoursPlanningProps) {
  const themeColors = theme === 'dark' ? colors.dark : colors.light

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
        <View
          style={[
            styles.container,
            { backgroundColor: themeColors.tableBackground },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[styles.headerText, { color: themeColors.headerText }]}
            >
              Prévisionnel des heures
            </Text>
          </View>

          <View
            style={[
              styles.tableHeader,
              { borderBottomColor: themeColors.borderBottom },
            ]}
          >
            <View style={styles.moduleColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                Module
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                CM
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                TD
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                TP
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                Total
              </Text>
            </View>
            <View style={styles.completedColumn}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                Effectuées
              </Text>
            </View>
          </View>

          {modules.map((module) => (
            <View
              key={module.id_module}
              style={[
                styles.tableRow,
                { borderBottomColor: themeColors.rowBorder },
              ]}
            >
              <View style={styles.moduleColumn}>
                <Text
                  style={[styles.moduleCode, { color: themeColors.moduleCode }]}
                >
                  {module.codeapogee}
                </Text>
                <Text
                  style={[styles.moduleName, { color: themeColors.moduleName }]}
                >
                  {module.libelle}
                </Text>
                <Text
                  style={[styles.moduleName, { color: themeColors.moduleName }]}
                >
                  {module.periodes.join(', ')}
                </Text>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text
                    style={[styles.hourText, { color: themeColors.hourText }]}
                  >
                    {module.prevu.CM}h
                  </Text>
                  <Text
                    style={[
                      styles.completedHourText,
                      { color: themeColors.completedHourText },
                    ]}
                  >
                    {module.effectue.CM}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text
                    style={[styles.hourText, { color: themeColors.hourText }]}
                  >
                    {module.prevu.TD}h
                  </Text>
                  <Text
                    style={[
                      styles.completedHourText,
                      { color: themeColors.completedHourText },
                    ]}
                  >
                    {module.effectue.TD}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <View style={styles.centerContent}>
                  <Text
                    style={[styles.hourText, { color: themeColors.hourText }]}
                  >
                    {module.prevu.TP}h
                  </Text>
                  <Text
                    style={[
                      styles.completedHourText,
                      { color: themeColors.completedHourText },
                    ]}
                  >
                    {module.effectue.TP}h faites
                  </Text>
                </View>
              </View>
              <View style={styles.hourColumn}>
                <Text
                  style={[
                    styles.totalHourText,
                    { color: themeColors.hourText },
                  ]}
                >
                  {getTotalHours(module.prevu)}h
                </Text>
              </View>
              <View style={styles.completedColumn}>
                <Text
                  style={[
                    styles.totalHourText,
                    { color: themeColors.hourText },
                  ]}
                >
                  {getTotalHours(module.effectue)}h
                </Text>
              </View>
            </View>
          ))}

          <View
            style={[
              styles.totalRow,
              { backgroundColor: themeColors.totalRowBackground },
            ]}
          >
            <View style={styles.moduleColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                Total
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                {modules.reduce((total, module) => total + module.prevu.CM, 0)}h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                {modules.reduce((total, module) => total + module.prevu.TD, 0)}h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                {modules.reduce((total, module) => total + module.prevu.TP, 0)}h
              </Text>
            </View>
            <View style={styles.hourColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                {getTotalPlannedHours()}h
              </Text>
            </View>
            <View style={styles.completedColumn}>
              <Text
                style={[styles.totalText, { color: themeColors.totalText }]}
              >
                {getTotalCompletedHours()}h
              </Text>
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
    // La couleur de fond est appliquée dynamiquement
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
    // La couleur est appliquée dynamiquement
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    // La couleur de bordure est appliquée dynamiquement
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // La couleur de bordure est appliquée dynamiquement
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
    // La couleur est appliquée dynamiquement
    textAlign: 'center',
  },
  moduleCode: {
    fontWeight: '500',
    // La couleur est appliquée dynamiquement
  },
  moduleName: {
    fontSize: 14,
    // La couleur est appliquée dynamiquement
  },
  centerContent: {
    alignItems: 'center',
  },
  hourText: {
    fontWeight: '500',
    // La couleur est appliquée dynamiquement
  },
  completedHourText: {
    fontSize: 14,
    // La couleur est appliquée dynamiquement
  },
  totalHourText: {
    fontWeight: '500',
    textAlign: 'center',
    // La couleur est appliquée dynamiquement
  },
  totalRow: {
    flexDirection: 'row',
    // La couleur de fond est appliquée dynamiquement
  },
  totalText: {
    fontWeight: '500',
    textAlign: 'center',
    // La couleur est appliquée dynamiquement
  },
})
