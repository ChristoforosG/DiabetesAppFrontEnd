import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { ButtonGroup } from 'react-native-elements'
import { glucoseWeeklyGraphData, glucoseFifteenDayGraphData, glucoseMonthlyGraphData } from '../../resources/sampleData'

const insertData = (index, WeeklyGraphData, FifteenDayGraphData, MonthlyGraphData) => {
    if (index == 0) {
        return WeeklyGraphData
    }
    if (index == 1) {
        return FifteenDayGraphData
    }
    return MonthlyGraphData
}

const GraphComponent = props => {
    const [index, setIndex] = useState(0)
    const buttons = ['Εβδομαδιαία', '15 ημέρες', 'Μηνιαία']
    return (
        <View style={styles.Container}>

            <View style={styles.ButtonView}>
                <ButtonGroup
                    onPress={setIndex}
                    selectedIndex={index}
                    buttons={buttons}
                    containerStyle={{ height: 20 }}
                />
            </View>
            <View style={styles.GraphViewStyle}>
                <LineChart
                    data={insertData(index, props.WeeklyGraphData, props.FifteenDayGraphData, props.MonthlyGraphData)}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisLabel={''}
                    chartConfig={{
                        backgroundColor: '#e6f7ff',
                        backgroundGradientFrom: '#e6f7ff',
                        backgroundGradientTo: '#e6f7ff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(51, 153, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 0,
                        borderRadius: 16,
                    }}
                />
            </View>
        </View>
    )

};

const styles = StyleSheet.create({
    Container: {
        borderWidth: 0,
    },
    GraphViewStyle: {
        borderWidth: 0
    },
    ButtonView: {
        borderWidth: 0
    }
});

export default GraphComponent;