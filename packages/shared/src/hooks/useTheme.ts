import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

// Déclaration des options de thème
const themesSelectOptions: { value: string; label: string }[] = [
  { value: 'light', label: 'Clair 🌞' },
  { value: 'dark', label: 'Sombre 🌙' },
  { value: 'system', label: 'Système 🌓' },
]

type Theme = (typeof themesSelectOptions)[number]['value']

export const useTheme = (initialTheme?: Theme) => {
  // Initialiser avec 'system' par défaut pour éviter undefined
  const [theme, setTheme] = useState<Theme>(initialTheme || 'system')

  // Effet pour charger le thème sauvegardé
  useEffect(() => {
    if (Platform.OS === 'web') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme) {
        setTheme(savedTheme)
      }
    } else {
      import('react-native-mmkv').then(({ MMKV }) => {
        const storage = new MMKV()
        const savedTheme = storage.getString('theme') as Theme | null
        if (savedTheme) {
          setTheme(savedTheme)
        }
      })
    }
  }, [])

  // Effet pour appliquer les modifications du thème
  useEffect(() => {
    const applyTheme = () => {
      if (Platform.OS === 'web') {
        const root = window.document.documentElement
        root.classList.add('transition-colors', 'duration-300')

        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'
        const appliedTheme = theme === 'system' ? systemTheme : theme

        if (appliedTheme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }

        // Correction de l'erreur TypeScript - s'assurer que theme existe
        if (theme) {
          localStorage.setItem('theme', theme)
        }
      } else {
        const { Appearance } = require('react-native')
        const systemTheme =
          Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
        const appliedTheme = theme === 'system' ? systemTheme : theme

        if (appliedTheme === 'dark') {
          console.log('Applying dark theme')
        } else {
          console.log('Applying light theme')
        }

        import('react-native-mmkv').then(({ MMKV }) => {
          const storage = new MMKV()
          // Correction de l'erreur TypeScript - s'assurer que theme existe
          if (theme) {
            storage.set('theme', theme)
          }
        })
      }
    }

    applyTheme()
  }, [theme])

  return { theme, setTheme, themesSelectOptions }
}
