import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Graph2Component from "../../Components/Temp/graph2";
import {
  weightWeeklyGraphData,
  weightFifteenDayGraphData,
  weightMonthlyGraphData,
  weightWeeklyGraphData2,
} from "../../resources/sampleData";

const WeightAnalyticsScreen = (props) => {
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Βάρος" />
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
            Χρονικό Διάγραμμα Βάρους
          </Text>
        </View>
        <Graph2Component
          WeeklyGraphData={weightWeeklyGraphData}
          FifteenDayGraphData={weightFifteenDayGraphData}
          MonthlyGraphData={weightMonthlyGraphData}
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

export default WeightAnalyticsScreen;
