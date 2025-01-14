import { AddGradeModalProps, FormEvaluation } from '@shared/types/types'
import { useState } from 'react'

export default function WebAddGradeModal({ isOpen, onClose, modules, students, cours }: AddGradeModalProps) {
    const [formData, setFormData] = useState<FormEvaluation>({
        libelle: '',
        coefficient: 1,
        notemaximale: 20,
        periode: 'Semestre 1',
        id_cours: 0,
        id_module: 0,
    })

    const handleSubmit = async () => {
        if (!formData.libelle) {
            alert('Le nom de l\'évaluation est requis')
            return
        }
        if (!formData.id_module || formData.id_module === 0) {
            alert('Le module est requis')
            return
        }
        if (!formData.id_cours || formData.id_cours === 0) {
            alert('Le cours est requis')
            return
        }
        try {
            const response = await fetch('http://localhost:4000/api/insert-evaluation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Erreur lors de l\'insertion de l\'évaluation.')
            }

            const result = await response.json()
            console.log('Évaluation créée avec succès:', result)
            onClose() // Ferme la modal après succès
        } catch (error) {
            console.error('Erreur:', error)
            alert('Une erreur s\'est produite lors de l\'insertion: ' + error.message)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Nouvelle évaluation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Module</label>
                        <select
                            value={formData.id_module}
                            onChange={(e) =>
                                setFormData({ ...formData, id_module: parseInt(e.target.value) })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner un module</option>
                            {modules.map((module) => (
                                <option key={module.getId()} value={module.getId()}>
                                    {module.getName()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nom de l'évaluation
                        </label>
                        <input
                            type="text"
                            value={formData.libelle}
                            onChange={(e) =>
                                setFormData({ ...formData, libelle: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cours</label>
                        <select
                            value={formData.id_cours}
                            onChange={(e) =>
                                setFormData({ ...formData, id_cours: parseInt(e.target.value) })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Sélectionner un cours</option>
                            {cours.map((c) => {
                                    if (c.getIdModule() !== formData.id_module) return null
                                    return (
                                        <option key={c.getId()} value={c.getId()}>
                                            {c.getTime()}
                                        </option>
                                    )
                                },
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Coefficient
                        </label>
                        <input
                            type="number"
                            value={formData.coefficient}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    coefficient: parseFloat(e.target.value),
                                })
                            }
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Note maximale
                        </label>
                        <input
                            type="number"
                            value={formData.notemaximale}
                            onChange={(e) =>
                                setFormData({ ...formData, notemaximale: parseInt(e.target.value) })
                            }
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Période</label>
                        <select
                            value={formData.periode}
                            onChange={(e) =>
                                setFormData({ ...formData, periode: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="Semestre 1">Semestre 1</option>
                            <option value="Semestre 2">Semestre 2</option>
                            <option value="Semestre 3">Semestre 3</option>
                            <option value="Semestre 4">Semestre 4</option>
                            <option value="Semestre 5">Semestre 5</option>
                            <option value="Semestre 6">Semestre 6</option>
                        </select>
                    </div>
                </div>

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
    )
}
