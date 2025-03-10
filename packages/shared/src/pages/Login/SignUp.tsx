import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { View, Text, Image } from 'react-native'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router'
import { styles } from './Style'
import { useEffect, useState } from 'react'
import { InputProps } from '../../components/Input/Input'
import { API_URL } from '../../types/types';

type FormField = 'lastname' | 'firstname' | 'email'
type ValidationState = { status: InputProps['status']; helper: string }

export function SignUp() {
  const [lastname, setlastname] = useState('')
  const [firstname, setfirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [formValidation, setFormValidation] = useState<
    Record<FormField, ValidationState>
  >({
    lastname: { status: 'normal', helper: '' },
    firstname: { status: 'normal', helper: '' },
    email: { status: 'normal', helper: '' },
  })

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

  useEffect(() => {
    const validations: Record<FormField, ValidationState> = {
      lastname: {
        status: /[^a-zA-Z]/.test(lastname) ? 'error' : 'normal',
        helper: /[^a-zA-Z]/.test(lastname)
          ? 'Attention, pas de chiffre ni de caractère spéciaux'
          : '',
      },
      firstname: {
        status: /[^a-zA-Z]/.test(firstname) ? 'error' : 'normal',
        helper: /[^a-zA-Z]/.test(firstname)
          ? 'Attention, pas de chiffre ni de caractère spéciaux'
          : '',
      },
      email: {
        status:
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
          email !== ''
            ? 'error'
            : 'normal',
        helper:
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
          email !== ''
            ? "Attention, format d'adresse email incorrect"
            : '',
      },
    }

    setFormValidation(validations)
  }, [lastname, firstname, email])

  const navigate = useNavigate()

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Eiffel TIME</Text>
        {/* <Input
          label="Nom"
          onChangeText={setlastname}
          status={formValidation.lastname.status}
          helper={formValidation.lastname.helper}
        /> */}
        {/* <Input
          label="Prénom"
          onChangeText={setfirstname}
          status={formValidation.firstname.status}
          helper={formValidation.firstname.helper}
        /> */}
        <Input
          label="Adresse mail"
          onChangeText={setEmail}
          status={formValidation.email.status}
          helper={formValidation.email.helper}
        />
          <Input
            label="Mot de passe"
            type="password"
            onChangeText={setPassword}
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

