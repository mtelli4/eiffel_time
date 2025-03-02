import { Bell } from 'lucide-react'

export default function NotificationSettings() {
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
          <select className="w-full rounded-lg border-gray-200 focus:ring-secondary focus:border-secondary">
            <option value="immediate">Immédiate</option>
            <option value="daily">Quotidienne</option>
            <option value="weekly">Hebdomadaire</option>
          </select>
        </div>
      </div>
    </div>
  )
}
