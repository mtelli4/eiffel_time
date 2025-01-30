import { X } from 'lucide-react'
import Select from 'react-select'
import { Formation, ROLES, UserUpdate } from '../../../../shared/src/types/types'
import { Utilisateur } from '../../../../shared/src/types/types'
import { useEffect, useState } from 'react'
import { formation, statut_utilisateur } from '@prisma/client'
import { getFormations } from '../../../../shared/src/backend/services'

const roleOptions = ROLES.map(role => ({ value: role.value as statut_utilisateur, label: role.label }))

type FormationOption = {
  value: number
  label: string
  statut: boolean
}

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserUpdate) => void
  initialData?: Utilisateur
  isEdit?: boolean
}

export function UserForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserUpdate>({
    id_utilisateur: initialData?.id_utilisateur || 0,
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    email: initialData?.email || '',
    statut: initialData?.statut || 'indefinite',
    formations: initialData?.formations || [],
  })
  const [formations, setFormations] = useState<FormationOption[]>([])

  useEffect(() => {
    getFormations()
      .then((data) => {
        const formations = data.map((formation: formation) => ({
          value: formation.id_formation,
          label: formation.libelle,
          statut: initialData?.formations?.find(f => f.id_formation === formation.id_formation) ? true : false,
        }))
        setFormations(formations)
      })
      .catch(console.error)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.nom.trim()) {
      alert('Le nom est obligatoire')
      return
    }
    if (!formData.prenom.trim()) {
      alert('Le prénom est obligatoire')
      return
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { // Exemple : test@test
      alert("Veuillez saisir une adresse email valide")
      return
    }
    if (!formData.statut) {
      alert('Le rôle est obligatoire')
      return
    }

    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#2C3E50]">
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
          {/* TODO: Demander à l'équipe s'il faut garder {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                ID {!isEdit ? '' : 'utilisateur (optionnel)'}
              </label>
              <input
                type="text"
                name="id_utilisateur"
                value={formData.id_utilisateur}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
              />
            </div>
          )} */}

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:ring-[#3498DB] focus:border-[#3498DB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Rôle
            </label>
            <Select
              options={roleOptions}
              isClearable
              placeholder="Sélectionner un rôle"
              value={roleOptions.find(option => option.value === formData.statut)}
              onChange={(option: any) => setFormData(prevState => ({
                ...prevState,
                statut: option?.value || null,
              }))}
              className="text-sm"
            />
          </div>

          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                Formation(s)
              </label>
              <Select
                defaultValue={initialData?.formations.map(f => ({
                  value: f.id_formation,
                  label: f.libelle,
                }))}
                isMulti
                options={formations}
                // value={formations.filter(f => f.statut)}
                onChange={(options: any) => setFormData(prevState => ({
                  ...prevState,
                  formations: options,
                }))}
                placeholder="Aucune formation"
                className="text-sm"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            {/* TODO: demander à Mohamed pourquoi le bouton annuler alors qu'il y a déjà un bouton fermer */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#2C3E50] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-primary hover:bg-[#2980B9] rounded-lg transition-colors"
            >
              {isEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
