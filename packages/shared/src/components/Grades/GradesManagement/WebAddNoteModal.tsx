import { useState, useEffect } from 'react';
import { Evaluation, Note } from '@shared/backend/classes';

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    evaluation: Evaluation | null;
    students: any[];
    notes: Note[]; // 🔥 Ajout de notes en props
}

export default function WebAddNoteModal({
    isOpen,
    onClose,
    evaluation,
    students,
    notes, // 🔥 Notes passées en props
}: AddNoteModalProps) {
    const [formData, setFormData] = useState({
        id_eval: 0,
        id_utilisateur: 0,
        note: 0,
        commentaire: '',
    });

    useEffect(() => {
        if (evaluation) {
            setFormData((prev) => ({
                ...prev,
                id_eval: evaluation.getId(),
            }));
        }
    }, [evaluation]);

    const handleSubmit = async () => {
        console.log("Données envoyées :", formData);

        if (!formData.id_utilisateur || formData.id_utilisateur === 0) {
            alert('L’étudiant est requis');
            return;
        }
        if (formData.note < 0 || formData.note > 20) {
            alert('La note doit être comprise entre 0 et 20');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:4000/api/note/insert-note',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'ajout de la note.");
            }

            const result = await response.json();
            console.log('Note ajoutée avec succès:', result);
            onClose();
        } catch (error: any) {
            console.error('Erreur:', error);
            alert("Une erreur s'est produite lors de l'ajout de la note: " + error.message);
        }
    };

    if (!isOpen || !evaluation) return null;

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
                        <p className="p-2 border rounded bg-gray-100">{evaluation.getLibelle()}</p>
                    </div>

                    {/* Sélection de l'étudiant */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Étudiant
                        </label>
                        <select
                            value={formData.id_utilisateur || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    id_utilisateur: parseInt(e.target.value) || 0, 
                                })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner un étudiant</option>
                            
                            {students
                                .filter((student) => 
                                    !notes.some((note) => 
                                        note.getUtilisateurId() === student.getId() &&
                                        note.getEvaluationId() === formData.id_eval
                                    )
                                )
                                .map((student) => (
                                    <option key={student.getId()} value={student.getId()}>
                                        {student.getFullName()}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Champ pour entrer la note */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Note
                        </label>
                        <input
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
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    commentaire: e.target.value,
                                })
                            }
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
