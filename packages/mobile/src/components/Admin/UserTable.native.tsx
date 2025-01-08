import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  formation?: string;
  group?: string;
  type?: string;
}

interface UserTableProps {
  users: User[];
  isAdmin: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({users, isAdmin, onEdit, onDelete}: UserTableProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Nom</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Rôle</Text>
            <Text style={styles.headerCell}>Formation</Text>
            <Text style={styles.headerCell}>Groupe</Text>
            <Text style={styles.headerCell}>Type</Text>
            <Text style={styles.headerCellActions}>Actions</Text>
          </View>
          {users.map(user => (
            <View key={user.id} style={styles.row}>
              <Text style={styles.cell}>{user.id}</Text>
              <Text style={styles.cell}>{user.name}</Text>
              <Text style={styles.cell}>{user.email}</Text>
              <Text style={styles.cell}>{user.role}</Text>
              <Text style={styles.cell}>{user.formation || '-'}</Text>
              <Text style={styles.cell}>{user.group || '-'}</Text>
              <Text style={styles.cell}>{user.type || '-'}</Text>
              <View style={styles.actionsCell}>
                <TouchableOpacity
                  onPress={() => onEdit(user)}
                  style={styles.iconButton}>
                  <Feather name="edit-2" size={16} color="#3498DB" />
                </TouchableOpacity>
                {isAdmin && (
                  <TouchableOpacity
                    onPress={() => onDelete(user)}
                    style={styles.iconButton}>
                    <Feather name="trash-2" size={16} color="#E74C3C" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ECF0F1',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#2C3E50',
    paddingHorizontal: 8,
    fontSize: 14,
  },
  headerCellActions: {
    width: 100,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'right',
    paddingHorizontal: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cell: {
    flex: 1,
    color: '#2C3E50',
    paddingHorizontal: 8,
    fontSize: 14,
  },
  actionsCell: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
});
