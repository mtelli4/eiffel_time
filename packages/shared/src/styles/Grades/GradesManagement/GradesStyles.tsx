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
  backgroundColor: '#1F2937', // Matched with StudentAbsences background
  textColor: '#F9FAFB', // Light text for dark mode
  headerColor: '#fff', // White headers for dark mode
  cardBackground: '#111827', // Darker card backgrounds
  borderColor: '#374151', // Dark borders
  tableRowBorder: '#374151', // Consistent border colors
  searchBackground: '#111827', // Dark search field
  searchBorder: '#4B5563', // Darker border for search inputs
  tableBackground: '#111827', // Consistent dark background
  primaryColor: '#2E3494', // Primary color
  primaryColorDark: '#4C6FFF', // Lighter shade for dark mode
  secondaryTextColor: '#9CA3AF', // Secondary text in dark mode
  successColor: '#10B981', // Success color
  errorColor: '#EF4444', // Error color
  warningColor: '#F59E0B', // Warning color
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
      backgroundColor:
        theme === darkTheme ? darkTheme.primaryColorDark : '#2E3494',
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
      padding: 16,
      // Add shadow for light theme and border for dark theme
      ...(theme === darkTheme
        ? { borderColor: theme.borderColor, borderWidth: 1 }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }),
    },
    moduleHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    moduleTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === darkTheme ? 'white' : theme.textColor,
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
      color: theme === darkTheme ? 'white' : theme.textColor,
    },
    evaluationSubtitle: {
      fontSize: 14,
      color:
        theme === darkTheme ? darkTheme.secondaryTextColor : theme.borderColor,
    },
    table: {
      marginTop: 16,
      backgroundColor: theme.tableBackground,
      borderRadius: 8,
      overflow: 'hidden',
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
      padding: 8,
    },
    gradeStatus: {
      backgroundColor: theme === darkTheme ? '#374151' : theme.tableRowBorder,
      padding: 4,
      borderRadius: 4,
    },
    successText: {
      color: theme === darkTheme ? darkTheme.successColor : '#10B981',
    },
    errorText: {
      color: theme === darkTheme ? darkTheme.errorColor : '#EF4444',
    },
    warningText: {
      color: theme === darkTheme ? darkTheme.warningColor : '#F59E0B',
    },
  })

// Export default styles (light theme)
export const styles = createStyles(lightTheme)
