import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from '../../components/Absences/Badge'
import { Button } from '../../components/Absences/Button'
import { Card } from '../../components/Absences/Card'
import { Input } from '../../components/Absences/Input'
import { Absence, Cours, Etudiant, Module } from '../../../../../backend/classes/'

export function Absences() {
    const [absences, setAbsences] = useState<Absence[]>([])
    const [justification, setJustification] = useState<Record<string, string>>({})

    useEffect(() => {
        fetch('http://localhost:4000/api/absences')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur réseau')
                }
                return response.json()
            })
            .then((data) => {
                const absences = data.map((a: any) => {
                    const etudiant = new Etudiant(a.etudiant, a.etudiant.utilisateur);
                    const module = new Module(a.module, a.module.formation);
                    const cours = new Cours(a.cours, a.cours.evaluations);
                    return new Absence(a, etudiant, cours);
                })
                setAbsences(absences)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des absences:', error)
            })
    }, [])

    const handleJustificationSubmit = (absenceId: string) => {
        if (!justification[absenceId]) return
        // Implement submission logic
    }

    const getStatusBadge = (status: Absence['status']) => {
        const statusConfig = {
            justified: {
                variant: 'success' as const,
                text: 'Justifiée',
            },
            unjustified: {
                variant: 'error' as const,
                text: 'Non justifiée',
            },
            pending: {
                variant: 'warning' as const,
                text: 'En attente',
            },
        }

        const config = statusConfig[status]

        return (
            <View style={styles.badgeContainer}>
                <Badge variant={config.variant}>{config.text}</Badge>
            </View>
        )
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    {absences.map((absence) => (
                        <Card key={absence.getId()}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <View>
                                        <View style={styles.moduleContainer}>
                                            <Text style={styles.moduleText}>
                                                {absence.getCours().getModule().getName()}
                                            </Text>
                                            {getStatusBadge(absence.status)}
                                        </View>
                                        <Text style={styles.professorText}>
                                            {new Date(absence.date).toLocaleDateString('fr-FR')} •{' '}
                                            {absence.professor}
                                        </Text>
                                    </View>

                                    {absence.document && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                /* Implement document view */
                                            }}
                                            style={styles.documentButton}
                                        >
                                            <Text style={styles.documentText}>
                                                Voir le justificatif
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {absence.justification && (
                                    <Text style={styles.justificationText}>
                                        Motif : {absence.justification}
                                    </Text>
                                )}

                                {absence.status === 'unjustified' && (
                                    <View style={styles.justificationContainer}>
                                        <Input
                                            label="Motif de l'absence"
                                            value={justification[absence.id] || ''}
                                            onChangeText={(text) =>
                                                setJustification((prev) => ({
                                                    ...prev,
                                                    [absence.id]: text,
                                                }))
                                            }
                                            placeholder="Saisissez le motif de l'absence"
                                        />

                                        <View style={styles.actionButtonsContainer}>
                                            <View style={styles.uploadButton}>
                                                <TouchableOpacity
                                                    style={styles.uploadTouchable}
                                                    onPress={() => {
                                                        /* Implement file upload */
                                                    }}
                                                >
                                                    <Text style={styles.uploadText}>
                                                        Ajouter un justificatif
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            <Button
                                                variant="primary"
                                                onPress={() => handleJustificationSubmit(absence.id)}
                                                disabled={!justification[absence.id]}
                                            >
                                                Soumettre
                                            </Button>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Card>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        padding: 24,
    },
    cardContainer: {
        gap: 16,
    },
    cardContent: {
        gap: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap', // Allows content to wrap
    },
    moduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    moduleText: {
        fontWeight: '600',
        fontSize: 20,
        color: '#2E3494',
    },
    professorText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    documentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexShrink: 1, // Ensures the button shrinks as needed
        maxWidth: '100%', // Prevents overflow
    },
    documentText: {
        fontSize: 14,
        color: '#2E3494',
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexShrink: 1, // Prevents overflow
        maxWidth: '100%',
    },
    justificationText: {
        fontSize: 14,
        color: '#6B7280',
    },
    justificationContainer: {
        gap: 16,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    uploadTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#2E3494',
        borderRadius: 6,
    },
    uploadText: {
        color: '#2E3494',
        fontSize: 16,
    },
})
