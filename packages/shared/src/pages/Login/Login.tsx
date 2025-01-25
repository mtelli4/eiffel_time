import { Input } from '@shared/components/Input'
import { Button } from '@shared/components/Button'
import { StyleSheet, View, Text, Image } from 'react-native'
import logo from '../../assets/logo.png';
import { useState } from 'react';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: '100%',
    gap: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    color: '#2E3494'
  },
  logo: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 64,
    left: 64,
  }
})

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.root}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Eiffel TIME</Text>
        <Input placeholder='Adresse mail' onChangeText={setEmail} />
        <Input placeholder='Mot de passe' type='password' onChangeText={setPassword} />
        <Button label="Connexion" onpress={() => { console.log(email), console.log(password) }} />
      </View>
    </View>

  )
}