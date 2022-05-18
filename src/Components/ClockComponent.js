import React, { Image } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Svg, { G, Circle, Text as HighLightText } from 'react-native-svg'
import { Text } from 'react-native-paper'
import { colorPalette } from '../Styling/universalStyles'
import ReactionsComponent from '../Components/ReactionsPopUp'

class ClockComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
        this.radius = Dimensions.get("window").width / 2.5
        this.thick = this.radius / 8
        this.perimeter = 2 * Math.PI * this.radius
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    getPerimeterFromCurrentTime() {
        var timeInSecs = this.state.date.getHours() * 3600 + this.state.date.getMinutes() * 60 + this.state.date.getSeconds()
        if (timeInSecs > 12 * 3600) {
            timeInSecs -= 12 * 3600
        }
        const percent = timeInSecs / (12 * 60 * 60)
        const arcLength = percent * this.perimeter
        return [arcLength, this.perimeter - arcLength]
    }

    render() {
        return (
            <View style={styles.ClockViewStyle}>
                <Svg height={2 * (this.thick + this.radius)} width={2 * (this.thick + this.radius)}>
                    <G rotation="-90" origin={this.radius + this.thick}>
                        <Circle cx={this.radius + this.thick} cy={this.radius + this.thick} r={this.radius} stroke={colorPalette.backdrop} strokeWidth={this.thick} />
                        <Circle
                            cx={this.radius + this.thick}
                            cy={this.radius + this.thick}
                            r={this.radius} stroke={colorPalette.placeholder}
                            strokeWidth={this.thick}
                            strokeDasharray={this.getPerimeterFromCurrentTime()}
                        />
                    </G>
                    {/* <HighLightText
                        fill="none"
                        stroke={colorPalette.placeholder}
                        fontSize="30"
                        fontWeight="bold"
                        x={this.radius + this.thick}
                        y={this.radius + this.thick}
                        textAnchor="middle"
                    >
                        {this.state.date.toLocaleTimeString()}
                    </HighLightText> */}
                    <HighLightText
                        fill='white'
                        stroke='black'
                        fontSize="22"
                        fontWeight="bold"
                        x={this.radius + this.thick}
                        y={1.5 * this.thick - 2}
                        textAnchor="middle"
                    >
                        12
                    </HighLightText>
                    <HighLightText
                        fill='white'
                        stroke='black'
                        fontSize="22"
                        fontWeight="bold"
                        x={this.thick + 2 * this.radius}
                        y={this.radius + this.thick}
                        textAnchor="middle"
                    >
                        3
                    </HighLightText>
                    <HighLightText
                        fill='white'
                        stroke='black'
                        fontSize="22"
                        fontWeight="bold"
                        x={this.thick + this.radius}
                        y={1.5 * this.thick + 2 * this.radius - 2}
                        textAnchor="middle"
                    >
                        6
                    </HighLightText>
                    <HighLightText
                        fill='white'
                        stroke='black'
                        fontSize="22"
                        fontWeight="bold"
                        x={1 * this.thick}
                        y={this.radius + this.thick}
                        textAnchor="middle"
                    >
                        9
                    </HighLightText>
                </Svg>
                <ReactionsComponent height={2 * (this.thick + this.radius)} width={2 * (this.thick + this.radius)} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ClockViewStyle: {
        marginTop: Dimensions.get('window').height / 20,
        borderWidth: 0,
    },

})


export default ClockComponent