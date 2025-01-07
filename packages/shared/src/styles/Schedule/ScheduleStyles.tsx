import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(46, 52, 148)',
    marginBottom: 16,
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
  headerCell: {
    flex: 1,
    padding: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  scheduleRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hourCell: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  dayCell: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  courseButton: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E3494',
  },
  courseRoom: {
    fontSize: 12,
    color: '#666',
  },
})
