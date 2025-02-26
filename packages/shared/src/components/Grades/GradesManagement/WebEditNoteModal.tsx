import { useState, useEffect } from 'react'
import { Note } from '../../../backend/classes';
import { Etudiant } from '../../../backend/classes';
import { Decimal } from '@prisma/client/runtime/library';


interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null; 
  student: Etudiant | null;
}

export default function WebEditNoteModal({
  isOpen,
  onClose,
  note,
  student,
}: EditNoteModalProps) {
  const [formData, setFormData] = useState({
    id_eval: 0,
    id_utilisateur: 0,
    note: 0,
    commentaire: '',
  });


  useEffect(() => {
    if (note) {
      setFormData({
        id_eval: note.getEvaluationId(),
        id_utilisateur: note.getUtilisateurId(),
        note: Number(note.getNote()),
        commentaire: note.getCommentaire(),
      });
    }
  }, [note]);

  const handleSubmit = async () => {
    if (!formData.id_eval || !formData.id_utilisateur) {
      alert("L'évaluation et l'étudiant sont requis");
      return;
    }
    if (formData.note < 0 || formData.note > 20) {
      alert('La note doit être comprise entre 0 et 20');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/note/update-note/${formData.id_utilisateur}/${formData.id_eval}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification de la note.");
      }

      const result = await response.json();
      console.log('Note modifiée avec succès:', result);
      onClose(); // Ferme la modal après succès
    } catch (error: any) {
      console.error('Erreur:', error);
      alert("Une erreur s'est produite lors de la modification de la note: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier une Note</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-4">
        
           <div>
            <label className="block text-sm font-medium mb-1">Étudiant</label>
            <div className="w-full p-2 border rounded bg-gray-100 text-gray-700">
              {student ? student.getFullName() : "Étudiant introuvable"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <input
              type="number"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded"
              min="0"
              max="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Commentaire (optionnel)</label>
            <input
              type="text"
              value={formData.commentaire}
              onChange={(e) =>
                setFormData({ ...formData, commentaire: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

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
