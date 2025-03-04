import React from 'react';
import {StyleSheet /*Picker*/, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../shared/src/hooks/useTheme'
import { useDateFormat } from '../../../../shared/src/hooks/useDateFormat'
import { useLanguage } from '../../../../shared/src/hooks/useLanguage'

interface PersonalizationSettingsProps {
  dateFormat: string
  setDate: (newDate: string) => void
  theme: string
  setTheme: (newTheme: string) => void
  language: string
  setLanguage: (newLanguage: string) => void
}

export default function PersonalizationSettings({ dateFormat, setDate, theme, setTheme, language, setLanguage }: PersonalizationSettingsProps) {
  const { themesSelectOptions } = useTheme()
  const { dateSelectOptions } = useDateFormat()
  const { languagesSelectOptions } = useLanguage()

  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [themeValue, setThemeValue] = React.useState('light');
  const [themeItems, setThemeItems] = React.useState(themesSelectOptions);

  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [languageValue, setLanguageValue] = React.useState('fr');
  const [languageItems, setLanguageItems] = React.useState(languagesSelectOptions);

  const [isDateFormatOpen, setIsDateFormatOpen] = React.useState(false);
  const [dateFormatValue, setDateFormatValue] = React.useState('fr');
  const [dateFormatItems, setDateFormatItems] = React.useState(dateSelectOptions);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="palette" style={styles.icon} size={20} />
        <Text style={styles.title}>Personnalisation</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Thème d'interface</Text>
          <DropDownPicker
            open={isThemeOpen}
            setOpen={setIsThemeOpen}
            value={themeValue}
            setValue={setThemeValue}
            items={themeItems}
            setItems={setThemeItems}
            placeholder='Choisissez un thème'
          />
          {/* <Picker style={styles.picker} selectedValue="light">
            <Picker.Item label="Clair" value="light" />
            <Picker.Item label="Sombre" value="dark" />
            <Picker.Item label="Système" value="system" />
          </Picker> */}
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Langue</Text>
          {/* <Picker style={styles.picker} selectedValue="fr">
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="English" value="en" />
          </Picker> */}
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Format de date</Text>
          {/* <Picker style={styles.picker} selectedValue="fr">
            <Picker.Item label="DD/MM/YYYY" value="fr" />
            <Picker.Item label="MM/DD/YYYY" value="en" />
            <Picker.Item label="YYYY-MM-DD" value="iso" />
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
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  picker: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
});
