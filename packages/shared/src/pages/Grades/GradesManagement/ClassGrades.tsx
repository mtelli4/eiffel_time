import { Plus } from 'lucide-react'
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
import { API_URL, ClassGradesEvaluation, ClassGradesModule, ClassGradesNote, periodeLabels } from '../../../types/types'
import { useEditDeleteLoader } from '../../../components/Button/EditDeleteLoader'
import { dateFormatting, getTime } from '../../../utils/stringUtils'
import { fetchClassGrades } from '@shared/backend/services/classgrades'

export function ClassGrades() {
  const { Edit, Delete } = useEditDeleteLoader()
  
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [AddNoteModal, setAddNoteModal] = useState<any>(null)
  const [NoteForm, setNoteForm] = useState<any>(null)
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [modulesEvalNotes, setModuleEvalNotes] = useState<ClassGradesModule[]>([])
  const [cours, setCours] = useState<any>(null)
  const [etudiants, setEtudiants] = useState<any>(null)
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [showAddNote, setShowAddNote] = useState(false)
  const [showEditNote, setShowEditNote] = useState(false)
  const [showDeleteNote, setShowDeleteNote] = useState(false)

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
        const { AddNoteModal } = await import(
          '../../../../../web/src/components/Grades/Manage/AddNoteModal.web'
        )
        const { NoteForm } = await import(
          '../../../../../web/src/components/Grades/Manage/NoteForm.web'
        )
        setAddNoteModal(() => AddNoteModal)
        setNoteForm(() => NoteForm)
      } else {
        
      }
    }

    loadComponents().then(r => r)
  }, [])

  const handleAddGrade = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setShowAddGrade(true)
  }

  const filteredModules = modulesEvalNotes.filter(
    (module) =>
      module.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.codeapogee.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleAddNote = (evaluation: any) => {
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

  if (!Edit || !Delete) return null

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddGrade} style={styles.addButton}>
          <Plus className="w-4 h-4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddGrade} style={styles.addButton}>
          <Plus className="w-4 h-4" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un module..."
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        {filteredModules.map((module) => (
          module.evaluations.length > 0 && (
            <View key={module.id_module} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>{module.libelle}</Text>
              </View>

              {module.evaluations.length > 0 &&
                module.evaluations.map((e: ClassGradesEvaluation) => (
                  <View key={e.id_eval} style={styles.evaluationCard}>
                    <View style={styles.evaluationHeader}>
                      <Text style={styles.evaluationTitle}>
                        {e.libelle}  <TouchableOpacity onPress={() => handleAddNote(e)} style={styles.addButton}>
                          <Plus className="w-4 h-4" />
                        </TouchableOpacity>
                      </Text>
                      <Text style={styles.evaluationSubtitle}>
                        Période de l'évaluation :{' ' + periodeLabels[e.periode]} -{' '}
                        Date : {e.date} - Coefficient : {e.coefficient} {calculateEvaluationAverage(e)}
                      </Text>
                    </View>
                    <View key={'m' + module.id_module + 'e' + e.id_eval} style={styles.table}>
                      {/* <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Période de l'évaluation : {periodeLabels[e.periode]}</Text>
                        <Text style={styles.tableCell}>Date : {e.date}</Text>
                        <Text style={styles.tableCell}>Coefficient : {e.coefficient}</Text>
                        <Text style={styles.tableCell}>Moyenne : {calculateEvaluationAverage(e)}</Text>
                      </View> */}
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
                          <Edit onEdit={() => handleEditNote(n)} />
                          <Delete onDelete={() => handleDeleteNote(n)} />
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
            </View>
          )))}
      </ScrollView>

      {showAddGrade && (
        <AddGradeModal
          isOpen={showAddGrade}
          onClose={() => {
            setShowAddGrade(false)
          }}
          modules={modulesEvalNotes}
          cours={cours}
        />
      )}

      {showAddNote && ( // TODO: Faire un seul modal pour ajouter et modifier une note
        <AddNoteModal
          isOpen={showAddNote}
          onClose={() => setShowAddNote(false)}
          evaluation={selectedEvaluation}
          students={etudiants}
        />
      )}

      {showNoteForm && (
        <NoteForm
          isOpen={showNoteForm}
          onClose={() => setShowNoteForm(false)}
          evaluation={selectedEvaluation}
        />
      )}

      {/* {showEditNote && selectedNote && (
        <WebEditNoteModal
          isOpen={showEditNote}
          onClose={() => setShowEditNote(false)}
          note={selectedNote}
        />
      )} */}

            {showDeleteNote && selectedNote && (
              <WebDeleteNoteModal
                isOpen={showDeleteNote}
                onClose={() => setShowDeleteNote(false)}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `${API_URL}/api/note/delete-note/${selectedNote.getUtilisateurId()}/${selectedNote.getEvaluationId()}`,
                      { method: 'DELETE' }
                    )

                    if (!response.ok) {
                      throw new Error('Erreur lors de la suppression de la note.')
                    }

              // Supprimer la note de la liste des notes
              setModuleEvalNotes((prevModuleEvalNotes) =>
                prevModuleEvalNotes.map((module) => {
                  return {
                    ...module,
                    evaluations: module.evaluations.map((evaluation: any) => {
                      if (evaluation.id_eval === selectedNote.getEvaluationId()) {
                        return {
                          ...evaluation,
                          notes: evaluation.notes.filter(
                            (note: any) => note.numero_etudiant !== selectedNote.getUtilisateurId()
                          ),
                        };
                      }

                      return evaluation;
                    }),
                  };
                }
                )
              );
              console.log("Note supprimée avec succès.");
            } catch (error) {
              console.error("Erreur :", error);
              alert("Une erreur s'est produite lors de la suppression de la note.");
            }
          }}
        />
      )}
    </View>
  )
}
