import React, { useEffect, useState } from 'react'
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
// import { Save } from 'lucide-react-native' // Assurez-vous d'avoir une version compatible de lucide-react pour React Native

export function Settings() {
  const [NotificationSettings, setNotificationSettings] =
    useState<React.FC | null>(null)
  const [SecuritySettings, setSecuritySettings] = useState<React.FC | null>(
    null
  )
  const [PersonalizationSettings, setPersonalizationSettings] =
    useState<React.FC | null>(null)

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
    // Implement save functionality
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
        <PersonalizationSettings />
        <View style={{ marginVertical: 20 }} />
        <View style={styles.buttonContainer}>
          <Button title="Enregistrer les modifications" onPress={handleSave} />
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
})
