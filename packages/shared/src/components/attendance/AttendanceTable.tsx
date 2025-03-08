import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TeacherPlanning } from '../../types/types'

interface AttendanceTableProps {
  teacher: TeacherPlanning
  theme?: 'light' | 'dark'
}

// Définition des couleurs pour les deux thèmes
const colors = {
  light: {
    headerText: '#2C3E50',
    columnHeader: '#6B7280',
    text: '#111827',
    borderBottom: '#D1D5DB',
    rowBorder: '#F3F4F6',
    moduleBackground: '#E0E7FF',
    moduleText: '#1F2937',
    background: '#FFFFFF',
  },
  dark: {
    headerText: '#E5E7EB',
    columnHeader: '#9CA3AF',
    text: '#F9FAFB',
    borderBottom: '#4B5563',
    rowBorder: '#374151',
    moduleBackground: '#1E293B',
    moduleText: '#D1D4DC',
    background: '#111827',
  },
}

export function AttendanceTable({
  teacher,
  theme = 'light',
}: AttendanceTableProps) {
  const themeColors = theme === 'dark' ? colors.dark : colors.light

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <View
          style={[
            styles.container,
            { backgroundColor: themeColors.background },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[styles.headerText, { color: themeColors.headerText }]}
            >
              Détails
            </Text>
          </View>
          <View
            style={[
              styles.headerRow,
              { borderBottomColor: themeColors.borderBottom },
            ]}
          >
            <View style={styles.dateCell}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                Date
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                CM
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                TD
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={[
                  styles.columnHeaderText,
                  { color: themeColors.columnHeader },
                ]}
              >
                TP
              </Text>
            </View>
          </View>

          {teacher.modules.map((module) => (
            <React.Fragment key={module.id_module}>
              {[
                { date: '2023-09-15', cm: 2, td: 0, tp: 4 },
                { date: '2023-09-22', cm: 4, td: 2, tp: 0 },
                { date: '2023-10-06', cm: 0, td: 4, tp: 4 },
              ].map((record) => (
                <View
                  key={record.date}
                  style={[
                    styles.row,
                    { borderBottomColor: themeColors.rowBorder },
                  ]}
                >
                  <View style={styles.dateCell}>
                    <Text style={{ color: themeColors.text }}>
                      {formatDate(record.date)}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text
                      style={[styles.centerText, { color: themeColors.text }]}
                    >
                      {record.cm}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text
                      style={[styles.centerText, { color: themeColors.text }]}
                    >
                      {record.td}
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text
                      style={[styles.centerText, { color: themeColors.text }]}
                    >
                      {record.tp}
                    </Text>
                  </View>
                </View>
              ))}
              <View
                style={[
                  styles.moduleHeader,
                  { backgroundColor: themeColors.moduleBackground },
                ]}
              >
                <Text
                  style={[styles.moduleText, { color: themeColors.moduleText }]}
                >
                  {module.codeapogee} - {module.libelle}
                </Text>
              </View>
            </React.Fragment>
          ))}
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
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    // La couleur de bordure est appliquée dynamiquement
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // La couleur de bordure est appliquée dynamiquement
  },
  dateCell: {
    flex: 3,
    padding: 16,
  },
  cell: {
    flex: 1,
    padding: 16,
  },
  centerText: {
    textAlign: 'center',
    // La couleur est appliquée dynamiquement
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    // La couleur est appliquée dynamiquement
    textAlign: 'center',
  },
  moduleHeader: {
    padding: 16,
    // La couleur de fond est appliquée dynamiquement
  },
  moduleText: {
    fontWeight: 'bold',
    // La couleur est appliquée dynamiquement
  },
})
