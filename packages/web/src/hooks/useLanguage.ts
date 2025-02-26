import { useState, useEffect } from 'react'

const languagesSelectOptions: { value: string; label: string }[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
]

type Language = (typeof languagesSelectOptions)[number]['value']

export const useLanguage = (initialLanguage?: Language) => {
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language
    return initialLanguage || savedLanguage || 'fr'
  }

  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return { language, setLanguage, languagesSelectOptions }
}
