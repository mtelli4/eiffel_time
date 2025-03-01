import { formation, groupe } from '@prisma/client'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import {
  Formation,
  Groupe,
  ROLES,
  TEACHER_TYPES,
  UserFiltersProps,
} from '../../../../shared/src/types/types'

export function UserFilters({ onFilterChange }: UserFiltersProps) {
  const [formations, setFormations] = useState<Formation[]>([])
  const [groupes, setGroupes] = useState<Groupe[]>([])

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/api/all/formations').then((response) => {
        if (!response.ok) throw new Error('Erreur réseau (formations)')
        return response.json()
      }),
      fetch('http://localhost:4000/api/all/groupes').then((response) => {
        if (!response.ok) throw new Error('Erreur réseau (groupes)')
        return response.json()
      }),
    ])
      .then(([formationsData, groupesData]) => {
        setFormations(
          formationsData.map((f: formation) => ({
            value: f.id_formation,
            label: f.libelle,
          }))
        )

        setGroupes(
          groupesData.map((g: groupe) => ({
            value: g.id_grp,
            label: g.libelle,
          }))
        )
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error)
      })
  }, [])

  const handleFilterChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value)
  }

  // Styles personnalisés pour react-select en fonction du mode dark/light
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? '#3498DB' : '#E2E8F0',
      boxShadow: state.isFocused ? '0 0 0 1px #3498DB' : 'none',
      '&:hover': {
        borderColor: '#3498DB',
      },
      backgroundColor: 'var(--select-bg)',
      borderRadius: '0.375rem',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'var(--select-bg)',
      borderRadius: '0.375rem',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3498DB'
        : state.isFocused
        ? 'var(--select-hover)'
        : 'transparent',
      color: state.isSelected ? 'white' : 'var(--select-text)',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3498DB' : 'var(--select-hover)',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'var(--select-text)',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'var(--select-placeholder)',
    }),
    input: (base: any) => ({
      ...base,
      color: 'var(--select-text)',
    }),
  }

  return (
    <div className="space-y-4 bg-white dark:bg-primary p-4 rounded-lg shadow-sm">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --select-bg: #ffffff;
          --select-text: #2C3E50;
          --select-placeholder: #718096;
          --select-hover: #EDF2F7;
        }
        
        .dark {
          --select-bg: #2E3494;
          --select-text: #E2E8F0;
          --select-placeholder: #A0AEC0;
          --select-hover: #3D45A5;
        }
      `,
        }}
      />

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
            className="text-sm"
            styles={customSelectStyles}
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
            className="text-sm"
            styles={customSelectStyles}
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
            className="text-sm"
            styles={customSelectStyles}
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
            className="text-sm"
            styles={customSelectStyles}
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
          bg-white dark:bg-[#2E3494] text-[#2C3E50] dark:text-gray-200
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
