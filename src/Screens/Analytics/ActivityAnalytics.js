import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useQueryClient } from "react-query";
import GraphComponent from "../../Components/Temp/graph";
import {
  ActivityWeeklyGraphData,
  activityFifteenDayGraphData,
  activityMonthlyGraphData,
} from "../../resources/sampleData";

const ActivityAnalyticsScreen = (props) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("activity_analytics_data");
  console.log(data);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Σωματική Άσκηση" />
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
            Χρονικό Διάγραμμα Διάρκειας Άθλησης
          </Text>
        </View>
        <GraphComponent
          WeeklyGraphData={data.weekly.activity}
          FifteenDayGraphData={data.fifteen.activity}
          MonthlyGraphData={data.monthly.activity}
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

export default ActivityAnalyticsScreen;
