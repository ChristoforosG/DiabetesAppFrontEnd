import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text, RadioButton } from 'react-native-paper'

const RadioButtonComponent = (props) => {
    const options = props.options
    return (
        <View style={styles.Container}>
            <View style={styles.TitleViewStyle}>
                <Text style={styles.TitleTextStyle}>{props.title}: </Text>
            </View>
            <View style={styles.RadioButtonViewStyle}>
                {options.map((option, key) => {
                    return (
                        <View key={key} style={{ borderWidth: 0, alignItems: 'center' }}>
                            <RadioButton
                                key={key}

                                value="first"
                                status={props.checked === option ? 'checked' : 'unchecked'}
                                onPress={() => props.setChecked(option)}
                            />
                            <Text style={{ fontSize: 9, textAlign: 'center' }}> {option} </Text>
                        </View>
                    )
                })}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginVertical: Dimensions.get('window').height / 40,
        marginHorizontal: 20,
        borderWidth: 0
    },
    TitleViewStyle: {
        borderWidth: 0
    },
    TitleTextStyle: {
        fontSize: 22

    },
    RadioButtonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height / 50


    }
})

export default RadioButtonComponent