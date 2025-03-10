import { useEffect, useState } from 'react'
import Select from 'react-select'
import { NoteFormProps } from '../../../../../shared/src/types/types'

export function NoteForm({
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  evaluation,
  students,
  note,
}: NoteFormProps) {
  const [formData, setFormData] = useState({
    id_eval: evaluation.id_eval,
    id_utilisateur: 0,
    note: 0,
    commentaire: '',
  })

  useEffect(() => {
    if (isEdit && note) {
      formData.id_utilisateur = note.id_utilisateur
      formData.note = note.note
      formData.commentaire = note.commentaire
    }
  }, [isEdit, note])

  const handleSubmit = () => {
    if (formData.id_utilisateur === 0) {
      alert('Un étudiant doit être sélectionné')
      return
    }
    if (formData.note < 0 || formData.note > evaluation.notemaximale) {
      alert(`La note doit être comprise entre 0 et ${evaluation.notemaximale}`)
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-primary dark:text-gray-100 font-bold">
            {isEdit ? 'Modifier' : 'Ajouter'} une note
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
              Évaluation sélectionnée
            </label>
            <p className="p-2 border rounded bg-gray-100 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg">
              {evaluation.libelle}
            </p>
          </div>

          {/* Sélection de l'étudiant */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
              Étudiant
            </label>
            <Select
              defaultValue={
                isEdit
                  ? {
                      value: note?.id_utilisateur,
                      label: `${note?.nom} ${note?.prenom}`,
                    }
                  : null
              }
              options={
                isEdit
                  ? [
                      {
                        value: note?.id_utilisateur,
                        label: `${note?.nom} ${note?.prenom}`,
                      },
                    ]
                  : students.map((student) => ({
                      value: student.id_utilisateur,
                      label: `${student.nom} ${student.prenom} (${student.numero_etudiant})`,
                    }))
              }
              placeholder="Sélectionner un étudiant"
              className="w-full text-sm dark:text-white"
              isDisabled={isEdit}
              onChange={(option: any) =>
                setFormData((prevState) => ({
                  ...prevState,
                  id_utilisateur: option.value,
                }))
              }
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

          {/* Champ pour entrer la note */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
              Note
            </label>
            <input
              type="number"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded bg-gray-100 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
              min="0"
              max="20"
            />
          </div>

          {/* Commentaire optionnel */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
              Commentaire (optionnel)
            </label>
            <input
              type="text"
              value={formData.commentaire}
              onChange={(e) =>
                setFormData({ ...formData, commentaire: e.target.value })
              }
              className="w-full p-2 border rounded bg-gray-100 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>
        </div>

        {/* Boutons Annuler / Enregistrer */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border text-[#2C3E50] bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-600 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            {isEdit ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}
