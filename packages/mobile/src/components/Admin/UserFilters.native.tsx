import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UserFiltersProps} from '../../../../shared/src/types/types';
import { ROLES, TEACHER_TYPES } from '../../../../shared/src/types/types';

export function UserFilters({ onFilterChange, formations, groupes }: UserFiltersProps) {
  const renderDropdown = (
    data: {label: string; value: string}[],
    placeholder: string,
    onValueChange: (value: string) => void,
  ) => {
    return (
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onValueChange}
      />
    );
  };

  const handleFilterChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value)
  }

  const onRoleChange = (value: string) => {
    handleFilterChange('role', value)
  }

  const onGroupChange = (value: string) => {
    handleFilterChange('group', value)
  }

  const onFormationChange = (value: string) => {
    handleFilterChange('formation', value)
  }

  const onTypeChange = (value: string) => {
    handleFilterChange('type', value)
  }

  const onSearch = (value: string) => {
    handleFilterChange('search', value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Rôle</Text>
          {renderDropdown(ROLES, 'Tous les rôles', onRoleChange)}
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Groupe</Text>
          {/* {renderDropdown(, 'Tous les groupes', onGroupChange)} */}
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Formation</Text>
          {renderDropdown(
            formations,
            'Toutes les formations',
            onFormationChange,
          )}
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Type de professeur</Text>
          {/* {renderDropdown(TEACHER_TYPES, 'Tous les types', onTypeChange)} */}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un utilisateur..."
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    flexBasis: '45%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    color: '#2C3E50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    fontSize: 16,
    color: 'gray',
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#2C3E50',
  },
});
