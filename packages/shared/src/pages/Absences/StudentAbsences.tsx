import { Badge } from '../../components/Absences/Badge'
import { Button } from '../../components/Absences/Button'
import { Card } from '../../components/Absences/Card'
import { Input } from '../../components/Absences/Input'
// import { AlertCircle, CheckCircle, Clock, FileText, Upload } from 'lucide-react'
import { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface Absence {
  id: string
  date: string
  module: {
    code: string
    name: string
  }
  professor: string
  status: 'justified' | 'unjustified' | 'pending'
  justification?: string
  document?: string
}

const MOCK_ABSENCES: Absence[] = [
  {
    id: 'abs1',
    date: '2024-03-15',
    module: {
      code: 'M5101',
      name: 'Développement Web',
    },
    professor: 'Dr. Martin',
    status: 'justified',
    justification: 'Certificat médical',
    document: 'justification.pdf',
  },
  {
    id: 'abs2',
    date: '2024-03-20',
    module: {
      code: 'M5102',
      name: 'Base de données',
    },
    professor: 'Dr. Dubois',
    status: 'pending',
  },
  {
    id: 'abs3',
    date: '2024-03-20',
    module: {
      code: 'M5102',
      name: 'Base de données',
    },
    professor: 'Dr. Dubois',
    status: 'unjustified',
  },
]

export function Absences() {
  const [absences] = useState<Absence[]>(MOCK_ABSENCES)
  const [justification, setJustification] = useState<Record<string, string>>({})

  const handleJustificationSubmit = (absenceId: string) => {
    if (!justification[absenceId]) return
    // Implement submission logic
  }

  const getStatusBadge = (status: Absence['status']) => {
    const statusConfig = {
      justified: {
        variant: 'success' as const,
        // icon: CheckCircle,
        text: 'Justifiée',
      },
      unjustified: {
        variant: 'error' as const,
        // icon: AlertCircle,
        text: 'Non justifiée',
      },
      pending: {
        variant: 'warning' as const,
        // icon: Clock,
        text: 'En attente',
      },
    }

    const config = statusConfig[status]
    // const Icon = config.icon

    return (
      <View style={styles.badgeContainer}>
        {/* <Icon
          size={16}
          color={
            status === 'justified'
              ? '#065F46'
              : status === 'pending'
              ? '#92400E'
              : '#991B1B'
          }
        /> */}
        <Badge variant={config.variant}>{config.text}</Badge>
      </View>
    )
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          {absences.map((absence) => (
            <Card key={absence.id}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <View style={styles.moduleContainer}>
                      <Text style={styles.moduleText}>
                        {absence.module.code} - {absence.module.name}
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
                      {/* <FileText size={16} color="#2E3494" /> */}
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
                          {/* <Upload size={16} color="#2E3494" /> */}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
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
  },
  moduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  },
  documentText: {
    fontSize: 14,
    color: '#2E3494',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
