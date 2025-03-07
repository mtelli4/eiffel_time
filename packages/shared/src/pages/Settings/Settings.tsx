import React, { useEffect, useState } from 'react'
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { useDateFormat } from '../../hooks/useDateFormat'
import { useLanguage } from '../../hooks/useLanguage'
// import { Save } from 'lucide-react-native' // Assurez-vous d'avoir une version compatible de lucide-react pour React Native

export function Settings() {
  const [NotificationSettings, setNotificationSettings] = useState<React.FC | null>(null)
  const [SecuritySettings, setSecuritySettings] = useState<React.FC | null>(null)
  const [PersonalizationSettings, setPersonalizationSettings] = useState<any>(null)

  const { theme, setTheme } = useTheme()
  const { dateFormat, setDateFormat } = useDateFormat()
  const { language, setLanguage } = useLanguage()

  // États temporaires pour stocker les modifications
  const [tempTheme, setTempTheme] = useState(theme)
  const [tempDate, setTempDate] = useState(dateFormat)
  const [tempLanguage, setTempLanguage] = useState(language)

  useEffect(() => {
    setTempTheme(theme)
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

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Notifications', component: <NotificationSettings /> },
          { key: 'Sécurité', component: <SecuritySettings /> },
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
