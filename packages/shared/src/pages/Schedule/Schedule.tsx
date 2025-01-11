import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CourseModal } from '../../components/Schedule/CourseModal'
import { styles } from '../../styles/Schedule/ScheduleStyles'
import { Course } from '../../types/types'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i)

// Example data
const COURSES: Course[] = [
  {
    id: 1,
    subject: 'Développement Web',
    professor: 'Dr. Martin',
    room: 'B204',
    startTime: '8:00',
    endTime: '10:00',
    day: 'Lundi',
    type: 'TP',
    startHour: 8,
    duration: 2,
  },
  // Add more courses as needed
]

export function Schedule() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const handlePresenceCheck = () => {
    // Implement QR code scanning
    console.log('Opening QR code scanner...')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.headerCell}>Horaire</Text>
          {DAYS.map((day) => (
            <Text key={day} style={styles.headerCell}>
              {day}
            </Text>
          ))}
        </View>

        {HOURS.map((hour) => (
          <View key={hour} style={styles.scheduleRow}>
            <Text style={styles.hourCell}>{hour}:00</Text>
            {DAYS.map((day) => {
              const course = COURSES.find(
                (c) => c.day === day && c.startHour === hour
              )

              return (
                <View key={day} style={styles.dayCell}>
                  {course && (
                    <TouchableOpacity
                      onPress={() => setSelectedCourse(course)}
                      style={styles.courseButton}
                    >
                      <Text style={styles.courseTitle}>{course.subject}</Text>
                      <Text style={styles.courseRoom}>{course.room}</Text>
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
