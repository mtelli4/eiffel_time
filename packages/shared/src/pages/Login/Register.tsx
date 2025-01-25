import { Input } from '@shared/components/Input'
import { Button } from '@shared/components/Button'
import { StyleSheet, View, Text, Image } from 'react-native'
import logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: '100%',
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

export function Register() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.title}>Eiffel TIME</Text>
      <Input placeholder='Adresse mail' />
      <Input placeholder='Mot de passe' type='password' />
      <Button label="Inscription" />
    </View>
  )
}