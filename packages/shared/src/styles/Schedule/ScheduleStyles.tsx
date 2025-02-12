// ScheduleStyles.tsx
import { StyleSheet } from 'react-native'

// Hauteur fixe pour chaque cellule d'heure (11 heures au total)
const HOUR_HEIGHT = 70
const HOURS_COLUMN_WIDTH = 50
const TOTAL_HOURS = 11

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    margin: 10,
  },
  scheduleContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerHourCell: {
    width: HOURS_COLUMN_WIDTH,
    padding: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  headerDayCell: {
    flex: 1,
    padding: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
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
    backgroundColor: '#ddd',
  },
  hoursColumn: {
    width: 50,
    zIndex: 1, // Pour s'assurer que la colonne des heures reste au-dessus des lignes
  },
  hourCell: {
    height: HOUR_HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hourText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dayColumn: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    height: HOUR_HEIGHT * TOTAL_HOURS,
    position: 'relative',
  },
  courseRoom: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
  },
  courseButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(197, 225, 255)',
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
    alignItems: 'flex-start', // Added this line
    zIndex: 2,
  },
  courseTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E3494',
  },
  // Ajout des styles pour la troncature
  courseContent: {
    width: '100%',
    overflow: 'hidden',
  },
  courseText: {
    width: '100%',
  },
})
