import React, {useEffect} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDateFormat} from '../../../../shared/src/hooks/useDateFormat';
import {useLanguage} from '../../../../shared/src/hooks/useLanguage';
import {useTheme} from '../../../../shared/src/hooks/useTheme';

interface PersonalizationSettingsProps {
  dateFormat: string;
  setDate: (newDate: string) => void;
  theme: string;
  setTheme: (newTheme: string) => void;
  language: string;
  setLanguage: (newLanguage: string) => void;
}

export default function PersonalizationSettings({
  dateFormat,
  setDate,
  theme,
  setTheme,
  language,
  setLanguage,
}: PersonalizationSettingsProps) {
  const {themesSelectOptions} = useTheme();
  const {dateSelectOptions} = useDateFormat();
  const {languagesSelectOptions} = useLanguage();
  const systemTheme = useColorScheme();

  // Use system theme when theme is set to "system"
  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [themeValue, setThemeValue] = React.useState(theme || 'system');
  const [themeItems, setThemeItems] = React.useState(themesSelectOptions);

  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [languageValue, setLanguageValue] = React.useState(language);
  const [languageItems, setLanguageItems] = React.useState(
    languagesSelectOptions,
  );

  const [isDateFormatOpen, setIsDateFormatOpen] = React.useState(false);
  const [dateFormatValue, setDateFormatValue] = React.useState(dateFormat);
  const [dateFormatItems, setDateFormatItems] =
    React.useState(dateSelectOptions);

  // Configurer DropDownPicker
  useEffect(() => {
    DropDownPicker.setListMode('MODAL');
  }, []);

  // Mettre à jour l'état local si les props changent
  useEffect(() => {
    setThemeValue(theme || 'system');
  }, [theme]);

  useEffect(() => {
    setTheme(themeValue);
  }, [themeValue]);

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="palette"
          style={[styles.icon, isDark && styles.darkIcon]}
          size={20}
        />
        <Text style={[styles.title, isDark && styles.darkTitle]}>
          Personnalisation
        </Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Thème d'interface
          </Text>
          <DropDownPicker
            open={isThemeOpen}
            setOpen={setIsThemeOpen}
            value={themeValue as string}
            setValue={setThemeValue}
            items={themeItems}
            setItems={setThemeItems}
            placeholder="Choisissez un thème"
            style={[styles.picker, isDark && styles.darkPicker]}
            textStyle={isDark ? {color: '#fff'} : {color: '#000'}}
            dropDownContainerStyle={[
              styles.picker,
              isDark && styles.darkPickerDropdown,
            ]}
            placeholderStyle={isDark ? {color: '#9ca3af'} : {color: '#6b7280'}}
            ArrowDownIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-down"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
            ArrowUpIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-up"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>Langue</Text>
          <DropDownPicker
            open={isLanguageOpen}
            setOpen={setIsLanguageOpen}
            value={languageValue}
            setValue={setLanguageValue}
            items={languageItems}
            setItems={setLanguageItems}
            placeholder="Choisissez une langue"
            style={[styles.picker, isDark && styles.darkPicker]}
            textStyle={isDark ? {color: '#fff'} : {color: '#000'}}
            dropDownContainerStyle={[
              styles.picker,
              isDark && styles.darkPickerDropdown,
            ]}
            placeholderStyle={isDark ? {color: '#9ca3af'} : {color: '#6b7280'}}
            ArrowDownIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-down"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
            ArrowUpIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-up"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
            disabled={true}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Format de date
          </Text>
          <DropDownPicker
            open={isDateFormatOpen}
            setOpen={setIsDateFormatOpen}
            value={dateFormatValue}
            setValue={setDateFormatValue}
            items={dateFormatItems}
            setItems={setDateFormatItems}
            placeholder="Choisissez un format de date"
            style={[styles.picker, isDark && styles.darkPicker]}
            textStyle={isDark ? {color: '#fff'} : {color: '#000'}}
            dropDownContainerStyle={[
              styles.picker,
              isDark && styles.darkPickerDropdown,
            ]}
            placeholderStyle={isDark ? {color: '#9ca3af'} : {color: '#6b7280'}}
            ArrowDownIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-down"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
            ArrowUpIconComponent={() => (
              <MaterialCommunityIcons
                name="chevron-up"
                style={[styles.icon, isDark && styles.darkIcon]}
                size={20}
              />
            )}
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
  picker: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  darkPicker: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  darkPickerDropdown: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
});
