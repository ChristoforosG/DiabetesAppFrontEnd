import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Button, TextInput, Menu } from 'react-native-paper'
import { colorPalette } from '../Styling/universalStyles'
import { days, months, years } from './DateOfBirthArrays'

const ITEM_HEIGHT = Dimensions.get('window').height / 2



const GeneralFirstComponent = (props) => {

    const [firstname, setFirstname] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [gender, setGender] = useState('')
    const [insulin, setInsulin] = useState('')

    const [visibleDay, setVisibleDay] = React.useState(false)
    const openMenuDay = () => setVisibleDay(true)
    const closeMenuDay = () => setVisibleDay(false)

    const [visibleMonth, setVisibleMonth] = React.useState(false)
    const openMenuMonth = () => setVisibleMonth(true)
    const closeMenuMonth = () => setVisibleMonth(false)

    const [visibleYear, setVisibleYear] = React.useState(false)
    const openMenuYear = () => setVisibleYear(true)
    const closeMenuYear = () => setVisibleYear(false)
    if (props.id == 1) {
        return (
            <View style={styles.Container}>
                <View style={styles.FirstnameStyle}>
                    <TextInput
                        mode="flat"
                        label='Όνομα'
                        placeholderTextColor={colorPalette.surface}
                        onChangeText={setFirstname}
                        dense={true}
                        underlineColor={colorPalette.primary}
                        style={{ fontSize: 20, backgroundColor: colorPalette.background }}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.DateOfBirthView}>
                    <View style={styles.DayView}>
                        <Menu
                            visible={visibleDay}
                            onDismiss={closeMenuDay}
                            anchor={<Button mode='contained' onPress={openMenuDay}>{(day == '') ? 'DAY' : day.toString()}</Button>}>
                            {days.map((day, key) => {
                                return (
                                    <Menu.Item
                                        key={key}
                                        onPress={() => {
                                            setDay(day["value"])
                                            closeMenuDay()
                                        }}
                                        title={day['value']} />
                                )
                            })}
                        </Menu>
                    </View>
                    <View style={styles.MonthView}>
                        <Menu
                            visible={visibleMonth}
                            onDismiss={closeMenuMonth}
                            anchor={<Button mode='contained' onPress={openMenuMonth}>{(month == '') ? 'MONTH' : month.toString()}</Button>}>
                            {months.map((month, key) => {
                                return (
                                    <Menu.Item
                                        key={key}
                                        onPress={() => {
                                            setMonth(month['value'])
                                            closeMenuMonth()
                                        }}
                                        title={month['value']} />
                                )
                            })}
                        </Menu>
                    </View>
                    <View style={styles.YearView}>
                        <Menu
                            visible={visibleYear}
                            onDismiss={closeMenuYear}
                            anchor={<Button mode='contained' onPress={openMenuYear}>{(year == '') ? 'YEAR' : year.toString()}</Button>}>
                            {years.map((year, key) => {
                                return (
                                    <Menu.Item
                                        key={key}
                                        onPress={() => {
                                            setYear(year['value'])
                                            closeMenuYear()
                                        }}
                                        title={year['value']} />
                                )
                            })}
                        </Menu>
                    </View>
                </View>

            </View>
        )
    }
    if (props.id == 2) {
        return (
            <View style={styles.Container}>
                <View style={styles.GenderStyles}>

                </View>
                <View style={styles.InsulinView}>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        borderWidth: 0,
        justifyContent: 'space-between',
        height: ITEM_HEIGHT,
        marginHorizontal: 30,
        backgroundColor: colorPalette.background
    },
    FirstnameStyle: {
        marginTop: 30,
        flex: 1,
        borderWidth: 1,
    },
    DateOfBirthView: {
        flexDirection: 'row',
        borderWidth: 0,
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1

    },
    DayView: {
        flex: 1,
        alignItems: 'center'
    },
    MonthView: {
        flex: 1,
        alignItems: 'center'
    },
    YearView: {
        flex: 1,
        alignItems: 'center'
    },
    GenderStyles: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1
    },
    InsulinView: {
        flex: 1,
        borderWidth: 1
    }
})

export default GeneralFirstComponent