import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { View, Text, Image } from 'react-native'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router';
import { styles } from './Style';
import { useState } from 'react';
import { API_URL } from '../../types/types';

export function SignUp() {
  const [lastname, setlastname] = useState('')
  const [firstname, setfirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitSignUp = async () => {
    try {
      const response = await fetch(`${API_URL}/api/signup/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastname, firstname, email, password }),
      })
      const data = await response.json()
    } catch {
      console.log('error')
    }
  }

  const navigate = useNavigate()

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Eiffel TIME</Text>
        <Input label="Nom" onChangeText={setlastname} />
        <Input label="Prénom" onChangeText={setfirstname} />
        <Input label="Adresse mail" onChangeText={setEmail} />
        <Input
          label="Mot de passe"
          type="password"
          onChangeText={setPassword}
        />
        <Input
          label="Mot de passe"
          type="password"
          helper="Confirmer le mot de passe"
        />
        <Button label="Inscription" onPress={handleSubmitSignUp} />
        <Button
          label="Connexion"
          variant="secondary"
          onPress={() => navigate('/signin')}
        />
      </View>
    </View>
  )
}
