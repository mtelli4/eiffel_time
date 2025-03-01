import { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { styles } from './Style'
import { Logo } from '../../components/Logo/Logo'

import { getSession, commitSession } from '../../../../web/session.server'

// export async function loader({ request }: any) {
//   const session = await getSession(request.headers.get('Cookie'))
//   if (session.has('userId')) {
//     return redirect('/')
//   }
//   return data(
//     {
//       session,
//     },
//     {
//       headers: {
//         'Set-Cookie': await commitSession(session),
//       },
//     }
//   )
// }

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)
  const [user, setUser] = useState({})

  const handleSubmitUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/signin/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log(data)

      setValid(data.valid)
      setUser(data.user)
    } catch {
      console.log('error')
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (valid) {
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }
  }, [valid, navigate])

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
