import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { API_URL, ROLES, Utilisateur } from '../../../../shared/src/types/types';
import { DataTable } from 'react-native-paper';

interface UserTableProps {
  users: Utilisateur[];
  isAdmin: boolean;
  onEdit: (user: Utilisateur) => void;
  onDelete: (user: Utilisateur) => void;
  filters: {
    role: string,
    formation: string,
    groupe: string,
    type: string,
    search: string,
  };
  loading: boolean;
}

export function UserTable({
  users,
  isAdmin,
  onEdit,
  onDelete,
  filters,
  loading,
}: UserTableProps) {
  const renderHeader = () => (
    <DataTable.Header style={styles.headerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable.Title style={[styles.headerCell, styles.idCell]}>ID</DataTable.Title>
        <DataTable.Title style={[styles.headerCell, styles.nameCell]}>Nom</DataTable.Title>
        <DataTable.Title style={[styles.headerCell, styles.nameCell]}>Prénom</DataTable.Title>
        <DataTable.Title style={[styles.headerCell, styles.emailCell]}>Email</DataTable.Title>
        <DataTable.Title style={[styles.headerCell, styles.roleCell]}>Rôle</DataTable.Title>
        <DataTable.Title style={[styles.headerCell, styles.formationCell]}>Formation</DataTable.Title>
        <DataTable.Title style={[styles.headerCellActions, styles.actionsHeaderCell]}>Actions</DataTable.Title>
      </ScrollView>
    </DataTable.Header>
  );

  return (
    <View style={styles.mainContainer}>
      <DataTable style={styles.tableContainer}>
        <DataTable.Header style={styles.headerContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable.Title style={[styles.headerCell, styles.idCell]}>ID</DataTable.Title>
            <DataTable.Title style={[styles.headerCell, styles.nameCell]}>Nom</DataTable.Title>
            <DataTable.Title style={[styles.headerCell, styles.nameCell]}>Prénom</DataTable.Title>
            <DataTable.Title style={[styles.headerCell, styles.emailCell]}>Email</DataTable.Title>
            <DataTable.Title style={[styles.headerCell, styles.roleCell]}>Rôle</DataTable.Title>
            <DataTable.Title style={[styles.headerCell, styles.formationCell]}>Formation</DataTable.Title>
            <DataTable.Title style={[styles.headerCellActions, styles.actionsHeaderCell]}>Actions</DataTable.Title>
          </ScrollView>
        </DataTable.Header>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.scrollViewContent}>
          {loading ? (
            <DataTable.Row>
              <DataTable.Cell>Chargement...</DataTable.Cell>
            </DataTable.Row>
          ) : users.length === 0 ? (
            <DataTable.Row>
              <DataTable.Cell>Aucun utilisateur trouvé</DataTable.Cell>
            </DataTable.Row>
          ) : (
            users.map((user) => (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DataTable.Row key={user.id_utilisateur} style={styles.row}>
                  <DataTable.Cell style={styles.idCell}>{user.id_utilisateur}</DataTable.Cell>
                  <DataTable.Cell style={styles.nameCell}>{user.nom}</DataTable.Cell>
                  <DataTable.Cell style={styles.nameCell}>{user.prenom}</DataTable.Cell>
                  <DataTable.Cell style={styles.emailCell}>{user.email}</DataTable.Cell>
                  <DataTable.Cell style={styles.roleCell}>{ROLES.find(r => r.value === user.statut)?.label}</DataTable.Cell>
                  <DataTable.Cell style={styles.formationCell}>
                    {user.formations.map(f => f.libelle).sort().join(', ') || '-'}
                  </DataTable.Cell>
                  {isAdmin && (
                    <DataTable.Cell style={styles.actionsCell}>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => onEdit(user)}>
                        <Feather name="edit" size={16} color="#3498DB" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => onDelete(user)}>
                        <Feather name="trash-2" size={16} color="#E74C3C" />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  )}
                </DataTable.Row>
              </ScrollView>
            ))
          )}
        </ScrollView>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 300,
  },
  headerContainer: {
    backgroundColor: '#ECF0F1',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  tableContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#2C3E50',
    paddingHorizontal: 8,
    fontSize: 14,
  },
  headerCellActions: {
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
  actionsHeaderCell: {
    width: 100,
  },
  idCell: {
    width: 50,
  },
  nameCell: {
    width: 150,
  },
  emailCell: {
    width: 200,
  },
  roleCell: {
    width: 100,
  },
  formationCell: {
    width: 150,
  },
  groupCell: {
    width: 100,
  },
  typeCell: {
    width: 100,
  },
  iconButton: {
    marginLeft: 8,
  },
});
