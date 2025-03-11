import { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import { Badge } from '../../components/attendance/Badge'
import { Button } from '../../components/attendance/Button'
import { Card } from '../../components/attendance/Card'
import { Input } from '../../components/attendance/Input'
import { API_URL } from '../../types/types'

type StudentAbsences = {
  id_absence: number
  module: string
  enseignant: string
  dateAbsence: Date
  justificatif: string
  dateJustificatif: Date
  message: string
  status: 'approved' | 'rejected' | 'pending' | 'unjustified'
}

type StatusKey = 'justified' | 'unjustified' | 'pending' | 'undefined'

const statusConfig: Record<
  StatusKey,
  { variant: 'success' | 'error' | 'warning' | 'default'; text: string }
> = {
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
  undefined: {
    variant: 'default' as const,
    text: 'Indéfini',
  },
}

const setAbsenceStatut = (envoye: boolean, valide: boolean) => {
  if (envoye && valide) {
    return 'approved'
  } else if (envoye && !valide) {
    return 'rejected'
  } else if (envoye && valide === null) {
    return 'pending'
  } else {
    ;('unjusitified')
  }
}

const setVariant = (
  status: string
): 'success' | 'error' | 'warning' | 'default' => {
  return statusConfig[status as StatusKey].variant
}

const setBadgeText = (status: string): string => {
  return statusConfig[status as StatusKey].text
}

export function Absences() {
  const [studentAbsences, setStudentAbsences] = useState<StudentAbsences[]>([])
  const [justification, setJustification] = useState<Record<string, string>>({})
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const userId = 3

  useEffect(() => {
    fetch(`${API_URL}/api/student/absences/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau')
        return response.json()
      })
      .then((data) => {
        setStudentAbsences(
          data.map((absence: any) => ({
            id_absence: absence.id_absence,
            module: absence.module,
            enseignant: absence.enseignant,
            dateAbsence: new Date(absence.date_absence),
            justificatif: absence.justificatif,
            dateJustificatif: new Date(absence.date_justificatif),
            message: absence.message,
            status: setAbsenceStatut(absence.envoye, absence.valide),
          }))
        )
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des absences:', error)
      })
  }, [])

  const handleJustificationSubmit = (absenceId: number) => {
    if (!justification[absenceId]) return
    // Implement submission logic
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as StatusKey]

    return (
      <View style={styles.badgeContainer}>
        <Badge variant={config.variant}>{config.text}</Badge>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.scrollView, isDark && styles.scrollViewDark]}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          {studentAbsences.map((absence) => (
            <Card
              key={absence.id_absence}
              style={[styles.cardContainer, isDark && styles.cardContainerDark]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <View style={styles.moduleContainer}>
                      <Text
                        style={[
                          styles.moduleText,
                          isDark && styles.moduleTextDark,
                        ]}
                      >
                        {absence.module || 'Module inconnu'}
                      </Text>
                      <View style={styles.badgeContainer}>
                        <Text>yo</Text>
                        {/* <Badge variant={setVariant(absence.status)}>yo</Badge> */}
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.professorText,
                        isDark && styles.professorTextDark,
                      ]}
                    >
                      {absence.dateAbsence.toLocaleDateString('fr-FR') ||
                        'Date inconnue'}{' '}
                      •{' '}
                      {/* TODO: Ajouter la date de soumission du justificatif */}
                      {`${absence.enseignant}` || 'Enseignant inconnu'}
                    </Text>
                  </View>

                  {absence.justificatif && (
                    <TouchableOpacity
                      onPress={() => {
                        /* Implement document view */
                      }}
                      style={styles.documentButton}
                    >
                      <Text
                        style={[
                          styles.documentText,
                          isDark && styles.documentTextDark,
                        ]}
                      >
                        Voir le justificatif
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {absence.message && (
                  <Text
                    style={[
                      styles.justificationText,
                      isDark && styles.justificationTextDark,
                    ]}
                  >
                    Motif : {absence.message}
                  </Text>
                )}

                {absence.status === 'unjustified' && (
                  <View style={styles.justificationContainer}>
                    <Input
                      label="Motif de l'absence"
                      value={justification[absence.id_absence]}
                      onChangeText={(text) =>
                        setJustification((prev) => ({
                          ...prev,
                          [absence.id_absence]: text,
                        }))
                      }
                      placeholder="Saisissez le motif de l'absence"
                      isDarkMode={isDark}
                    />

                    <View style={styles.actionButtonsContainer}>
                      <View style={styles.uploadButton}>
                        <TouchableOpacity
                          style={[
                            styles.uploadTouchable,
                            isDark && styles.uploadTouchableDark,
                          ]}
                          onPress={() => {
                            /* Implement file upload */
                          }}
                        >
                          <Text
                            style={[
                              styles.uploadText,
                              isDark && styles.uploadTextDark,
                            ]}
                          >
                            Ajouter un justificatif
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <Button
                        variant="primary"
                        onPress={() =>
                          handleJustificationSubmit(absence.id_absence)
                        }
                        disabled={!justification[absence.id_absence]}
                        isDarkMode={isDark}
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
  scrollViewDark: {
    backgroundColor: '#1F2937',
  },
  container: {
    padding: 24,
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  cardContainer: {
    gap: 16,
  },
  cardContainerDark: {
    backgroundColor: '#111827',
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
  moduleTextDark: {
    color: 'white',
  },
  professorText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  professorTextDark: {
    color: '#ccc', // Plus clair en mode sombre
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
  documentTextDark: {
    color: '#4C6FFF',
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
  justificationTextDark: {
    color: '#ccc',
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
  uploadTouchableDark: {
    borderColor: '#4C6FFF',
  },
  uploadText: {
    color: '#2E3494',
    fontSize: 16,
  },
  uploadTextDark: {
    color: '#4C6FFF',
  },
})
