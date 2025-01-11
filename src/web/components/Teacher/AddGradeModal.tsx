import { X } from 'lucide-react';
import { useState } from 'react';
import { GradeStatus } from '../../../shared/types/types';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group: string;
}

interface Module {
  id: string;
  code: string;
  name: string;
}

interface AddGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
  students: Student[];
}

const GRADE_STATUSES: GradeStatus[] = [
  'graded',
  'absent',
  'makeup',
  'ungraded',
  'not_submitted',
  'exempted',
  'pending_makeup'
];

export function AddGradeModal({ isOpen, onClose, modules, students }: AddGradeModalProps) {
  const [formData, setFormData] = useState({
    moduleId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    maxValue: 20,
    coefficient: 1,
    grades: students.map(student => ({
      studentId: student.id,
      value: null as number | null,
      status: 'ungraded' as GradeStatus
    }))
  });

  const handleSubmit = () => {
    console.log('Submitting grades:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Nouvelle évaluation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module
              </label>
              <select
                value={formData.moduleId}
                onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Sélectionner un module</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.code} - {module.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'évaluation
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note maximale
              </label>
              <input
                type="number"
                value={formData.maxValue}
                onChange={(e) => setFormData({ ...formData, maxValue: parseInt(e.target.value) })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.coefficient}
                onChange={(e) => setFormData({ ...formData, coefficient: parseFloat(e.target.value) })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Notes des étudiants</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">N° Étudiant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nom</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Note</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.grades.map((grade, index) => {
                    const student = students.find(s => s.id === grade.studentId);
                    return (
                      <tr key={grade.studentId} className="border-b border-gray-100">
                        <td className="py-3 px-4">{student?.id}</td>
                        <td className="py-3 px-4">
                          {student?.lastName} {student?.firstName}
                        </td>
                        <td className="text-center py-3 px-4">
                          <input
                            type="number"
                            value={grade.value || ''}
                            onChange={(e) => {
                              const newGrades = [...formData.grades];
                              newGrades[index].value = e.target.value ? parseFloat(e.target.value) : null;
                              setFormData({ ...formData, grades: newGrades });
                            }}
                            className="w-20 text-center rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          />
                        </td>
                        <td className="text-center py-3 px-4">
                          <select
                            value={grade.status}
                            onChange={(e) => {
                              const newGrades = [...formData.grades];
                              newGrades[index].status = e.target.value as GradeStatus;
                              setFormData({ ...formData, grades: newGrades });
                            }}
                            className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          >
                            {GRADE_STATUSES.map(status => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="btn btn-outline"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!formData.moduleId || !formData.name}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}