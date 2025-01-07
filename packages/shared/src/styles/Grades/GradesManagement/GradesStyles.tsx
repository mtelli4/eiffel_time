import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3494',
  },
  lblAddbtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#2E3494',
    padding: 10,
    borderRadius: 5,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  moduleHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  evaluationCard: {
    padding: 16,
  },
  evaluationHeader: {
    marginBottom: 8,
  },
  evaluationTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  evaluationSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  table: {
    marginTop: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  gradeStatus: {
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 4,
  },
})
