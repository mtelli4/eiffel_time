import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TeacherPlanning } from '../../types/types'

interface AttendanceTableProps {
  teacher: TeacherPlanning
}

export function AttendanceTable({ teacher }: AttendanceTableProps) {
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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Détails</Text>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.dateCell}>
              <Text style={styles.columnHeaderText}>Date</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.columnHeaderText}>CM</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.columnHeaderText}>TD</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.columnHeaderText}>TP</Text>
            </View>
          </View>

          {teacher.modules.map((module) => (
            <React.Fragment key={module.code}>
              {[
                { date: '2023-09-15', cm: 2, td: 0, tp: 4 },
                { date: '2023-09-22', cm: 4, td: 2, tp: 0 },
                { date: '2023-10-06', cm: 0, td: 4, tp: 4 },
              ].map((record) => (
                <View key={record.date} style={styles.row}>
                  <View style={styles.dateCell}>
                    <Text>{formatDate(record.date)}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.centerText}>{record.cm}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.centerText}>{record.td}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.centerText}>{record.tp}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleText}>
                  {module.code} - {module.name}
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
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
  },
  row: {
    flexDirection: 'row',
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
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  moduleHeader: {
    backgroundColor: '#E0E7FF',
    padding: 16,
  },
  moduleText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
})
