import { statut_utilisateur } from '@prisma/client'
import { X } from 'lucide-react'
import { useState } from 'react'
import Select from 'react-select'
import {
  Formation,
  Groupe,
  ROLES,
  TEACHER_TYPES,
  UserUpdate,
  Utilisateur,
} from '../../../../shared/src/types/types'
import '../../styles/select-styles.css'

const roleOptions = ROLES.map((role) => ({
  value: role.value as statut_utilisateur,
  label: role.label,
}))

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserUpdate) => void
  initialData?: Utilisateur | null
  isEdit?: boolean
  formations: Formation[]
  groupes: Groupe[]
}

export function UserForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit,
  formations,
  groupes,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserUpdate>({
    id_utilisateur: initialData?.id_utilisateur || 0,
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    email: initialData?.email || '',
    statut: initialData?.statut || 'indefinite',
    formations: initialData?.formations || [],
    groupes: initialData?.groupes || [],
    vacataire: initialData?.vacataire,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.nom.trim()) {
      alert('Le nom est obligatoire')
    }
    if (!formData.prenom.trim()) {
      alert('Le prénom est obligatoire')
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      // Exemple : test@test
      alert('Veuillez saisir une adresse email valide')
    }
    if (!formData.statut) {
      alert('Le rôle est obligatoire')
    }
    if (formData.formations.length > 1 && formData.statut === 'student') {
      alert('Un étudiant ne peut pas être inscrit à plusieurs formations')
    }
    if (formData.groupes.length > 0 && formData.statut !== 'student') {
      alert('Seul un étudiant peut être inscrit à des groupes')
    }
    if (formData.statut === 'teacher' && formData.vacataire === undefined) {
      alert('Un enseignant doit être soit titulaire soit vacataire')
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#2C3E50] dark:text-gray-100">
            {isEdit ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-dark-primary dark:text-white rounded-lg focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-dark-primary dark:text-white rounded-lg focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-dark-primary dark:text-white rounded-lg focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
              Rôle
            </label>
            <Select
              options={roleOptions}
              isClearable
              placeholder="Sélectionner un rôle"
              value={roleOptions.find(
                (option) => option.value === formData.statut
              )}
              onChange={(option: any) =>
                setFormData((prevState) => ({
                  ...prevState,
                  statut: option?.value || null,
                }))
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
              Formation(s)
            </label>
            <Select
              defaultValue={initialData?.formations.map((f) => ({
                value: f.id_formation,
                label: f.libelle,
              }))}
              isMulti
              options={formations}
              onChange={(options: any) =>
                setFormData((prevState) => ({
                  ...prevState,
                  formations: options.map((o: any) => ({
                    id_formation: o.value,
                    libelle: o.label,
                  })),
                }))
              }
              placeholder="Aucune formation"
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

          {formData.statut === 'student' && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
                Groupes
              </label>
              <Select
                defaultValue={initialData?.groupes.map((g) => ({
                  value: g.id_grp,
                  label: g.libelle,
                }))}
                isMulti
                options={groupes}
                onChange={(options: any) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    groupes: options.map((o: any) => ({
                      id_grp: o.value,
                      libelle: o.label,
                    })),
                  }))
                }
                placeholder="Aucun groupe"
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
          )}

          {formData.statut === 'teacher' && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-300 mb-1">
                Type
              </label>
              <Select
                defaultValue={TEACHER_TYPES.find(
                  (t) => t.value === formData.vacataire
                )}
                options={TEACHER_TYPES}
                isClearable
                placeholder="Sélectionner un type"
                onChange={(option: any) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    vacataire: option?.value ?? null,
                  }))
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
          )}

          <div className="flex justify-end gap-3">
            {/* TODO: demander à Mohamed pourquoi le bouton annuler alors qu'il y a déjà un bouton fermer */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-[#2C3E50] bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-600 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              // type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-primary hover:bg-[#2980B9] dark:text-white dark:hover:bg-blue-600 rounded-lg transition-colors"
            >
              {isEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
