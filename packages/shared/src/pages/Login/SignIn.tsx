import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useNavigate } from 'react-router'
import logo from '../../assets/logo.png'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { styles } from './Style'
import { API_URL } from '../../types/types'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)

  const handleSubmitUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/signin/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log(data)

      setValid(data)
    } catch {
      console.error('Erreur lors de la connexion')
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (valid) {
      navigate('/schedule')
    }
  }, [valid, navigate])

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Eiffel TIME</Text>
        <Input label="Adresse mail" onChangeText={setEmail} />
        <Input
          label="Mot de passe"
          type="password"
          onChangeText={setPassword}
        />
        <Button label="Connexion" onPress={handleSubmitUser} />
        <Button
          label="Inscription"
          variant="secondary"
          onPress={() => navigate('/signup')}
        />
      </View>
    </View>
  )
}
