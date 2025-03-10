import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { useEffect, useState } from 'react'
import { Image, Platform, Text, View } from 'react-native'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { styles } from './Style'
import { API_URL } from '../../types/types'
import { Logo } from '../../components/Logo/Logo'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()

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
      if (data) {
        const user = await fetch(`${API_URL}/api/user/me/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        const userData = await user.json()
        if (Platform.OS === 'web') {
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          import('react-native-mmkv').then(({ MMKV }) => {
            const storage = new MMKV()
            storage.set('user', JSON.stringify(userData))
          })
        }
      }

      setValid(data.valid)
    } catch {
      console.error('Erreur lors de la connexion')
    }
  }

  useEffect(() => {
    if (valid) {
      navigate('/')
    }
  }, [valid])

  return (
    <View style={styles.root}>
      {/* <Image source={logo} style={styles.logo} /> */}
      <Logo source={logo} label="Eiffel TIME" size="xlarge" />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Eiffel TIME</Text> */}
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
