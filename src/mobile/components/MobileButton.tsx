import React from 'react'
import { Button, View, StyleSheet } from 'react-native'

const MobileButton = () => {
    return (
        <View style={styles.buttonContainer}>
            <Button title="Click Me" onPress={() => alert('Button clicked!')} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
    },
})

export default MobileButton
