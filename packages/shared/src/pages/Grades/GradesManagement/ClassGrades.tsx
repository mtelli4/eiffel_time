import { useEffect, useState } from 'react'
import {
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
import { Button } from '../../../components/Button/Button'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import WebAddNoteModal from '../../../components/Grades/GradesManagement/WebAddNoteModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import WebEditNoteModal from '@shared/components/Grades/GradesManagement/WebEditNoteModal'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import WebDeleteNoteModal from '@shared/components/Grades/GradesManagement/WebDeleteNoteModal'

export function ClassGrades() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [modules, setModules] = useState<Module[]>([])
  const [etudiants, setEtudiants] = useState<Etudiant[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [cours, setCours] = useState<Cours[]>([])
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [showAddNote, setShowAddNote] = useState(false)
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<Evaluation | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Etudiant | null>(null)
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showDeleteNote, setShowDeleteNote] = useState(false);

  

  useEffect(() => {
    fetch('http://localhost:4000/api/data/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        return response.json()
      })
      .then((data) => {
        const modules = data.modules.map((m: any) => new Module(m))
        setModules(modules)

        const etudiants = data.etudiants.map(
          (e: any) => new Etudiant(e, e.utilisateur)
        )
        setEtudiants(etudiants)

        const notes = data.notes.map((n: any) => new Note(n))
        setNotes(notes)

        const evaluations = data.evaluations.map((e: any) => new Evaluation(e))
        setEvaluations(evaluations)

        const cours = data.cours.map((c: any) => new Cours(c))
        setCours(cours)
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

  const filteredModules = modules.filter(
    (module) =>
      module.getLibelle().toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.getCodeApogee().toLowerCase().includes(searchQuery.toLowerCase())
  )
  const handleAddNote = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation); // Stocker l'évaluation sélectionnée
    setShowAddNote(true); // Ouvrir le modal d'ajout de note
  };
  

  const hasEvaluations = (id_module: number) => {
    /* récupérer le nombre de notes pour un module donné, sachant que chaque note est liée à une évaluation qui est liée à un cours qui est lié à un module */
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
  }

  const handleEditNote = (note: Note) => {
    const student = etudiants.find((etudiant) => etudiant.getId() === note.getUtilisateurId());
    setSelectedNote(note);
    setSelectedStudent(student || null); // Si l'étudiant n'est pas trouvé, on met `null`
    setShowEditNote(true);
  };
  
  const handleDeleteNote = (note: Note) => {
    setSelectedNote(note);
    setShowDeleteNote(true);
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
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
        {/* Replace with appropriate icon */}
      </View>
      <ScrollView>
        {filteredModules.map((module) => (
          <View key={module.getId()} style={styles.moduleCard}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleTitle}>{module.getName()}</Text>
            </View>

            {hasEvaluations(module.getId()) &&
              evaluations.map(
                (e) =>
                  e.getCoursId() === module.getId() && (
                    <View key={e.getId()} style={styles.evaluationCard}>
                      <View style={styles.evaluationHeader}>
                        <Text style={styles.evaluationTitle}>
                          {e.getLibelle()}  <TouchableOpacity onPress={() => handleAddNote(e)}  style={styles.addButton}>
  <Plus className="w-4 h-4" />
</TouchableOpacity>

                        </Text>
      
                 
                        <Text style={styles.evaluationSubtitle}>
                          Période de l'évaluation :{' ' + e.getPeriodeName()} -{' '}
                          Date :{' '}
                          {cours
                            .find((c) => c.getId() === e.getCoursId())
                            ?.getTime()}{' '}
                          - Coefficient : {e.getCoefficient()}
                        </Text>
                      </View>

                      <View style={styles.table}>
                        {notes.map((n) => {
                          if (n.getEvaluationId() !== e.getId()) {
                            return null
                          }
                          const etudiant = etudiants.find(
                            (etudiant) =>
                              etudiant.getId() === n.getUtilisateurId()
                          )

                          return (
                            <View
                              key={
                                'e' +
                                n.getEvaluationId() +
                                'u' +
                                n.getUtilisateurId()
                              }
                              style={styles.tableRow}
                            >
                              <Text style={styles.tableCell}>
                                {etudiant?.getNumeroEtudiant()}
                              </Text>
                              <Text style={styles.tableCell}>
                                {etudiant?.getFullName()}
                              </Text>
                              <Text style={styles.tableCell}>
                                {n.getNote() !== null
                                  ? `${n.getNote()}/${e.getNoteMax()}`
                                  : '-'}
                              </Text>
                              <Text>{n.getCommentaire()}</Text>
                              <Text style={styles.tableCell}>
                                <Text style={styles.gradeStatus}>
                                  'Publiée'
                                </Text>
                              </Text>
                      

                 
                             
        <TouchableOpacity 
          onPress={() => handleEditNote(n)}
          
        >
        
          <Edit2 className="w-4 h-4" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleDeleteNote(n)}
          
        >
        
          <Trash2 className="w-4 h-4" />
          
          
        </TouchableOpacity>
                            </View>
                          )
                        })}
                      </View>
                    </View>
                  )
              )}
          </View>
        ))}
      </ScrollView>

      {showAddGrade && (
        <AddGradeModal
          isOpen={showAddGrade}
          onClose={() => {
            setShowAddGrade(false)
          }}
          modules={modules}
          students={etudiants}
          cours={cours}
        />
      )}
   {showAddNote && selectedEvaluation && (
  <WebAddNoteModal
    isOpen={showAddNote}
    onClose={() => setShowAddNote(false)}
    evaluation={selectedEvaluation} 
    students={etudiants}
  />
)}



{showEditNote && selectedNote && selectedStudent && (
  <WebEditNoteModal
    isOpen={showEditNote}
    onClose={() => setShowEditNote(false)}
    note={selectedNote}
    student={selectedStudent} 
  />
)}


{showDeleteNote && selectedNote && (
  <WebDeleteNoteModal
    isOpen={showDeleteNote}
    onClose={() => setShowDeleteNote(false)}
    onDelete={async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/note/delete-note/${selectedNote.getUtilisateurId()}/${selectedNote.getEvaluationId()}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de la note.");
        }

        setNotes((prevNotes) =>
          prevNotes.filter(
            (n) =>
              n.getUtilisateurId() !== selectedNote.getUtilisateurId() ||
              n.getEvaluationId() !== selectedNote.getEvaluationId()
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
