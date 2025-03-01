import { Search } from 'lucide-react'
import Select from 'react-select'
import { ROLES, TEACHER_TYPES, UserFiltersProps } from '../../../../shared/src/types/types'

export default function UserFilters({ onFilterChange, formations, groupes }: UserFiltersProps) {
  const handleFilterChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value)
  }

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
            onChange={(option: any) =>
              handleFilterChange('role', option?.value || null)
            }
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
            options={formations}
            isClearable
            placeholder="Toutes les formations"
            onChange={(option: any) =>
              handleFilterChange('formation', option?.value || null)
            }
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
            options={groupes}
            isClearable
            placeholder="Tous les groupes"
            onChange={(option: any) =>
              handleFilterChange('groupe', option?.value || null)
            }
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
            Type d'enseignant
          </label>
          <Select
            options={TEACHER_TYPES}
            isClearable
            placeholder="Tous les types"
            onChange={(option: any) =>
              handleFilterChange('type', option?.value)
            }
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
          /* add id ##search_box */
          id="search_box"
          type="text"
          placeholder="Rechercher un utilisateur..."
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
        />
        <Search
          className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          onChange={(e) => onFilterChange}
        />
      </div>
    </div>
  )
}
