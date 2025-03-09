import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  exportButtonDark: {
    backgroundColor: '#2e3494', // Couleur primaire du thème sombre comme dans le web
    borderColor: '#444',
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  exportButtonTextDark: {
    color: '#fff',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  cardDark: {
    backgroundColor: '#111827', // gray-900 du thème dark
    shadowColor: '#000',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  filterItem: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  filterLabelDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  dropdown: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownDark: {
    backgroundColor: '#374151', // gray-700 du thème dark
    borderColor: '#D1D5DB', // gray-600 du thème dark
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  dropdownTextDark: {
    color: '#fff',
  },
  dropdownMenu: {
    borderRadius: 4,
    backgroundColor: 'white',
  },
  dropdownMenuDark: {
    backgroundColor: '#374151', // gray-700 du thème dark
  },
  dropdownRow: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownRowDark: {
    borderBottomColor: '#D1D5DB', // gray-600 du thème dark
  },
  dropdownRowText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  dropdownRowTextDark: {
    color: '#fff',
  },
  tableContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  headerRowDark: {
    borderBottomColor: '#6B7280', // gray-600 du thème dark
  },
  studentHeaderCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  studentHeaderCellDark: {
    backgroundColor: '#111827', // gray-900 du thème dark
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  headerTextDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  ueHeaderCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  ueHeaderCellDark: {
    backgroundColor: '#1F2937', // gray-800 du thème dark
    borderLeftColor: '#D1D5DB', // gray-600 du thème dark
  },
  ueHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ueCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e3494',
  },
  ueCodeDark: {
    color: '#fff', // Blanc pour le thème sombre
  },
  ueName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  ueNameDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  chevronIcon: {
    marginRight: 4,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  moduleHeaderCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  moduleHeaderCellDark: {
    borderLeftColor: '#D1D5DB', // gray-600 du thème dark
  },
  moduleCode: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  moduleCodeDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  moduleName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  moduleNameDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  studentRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  studentRowDark: {
    borderBottomColor: '#D1D5DB', // gray-600 du thème dark
  },
  studentNameCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  studentNameCellDark: {
    backgroundColor: '#111827', // gray-900 du thème dark
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  studentNameDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  studentUECell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  studentUECellDark: {
    backgroundColor: '#1F2937', // gray-800 du thème dark
    borderLeftColor: '#D1D5DB', // gray-600 du thème dark
  },
  ueGrade: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ueGradeDark: {
    color: '#fff',
  },
  studentModuleCell: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  studentModuleCellDark: {
    borderLeftColor: '#D1D5DB', // gray-600 du thème dark
  },
  moduleGrade: {
    fontSize: 14,
    color: '#333',
  },
  moduleGradeDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
  emptyStateRow: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  emptyStateRowDark: {
    borderBottomColor: '#D1D5DB', // gray-600 du thème dark
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
  },
  emptyStateTextDark: {
    color: '#d1d5db', // gray-300 du thème dark
  },
})
