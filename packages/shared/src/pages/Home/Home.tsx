import { Button } from '@shared/components/Button/Button'
import { useEffect, useCallback, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useNavigate } from 'react-router'

export function Home() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (error) {
      console.error('Error parsing user data:', error)
      return {}
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate('/signin')
    }
  }, [user, navigate])

  // Utilisation de useCallback pour mémoïser la fonction
  const handleLogout = useCallback(() => {
    localStorage.removeItem('user')
    navigate('/signin')
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Text>Bonjour {user.prenom + ' ' + user.nom}</Text>
      <Button label="Déconnexion" onPress={handleLogout} />
    </View>
  )
}
