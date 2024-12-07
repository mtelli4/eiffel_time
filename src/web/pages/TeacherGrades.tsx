import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { GradeStatus } from '../../shared/types/types';
import { AddGradeModal } from '../components/Teacher/AddGradeModal';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group: string;
}

interface Grade {
  id: string;
  studentId: string;
  value: number | null;
  maxValue: number;
  coefficient: number;
  status: GradeStatus;
  date: string;
}

interface Evaluation {
  id: string;
  name: string;
  date: string;
  maxValue: number;
  coefficient: number;
  grades: Grade[];
}

interface Module {
  id: string;
  code: string;
  name: string;
  evaluations: Evaluation[];
}

const MOCK_MODULES: Module[] = [
  {
    id: 'mod1',
    code: 'M5101',
    name: 'Développement Web',
    evaluations: [
      {
        id: 'eval1',
        name: 'TP1 - React',
        date: '2024-03-15',
        maxValue: 20,
        coefficient: 1,
        grades: [
          {
            id: 'grade1',
            studentId: '22001234',
            value: 15,
            maxValue: 20,
            coefficient: 1,
            status: 'graded',
            date: '2024-03-15'
          }
        ]
      }
    ]
  }
];

const MOCK_STUDENTS: Student[] = [
  {
    id: '22001234',
    firstName: 'Jean',
    lastName: 'DUPONT',
    group: 'A1'
  }
];

export function TeacherGrades() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showAddGrade, setShowAddGrade] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddGrade = () => {
    setShowAddGrade(true);
  };

  const filteredModules = MOCK_MODULES.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Gestion des notes</h1>
        <button
          onClick={handleAddGrade}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouvelle évaluation
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un module..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary pl-10"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredModules.map(module => (
          <div key={module.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-primary">
                {module.code} - {module.name}
              </h2>
            </div>

            {module.evaluations.map(evaluation => (
              <div key={evaluation.id} className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">{evaluation.name}</h3>
                  <p className="text-sm text-gray-500">
                    Date : {new Date(evaluation.date).toLocaleDateString('fr-FR')} •
                    Coefficient : {evaluation.coefficient}
                  </p>
                </div>

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
                      {evaluation.grades.map(grade => {
                        const student = MOCK_STUDENTS.find(s => s.id === grade.studentId);
                        return (
                          <tr key={grade.id} className="border-b border-gray-100">
                            <td className="py-3 px-4">{student?.id}</td>
                            <td className="py-3 px-4">
                              {student?.lastName} {student?.firstName}
                            </td>
                            <td className="text-center py-3 px-4">
                              {grade.value !== null ? `${grade.value}/${grade.maxValue}` : '-'}
                            </td>
                            <td className="text-center py-3 px-4">
                              <span className="inline-block px-2 py-1 text-sm rounded-full bg-gray-100">
                                {grade.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showAddGrade && (
        <AddGradeModal
          isOpen={showAddGrade}
          onClose={() => setShowAddGrade(false)}
          modules={MOCK_MODULES}
          students={MOCK_STUDENTS}
        />
      )}
    </div>
  );
}