import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import GraphComponent from "../../Components/Temp/graph";
import {
  systolicWeeklyGraphData,
  systolicFifteenDayGraphData,
  systolicMonthlyGraphData,
  diastolycWeeklyGraphData,
  diastolicFifteenDayGraphData,
  diastolicMonthlyGraphData,
  pulseWeeklyGraphData,
  pulseFifteenDayGraphData,
  pulseMonthlyGraphData,
} from "../../resources/sampleData";
import { useQueryClient } from "react-query";
import instance from "../../Axios/mainAxios";

const BloodPressureAnalyticsScreen = (props) => {
  const emptyGraphData = {
    labels: ["0"],
    datasets: [
      {
        data: [0],
      },
    ],
  };
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("blood_pressure_graph_data");

  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Πίεση" />
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
            Χρονικό Διάγραμμα Συστολικής
          </Text>
        </View>
        <GraphComponent
          WeeklyGraphData={data.weekly.systolic}
          FifteenDayGraphData={data.fifteen.systolic}
          MonthlyGraphData={data.monthly.systolic}
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
            Χρονικό Διάγραμμα Διαστολικής
          </Text>
        </View>
        <GraphComponent
          WeeklyGraphData={data.weekly.diastolic}
          FifteenDayGraphData={data.fifteen.diastolic}
          MonthlyGraphData={data.monthly.diastolic}
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
            Χρονικό Διάγραμμα Παλμών
          </Text>
        </View>
        <GraphComponent
          WeeklyGraphData={data.weekly.pulse}
          FifteenDayGraphData={data.fifteen.pulse}
          MonthlyGraphData={data.monthly.pulse}
        />
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

export default BloodPressureAnalyticsScreen;
