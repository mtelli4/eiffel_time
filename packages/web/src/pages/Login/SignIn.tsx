import { Button } from '../../../../shared/src/components/Button/Button'
import { Input } from '../../../../shared/src/components/Input/Input'
import { useEffect, useState } from 'react'
import { ImageSourcePropType, View } from 'react-native'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { styles } from './Style'
import { API_URL } from '../../../../shared/src/types/types'
import { Logo } from '../../../../shared/src/components/Logo/Logo'

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
        localStorage.setItem('user', JSON.stringify(userData))
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
      <Logo source={logo as ImageSourcePropType} label="Eiffel TIME" size="xlarge" />
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
