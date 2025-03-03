import { Shield } from 'lucide-react'

export default function SecuritySettings() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary dark:text-white" />
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Sécurité
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Ancien mot de passe
          </label>
          <input
            type="password"
            className="input dark:bg-gray-800 dark:text-white focus-border:bg-[#2e3494] w-full"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            className="input dark:bg-gray-800 dark:text-white w-full"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            className="input dark:bg-gray-800 dark:text-white w-full"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Authentification à deux facteurs
          </label>
          <input
            type="checkbox"
            className="rounded text-secondary focus:ring-secondary"
          />
        </div>
      </div>
    </div>
  )
}
