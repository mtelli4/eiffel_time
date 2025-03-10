import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

// Types de thèmes disponibles
type ThemeType = 'light' | 'dark' | 'system'

// Options pour le select du thème
const themesSelectOptions = [
  { value: 'system', label: 'Système' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
]

// Interface pour le contexte
interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  themesSelectOptions: typeof themesSelectOptions
}

// Création du contexte avec des valeurs par défaut
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system', // Modifié de 'light' à 'system'
  setTheme: () => {},
  themesSelectOptions,
})

// Fournisseur du contexte
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // État pour stocker le thème actuel
  const [theme, setThemeState] = useState<ThemeType>('system') // Modifié de 'light' à 'system'

  // Effet pour charger le thème depuis AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        // Si un thème a été sauvegardé, l'utiliser, sinon utiliser 'system'
        if (
          savedTheme &&
          (savedTheme === 'light' ||
            savedTheme === 'dark' ||
            savedTheme === 'system')
        ) {
          setThemeState(savedTheme as ThemeType)
        } else {
          // Si aucun thème n'est sauvegardé, définir 'system' comme valeur par défaut
          await AsyncStorage.setItem('theme', 'system')
        }
      } catch (error) {
        console.error('Erreur lors du chargement du thème :', error)
      }
    }

    loadTheme()
  }, [])

  // Fonction pour définir le thème
  const setTheme = async (newTheme: ThemeType) => {
    try {
      // Mettre à jour l'état
      setThemeState(newTheme)
      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem('theme', newTheme)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème :', error)
    }
  }

  // Retourner le fournisseur avec les valeurs du contexte
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themesSelectOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export function useTheme() {
  return useContext(ThemeContext)
}
