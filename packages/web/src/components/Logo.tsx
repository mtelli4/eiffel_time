import { View } from "react-native";
import '../styles/Logo.css'
import logoSvg from '../assets/img/logo.svg'

export function Logo() {
    return (
        <View>
            <img className='logoimg' src={logoSvg}/>
        </View>
    )
}