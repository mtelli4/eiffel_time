import { useEffect, useState } from 'react'

const themesSelectOptions: { value: string; label: string }[] = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'system', label: 'Système' },
]

type Theme = (typeof themesSelectOptions)[number]['value']

export const useTheme = (initialTheme?: Theme) => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme
    return initialTheme || savedTheme || 'system'
  }

  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.add('transition-colors', 'duration-300')

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    const appliedTheme = theme === 'system' ? systemTheme : theme

    if (appliedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme, themesSelectOptions }
}
