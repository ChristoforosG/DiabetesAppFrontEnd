import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Avatar, Text, Divider } from "react-native-paper";
import MenstrualAnalyticsComponent from "../Components/MenstrualAnalyticsComponent";
import { useQueryClient } from "react-query";

const AVATAR_SIZE = 100;

const MenstrualHistoryScreen = (props) => {
  const queryClient = useQueryClient();
  const history = queryClient.getQueryData("menstrual_cycle");
  console.log(history);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Ιστορικό" />
      </Appbar>
      <View style={styles.AverageView}>
        <View style={styles.AvgPeriodView}>
          <Avatar.Text
            size={AVATAR_SIZE}
            label={Math.round(history.avg_period)}
          />
          <Text>Μεσος όρος εμμηνορρυσίας</Text>
          <Text>(Ημέρες)</Text>
        </View>
        <View style={styles.AvgPeriodView}>
          <Avatar.Text
            size={AVATAR_SIZE}
            label={Math.round(history.avg_cycle)}
          />
          <Text>Μεσος όρος κύκλου</Text>
          <Text>(Ημέρες)</Text>
        </View>
      </View>
      <Divider />
      <View style={{ marginTop: 20 }}>
        <MenstrualAnalyticsComponent
          max_days={history.max_days}
          cycle_info_list={history.stats}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: 35,
  },
  InsulinView: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
  },
  AverageView: {
    borderWidth: 0,
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  AvgPeriodView: {
    borderWidth: 0,
    flex: 1,
    alignItems: "center",
  },
  AvgCycleView: {
    flex: 1,
  },
});

export default MenstrualHistoryScreen;
