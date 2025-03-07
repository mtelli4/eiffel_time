import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const [themeValue, setThemeValue] = React.useState(theme);
  const [themeItems, setThemeItems] = React.useState(themesSelectOptions);

  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [languageValue, setLanguageValue] = React.useState(language);
  const [languageItems, setLanguageItems] = React.useState(languagesSelectOptions);

  const [isDateFormatOpen, setIsDateFormatOpen] = React.useState(false);
  const [dateFormatValue, setDateFormatValue] = React.useState(dateFormat);
  const [dateFormatItems, setDateFormatItems] = React.useState(dateSelectOptions);

  // Configurer DropDownPicker
  useEffect(() => {
    DropDownPicker.setListMode('MODAL');
  }, []);

  useEffect(() => {
    setTheme(themeValue);
  }, [themeValue]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme === 'light' ? '#fff' : '#2E3494' }}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="palette" style={{ ...styles.icon, color: theme === 'light' ? '#2E3494' : '#fff' }} size={20} />
        <Text style={{ ...styles.title, color: theme === 'light' ? '#2E3494' : '#fff' }}>Personnalisation</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={{ ...styles.label, color: theme === 'light' ? '#4B5563' : '#D1D5DB' }}>Thème d'interface</Text>
          <DropDownPicker
            open={isThemeOpen}
            setOpen={setIsThemeOpen}
            value={themeValue as string}
            setValue={setThemeValue}
            items={themeItems}
            setItems={setThemeItems}
            placeholder='Choisissez un thème'
            ArrowDownIconComponent={() => <MaterialCommunityIcons name="chevron-down" style={styles.icon} size={20} />}
            ArrowUpIconComponent={() => <MaterialCommunityIcons name="chevron-up" style={styles.icon} size={20} />}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Langue</Text>
          <DropDownPicker
            open={isLanguageOpen}
            setOpen={setIsLanguageOpen}
            value={languageValue}
            setValue={setLanguageValue}
            items={languageItems}
            setItems={setLanguageItems}
            placeholder='Choisissez une langue'
            ArrowDownIconComponent={() => <MaterialCommunityIcons name="chevron-down" style={styles.icon} size={20} />}
            ArrowUpIconComponent={() => <MaterialCommunityIcons name="chevron-up" style={styles.icon} size={20} />}
            disabled={true}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Format de date</Text>
          <DropDownPicker
            open={isDateFormatOpen}
            setOpen={setIsDateFormatOpen}
            value={dateFormatValue}
            setValue={setDateFormatValue}
            items={dateFormatItems}
            setItems={setDateFormatItems}
            placeholder='Choisissez un format de date'
            ArrowDownIconComponent={() => <MaterialCommunityIcons name="chevron-down" style={styles.icon} size={20} />}
            ArrowUpIconComponent={() => <MaterialCommunityIcons name="chevron-up" style={styles.icon} size={20} />}
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
    shadowOffset: { width: 0, height: 1 },
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
