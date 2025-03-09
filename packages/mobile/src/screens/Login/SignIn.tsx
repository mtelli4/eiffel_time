  import { Button } from '../../../../shared/src/components/Button/Button'
  import { Input } from '../../../../shared/src/components/Input/Input'
  import { useEffect, useState } from 'react'
  import { View } from 'react-native'
  import logo from './logo.png'
  import { styles } from './Style'
  import { API_URL } from '../../../../shared/src/types/types'
  import { Logo } from '../../../../shared/src/components/Logo/Logo'
  import { useNavigation } from '@react-navigation/native'
  import { storage } from '../../storage/storage'

  export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(false)
    const [user, setUser] = useState()
    const navigation = useNavigation()

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
        setValid(true);
        setUser(data.user);
      } catch {
        console.error('Erreur lors de la connexion')
      }
    }

    useEffect(() => { 
      if (valid) {
        console.log(user);
      
        storage.setString('user', JSON.stringify(user));
        navigation.navigate('App')
      }
    }, [valid, user, navigation])

    return (
      <View style={styles.root}>
        <Logo source={logo} label="Eiffel TIME" size="medium" />
        <View style={styles.container}>
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
            // onPress={() => navigate('/signup')}  
          />
        </View>
      </View>
    )
  }
