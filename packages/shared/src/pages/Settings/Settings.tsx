import { useTheme } from '../../../../web/src/hooks/useTheme'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
// import { Save } from 'lucide-react-native' // Assurez-vous d'avoir une version compatible de lucide-react pour React Native

export function Settings() {
  const [NotificationSettings, setNotificationSettings] =
    useState<React.FC | null>(null)
  const [SecuritySettings, setSecuritySettings] = useState<React.FC | null>(
    null
  )
  const [PersonalizationSettings, setPersonalizationSettings] = useState<any>(null)

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

  const [date, setDate] = useState(localStorage.getItem('dateFormat') || 'DD/MM/YYYY') // TODO: Faire un hook pour gérer le format de date
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('fr') // TODO: Faire un hook pour gérer la langue

  // États temporaires pour stocker les modifications
  const [tempDate, setTempDate] = useState(date)
  const [tempTheme, setTempTheme] = useState(theme)

  const handleSave = () => {
    setDate(tempDate)          // On applique le format de date
    setTheme(tempTheme)        // On applique le thème

    localStorage.setItem('dateFormat', tempDate)
  }

  if (!NotificationSettings || !SecuritySettings || !PersonalizationSettings) {
    return <Text style={styles.loading}>Loading...</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <NotificationSettings />
        <View style={{ marginVertical: 20 }} />
        <SecuritySettings />
        <View style={{ marginVertical: 20 }} />
        <PersonalizationSettings dateFormat={date} setDate={setTempDate} theme={theme} setTheme={setTempTheme} language={language} setLanguage={setLanguage} />
        <View style={{ marginVertical: 20 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.button}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
