import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native'
import { Text, TextInput } from 'react-native-paper'

const TextInputComponent = (props) => {
    return (
        <View style={styles.Container}>
            <TextInput

                style={{ textAlign: 'center', fontSize: 18 }}
                label={props.label}
                value={props.value}
                onChangeText={text => props.setValue(text)}
                mode={props.mode}
                keyboardType={props.keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginVertical: Dimensions.get('window').height / 40,
        marginHorizontal: Dimensions.get('window').width / 10,
        borderWidth: 0
    }
})

export default TextInputComponent