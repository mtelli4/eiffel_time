import { X } from 'lucide-react'
import Select from 'react-select'
import { Formation, ROLES, UserUpdate } from '../../../../shared/src/types/types'
import { Utilisateur } from '../../../../shared/src/types/types'
import { useEffect, useState } from 'react'
import { formation, statut_utilisateur } from '@prisma/client'

const roleOptions = ROLES.map(role => ({ value: role.value as statut_utilisateur, label: role.label }))

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserUpdate) => void
  initialData?: Utilisateur
  isEdit?: boolean
  formations: Formation[]
}

export function UserForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit,
  formations,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserUpdate>({
    id_utilisateur: initialData?.id_utilisateur || 0,
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    email: initialData?.email || '',
    statut: initialData?.statut || 'indefinite',
    formations: initialData?.formations || [],
  })
  const [errorMessage, setErrorMessage] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    const messages = []
    if (!formData.nom.trim()) {
      messages.push('Le nom est obligatoire')
    }
    if (!formData.prenom.trim()) {
      messages.push('Le prénom est obligatoire')
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { // Exemple : test@test
      messages.push('Veuillez saisir une adresse email valide')
    }
    if (!formData.statut) {
      messages.push('Le rôle est obligatoire')
    }
    if (formData.formations.length > 1 && formData.statut === 'student') {
      messages.push('Un étudiant ne peut pas être inscrit à plusieurs formations')
    }
    setErrorMessage(messages)

    if (messages.length === 0) {
      onSubmit(formData)
    }
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
              options={formations.map(f => ({
                value: f.id_formation,
                label: f.libelle,
              }))}
              onChange={(options: any) => setFormData(prevState => ({
                ...prevState,
                formations: options,
              }))}
              placeholder="Aucune formation"
              className="text-sm"
            />
          </div>

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
              // type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-primary hover:bg-[#2980B9] rounded-lg transition-colors"
            >
              {isEdit ? 'Modifier' : 'Ajouter'}
            </button>
          </div>

          {errorMessage.length > 0 && (
            <div className="text-red-500 text-sm">
              {errorMessage.join('. ')}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
