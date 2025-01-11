import { View } from 'react-native'
import logoSvg from '../assets/img/logo.svg'
import '../styles/Logo.css'

export function Logo() {
  return (
    <View>
      <img className="logoimg" src={logoSvg} />
    </View>
  )
}
