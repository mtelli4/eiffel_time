import { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Absence,
  Cours,
  Enseignant,
  EnseignantModule,
  Etudiant,
  Module,
} from '../../backend/classes'
import { Badge } from '../../components/attendance/Badge'
import { Button } from '../../components/attendance/Button'
import { Card } from '../../components/attendance/Card'
import { Input } from '../../components/attendance/Input'

export function Absences() {
  const [absences, setAbsences] = useState<Absence[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [etudiants, setEtudiants] = useState<Etudiant[]>([])
  const [enseignants, setEnseignants] = useState<Enseignant[]>([])
  const [enseignant_modules, setEnseignantModules] = useState<
    EnseignantModule[]
  >([])
  const [cours, setCours] = useState<Cours[]>([])
  const [justification, setJustification] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('http://localhost:4000/api/data/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        return response.json()
      })
      .then((data) => {
        const absences = data.absences.map((a: any) => {
          return new Absence(a)
        })
        const cours = data.cours.map((c: any) => {
          return new Cours(c)
        })
        const enseignants = data.enseignants.map((e: any) => {
          return new Enseignant(e, e.utilisateur)
        })
        const enseignant_modules = data.enseignant_module.map((em: any) => {
          return new EnseignantModule(em)
        })
        const etudiants = data.etudiants.map((e: any) => {
          return new Etudiant(e, e.utilisateur)
        })
        const modules = data.modules.map((m: any) => {
          return new Module(m)
        })
        setAbsences(absences)
        setCours(cours)
        setEnseignants(enseignants)
        setEnseignantModules(enseignant_modules)
        setEtudiants(etudiants)
        setModules(modules)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des absences:', error)
      })
  }, [])

  const handleJustificationSubmit = (absenceId: number) => {
    if (!justification[absenceId]) return
    // Implement submission logic
  }

  const getStatusBadge = (absence: Absence) => {
    const config = absence.getStatusConfig()

    return (
      <View style={styles.badgeContainer}>
        <Badge variant={config.variant}>{config.text}</Badge>
      </View>
    )
  }

  const getModuleFromAbsence = (absence: Absence) => {
    return modules
      .find(
        (m) =>
          cours
            .find((c) => c.getId() === absence.getIdCours())
            ?.getIdModule() === m.getId()
      )
      ?.getName()
  }

  const getEnseignantFromAbsence = (absence: Absence) => {
    return enseignants
      .find(
        (e) =>
          enseignant_modules
            .find(
              (em) =>
                modules
                  .find(
                    (m) =>
                      cours
                        .find((c) => c.getId() === absence.getIdCours())
                        ?.getIdModule() === m.getId()
                  )
                  ?.getId() === em.getIdModule()
            )
            ?.getIdEnseignant() === e.getId()
      )
      ?.getFullName()
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
                    {/* TODO: Afficher le nom de l'étudiant côté admin */}
                    {/*<Text style={styles.moduleText}>
                                            {etudiants.find((e) => e.getId() === absence.getIdUtilisateur())?.getFullName() || 'Étudiant inconnu'}
                                        </Text>*/}
                    <View style={styles.moduleContainer}>
                      <Text style={styles.moduleText}>
                        {getModuleFromAbsence(absence) || 'Module inconnu'}
                      </Text>
                      {getStatusBadge(absence)}
                    </View>
                    <Text style={styles.professorText}>
                      {cours
                        .find((c) => c.getId() === absence.getIdCours())
                        ?.getDebut()
                        ?.toLocaleDateString('fr-FR') || 'Date inconnue'}{' '}
                      •{' '}
                      {getEnseignantFromAbsence(absence) ||
                        'Enseignant inconnu'}
                    </Text>
                  </View>

                  {absence.getJustificatifLink() && (
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

                {absence.getMessage() && (
                  <Text style={styles.justificationText}>
                    Motif : {absence.getMessage()}
                  </Text>
                )}

                {absence.getStatus() === 'unjustified' && (
                  <View style={styles.justificationContainer}>
                    <Input
                      label="Motif de l'absence"
                      value={justification[absence.getId()] || ''}
                      onChangeText={(text) =>
                        setJustification((prev) => ({
                          ...prev,
                          [absence.getId()]: text,
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
                        onPress={() =>
                          handleJustificationSubmit(absence.getId())
                        }
                        disabled={!justification[absence.getId()]}
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
