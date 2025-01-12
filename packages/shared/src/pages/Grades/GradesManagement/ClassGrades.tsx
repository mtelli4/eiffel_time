import { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AddGradeModal } from '../../../components/Grades/GradesManagement/AddGradeModal'
import { styles } from '../../../styles/Grades/GradesManagement/GradesStyles'
import { GradeStatus } from '../../../types/types'
import { Module, Note, Evaluation, Cours, Etudiant, Utilisateur } from '../../../../../../backend/classes'

export function ClassGrades() {
    const [selectedModule, setSelectedModule] = useState<string | null>(null)
    const [showAddGrade, setShowAddGrade] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [modules, setModules] = useState<Module[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/modules')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur réseau')
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                const modules = data.map((m: any) => {
                    const cours = m.cours.map((c: any) => {
                        const evaluations = c.evaluations.map((e: any) => {
                            const notes = e.notes.map((n: any) => {
                                if (!n.etudiant || !n.etudiant.utilisateur) {
                                    throw new Error('Utilisateur non défini pour l\'étudiant');
                                }
                                const utilisateur = new Utilisateur(n.etudiant.utilisateur, n.etudiant.utilisateur.formations);
                                const etudiant = new Etudiant(utilisateur, n.etudiant);
                                return new Note(n, etudiant);
                            })
                            return new Evaluation(e, notes)
                        })
                        return new Cours(c, evaluations)
                    })
                    return new Module(m, cours)
                }
                )
                setModules(modules)
                console.log(modules)
                setLoading(false)
            }
            )
            .catch((error) => {
                console.error('Erreur lors de la récupération des modules:', error)
                setLoading(false)
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
            module.getCodeApogee().toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Affichage du contenu
    if (loading) {
        return <div>Chargement...</div>;  // Affichage pendant le chargement
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleAddGrade} style={styles.addButton}>
                    {/* Replace with appropriate icon */}
                    <Text style={styles.lblAddbtn}>Nouvelle évaluation</Text>
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
                            <Text style={styles.moduleTitle}>
                                {module.getCodeApogee()} - {module.getLibelle()}
                            </Text>
                        </View>

                        {module.getCours().map((cours) => (
                            cours.getEvaluations().map((evaluation) => (
                                <View key={evaluation.getId()} style={styles.evaluationCard}>
                                    <View style={styles.evaluationHeader}>
                                        <Text style={styles.evaluationTitle}>{evaluation.getLibelle()}</Text>
                                        <Text style={styles.evaluationSubtitle}>
                                            Date :{' '}
                                            {evaluation.getPeriode()} -{' '}
                                            Coefficient : {evaluation.getCoefficient()}
                                        </Text>
                                    </View>

                                    <View style={styles.table}>
                                        {/* Implement table or list using React Native components */}
                                        {evaluation.getNotes().map((note) => {
                                            const student = note.getEtudiant()
                                            return (
                                                <View key={note.getEvaluationId()} style={styles.tableRow}>
                                                    <Text style={styles.tableCell}>{student?.getNumeroEtudiant()}</Text>
                                                    <Text style={styles.tableCell}>
                                                        {student?.getNom()} {student?.getPrenom()}
                                                    </Text>
                                                    <Text style={styles.tableCell}>
                                                        {note.getNote() !== null
                                                            ? `${note.getNote()}/${evaluation.getNoteMax()}`
                                                            : '-'}
                                                    </Text>
                                                    <Text style={styles.tableCell}>
                                                        <Text style={styles.gradeStatus}>'Publiée'</Text>
                                                            {/*{note.getStatut() === GradeStatus.PUBLISHED
                                                                ? 'Publiée'
                                                                : 'Non publiée'}
                                                        </Text>*/}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            ))
                        ))}
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
                    students={[]}
                />
            )}
        </View>
    )
}
