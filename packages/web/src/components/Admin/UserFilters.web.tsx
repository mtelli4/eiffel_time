import { Search } from 'lucide-react'
import Select from 'react-select'
import {
  ROLES,
  TEACHER_TYPES,
  UserFiltersProps,
} from '../../../../shared/src/types/types'
import '../../styles/select-styles.css'

export default function UserFilters({
  onFilterChange,
  formations,
  groupes,
}: UserFiltersProps) {
  const handleFilterChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value)
  }

  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
            Rôle
          </label>
          <Select
            options={ROLES}
            isClearable
            placeholder="Tous les rôles"
            onChange={(option: any) =>
              handleFilterChange('role', option?.value || null)
            }
            className="text-sm text-black dark:text-white"
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
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
            Formation
          </label>
          <Select
            options={formations}
            isClearable
            placeholder="Toutes les formations"
            onChange={(option: any) =>
              handleFilterChange('formation', option?.value || null)
            }
            className="text-sm dark:text-white"
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
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
            Groupe
          </label>
          <Select
            options={groupes}
            isClearable
            placeholder="Tous les groupes"
            onChange={(option: any) =>
              handleFilterChange('groupe', option?.value || null)
            }
            className="text-sm dark:text-white"
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
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
            Type d'enseignant
          </label>
          <Select
            options={TEACHER_TYPES}
            isClearable
            placeholder="Tous les types"
            onChange={(option: any) =>
              handleFilterChange('type', option?.value)
            }
            className="text-sm dark:text-white"
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
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--select-text, black)',
              }),
            }}
          />
        </div>
      </div>

      <div className="relative">
        <input
          id="search_box"
          type="text"
          placeholder="Rechercher un utilisateur..."
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-[#3498DB] dark:focus:ring-[#4A54C6] focus:border-transparent
          bg-white dark:bg-gray-800 ext-[#2C3E50] dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-300"
        />
        <Search
          className="w-5 h-5 text-gray-400 dark:text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2"
          onChange={(e) => onFilterChange}
        />
      </div>
    </div>
  )
}
