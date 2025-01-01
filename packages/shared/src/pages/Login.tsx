// import { useState } from 'react'
// import { View, Text, TextInput, TouchableOpacity } from 'react-native'
// import { styles } from '../styles/LoginStyle'
// import '../styles/LoginStyle.css'
// import { Link } from 'react-router-dom'
// import { Logo } from '../components/Logo'

// export function Login() {
//   const [studentId, setStudentId] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleLogin = () => {
//     if (!studentId || !password) {
//       setError('Veuillez remplir tous les champs.')
//     } else {
//       setError('')
//       // Logique de connexion ici
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Logo />
//       <Text style={styles.title}>EIFFEL TIME</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="N° Etudiant"
//           style={styles.inputText}
//           placeholderTextColor="#FFFFFF80"
//           value={studentId}
//           onChangeText={setStudentId}
//           accessibilityLabel="Numéro d'étudiant"
//         />
//         <TextInput
//           secureTextEntry={true}
//           placeholder="Mot de passe"
//           style={styles.inputText}
//           placeholderTextColor="#FFFFFF80"
//           value={password}
//           onChangeText={setPassword}
//           accessibilityLabel="Mot de passe"
//         />
//         {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>CONNEXION</Text>
//       </TouchableOpacity>
//       <Link to="/register">
//         <Text style={styles.buttonText_bis}>Inscription</Text>
//       </Link>
//     </View>
//   )
// }
