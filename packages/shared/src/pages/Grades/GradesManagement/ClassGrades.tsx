import { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import WebEditNoteModal from '../../../components/Grades/GradesManagement/WebEditNoteModal'
import WebDeleteNoteModal from '../../../components/Grades/GradesManagement/WebDeleteNoteModal'
import { API_URL, ClassGradesEvaluation, ClassGradesModule, ClassGradesNote, FormEvaluation, periodeLabels } from '../../../types/types'
import { useEditDeleteLoader } from '../../../components/Button/EditDeleteLoader'
// import { dateFormatting, getTime } from '../../../utils/stringUtils'
import { fetchClassGrades } from '../../../backend/services/classgrades'

import WebDeleteGradeModal from '../../../components/Grades/GradesManagement/WebDeleteGradeModal'
import { PlusButton } from '../../../components/Button/PlusButton'
import { dateFormatting } from '../../../utils/stringUtils'

export function ClassGrades() {
  const { Edit, Delete } = useEditDeleteLoader()

  const [showAddGradeModal, setShowAddGradeModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)

  const [NoteForm, setNoteForm] = useState<any>(null)

  const [selectedModule, setSelectedModule] = useState<ClassGradesModule | null>(null)


  const [searchQuery, setSearchQuery] = useState('')
  const [modulesEvalNotes, setModuleEvalNotes] = useState<ClassGradesModule[]>([])
  const [cours, setCours] = useState<any>(null)
  const [etudiants, setEtudiants] = useState<any>(null)
  const [showAddNote, setShowAddNote] = useState(false)
  const [showEditNote, setShowEditNote] = useState(false);
  const [showDeleteNote, setShowDeleteNote] = useState(false);
  const [showDeleteEvaluation, setShowDeleteEvaluation] = useState(false);

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
        setEtudiants(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des étudiants:', error)
      }
      )
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

  const filteredGradeModules = modulesEvalNotes.filter(
    (module) =>
      module.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.codeapogee.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      }
      setModuleEvalNotes((prev) => {
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

  /* const handleAddGrade = (module: ClassGradesModule) => {
    // setSelectedModule(module);
    setShowAddGrade(true);
  }; */

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
      return sum + (n.note / notemaximale) * 20
    }, 0)

    // Calculer la moyenne
    const average = sumNotes / validNotes.length

    // Retourner la moyenne formatée avec 2 décimales
    return ' - Moyenne : ' + average.toFixed(2)
  }

  /* const handleAddNote = (evaluation: any) => {
    setSelectedEvaluation(evaluation); // Stocker l'évaluation sélectionnée
    // setShowAddNote(true); // Ouvrir le modal d'ajout de note
    setShowNoteForm(true); // Ouvrir le formulaire de note
  };
 
  const handleEditNote = (note: ClassGradesNote) => {
    setSelectedNote(note);
    setShowEditNote(true);
  };
 
  const handleDeleteNote = (note: ClassGradesNote) => {
    setSelectedNote(note);
    setShowDeleteNote(true);
  };
 
  const handleAddNote = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation) 
    setShowAddNote(true) 
  } */

  /* const hasEvaluations = (id_module: number) => {
   
    const count = notes.filter((note) => {
      return evaluations.find((evaluation) => {
        return cours.find((c) => {
          return (
            c.getId() === evaluation.getCoursId() &&
            c.getIdModule() === id_module
          )
        })
      })
    })
    return count.length > 0
  } */

  /* const handleEditNote = (note: Note) => {
    const student = etudiants.find((etudiant) => etudiant.getId() === note.getUtilisateurId());
    setSelectedNote(note);
    setSelectedStudent(student || null); 
    setShowEditNote(true);
  }; */

  /* const handleDeleteNote = (note: Note) => {
    setSelectedNote(note);
    setShowDeleteNote(true);
  }; */

  /* const handleDelModal =(evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation); 
    setShowDeleteEvaluation(true);
  }; */

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
                      <TouchableOpacity onPress={() => setShowNoteForm(true)} style={{ marginLeft: 10 }}>
                        <PlusButton />
                      </TouchableOpacity>
                      <Delete onDelete={() => handleDeleteGrade(e)} confirmMessage={`Voulez-vous supprimer l'évaluation ${e.libelle} du ${e.periode.replace('_', ' ')}. Attention cette action supprimera toutes les notes de l'évaluation !`} />
                    </Text>
                    <Text style={styles.evaluationSubtitle}>
                      Période de l'évaluation :{' ' + periodeLabels[e.periode]} -{' '}
                      Date : {e.date} - Coefficient : {e.coefficient} {calculateEvaluationAverage(e)}
                    </Text>
                  </View>
                  <View key={'m' + module.id_module + 'e' + e.id_eval} style={styles.table}>
                    {e.notes.map((n: ClassGradesNote) => (
                      <View key={'m' + module.id_module + 'e' + e.id_eval + 'u' + n.numero_etudiant} style={styles.tableRow}>
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
                        {/* <Edit onEdit={() => handleEditNote(n)} /> */}
                        {/* <Delete onDelete={() => handleDeleteNote(n)} /> */}
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
    </View>
  )
}
