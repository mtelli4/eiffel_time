import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  Formation,
  FormationUtilisateur,
  Utilisateur,
} from '../../../../shared/src/backend/classes';

// Utilisez l'IP de votre machine pour Android
const API_URL = Platform.select({
  ios: 'http://localhost:4000',
  android: 'http://10.0.2.2:4000', // Pour l'émulateur Android
  // Si vous utilisez un appareil physique Android, utilisez l'IP de votre machine
  // android: 'http://192.168.1.XX:4000',
});

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
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formationUsers, setFormationUsers] = useState<FormationUtilisateur[]>(
    [],
  );

  useEffect(() => {
    fetch(`${API_URL}/api/data`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        const formations = data.formations.map((f: any) => new Formation(f));
        setFormations(formations);

        const formationUsers = data.formation_utilisateur.map(
          (fu: any) => new FormationUtilisateur(fu),
        );
        setFormationUsers(formationUsers);
      })
      .catch(error => {
        console.error(
          'Erreur lors de la récupération des utilisateurs:',
          error,
        );
      });
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.idCell]}>ID</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>Nom</Text>
          <Text style={[styles.headerCell, styles.emailCell]}>Email</Text>
          <Text style={[styles.headerCell, styles.roleCell]}>Rôle</Text>
          <Text style={[styles.headerCell, styles.formationCell]}>
            Formation
          </Text>
          <Text style={[styles.headerCellActions, styles.actionsHeaderCell]}>
            Actions
          </Text>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      <View style={styles.tableContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollViewContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {users.map(user => (
                <View key={user.getId()} style={styles.row}>
                  <Text style={[styles.cell, styles.idCell]}>
                    {user.getId()}
                  </Text>
                  <Text style={[styles.cell, styles.nameCell]}>
                    {user.getFullName()}
                  </Text>
                  <Text style={[styles.cell, styles.emailCell]}>
                    {user.getEmail()}
                  </Text>
                  <Text style={[styles.cell, styles.roleCell]}>
                    {user.getStatutName()}
                  </Text>
                  <Text style={[styles.cell, styles.formationCell]}>
                    {formationUsers
                      .filter(fu => fu.getIdUtilisateur() === user.getId())
                      .map(fu => {
                        const formation = formations.find(
                          f => f.getId() === fu.getIdFormation(),
                        );
                        return formation ? formation.getLibelle() : '';
                      })
                      .join(', ') || '-'}
                  </Text>
                  <View style={[styles.actionsCell]}>
                    {isAdmin && (
                      <>
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
                      </>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
