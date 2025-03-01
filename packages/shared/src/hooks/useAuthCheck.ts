import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router'

const useAuthCheck = () => {
  const navigation = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user')
      if (!user) {
        navigation('/signin')
      }
    }
    checkUser()
  }, [navigation])
}

export default useAuthCheck
