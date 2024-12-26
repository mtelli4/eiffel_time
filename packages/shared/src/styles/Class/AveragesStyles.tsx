import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3494',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  btnXLSX: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2E3494',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  btnPDF: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2E3494',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#2E3494',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'left',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'left',
    padding: 10,
  },
  chevron: {
    width: 16,
    height: 16,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  headerButton: {
    padding: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
})
