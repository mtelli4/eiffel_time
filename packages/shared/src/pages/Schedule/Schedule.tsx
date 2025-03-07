import { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../../components/Button/Button'
import { CourseModal } from '../../components/Schedule/CourseModal'
import { styles } from '../../styles/Schedule/ScheduleStyles'
import { API_URL, COURSE } from '../../types/types'
import { dateFormatting } from '../../utils/stringUtils'

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

export function getProperties(description: string) {
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
  const currentDay = today.getDay() === 0 ? 7 : today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - currentDay + 0 + offset * 7)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { monday, sunday }
}

const calculateCoursePosition = (startTime: string, endTime: string) => {
  const getMinutesFromMidnight = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + (minutes || 0)
  }

  const startMinutes =
    getMinutesFromMidnight(startTime) - getMinutesFromMidnight('08:00')
  const endMinutes =
    getMinutesFromMidnight(endTime) - getMinutesFromMidnight('08:00')

  const hourHeight = 70 // même valeur que HOUR_HEIGHT dans les styles

  const top = (startMinutes / 60) * hourHeight
  const height = ((endMinutes - startMinutes) / 60) * hourHeight

  return { top, height }
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
            const start = new Date(course.start)
            const end = new Date(course.end)
            const day = DAYS[start.getDay()]

            return {
              id,
              summary: course.summary,
              location: course.location,
              start: start.toLocaleTimeString('fr-FR', { timeStyle: 'short' }),
              end: end.toLocaleTimeString('fr-FR', { timeStyle: 'short' }),
              teacher,
              group,
              day,
              date: start,
            }
          })
        setCourses(newCourses)
      })
      .catch((error) => {
        console.error('failed to parse calendar: \n:', error)
      })
  }, [])

  // console.log(courses);
  // console.log(sunday.getDate())
  // const daysOfYear = []
  // for (var d = monday; d <= sunday; d.setDate(d.getDate() + 1)) {
  //   daysOfYear.push(new Date(d))
  // }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>
          Du {dateFormatting(monday)} au{' '} {dateFormatting(sunday)}
        </Text>
        <View style={styles.buttonContainer}>
          <Button label="Précédent" onPress={() => handleWeekChange(-1)} />
          <Button label="Suivant" onPress={() => handleWeekChange(1)} />
        </View>
      </View>
      <ScrollView style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.headerHourCell}>Horaire</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {DAYS.slice(1).map((day) => (
              <Text key={day} style={styles.headerDayCell}>
                {day}
              </Text>
            ))}
            {/* {daysOfYear.map((value) => (
              <Text key={value.getDate()} style={styles.headerDayCell}>
                {DAYS[value.getDay()]} {value.getDate()}
              </Text>
            ))} */}
          </View>
        </View>

        <View style={styles.scheduleContent}>
          <View style={styles.gridLines}>
            {HOURS.map((_, index) => (
              <View
                key={`line-${index}`}
                style={[
                  styles.horizontalLine,
                  {
                    top: index * 70,
                  },
                ]}
              />
            ))}
          </View>
          {/* Grille des heures */}
          <View style={styles.hoursColumn}>
            {HOURS.map((hour) => (
              <View key={hour} style={styles.hourCell}>
                <Text style={styles.hourText}>{hour}</Text>
              </View>
            ))}
          </View>

          {/* Colonnes des jours avec les cours */}
          <View style={styles.daysContainer}>
            {DAYS.slice(1).map((day) => (
              <View key={day} style={styles.dayColumn}>
                {courses
                  .filter(
                    (c) => c.day === day && monday < c.date && c.date < sunday
                  )
                  .map((course) => {
                    const { top, height } = calculateCoursePosition(
                      course.start,
                      course.end
                    )
                    return (
                      <TouchableOpacity
                        key={course.id}
                        style={[
                          styles.courseButton,
                          {
                            position: 'absolute',
                            top,
                            height,
                            left: '5%',
                            width: '90%',
                          },
                        ]}
                        onPress={() => setSelectedCourse(course)}
                      >
                        <View style={styles.courseContent}>
                          <Text
                            style={styles.courseTitle}
                            numberOfLines={10}
                            ellipsizeMode="tail"
                          >
                            {course.summary}
                          </Text>
                          <Text style={styles.courseRoom}>
                            {course.location}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onPresenceCheck={handlePresenceCheck}
        />
      )}
    </ScrollView>
  )
}
