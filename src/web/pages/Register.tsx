import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../styles/LoginStyle'
import '../styles/LoginStyle.css'
import { Link } from 'react-router-dom'

export function Register() {
  const [studentId, setStudentId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!studentId || !firstName ||!familyName) {
      setError('Veuillez remplir tous les champs.')
    } else {
      setError('')
      // Logique de connexion ici
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EIFFEL TIME</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom de famille"
          style={styles.inputText}
          placeholderTextColor="#FFFFFF80"
          value={familyName}
          onChangeText={setFamilyName}
          accessibilityLabel="Nom de famille"
        />
        <TextInput
          placeholder="Prénom"
          style={styles.inputText}
          placeholderTextColor="#FFFFFF80"
          value={firstName}
          onChangeText={setFirstName}
          accessibilityLabel="Prénom"
        />
                <TextInput
          placeholder="Numéro d'étudiant"
          style={styles.inputText}
          placeholderTextColor="#FFFFFF80"
          value={studentId}
          onChangeText={setStudentId}
          accessibilityLabel="Numéro d'étudiant"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>INSCRIPTION</Text>
      </TouchableOpacity>
      <Link to="/login"><Text style={styles.buttonText_bis}>Connexion</Text></Link>
    </View>
  )
}
