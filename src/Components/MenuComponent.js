import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text, Menu, Button } from 'react-native-paper'


const MenuComponent = (props) => {
    return (
        <View style={styles.Container}>
            <View style={styles.TitleViewStyle}>
                <Text style={styles.TitleTextStyle}>{props.title}: </Text>
            </View>
            <View style={styles.DayView}>
                <Menu
                    visible={props.visible}
                    onDismiss={() => props.setVisible(false)}
                    anchor={<Button mode='outlined' onPress={() => props.setVisible(true)}>{(props.activity == '') ? props.title : props.activity}</Button>}>
                    {props.activityList.map((activity, key) => {
                        return (
                            <Menu.Item
                                key={key}
                                onPress={() => {
                                    props.setActivity(activity['title'])
                                    props.setVisible(false)
                                }}
                                title={activity['title']}
                                icon={activity['icon']}
                            />
                        )
                    })}
                </Menu>
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
    DayView: {
        marginVertical: Dimensions.get('window').height / 40,
        marginHorizontal: Dimensions.get('window').width / 10
    },
})

export default MenuComponent