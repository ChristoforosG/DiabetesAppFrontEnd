import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ButtonGroup } from "react-native-elements";
import { BarChart } from "react-native-chart-kit";
import {
  glucoseMedianWeeklyBarChartData,
  glucoseMedianFifteenDaysBarChartData,
  glucoseMedianMonthlyBarChartData,
} from "../../resources/sampleData";

const BarChartComponent = ({ weekly, fifteen, monthly }) => {
  const formatData = (data) => {
    return {
      labels: ["Προγευματική", "Μεταγευματική", "Προ ύπνου"],
      datasets: [
        {
          data: data,
        },
      ],
    };
  };

  const insertData = (index) => {
    if (index == 0) {
      return formatData(weekly);
    }
    if (index == 1) {
      return formatData(fifteen);
    }
    return formatData(monthly);
  };
  const [index, setIndex] = useState(0);
  const buttons = ["Εβδομαδιαία", "15 ημέρες", "Μηνιαία"];
  const chartConfig = {
    backgroundGradientFrom: "#Ffffff",
    backgroundGradientTo: "#ffffff",
    barPercentage: 1.3,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#efefef",
      strokeDasharray: "0",
    },
    propsForLabels: {
      fontFamily: "Bogle-Regular",
    },
  };
  return (
    <View style={styles.Container}>
      <View style={styles.ViewStyle}>
        <ButtonGroup
          onPress={setIndex}
          selectedIndex={index}
          buttons={buttons}
          containerStyle={{ height: 20 }}
        />
      </View>
      <View style={styles.ButtonStyle}>
        <BarChart
          data={insertData(index)}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
  },
  ViewStyle: {
    borderWidth: 0,
  },
  ButtonStyle: {
    borderWidth: 0,
  },
});
export default BarChartComponent;
