import { Palette } from 'lucide-react'

export default function PersonalizationSettings() {
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
            <option value="fr">DD/MM/YYYY</option>
            <option value="en">MM/DD/YYYY</option>
            <option value="iso">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  )
}
