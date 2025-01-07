import { AddGradeModalProps, FormData } from '@shared/types/types'
import { useState } from 'react'

export function WebAddGradeModal({
  isOpen,
  onClose,
  modules,
  students,
}: AddGradeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    moduleId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    maxValue: 20,
    coefficient: 1,
    grades: students.map((student) => ({
      studentId: student.id,
      value: null,
      status: 'ungraded',
    })),
  })

  const handleSubmit = () => {
    console.log('Submitting grades:', formData)
    onClose()
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
              value={formData.moduleId}
              onChange={(e) =>
                setFormData({ ...formData, moduleId: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.code} - {module.name}
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
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
              value={formData.maxValue}
              onChange={(e) =>
                setFormData({ ...formData, maxValue: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
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
