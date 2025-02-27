import { useState, useEffect } from 'react'
import Select from 'react-select'
import {
  AddGradeModalProps,
  FormEvaluation,
  periodeLabels,
} from '../../../../../shared/src/types/types'
import { dateFormatting } from '../../../../../shared/src/utils/stringUtils'
import { periode } from '@prisma/client'

export default function WebAddGradeModal({ isOpen, onClose, onSubmit, module, cours, }: AddGradeModalProps) {
  const [formData, setFormData] = useState<FormEvaluation>({
    libelle: '',
    coefficient: 1,
    notemaximale: 20,
    periode: 'Semestre_1',
    id_cours: 0,
    id_module: module.id_module,
  })

  const handleSubmit = () => {
    if (!formData.libelle) {
      alert("Le nom de l'évaluation est requis")
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

    onSubmit(formData)
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
            <label className="block text-sm font-medium mb-1">
              Module sélectionné
            </label>
            <p className="p-2 border rounded bg-gray-100">
              {module.libelle ?? "Aucun module sélectionné"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Nom de l'évaluation
            </label>
            <input
              type="text"
              value={formData.libelle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  libelle: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">
              Cours
            </label>
            <select
              value={formData.id_cours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  id_cours: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un cours</option>
              {cours
                .filter(c => c.id_module === formData.id_module)
                .map(c => (
                  <option key={c.id_module} value={c.id_module}>
                    {dateFormatting(new Date(c.debut), new Date(c.fin))}
                  </option>
                ))}
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
                  coefficient: parseInt(e.target.value),
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
                setFormData({
                  ...formData,
                  notemaximale: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Période
            </label>
            <select
              value={formData.periode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  periode: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="Semestre_1">Semestre 1</option>
              <option value="Semestre_2">Semestre 2</option>
              <option value="Semestre_3">Semestre 3</option>
              <option value="Semestre_4">Semestre 4</option>
              <option value="Semestre_5">Semestre 5</option>
              <option value="Semestre_6">Semestre 6</option>
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
