import {
  Check,
  FileDown,
  FileText,
  Filter,
  Search,
  X as XIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../../../../shared/src/lib/utils'
import { API_URL } from '../../../../shared/src/types/types'

interface Student {
  id: string
  firstName: string
  lastName: string
  group: string
}

type Groupe = {
  id_grp: number
  libelle: string
}

interface Absence {
  id_absence: string
  etudiant: {
    id_utilisateur: number
    nom: string
    prenom: string
    groupes: Groupe[]
  }
  module: {
    id_module: number
    codeapogee: string
    libelle: string
  }
  date: string
  envoye: boolean
  valide: boolean
  updatedat: string
  statut: 'pending' | 'approved' | 'rejected'
  path?: string
}

// Mock data
/* const MOCK_STUDENTS: Student[] = [
  { id: '22001234', firstName: 'Jean', lastName: 'DUPONT', group: 'A1' },
  { id: '22001235', firstName: 'Marie', lastName: 'MARTIN', group: 'A2' },
] */

/* const MOCK_ABSENCES: Absence[] = [
  {
    id: 'abs1',
    studentId: '22001234',
    date: '2024-03-15',
    module: { code: 'M5101', name: 'Développement Web' },
    professor: 'Dr. Martin',
    statut: 'pending',
    justification: 'Certificat médical',
    document: 'https://example.com/justification.pdf',
    submissionDate: '2024-03-16',
  },
  {
    id: 'abs2',
    studentId: '22001235',
    date: '2024-03-20',
    module: { code: 'M5102', name: 'Base de données' },
    professor: 'Dr. Dubois',
    statut: 'approved',
    justification: 'Rendez-vous médical',
    document: 'https://example.com/justification2.pdf',
    submissionDate: '2024-03-21',
  },
] */

export function ManageAbsences() {
  const [absences, setAbsences] = useState<Absence[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatut, setSelectedStatut] = useState<Absence['statut'] | 'all'>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const setAbsenceStatut = (absence: Absence) => {
    if (absence.envoye && absence.valide) {
      return 'approved'
    } else if (absence.envoye && !absence.valide) {
      return 'rejected'
    } else {
      return 'pending'
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/api/absences/select`)
      .then((res) => res.json())
      .then((data) => {
        setAbsences(data.map((absence: any) => ({
          id_absence: absence.id_absence,
          etudiant: {
            id_utilisateur: absence.etudiant.utilisateur.id_utilisateur,
            nom: absence.etudiant.utilisateur.nom,
            prenom: absence.etudiant.utilisateur.prenom,
            groupes: absence.etudiant.groupe_etudiant.map((groupe: any) => ({
              id_grp: groupe.groupe.id_grp,
              libelle: groupe.groupe.libelle,
            })),
          },
          module: {
            id_module: absence.cours.module.id_module,
            codeapogee: absence.cours.module.codeapogee,
            libelle: absence.cours.module.libelle,
          },
          date: absence.cours.debut,
          envoye: absence.envoye,
          valide: absence.valide,
          updatedat: absence.updatedat,
          statut: setAbsenceStatut(absence),
          path: absence.justificatif,
        })))
      })
      .catch((error) => console.error('Error:', error))
  })

  const handleApprove = (absenceId: string) => {
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id_absence === absenceId ? { ...abs, statut: 'approved' } : abs
      )
    )
  }

  const handleReject = (absenceId: string) => {
    setAbsences((prev) =>
      prev.map((abs) =>
        abs.id_absence === absenceId ? { ...abs, statut: 'rejected' } : abs
      )
    )
  }

  const handleExport = () => {
    console.log('Exporting absences...')
  }

  const filteredAbsences = absences.filter((absence) => {
    const student = absences.find((s) => s.id_absence === absence.id_absence)?.etudiant
    const searchString =
      `${student?.prenom} ${student?.nom} ${absence.module.codeapogee} ${absence.module.libelle}`.toLowerCase()
    const matchesSearch = searchString.includes(searchQuery.toLowerCase())
    const matchesStatut =
      selectedStatut === 'all' || absence.statut === selectedStatut
    const matchesDateRange =
      (!startDate || absence.date >= startDate) &&
      (!endDate || absence.date <= endDate)

    return matchesSearch && matchesStatut && matchesDateRange
  })

  const getStatutBadgeClass = (statut: Absence['statut']) => {
    switch (statut) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
    }
  }

  const getStatutText = (statut: Absence['statut']) => {
    switch (statut) {
      case 'pending':
        return 'En attente'
      case 'approved':
        return 'Validée'
      case 'rejected':
        return 'Refusée'
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleExport}
          className="btn btn-outline flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          Exporter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un étudiant, un module..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={selectedStatut}
                onChange={(e) =>
                  setSelectedStatut(e.target.value as Absence['statut'] | 'all')
                }
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Validées</option>
                <option value="rejected">Refusées</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Étudiant
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Module
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Statut
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAbsences.map((absence) => {
              return (
                <tr
                  key={absence.id_absence}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {absence.etudiant.nom} {absence.etudiant.prenom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {absence.etudiant.groupes.map((groupe) => groupe.libelle).join(', ')}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {absence.module.codeapogee}
                      </div>
                      <div className="text-sm text-gray-500">
                        {absence.module.libelle}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(absence.date).toLocaleDateString('fr-FR')}
                      </div>
                      {absence.updatedat && (
                        <div className="text-sm text-gray-500">
                          Soumis le{' '}
                          {new Date(absence.updatedat).toLocaleDateString(
                            'fr-FR'
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatutBadgeClass(absence.statut)
                      )}
                    >
                      {getStatutText(absence.statut)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {absence.path && (
                        <button
                          onClick={() => window.open(absence.path, '_blank')}
                          className="p-1 text-gray-500 hover:text-primary"
                          title="Voir le justificatif"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      {absence.statut === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(absence.id_absence)}
                            className="p-1 text-green-600 hover:text-green-700"
                            title="Valider"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(absence.id_absence)}
                            className="p-1 text-red-600 hover:text-red-700"
                            title="Refuser"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
