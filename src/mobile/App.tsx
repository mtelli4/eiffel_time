import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

function App() {
    const [count, setCount] = React.useState(0)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vite + React Native</Text>
            <Button
                title={`Count is ${count}`}
                onPress={() => setCount(count + 1)}
            />
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

export default App
