import { useState, useEffect } from 'react'
import { Platform } from 'react-native';

// Déclaration des options de format de date
const dateSelectOptions: { value: string; label: string }[] = [
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY' },
  { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD' },
]

type DateFormat = (typeof dateSelectOptions)[number]['value']

// Fonction pour récupérer le format de date initial (différent pour Web et React Native)
export const useDateFormat = (initialFormat?: DateFormat) => {
  const [dateFormat, setDateFormat] = useState<DateFormat>()

  // Fonction pour récupérer le format de date initial sur Web
  useEffect(() => {
    if (Platform.OS === 'web') {
      const savedFormat = localStorage.getItem('dateFormat') as DateFormat
      setDateFormat(initialFormat || savedFormat || 'dd/MM/yyyy')
    } else {
      import('react-native-mmkv').then(({ MMKV }) => {
        const storage = new MMKV()
        const savedFormat = storage.getString('dateFormat') as DateFormat | null
        setDateFormat(initialFormat || savedFormat || 'dd/MM/yyyy')
      })
    }
  }, [])

  // Effet pour appliquer les modifications du format de date
  useEffect(() => {
    if (Platform.OS === 'web') {
      localStorage.setItem('dateFormat', dateFormat || localStorage.getItem('dateFormat'))
    } else {
      import('react-native-mmkv').then(({ MMKV }) => {
        const storage = new MMKV()
        storage.set('dateFormat', dateFormat || storage.getString('dateFormat'))
      })
    }
  }, [dateFormat])

  return { dateFormat, setDateFormat, dateSelectOptions }
}
