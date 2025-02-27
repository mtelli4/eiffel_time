import { useState } from 'react';
import { ClassGradesEvaluation, ClassGradesNote, ClassGradesStudent, FormNote } from '../../../../../shared/src/types/types';
import Select from 'react-select';

interface NoteFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormNote) => void
  isEdit: boolean
  evaluation: ClassGradesEvaluation
  students: ClassGradesStudent[]
  note?: ClassGradesNote
}

export function NoteForm({ isOpen, onClose, onSubmit, isEdit, evaluation, students, note }: NoteFormProps) {
  const [formData, setFormData] = useState({
    id_eval: evaluation.id_eval,
    id_utilisateur: 0,
    note: 0,
    commentaire: '',
    numero_etudiant: '',
    nom: '',
    prenom: '',
  })

  if (isEdit && note) {
    formData.id_utilisateur = note.id_utilisateur;
    formData.note = note.note;
    formData.commentaire = note.commentaire;
  }

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isEdit ? 'Modifier' : 'Ajouter'} une note</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Évaluation sélectionnée
            </label>
            <p className="p-2 border rounded bg-gray-100">{evaluation.libelle}</p>
          </div>

          {/* Sélection de l'étudiant */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Étudiant
            </label>
            <Select
              defaultValue={isEdit ? { value: note?.id_utilisateur, label: `${note?.nom} ${note?.prenom}` } : null}
              options={isEdit ? [{ value: note?.id_utilisateur, label: `${note?.nom} ${note?.prenom}` }] :
                students.map((student) => ({
                  value: student.id_utilisateur,
                  label: `${student.nom} ${student.prenom} (${student.numero_etudiant})`,
                }))}
              placeholder="Sélectionner un étudiant"
              className='w-full'
              isDisabled={isEdit}
              onChange={(option: any) => setFormData(prevState => ({ ...prevState, id_utilisateur: option.value }))}
            />
          </div>

          {/* Champ pour entrer la note */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Note
            </label>
            <input
              type="number"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
              min="0"
              max="20"
            />
          </div>

          {/* Commentaire optionnel */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Commentaire (optionnel)
            </label>
            <input
              type="text"
              value={formData.commentaire}
              onChange={(e) => setFormData({ ...formData, commentaire: e.target.value, })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Boutons Annuler / Enregistrer */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Annuler
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
