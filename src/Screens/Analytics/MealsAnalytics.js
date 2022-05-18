import React, { } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Text, Appbar } from 'react-native-paper'

const MealsAnalyticsScreen = (props) => {
    return (
        <View style={styles.Container}>
            <Appbar style={styles.bottom}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                <Appbar.Content title="Meals" />
            </Appbar>

            <Text>Meals</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 0,
        flex: 1,
        marginTop: StatusBar.currentHeight,
    }
})

export default MealsAnalyticsScreen