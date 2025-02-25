import { Palette } from 'lucide-react'
import Select from 'react-select'

interface PersonalizationSettingsProps {
  dateFormat: string
  setDate: (newDate: string) => void
  theme: string
  setTheme: (newTheme: string) => void
  language: string
  setLanguage: (newLanguage: string) => void
}

const themesSelectOptions: { value: string; label: string }[] = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'system', label: 'Système' },
]

const dateSelectOptions: { value: string; label: string }[] = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]

const languagesSelectOptions: { value: string; label: string }[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
]

export default function PersonalizationSettings({ dateFormat, setDate, theme, setTheme, language, setLanguage }: PersonalizationSettingsProps) {
  const handleDateChange = (newFormat: string) => {
    sessionStorage.setItem('dateFormat', newFormat)
    window.dispatchEvent(new Event("dateChange")); // Notifie les autres composants
    setDate(newFormat); // Met à jour l'état local pour forcer le rendu
  }

  return (
    <div className="bg-white dark:bg-primary rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary dark:text-secondary" />
        <h2 className="text-lg font-semibold text-primary dark:text-secondary">Personnalisation</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-white mb-1">
            Thème d'interface
          </label>
          <Select
            defaultValue={themesSelectOptions.find((option) => option.value === theme)}
            placeholder="Choisissez un thème"
            options={themesSelectOptions}
            onChange={(option) => setTheme(option?.value as string)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-white mb-1">Langue</label>
          <Select
            defaultValue={languagesSelectOptions.find((option) => option.value === language)}
            placeholder="Choisissez une langue"
            options={languagesSelectOptions}
            onChange={(option) => setLanguage(option?.value as string)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-white mb-1">
            Format de date
          </label>
          <Select
            defaultValue={dateSelectOptions.find((option) => option.value === dateFormat)}
            placeholder="Choisissez un format de date"
            options={dateSelectOptions}
            value={dateSelectOptions.find((option) => option.value === dateFormat)}
            onChange={(option) => handleDateChange(option?.value as string)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
