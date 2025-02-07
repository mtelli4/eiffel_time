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
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.dateCell}>
            <Text style={styles.headerText}>Date</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>CM</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>TD</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.headerText}>TP</Text>
          </View>
        </View>

        {teacher.modules.map((module) => (
          <React.Fragment key={module.code}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleText}>
                {module.code} - {module.name}
              </Text>
            </View>
            {/* Add actual attendance records here */}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB', // gray-300
  },
  dateCell: {
    flex: 1,
    padding: 16,
  },
  cell: {
    width: 96, // equivalent to w-24
    padding: 16,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280', // gray-500
    textAlign: 'center',
  },
  moduleHeader: {
    backgroundColor: '#F9FAFB', // gray-50
    padding: 16,
  },
  moduleText: {
    fontWeight: '500',
    // Note: You'll need to define your primary color here
    color: '#1F2937', // Example color, replace with your primary color
  },
})
