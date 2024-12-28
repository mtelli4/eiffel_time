import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MobileButton from '../components/MobileButton'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <MobileButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

export default HomeScreen