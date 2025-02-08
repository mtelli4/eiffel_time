import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function NotificationSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="bell" style={styles.icon} />
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Notifications par email</Text>
          <Switch />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Notifications de nouvelles notes</Text>
          <Switch />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Notifications d'absences</Text>
          <Switch />
        </View>

        <View style={styles.frequency}>
          <Text style={styles.label}>Fréquence des alertes</Text>
          {/* <Picker style={styles.picker} selectedValue="immediate">
            <Picker.Item label="Immédiate" value="immediate" />
            <Picker.Item label="Quotidienne" value="daily" />
            <Picker.Item label="Hebdomadaire" value="weekly" />
          </Picker> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  icon: {
    width: 20,
    height: 20,
    color: '#2E3494',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3494',
  },
  settings: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
  },
  frequency: {
    marginTop: 8,
  },
  picker: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
});
