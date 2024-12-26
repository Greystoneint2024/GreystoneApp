import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const test = () => {
    return (
        <View>
            <Text style={styles.wahab}>test</Text>
        </View>
    )
}

export default test

const styles = StyleSheet.create({
    wahab: {
        color: 'red',
        fontSize: 20
    }
})