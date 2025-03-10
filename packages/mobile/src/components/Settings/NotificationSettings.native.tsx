import React from 'react';
import {StyleSheet, Switch, Text, View, useColorScheme} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../../../../shared/src/hooks/useTheme';

interface NotificationSettingsProps {
  isDark?: boolean; // Le "?" rend la prop optionnelle
}

export default function NotificationSettings({
  isDark: propIsDark,
}: NotificationSettingsProps) {
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
          name="bell"
          style={[styles.icon, isDark && styles.darkIcon]}
          size={20}
        />
        <Text style={[styles.title, isDark && styles.darkTitle]}>
          Notifications
        </Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Notifications par email
          </Text>
          <Switch
            trackColor={{
              false: '#767577',
              true: isDark ? '#4a5af7' : '#2E3494',
            }}
            thumbColor={isDark ? '#e5e7eb' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Notifications de nouvelles notes
          </Text>
          <Switch
            trackColor={{
              false: '#767577',
              true: isDark ? '#4a5af7' : '#2E3494',
            }}
            thumbColor={isDark ? '#e5e7eb' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Notifications d'absences
          </Text>
          <Switch
            trackColor={{
              false: '#767577',
              true: isDark ? '#4a5af7' : '#2E3494',
            }}
            thumbColor={isDark ? '#e5e7eb' : '#f4f3f4'}
          />
        </View>

        <View style={styles.frequency}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Fréquence des alertes
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
  },
  darkLabel: {
    color: '#e0e0e0',
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
