import React from 'react';
import {StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function SecuritySettings() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="shield" style={styles.icon} size={20} />
        <Text style={styles.title}>Sécurité</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Ancien mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="••••••••"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="••••••••"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="••••••••"
          />
        </View>

        <View style={styles.twoFactorAuth}>
          <Text style={styles.label}>Authentification à deux facteurs</Text>
          <Switch />
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
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  twoFactorAuth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
});
