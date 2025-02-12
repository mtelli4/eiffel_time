import { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CourseModal } from '../../components/Schedule/CourseModal'
import { styles } from '../../styles/Schedule/ScheduleStyles'
import { API_URL, COURSE } from '../../types/types'
import { Button } from '../../components/Button/Button'

const DAYS = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
]
const HOURS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

function getProperties(description: string) {
  let test: Array<string> = description.split('\n')
  test = test.filter((x) => x !== '')
  const groups = ['TD', 'TP']

  if (groups.some((group) => test[0].includes(group))) {
    return [test[0], test[1]]
  }
  return [test[1], test[0]]
}

const getWeekRange = (offset = 0) => {
  const today = new Date()
  // Traiter dimanche comme le 7ème jour
  const currentDay = today.getDay() === 0 ? 7 : today.getDay()
  // Calcul du lundi de la semaine courante en appliquant le décalage
  const monday = new Date(today)
  monday.setDate(today.getDate() - currentDay + 1 + offset * 7)

  // Le dimanche est 6 jours après le lundi
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  return { monday, sunday }
}

export function Schedule() {
  const [selectedCourse, setSelectedCourse] = useState<COURSE | null>(null)
  const [courses, setCourses] = useState<COURSE[]>([])

  const [weekOffset, setWeekOffset] = useState(0)
  const { monday, sunday } = getWeekRange(weekOffset)

  const handleWeekChange = (delta: number) => {
    setWeekOffset((prevOffset) => prevOffset + delta)
  }

  const handlePresenceCheck = () => {
    // Implement QR code scanning
    console.log('Opening QR code scanner...')
  }

  useEffect(() => {
    fetch(`${API_URL}/api/schedule/schedule`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau')
        return response.json() as Promise<Record<string, any>>
      })
      .then((data) => {
        const newCourses = Object.entries(data)
          .filter(([_, course]) => course.type === 'VEVENT')
          .map(([id, course]) => {
            const [group, teacher] = getProperties(course.description)
            const start = new Date(course.start).toLocaleTimeString(`fr-FR`, {
              timeStyle: 'short',
            })
            const end = new Date(course.end).toLocaleTimeString(`fr-FR`, {
              timeStyle: 'short',
            })
            const day = DAYS[new Date(course.start).getDay()]
            const date = new Date(course.start)

            return {
              id,
              summary: course.summary,
              location: course.location,
              start,
              end,
              teacher,
              group,
              day,
              date,
            }
          })
        setCourses(newCourses)
      })
      .catch((error) => {
        console.error('failed to parse calendar: \n:', error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text>
          Du {monday.toLocaleDateString(`fr-FR`)} au{' '}
          {sunday.toLocaleDateString(`fr-FR`)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 10, // note : "gap" n'est pas toujours supporté dans React Native
            margin: 10,
          }}
        >
          <Button label="Précédent" onPress={() => handleWeekChange(-1)} />
          <Button label="Suivant" onPress={() => handleWeekChange(1)} />
        </View>
      </View>
      <ScrollView style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.headerCell}>Horaire</Text>
          {DAYS.slice(1).map((day) => (
            <Text key={day} style={styles.headerCell}>
              {day}
            </Text>
          ))}
        </View>

        {HOURS.map((hour) => (
          <View key={hour} style={styles.scheduleRow}>
            <Text style={styles.hourCell}>{hour}</Text>

            {DAYS.slice(1).map((day) => {
              const course = courses.find(
                (c) =>
                  c.day === day &&
                  c.start.substring(0, 2) === hour.substring(0, 2) &&
                  monday < c.date &&
                  c.date < sunday
              )
              return (
                <View key={day} style={styles.dayCell}>
                  {course && (
                    <TouchableOpacity
                      onPress={() => setSelectedCourse(course)}
                      style={styles.courseButton}
                    >
                      <Text style={styles.courseTitle}>{course.summary}</Text>
                      <Text style={styles.courseRoom}>{course.location}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            })}
          </View>
        ))}
      </ScrollView>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onPresenceCheck={handlePresenceCheck}
        />
      )}
    </View>
  )
}
