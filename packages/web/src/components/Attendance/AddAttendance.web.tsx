import { X } from 'lucide-react'
import { useState } from 'react'
import Select from 'react-select'
import {
  COURSE_TYPES,
  TeacherPlanning,
  TeacherPlanningForm,
} from '../../../../shared/src/types/types'

interface AddAttendanceProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TeacherPlanningForm) => void
  teachers: TeacherPlanning[]
}

interface InputProps {
  value: string
  onChangeText: (value: string) => void
  placeholder: string
}

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  onPress: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function AddAttendance({
  isOpen,
  onClose,
  onSubmit,
  teachers,
}: AddAttendanceProps) {
  const [formData, setFormData] = useState<TeacherPlanningForm>({
    id_utilisateur: 0,
    id_module: 0,
    type: '',
    presences: 0,
  })

  const handleSubmit = () => {
    if (formData.id_utilisateur === 0) {
      alert('Veuillez sélectionner un enseignant')
      return
    }
    if (formData.id_module === 0) {
      alert('Veuillez sélectionner un module')
      return
    }
    if (!formData.type) {
      alert('Veuillez sélectionner un type de cours')
      return
    }
    if (formData.presences === 0) {
      alert("Veuillez saisir le nombre d'heures")
      return
    }
    alert(`Envoi des données: ${JSON.stringify(formData)}`)
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#2C3E50] dark:text-white">
            Ajouter une présence
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
            <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-400 mb-1">
              Enseignant
            </label>
            <Select
              isClearable
              options={teachers.map((t) => ({
                value: t.id_utilisateur,
                label: t.prenom + ' ' + t.nom,
              }))}
              onChange={(option: any) =>
                setFormData((prevState) => ({
                  ...prevState,
                  id_utilisateur: option ? option.value : 0,
                }))
              }
              placeholder="Sélectionner un enseignant"
              className="text-sm"
            />
          </div>
          <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-400 mb-1">
            Module
          </label>
          <Select
            isClearable
            isDisabled={formData.id_utilisateur === 0}
            options={teachers
              .find((t) => t.id_utilisateur === formData.id_utilisateur)
              ?.modules.map((m) => ({
                value: m.id_module,
                label: m.libelle,
              }))}
            onChange={(option: any) =>
              setFormData((prevState) => ({
                ...prevState,
                id_module: option ? option.value : 0,
              }))
            }
            placeholder="Sélectionner un module"
            className="text-sm"
          />
          <div></div>

          <div className="flex gap-3">
            {/* <div>
              <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                Date
              </label>
              <input
                type="date"
                value={'0'}
                onChange={(e) => setFormData(prevState => ({
                  ...prevState,
                  date: e.target.value,
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-400 mb-1">
                Type de cours
              </label>
              <Select
                options={COURSE_TYPES.map((type) => ({
                  value: type,
                  label: type,
                }))}
                onChange={(options: any) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    type: options.value,
                  }))
                }
                placeholder="Sélectionner un type de cours"
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C3E50] dark:text-gray-400 mb-1">
                Nombre d'heures
              </label>
              <input
                type="number"
                value={formData.presences}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    presences: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
