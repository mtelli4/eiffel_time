import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import { useDateFormat } from '../../hooks/useDateFormat'
import { useLanguage } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'
import { NotificationSettingsProps } from '../../types/types'
import { SecuritySettingsProps } from '../../types/types'

export function Settings() {
  const [NotificationSettings, setNotificationSettings] =
    useState<React.ComponentType<NotificationSettingsProps> | null>(null)

  const [SecuritySettings, setSecuritySettings] =
    useState<React.ComponentType<SecuritySettingsProps> | null>(null)
  const [PersonalizationSettings, setPersonalizationSettings] =
    useState<any>(null)

  const { theme, setTheme } = useTheme()
  const { dateFormat, setDateFormat } = useDateFormat()
  const { language, setLanguage } = useLanguage()
  const systemTheme = useColorScheme()

  // États temporaires pour stocker les modifications
  const [tempTheme, setTempTheme] = useState(theme || 'system')
  const [tempDate, setTempDate] = useState(dateFormat)
  const [tempLanguage, setTempLanguage] = useState(language)

  useEffect(() => {
    setTempTheme(theme || 'system')
    setTempDate(dateFormat)
    setTempLanguage(language)
  }, [theme, dateFormat, language])

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { default: NotificationSettings } = await import(
          '../../../../web/src/components/Settings/NotificationSettings.web'
        )
        const { default: SecuritySettings } = await import(
          '../../../../web/src/components/Settings/SecuritySettings.web'
        )
        const { default: PersonalizationSettings } = await import(
          '../../../../web/src/components/Settings/PersonalizationSettings.web'
        )
        setNotificationSettings(() => NotificationSettings)
        setSecuritySettings(() => SecuritySettings)
        setPersonalizationSettings(() => PersonalizationSettings)
      } else {
        const { default: NotificationSettings } = await import(
          '../../../../mobile/src/components/Settings/NotificationSettings.native'
        )
        const { default: SecuritySettings } = await import(
          '../../../../mobile/src/components/Settings/SecuritySettings.native'
        )
        const { default: PersonalizationSettings } = await import(
          '../../../../mobile/src/components/Settings/PersonalizationSettings.native'
        )
        setNotificationSettings(() => NotificationSettings)
        setSecuritySettings(() => SecuritySettings)
        setPersonalizationSettings(() => PersonalizationSettings)
      }
    }

    loadComponents()
  }, [])

  const handleSave = () => {
    setDateFormat(tempDate)
    setTheme(tempTheme)
    setLanguage(tempLanguage)
  }

  if (!NotificationSettings || !SecuritySettings || !PersonalizationSettings) {
    return <Text style={styles.loading}>Chargement...</Text>
  }

  const isDark =
    tempTheme === 'system' ? systemTheme === 'dark' : tempTheme === 'dark'

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <FlatList
        data={[
          {
            key: 'Notifications',
            component: <NotificationSettings isDark={isDark} />,
          },
          { key: 'Sécurité', component: <SecuritySettings isDark={isDark} /> },
          {
            key: 'Personnalisation',
            component: (
              <PersonalizationSettings
                dateFormat={tempDate}
                setDate={setTempDate}
                theme={tempTheme}
                setTheme={setTempTheme}
                language={tempLanguage}
                setLanguage={setTempLanguage}
              />
            ),
          },
          {
            key: 'Enregistrer',
            component: (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.button}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            ),
          },
        ]}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 20 }}>{item.component}</View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#1f2937',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E3494',
    padding: 5,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
})
