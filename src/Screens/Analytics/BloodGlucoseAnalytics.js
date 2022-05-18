import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useQueryClient } from "react-query";
import GraphComponent from "../../Components/Temp/graph";
import RowPercentageChart from "../../Components/Temp/rowPercentageChart";
import BarChartComponent from "../../Components/Temp/barChart";
import {
  glucoseWeeklyGraphData,
  glucoseFifteenDayGraphData,
  glucoseMonthlyGraphData,
} from "../../resources/sampleData";

const BloodGlucoseAnalyticsScreen = (props) => {
  const emptyGraphData = {
    labels: ["0"],
    datasets: [
      {
        data: [0],
      },
    ],
  };
  const queryClient = useQueryClient();
  const { graph, median, percent } = queryClient.getQueryData(
    "blood_glucose_analytics_data"
  );
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Γλυκόζη" />
      </Appbar>
      <ScrollView>
        <View style={{ borderWidth: 0 }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#3399FF",
              marginTop: 10,
              borderWidth: 0,
            }}
          >
            Χρονικό Διάγραμμα Γλυκόζης
          </Text>
        </View>
        <GraphComponent
          WeeklyGraphData={graph.weekly}
          FifteenDayGraphData={graph.fifteen}
          MonthlyGraphData={graph.monthly}
        />
        <View style={{ borderWidth: 0 }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#3399FF",
              marginTop: 10,
              borderWidth: 0,
            }}
          >
            Διάμεσος Γλυκόζης
          </Text>
        </View>
        <BarChartComponent
          weekly={median.weekly}
          fifteen={median.fifteen}
          monthly={median.monthly}
        />
        <View style={{ borderWidth: 0 }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#3399FF",
              marginTop: 10,
              borderWidth: 0,
            }}
          >
            Ποσοστά Γλυκόζης
          </Text>
        </View>
        <RowPercentageChart percentages={percent} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default BloodGlucoseAnalyticsScreen;
