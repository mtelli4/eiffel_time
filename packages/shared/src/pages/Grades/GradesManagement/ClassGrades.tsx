import { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import { API_URL, ClassGradesEvaluation, ClassGradesModule, ClassGradesNote, ClassGradesStudent, FormEvaluation, FormNote, periodeLabels } from '../../../types/types'
import { useEditDeleteLoader } from '../../../components/Button/EditDeleteLoader'
import { fetchClassGrades } from '../../../backend/services/classgrades'
import { PlusButton } from '../../../components/Button/PlusButton'
import { dateFormatting } from '../../../utils/stringUtils'

const calculateEvaluationAverage = (evaluation: ClassGradesEvaluation) => {
  if (evaluation.notes.length === 0) return ''
  const notes = evaluation.notes
  const notemaximale = evaluation.notemaximale

  // Filtrer les notes valides (non nulles)
  const validNotes = notes.filter((n) => n.note !== null)

  // Si aucune note valide, retourner '-'
  if (validNotes.length === 0) return '-'

  // Calculer la somme des notes ramenées sur 20
  const sumNotes = validNotes.reduce((sum, n) => {
    return sum + (n.note / notemaximale) * evaluation.notemaximale
  }, 0)

  // Calculer la moyenne
  const average = sumNotes / validNotes.length

  // Retourner la moyenne formatée avec 2 décimales
  return ' - Moyenne : ' + average.toFixed(2)
}

export function ClassGrades() {
  const { Edit, Delete } = useEditDeleteLoader()

  const [refresh, setRefresh] = useState(false);

  const forceUpdate = () => setRefresh((prev) => !prev);

  const [showAddGradeModal, setShowAddGradeModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)

  const [NoteForm, setNoteForm] = useState<any>(null)

  const [selectedModule, setSelectedModule] = useState<ClassGradesModule | null>(null)
  const [selectedEvaluation, setSelectedEvaluation] = useState<ClassGradesEvaluation | null>(null)
  const [selectedNote, setSelectedNote] = useState<ClassGradesNote | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [modulesEvalNotes, setModuleEvalNotes] = useState<ClassGradesModule[]>([])
  const [cours, setCours] = useState<any>(null)
  const [students, setStudents] = useState<any>(null)

  useEffect(() => {
    fetchClassGrades()
      .then((data) => {
        setModuleEvalNotes(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des modules:', error)
      })

    fetch(`${API_URL}/api/classgrades/cours`)
      .then((res) => res.json())
      .then((data) => {
        setCours(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des cours:', error)
      })

    fetch(`${API_URL}/api/classgrades/etudiants`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.map((etudiant: any) => {
          return {
            id_utilisateur: etudiant.id_utilisateur,
            nom: etudiant.utilisateur.nom,
            prenom: etudiant.utilisateur.prenom,
            numero_etudiant: etudiant.numeroetudiant
          }
        }))
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des étudiants:', error)
      })
  }, [])

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { NoteForm } = await import('../../../../../web/src/components/Grades/Manage/NoteForm.web')
        setNoteForm(() => NoteForm)
      } else {
        const { NoteForm } = await import('../../../../../mobile/src/components/Grades/GradesManagement/NoteForm.native')
        setNoteForm(() => NoteForm)
      }
    }

    loadComponents().then(r => r)
  }, [])

  if (!Edit || !Delete) return null;

  const filteredGradeModules = modulesEvalNotes.filter((module) => {
    return module.libelle.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleAddGrade = (module: ClassGradesModule) => {
    setSelectedModule(module);
    setShowAddGradeModal(true);
  }

  const handleSubmitGrade = async (data: FormEvaluation) => {
    try {
      const response = await fetch(`${API_URL}/api/classgrades/insert-evaluation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Erreur réseau')

      const result = await response.json()
      const actualCourse = cours.find((c: any) => c.id_cours === data.id_cours)
      const date = dateFormatting(new Date(actualCourse.debut), new Date(actualCourse.fin))
      const newEvaluation: ClassGradesEvaluation = {
        id_eval: result.id_eval,
        libelle: data.libelle,
        periode: data.periode,
        date: date,
        notemaximale: data.notemaximale,
        coefficient: data.coefficient,
        notes: [],
        id_module: data.id_module,
      }
      setModuleEvalNotes((prev: ClassGradesModule[]) => {
        const newModules = prev.map((m) => {
          if (m.id_module === data.id_module) {
            return { ...m, evaluations: [...m.evaluations, newEvaluation] }
          }
          return m
        })
        return newModules
      })
    } catch (error: any) {
      console.error('Erreur:', error)
    }

    setShowAddGradeModal(false)
    setSelectedModule(null)
  }

  const handleDeleteGrade = async (evaluation: ClassGradesEvaluation) => {
    try {
      const response = await fetch(`${API_URL}/api/classgrades/delete-evaluation/${evaluation.id_eval}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erreur réseau')

      setModuleEvalNotes((prev) => {
        const newModules = prev.map((m) => {
          if (m.evaluations.find((e) => e.id_eval === evaluation.id_eval)) {
            return {
              ...m,
              evaluations: m.evaluations.filter((e) => e.id_eval !== evaluation.id_eval),
            }
          }
          return m
        })
        return newModules
      })
    } catch (error: any) {
      console.error('Erreur:', error)
    }
  }

  const handleAddNote = (evaluation: ClassGradesEvaluation) => {
    setSelectedEvaluation(evaluation); // Stocker l'évaluation sélectionnée
    setShowNoteForm(true); // Ouvrir le formulaire de note
  }

  const handleEditNote = (evaluation: ClassGradesEvaluation, note: ClassGradesNote) => {
    setSelectedEvaluation(evaluation);
    setSelectedNote(note);
    setShowNoteForm(true);
  }

  const handleSubmitNote = async (data: FormNote) => {
    if (!selectedNote) {
      try {
        const response = await fetch(`${API_URL}/api/classgrades/insert-note`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Erreur réseau')
        const result = await response.json()
        const student = students.find((s: ClassGradesStudent) => s.id_utilisateur === result.id_utilisateur)

        if (!student) return

        const newNote: ClassGradesNote = {
          id_eval: result.id_eval,
          id_utilisateur: result.id_utilisateur,
          numero_etudiant: student,
          nom: student,
          prenom: student,
          note: result.note,
          commentaire: result.commentaire,
        }
        setModuleEvalNotes((prevModules) => {
          return prevModules.map((module) => {
            if (module.id_module === selectedEvaluation?.id_module) {
              return {
                ...module,
                evaluations: module.evaluations.map((evalItem) => {
                  if (evalItem.id_eval === selectedEvaluation?.id_eval) {
                    return {
                      ...evalItem,
                      notes: [...evalItem.notes, newNote], // Ajout de la note
                    }
                  }
                  return evalItem
                }),
              }
            }
            return module
          })
        })
        forceUpdate()
      } catch (error) {
        console.error('Erreur:', error)
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/api/classgrades/update-note/${selectedNote.id_utilisateur}/${selectedEvaluation?.id_eval}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Erreur réseau')

        const result = await response.json()
        const student = students.find((s: ClassGradesStudent) => s.id_utilisateur === result.id_utilisateur)
        const updatedNote: ClassGradesNote = {
          id_eval: result.id_eval,
          id_utilisateur: result.id_utilisateur,
          numero_etudiant: student,
          nom: student,
          prenom: student,
          note: result.note,
          commentaire: result.commentaire,
        }
        const modules = modulesEvalNotes.map((m) => {
          if (m.id_module === selectedEvaluation?.id_module) {
            const evaluations = m.evaluations.map((e) => {
              if (e.id_eval === selectedEvaluation.id_eval) {
                return { ...e, notes: e.notes.map((n) => n.id_utilisateur === updatedNote.id_utilisateur ? updatedNote : n) }
              }
              return e
            })
            return { ...m, evaluations }
          }
          return m
        })
        setModuleEvalNotes(modules)
      } catch (error) {
        console.error('Erreur:', error)
      }
    }

    setShowNoteForm(false)
    setSelectedEvaluation(null)
    setSelectedNote(null)
  }

  const handleDeleteNote = async (evaluation: ClassGradesEvaluation, note: ClassGradesNote) => {
    try {
      const response = await fetch(`${API_URL}/api/classgrades/delete-note/${note.id_utilisateur}/${evaluation.id_eval}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erreur réseau')

      setModuleEvalNotes((prev) => {
        const newModules = prev.map((m) => {
          m.evaluations.map((e) => {
            if (e.id_eval === evaluation.id_eval) {
              e.notes = e.notes.filter((n) => n.id_utilisateur !== note.id_utilisateur)
            }
            return e
          })
          return m
        })
        return newModules
      })
    } catch (error: any) {
      console.error('Erreur:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Rechercher un module..."
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        {filteredGradeModules.map((module) => (
          <View key={module.id_module} style={styles.moduleCard}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleTitle}>
                {module.libelle} {module.codeapogee !== null && `(${module.codeapogee}) `}
                <TouchableOpacity onPress={() => handleAddGrade(module)} style={{ marginLeft: 8 }}>
                  <PlusButton />
                </TouchableOpacity>
              </Text>
            </View>

            {module.evaluations.length > 0 &&
              module.evaluations.map((e: ClassGradesEvaluation) => (
                <View key={e.id_eval} style={styles.evaluationCard}>
                  <View style={styles.evaluationHeader}>
                    <Text style={styles.evaluationTitle}>
                      {e.libelle} {''}
                      <TouchableOpacity onPress={() => handleAddNote(e)} style={{ marginLeft: 10 }}>
                        <PlusButton />
                      </TouchableOpacity>
                      <Delete onDelete={() => handleDeleteGrade(e)} confirmMessage={`Voulez-vous supprimer l'évaluation ${e.libelle} du ${e.periode.replace('_', ' ')}. Attention cette action supprimera toutes les notes de l'évaluation !`} />
                    </Text>
                    <Text style={styles.evaluationSubtitle}>
                      Période de l'évaluation :{' ' + e.periode} -{' '}
                      Date : {e.date} - Coefficient : {e.coefficient} {calculateEvaluationAverage(e)}
                    </Text>
                  </View>
                  <View key={'m' + module.id_module + 'e' + e.id_eval} style={styles.table}>
                    {e.notes.map((n: ClassGradesNote) => (
                      <View key={`m${module.id_module}e${e.id_eval}u${n.id_utilisateur}`} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{n.numero_etudiant}</Text>
                        <Text style={styles.tableCell}>{n.nom + ' ' + n.prenom}</Text>
                        <Text style={styles.tableCell}>{n.note !== null ? `${n.note}/${e.notemaximale}` : '-'}</Text>
                        <Text style={styles.tableCell}>{n.commentaire}</Text>
                        {/*
                          <Text style={styles.tableCell}>
                            <Text style={styles.gradeStatus}>
                            'Publiée'
                            </Text>
                          </Text> 
                          */}
                        <Edit onEdit={() => handleEditNote(e, n)} />
                        <Delete onDelete={() => handleDeleteNote(e, n)} confirmMessage={`Voulez-vous supprimer la note de ${n.nom} ${n.prenom} (${n.numero_etudiant}) ?`} />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      {showAddGradeModal && selectedModule && (
        <AddGradeModal
          isOpen={showAddGradeModal}
          onClose={() => {
            setShowAddGradeModal(false)
            setSelectedModule(null)
          }}
          onSubmit={handleSubmitGrade}
          module={selectedModule}
          cours={cours}
        />
      )}

      {showNoteForm && selectedEvaluation && (
        <NoteForm
          isOpen={showNoteForm}
          onClose={() => {
            setShowNoteForm(false)
            setSelectedEvaluation(null)
            setSelectedNote(null)
          }}
          onSubmit={handleSubmitNote}
          isEdit={!!selectedNote}
          evaluation={selectedEvaluation}
          students={students.filter((student: ClassGradesStudent) => !selectedEvaluation.notes.some((note) => note.id_utilisateur === student.id_utilisateur))}
          note={selectedNote}
        />
      )}
    </View>
  )
}
