import { ClassGradesEvaluation } from '../../../../../shared/src/types/types';

interface NoteFormProps {
  isOpen: boolean
  onClose: () => void
  evaluation: ClassGradesEvaluation
}

export function NoteForm({ isOpen, onClose, evaluation }: NoteFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ajouter une Note</h2>
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
            {/* <select
              value={formData.id_utilisateur}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  id_utilisateur: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un étudiant</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.nom} {student.prenom}
                </option>
              ))}
            </select> */}
          </div>

          {/* Champ pour entrer la note */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Note
            </label>
            {/* <input
              type="number"
              value={formData.note}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  note: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
              min="0"
              max="20"
            /> */}
          </div>

          {/* Commentaire optionnel */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Commentaire (optionnel)
            </label>
            {/* <input
              type="text"
              value={formData.commentaire}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commentaire: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            /> */}
          </div>
        </div>

        {/* Boutons Annuler / Enregistrer */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Annuler
          </button>
          <button onClick={() => { }} className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
