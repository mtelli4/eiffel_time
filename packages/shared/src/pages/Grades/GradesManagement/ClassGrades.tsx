import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Cours,
  Etudiant,
  Evaluation,
  Module,
  Note,
} from '../../../backend/classes'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import WebAddNoteModal from '../../../components/Grades/GradesManagement/WebAddNoteModal'
import WebDeleteNoteModal from '../../../components/Grades/GradesManagement/WebDeleteNoteModal'
import WebEditNoteModal from '../../../components/Grades/GradesManagement/WebEditNoteModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import WebEditNoteModal from '../../../components/Grades/GradesManagement/WebEditNoteModal'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import WebDeleteNoteModal from '../../../components/Grades/GradesManagement/WebDeleteNoteModal'
import { API_URL, ClassGradesEvaluation, ClassGradesModule, ClassGradesNote, periodeLabels } from '../../../types/types'
import { useEditDeleteLoader } from '../../../components/Button/EditDeleteLoader'
import { getTime } from '../../../utils/stringUtils'

export function ClassGrades() {
  const { Edit, Delete } = useEditDeleteLoader()
  
  const [AddNoteModal, setAddNoteModal] = useState<any>(null)

  const [showAddGrade, setShowAddGrade] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [modulesEvalNotes, setModuleEvalNotes] = useState<ClassGradesModule[]>([])
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showAddNote, setShowAddNote] = useState(false)
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<Evaluation | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Etudiant | null>(null)
  const [showEditNote, setShowEditNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showDeleteNote, setShowDeleteNote] = useState(false)
  const [showEditNote, setShowEditNote] = useState(false);
  const [showDeleteNote, setShowDeleteNote] = useState(false);

  useEffect(() => {
    const loadComponents = async () => {
      if (Platform.OS === 'web') {
        const { AddNoteModal } = await import(
          '../../../../../web/src/components/Grades/Manage/AddNoteModal.web'
        )

        setAddNoteModal(() => AddNoteModal)
      } else {

      }
    }

    loadComponents().then(r => r)
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/note/`)
      .then((res) => res.json())
      .then((data) => {
        setModuleEvalNotes(data.map((module: any) => {
          return {
            id_module: module.id_module,
            libelle: module.libelle,
            codeapogee: module.codeapogee,
            evaluations: module.evaluation.map((evaluationItem: any) => {
              return {
                id_eval: evaluationItem.id_eval,
                libelle: evaluationItem.libelle,
                periode: evaluationItem.periode,
                date: getTime(new Date(evaluationItem.cours.debut), new Date(evaluationItem.cours.fin)),
                notemaximale: evaluationItem.notemaximale,
                coefficient: evaluationItem.coefficient,
                notes: evaluationItem.notes.map((noteItem: any) => {
                  return {
                    numero_etudiant: noteItem.etudiant.numeroetudiant,
                    nom: noteItem.etudiant.utilisateur.nom,
                    prenom: noteItem.etudiant.utilisateur.prenom,
                    note: noteItem.note,
                    commentaire: noteItem.commentaire
                  }
                })
              }
            })
          }
        }))
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des modules:', error)
      })
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

  const handleAddNote = (evaluation: any) => {
    setSelectedEvaluation(evaluation); // Stocker l'évaluation sélectionnée
    setShowAddNote(true); // Ouvrir le modal d'ajout de note
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
                        Date :{' ' + e.date + ' '} - Coefficient : {e.coefficient}
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

      {showAddNote && (
        <AddNoteModal
          isOpen={showAddNote}
          onClose={() => setShowAddNote(false)}
          evaluation={selectedEvaluation}
          students={etudiants}
        />
      )}

      {showEditNote && selectedNote && (
        <WebEditNoteModal
          isOpen={showEditNote}
          onClose={() => setShowEditNote(false)}
          note={selectedNote}
        />
      )}

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
