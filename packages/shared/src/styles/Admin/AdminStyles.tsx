// AdminStyles.js
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#2E3494',
  },
  inactiveTabButton: {
    backgroundColor: '#fff',
  },
  tabIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#6c757d',
  },
  content: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E3494',
    padding: 8,
    borderRadius: 8,
  },
  addIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
  },
})
