import { useState } from 'react'

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    evaluations: any[]; // 🔥 On passe toutes les évaluations disponibles
    students: any[];
}

export default function WebAddNoteModal({
    isOpen,
    onClose,
    evaluations, // 🔥 Liste complète des évaluations
    students,
}: AddNoteModalProps) {
    const [formData, setFormData] = useState({
        id_eval: 0,
        id_utilisateur: 0,
        note: 0,
        commentaire: '',
    });

    const handleSubmit = async () => {
        console.log("Données envoyées :", formData); // 🔥 Vérification

        if (!formData.id_eval || formData.id_eval === 0) {
            alert('L’évaluation est requise')
            return
        }
        if (!formData.id_utilisateur || formData.id_utilisateur === 0) {
            alert('L’étudiant est requis')
            return
        }
        if (formData.note < 0 || formData.note > 20) {
            alert('La note doit être comprise entre 0 et 20')
            return
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
                const errorData = await response.json()
                throw new Error(
                    errorData.message ||
                    "Erreur lors de l'ajout de la note."
                )
            }

            const result = await response.json()
            console.log('Note ajoutée avec succès:', result)
            onClose() // Ferme la modal après succès
        } catch (error: any) {
            console.error('Erreur:', error)
            alert(
                "Une erreur s'est produite lors de l'ajout de la note: " +
                error.message
            )
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Ajouter une Note</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Sélection de l'évaluation */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Sélectionner une évaluation
                        </label>
                        <select
                            value={formData.id_eval || ''} // 🔥 Empêche d'afficher NaN
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    id_eval: parseInt(e.target.value) || 0, // 🔥 Assure que `id_eval` est un nombre
                                })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner une évaluation</option>
                            {evaluations.map((evaluation) => (
                                <option key={evaluation.getId()} value={evaluation.getId()}>
                                    {evaluation.getLibelle()} {/* 🔥 Affichage uniquement du nom */}
                                </option>
                            ))}
                        </select>


                    </div>

                    {/* Sélection de l'étudiant */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Étudiant
                        </label>
                        <select
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
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
