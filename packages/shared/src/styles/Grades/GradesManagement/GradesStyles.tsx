import { StyleSheet } from 'react-native'

// Define theme colors
export const lightTheme = {
  backgroundColor: '#fff',
  textColor: '#555',
  headerColor: '#2E3494',
  cardBackground: '#fff',
  borderColor: '#ccc',
  tableRowBorder: '#eee',
  searchBackground: '#fff',
  searchBorder: '#ccc',
  tableBackground: '#fff',
}

export const darkTheme = {
  backgroundColor: '#1f2937', // bg-gray-900
  textColor: '#f9fafb', // text-gray-50
  headerColor: '#fff',
  cardBackground: '#111827', // bg-gray-800
  borderColor: '#d1d5db', // border-gray-700
  tableRowBorder: '#d1d5db', // border-gray-700
  searchBackground: '#111827', // bg-gray-800
  searchBorder: '#374151', // border-gray-700
  tableBackground: '#111827', // bg-gray-900
}

export const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.backgroundColor,
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
      color: theme.headerColor,
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
      backgroundColor: theme.searchBackground,
      padding: 10,
      borderRadius: 5,
      borderColor: theme.searchBorder,
      borderWidth: 1,
      color: theme.textColor,
    },
    moduleCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 8,
      marginBottom: 16,
    },
    moduleHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    moduleTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textColor,
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
      color: theme.textColor,
    },
    evaluationSubtitle: {
      fontSize: 14,
      color: theme.borderColor,
    },
    table: {
      marginTop: 16,
      backgroundColor: theme.tableBackground,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.tableRowBorder,
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
      color: theme.textColor,
    },
    gradeStatus: {
      backgroundColor: theme.tableRowBorder,
      padding: 4,
      borderRadius: 4,
    },
  })

// Export default styles (light theme)
export const styles = createStyles(lightTheme)
