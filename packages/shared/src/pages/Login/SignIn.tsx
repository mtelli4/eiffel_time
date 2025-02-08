import { Input } from '@shared/components/Input/Input'
import { Button } from '@shared/components/Button'
import { StyleSheet, View, Text, Image, Linking } from 'react-native'
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { styles } from './Style';

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(false)

  const handleSubmitUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setValid(data)

    } catch {
      console.log('error')
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (valid) {
      navigate('/schedule');
    }
  }, [valid, navigate]);

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Eiffel TIME</Text>
        <Input label='Adresse mail' onChangeText={setEmail} />
        <Input label='Mot de passe' type='password' onChangeText={setPassword} />
        <Button label="Connexion" onpress={handleSubmitUser} />
        <Button label="Inscription" variant='secondary' onpress={() => navigate("/signup")} />
      </View>
    </View>

  )
}