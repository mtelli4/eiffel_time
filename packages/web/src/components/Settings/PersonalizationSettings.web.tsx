import { Palette } from 'lucide-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const dateSelectOptions: { value: string; label: string }[] = [
  { value: 'fr', label: 'DD/MM/YYYY' },
  { value: 'en', label: 'MM/DD/YYYY' },
  { value: 'iso', label: 'YYYY-MM-DD' },
]

const dateFormat = {
  fr: 'DD/MM/YYYY',
  en: 'MM/DD/YYYY',
  iso: 'YYYY-MM-DD',
}

export default function PersonalizationSettings() {
  const [date, setDate] = useState(sessionStorage.getItem('dateFormat') || dateFormat.fr)

  const handleDateChange = (newFormat: string) => {
    sessionStorage.setItem('dateFormat', newFormat)
    window.dispatchEvent(new Event("dateChange")); // Notifie les autres composants
    setDate(newFormat); // Met à jour l'état local pour forcer le rendu
  }

  useEffect(() => {
    if (!sessionStorage.getItem('dateFormat')) {
      sessionStorage.setItem('dateFormat', dateFormat.fr)
    }
  })

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-primary">Personnalisation</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Thème d'interface
          </label>
          <select className="w-full rounded-lg border-gray-200 focus:ring-secondary focus:border-secondary">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="system">Système</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Langue</label>
          <select className="w-full rounded-lg border-gray-200 focus:ring-secondary focus:border-secondary">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Format de date
          </label>
          <select className="w-full rounded-lg border-gray-200 focus:ring-secondary focus:border-secondary">
            <option value="fr" onClick={() => handleDateChange('fr')}>DD/MM/YYYY</option>
            <option value="en" onClick={() => handleDateChange('en')}>MM/DD/YYYY</option>
            <option value="iso" onClick={() => handleDateChange('iso')}>YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  )
}
