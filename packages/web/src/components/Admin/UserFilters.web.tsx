import { UserFiltersProps } from '@shared/types/types'
import { Search } from 'lucide-react'
import Select from 'react-select'

const ROLES = [
  { value: 'student', label: 'Élève' },
  { value: 'teacher', label: 'Professeur' },
  { value: 'manager', label: 'Gestionnaire' },
  { value: 'admin', label: 'Administrateur' },
]

const GROUPS = [
  { value: 'A1', label: 'Groupe A1' },
  { value: 'A2', label: 'Groupe A2' },
  { value: 'B1', label: 'Groupe B1' },
  { value: 'B2', label: 'Groupe B2' },
]

const FORMATIONS = [
  { value: 'info', label: 'Informatique' },
  { value: 'gea', label: 'GEA' },
  { value: 'tc', label: 'TC' },
]

const TEACHER_TYPES = [
  { value: 'permanent', label: 'Titulaire' },
  { value: 'temporary', label: 'Vacataire' },
]

export function UserFilters({
  onRoleChange,
  onGroupChange,
  onFormationChange,
  onTypeChange,
  onSearch,
}: UserFiltersProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Rôle
          </label>
          <Select
            options={ROLES}
            isClearable
            placeholder="Tous les rôles"
            onChange={(option) => onRoleChange(option?.value || null)}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': {
                  borderColor: '#3498DB',
                },
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Groupe
          </label>
          <Select
            options={GROUPS}
            isClearable
            placeholder="Tous les groupes"
            onChange={(option) => onGroupChange(option?.value || null)}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': {
                  borderColor: '#3498DB',
                },
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Formation
          </label>
          <Select
            options={FORMATIONS}
            isClearable
            placeholder="Toutes les formations"
            onChange={(option) => onFormationChange(option?.value || null)}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': {
                  borderColor: '#3498DB',
                },
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Type de professeur
          </label>
          <Select
            options={TEACHER_TYPES}
            isClearable
            placeholder="Tous les types"
            onChange={(option) => onTypeChange(option?.value || null)}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': {
                  borderColor: '#3498DB',
                },
              }),
            }}
          />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  )
}
