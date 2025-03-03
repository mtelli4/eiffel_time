import { Bell } from 'lucide-react'
import { useState } from 'react'
import Select from 'react-select'

export default function NotificationSettings() {
  // Définition des options pour la fréquence des alertes
  const alertFrequencyOptions = [
    { value: 'immediate', label: 'Immédiate' },
    { value: 'daily', label: 'Quotidienne' },
    { value: 'weekly', label: 'Hebdomadaire' },
  ]
  // État pour stocker la fréquence sélectionnée
  const [alertFrequency, setAlertFrequency] = useState('immediate')
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary dark:text-white" />
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Notifications par email
          </label>
          <input
            type="checkbox"
            className="rounded text-secondary focus:ring-secondary"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Notifications de nouvelles notes
          </label>
          <input
            type="checkbox"
            className="rounded text-secondary focus:ring-secondary"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Notifications d'absences
          </label>
          <input
            type="checkbox"
            className="rounded text-secondary focus:ring-secondary"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Fréquence des alertes
          </label>
          <div>
            <Select
              defaultValue={alertFrequencyOptions.find(
                (option) => option.value === alertFrequency
              )}
              options={alertFrequencyOptions}
              isSearchable={false}
              onChange={(option) => setAlertFrequency(option?.value as string)}
              className="w-full dark:text-white"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'var(--select-bg)',
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
    </div>
  )
}
