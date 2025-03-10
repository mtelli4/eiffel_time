import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../../../../shared/src/hooks/useTheme';
import {SecuritySettingsProps} from '../../../../shared/src/types/types';

export default function SecuritySettings({
  isDark: propIsDark,
}: SecuritySettingsProps) {
  const {theme} = useTheme();
  const systemTheme = useColorScheme();
  const isDark =
    propIsDark !== undefined
      ? propIsDark
      : theme === 'system'
      ? systemTheme === 'dark'
      : theme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.header}>
        <Feather
          name="shield"
          style={[styles.icon, isDark && styles.darkIcon]}
          size={20}
        />
        <Text style={[styles.title, isDark && styles.darkTitle]}>Sécurité</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Ancien mot de passe
          </Text>
          <TextInput
            style={[styles.input, isDark && styles.darkInput]}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Nouveau mot de passe
          </Text>
          <TextInput
            style={[styles.input, isDark && styles.darkInput]}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Confirmer le mot de passe
          </Text>
          <TextInput
            style={[styles.input, isDark && styles.darkInput]}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          />
        </View>

        <View style={styles.twoFactorAuth}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Authentification à deux facteurs
          </Text>
          <Switch
            trackColor={{
              false: '#767577',
              true: isDark ? '#4a5af7' : '#2E3494',
            }}
            thumbColor={isDark ? '#e5e7eb' : '#f4f3f4'}
          />
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
  darkContainer: {
    backgroundColor: '#111827',
    borderColor: '#374151',
    borderWidth: 1,
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
  darkIcon: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3494',
  },
  darkTitle: {
    color: '#fff',
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
  darkLabel: {
    color: '#e0e0e0',
  },
  input: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: '#000',
  },
  darkInput: {
    borderColor: '#4b5563',
    backgroundColor: '#374151',
    color: '#fff',
  },
  twoFactorAuth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
});
