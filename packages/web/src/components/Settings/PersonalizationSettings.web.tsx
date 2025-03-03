import { Palette } from 'lucide-react'
import Select from 'react-select'
import { useDateFormat } from '../../hooks/useDateFormat'
import { useLanguage } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'
import '../../styles/select-styles.css'
interface PersonalizationSettingsProps {
  dateFormat: string
  setDate: (newDate: string) => void
  theme: string
  setTheme: (newTheme: string) => void
  language: string
  setLanguage: (newLanguage: string) => void
}

export default function PersonalizationSettings({
  dateFormat,
  setDate,
  theme,
  setTheme,
  language,
  setLanguage,
}: PersonalizationSettingsProps) {
  const { themesSelectOptions } = useTheme()
  const { dateSelectOptions } = useDateFormat()
  const { languagesSelectOptions } = useLanguage()

  const handleDateChange = (newFormat: string) => {
    sessionStorage.setItem('dateFormat', newFormat)
    window.dispatchEvent(new Event('dateChange')) // Notifie les autres composants
    setDate(newFormat) // Met à jour l'état local pour forcer le rendu
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary dark:text-white" />
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Personnalisation
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Thème d'interface
          </label>
          <Select
            defaultValue={themesSelectOptions.find(
              (option) => option.value === theme
            )}
            options={themesSelectOptions}
            isSearchable={false}
            onChange={(option) => setTheme(option?.value as string)}
            className="w-full dark:text-white"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-bg, white)',
                borderColor: state.isFocused
                  ? 'var(--select-focus-border, #2684FF)'
                  : 'var(--select-border, #cccccc)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-menu-bg, white)',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected
                  ? 'var(--select-selected-bg, #2684FF)'
                  : state.isFocused
                  ? 'var(--select-hover-bg, #deebff)'
                  : 'var(--select-menu-bg, white)',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Langue
          </label>
          <Select
            defaultValue={languagesSelectOptions.find(
              (option) => option.value === language
            )}
            options={languagesSelectOptions}
            isSearchable={false}
            onChange={(option) => setLanguage(option?.value as string)}
            className="w-full dark:text-white"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-bg, white)',
                borderColor: state.isFocused
                  ? 'var(--select-focus-border, #2684FF)'
                  : 'var(--select-border, #cccccc)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-menu-bg, white)',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected
                  ? 'var(--select-selected-bg, #2684FF)'
                  : state.isFocused
                  ? 'var(--select-hover-bg, #deebff)'
                  : 'var(--select-menu-bg, white)',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Format de date
          </label>
          <Select
            defaultValue={dateSelectOptions.find(
              (option) => option.value === dateFormat
            )}
            options={dateSelectOptions}
            isSearchable={false}
            value={dateSelectOptions.find(
              (option) => option.value === dateFormat
            )}
            onChange={(option) => handleDateChange(option?.value as string)}
            className="w-full dark:text-white"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-bg, white)',
                borderColor: state.isFocused
                  ? 'var(--select-focus-border, #2684FF)'
                  : 'var(--select-border, #cccccc)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--select-menu-bg, white)',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected
                  ? 'var(--select-selected-bg, #2684FF)'
                  : state.isFocused
                  ? 'var(--select-hover-bg, #deebff)'
                  : 'var(--select-menu-bg, white)',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>
      </div>
    </div>
  )
}
