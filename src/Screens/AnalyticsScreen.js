import React, { } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Appbar, BottomNavigation, Text } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityAnalyticsScreen from './Analytics/ActivityAnalytics'
import MealsAnalyticsScreen from './Analytics/MealsAnalytics'
import BloodGlucoseAnalyticsScreen from './Analytics/BloodGlucoseAnalytics'
import BloodPressureAnalyticsScreen from './Analytics/BloodPressureAnalytics'
import WeightAnalyticsScreen from './Analytics/WeightAnalytics'

const AnalyticsScreen = (props) => {

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'BloodGlucose', title: 'Γλυκόζη', icon: () => <FontistoIcon name={'blood-drop'} size={24} style={{ borderWidth: 0, color: 'white', alignSelf: 'center' }} /> },
        { key: 'BloodPressure', title: 'Πίεση', icon: () => <FontistoIcon name={'pulse'} size={18} style={{ borderWidth: 0, color: 'white', alignSelf: 'center', marginTop: 4 }} /> },
        { key: 'Activity', title: 'Άθληση', icon: () => <MaterialIcon name={'weight-lifter'} size={25} style={{ borderWidth: 0, color: 'white', alignSelf: 'center' }} /> },
        { key: 'Weight', title: 'Βάρος', icon: () => <FontAwesome5Icon name={'weight'} size={22} style={{ borderWidth: 0, color: 'white', alignSelf: 'center' }} /> },
    ])

    const renderScene = BottomNavigation.SceneMap({
        BloodGlucose: () => <BloodGlucoseAnalyticsScreen navigation={props.navigation} />,
        BloodPressure: () => <BloodPressureAnalyticsScreen navigation={props.navigation} />,
        Activity: () => <ActivityAnalyticsScreen navigation={props.navigation} />,
        Weight: () => <WeightAnalyticsScreen navigation={props.navigation} />,
    })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 0,
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
    },
})

export default AnalyticsScreen