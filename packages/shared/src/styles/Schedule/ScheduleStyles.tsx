// ScheduleStyles.tsx
import { StyleSheet } from 'react-native'

// Hauteur fixe pour chaque cellule d'heure (11 heures au total)
const HOUR_HEIGHT = 70
const HOURS_COLUMN_WIDTH = 50
const TOTAL_HOURS = 11

// Define theme colors
export const lightTheme = {
  backgroundColor: '#fff',
  textColor: '#555',
  headerColor: '#2C3E50',
  borderColor: '#ddd',
  gridLineColor: '#ddd',
  courseBackground: 'rgb(197, 225, 255)',
  courseTextColor: '#2E3494',
  courseRoomColor: '#666',
  shadowColor: '#000',
}

export const darkTheme = {
  backgroundColor: '#1F2937', // bg-gray-900
  textColor: '#E5E7EB', // text-gray-200
  headerColor: '#fff',
  borderColor: '#4B5563', // border-gray-600
  gridLineColor: '#374151', // border-gray-700
  courseBackground: '#2E3494', // primary dark color
  courseTextColor: '#fff',
  courseRoomColor: '#D1D5DB', // text-gray-300
  shadowColor: '#000',
}

export const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 10,
      margin: 10,
    },
    dateRangeText: {
      color: theme.textColor,
    },
    scheduleContainer: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 8,
      shadowColor: theme.shadowColor,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    scheduleHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerHourCell: {
      width: HOURS_COLUMN_WIDTH,
      padding: 12,
      fontWeight: '500',
      color: theme.headerColor,
      textAlign: 'center',
    },
    headerDayCell: {
      flex: 1,
      padding: 12,
      fontWeight: '500',
      color: theme.headerColor,
      textAlign: 'center',
      borderLeftWidth: 1,
      borderLeftColor: theme.borderColor,
    },
    scheduleContent: {
      flexDirection: 'row',
      position: 'relative', // Pour que les lignes de la grille se positionnent correctement
    },
    gridLines: {
      position: 'absolute',
      left: 50, // Largeur de la colonne des heures
      right: 0,
      top: 0,
      height: HOUR_HEIGHT * TOTAL_HOURS,
    },
    horizontalLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.gridLineColor,
    },
    hoursColumn: {
      width: 50,
      zIndex: 1, // Pour s'assurer que la colonne des heures reste au-dessus des lignes
      backgroundColor: theme.backgroundColor,
    },
    hourCell: {
      height: HOUR_HEIGHT,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    hourText: {
      fontSize: 12,
      color: theme.textColor,
      textAlign: 'center',
    },
    daysContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    dayColumn: {
      flex: 1,
      borderLeftWidth: 1,
      borderLeftColor: theme.borderColor,
      height: HOUR_HEIGHT * TOTAL_HOURS,
      position: 'relative',
    },
    courseRoom: {
      marginTop: 4,
      fontSize: 10,
      color: theme.courseRoomColor,
    },
    courseButton: {
      padding: 8,
      borderRadius: 4,
      backgroundColor: theme.courseBackground,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      zIndex: 2,
    },
    courseTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.courseTextColor,
    },
    courseContent: {
      width: '100%',
      overflow: 'hidden',
    },
    courseText: {
      width: '100%',
    },
    emptyMessage: {
      textAlign: 'center',
      color: theme.textColor,
      padding: 20,
    },
  })

// Export default styles (light theme)
export const styles = createStyles(lightTheme)
