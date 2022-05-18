import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions, Text } from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";
import moment from "moment";
import { useQueryClient, useMutation, useQuery } from "react-query";
import MenstrualCycleComponent from "../Components/MenstrualCycleComponent";
import instance from "../Axios/mainAxios";

const MAX_MILLIS = 2764800000;

const submitRequest = (setLoading) => {
  const currentDate = new Date();
  const period_end_date = new Date();
  const fertility_start_date = new Date();
  const fertility_end_date = new Date();
  period_end_date.setDate(currentDate.getDate() + 4);
  fertility_start_date.setDate(currentDate.getDate() + 13);
  fertility_end_date.setDate(currentDate.getDate() + 27);
  moment(currentDate).format("YYYY-MM-DD");
  setLoading(true);
  return instance
    .post("/api/data-api/menstrual-cycle/", {
      cycle_start_date: moment(currentDate).format("YYYY-MM-DD"),
      period_end_date: moment(period_end_date).format("YYYY-MM-DD"),
      fertility_start_date: moment(fertility_start_date).format("YYYY-MM-DD"),
      fertility_end_date: moment(fertility_end_date).format("YYYY-MM-DD"),
      cycle_end_date: "",
    })
    .then((response) => {
      setTimeout(function () {
        setLoading(false);
      }, 1000);
    });
};

const getMenstrualInfo = (setStart) => {
  return instance.get("/api/data-api/menstrual-cycle/").then((response) => {
    if (response.status === 200) {
      setTimeout(function () {
        const currentDate = new Date();

        const duration =
          currentDate - Date.parse(response.data.cycle_start_date);
        console.log(duration - MAX_MILLIS);
        if (Object.keys(response.data).length === 0) {
          setStart(false);
        } else if (duration > MAX_MILLIS) {
          setStart(false);
        } else {
          setStart(true);
        }
      }, 1000);
      return response.data;
    }
    if (response.status === 204) {
      return {};
    }
  });
};

const onHistoryButtonPress = (navigation, setLoading) => {
  setLoading(true);
  setTimeout(function () {
    setLoading(false);
    navigation.navigate("MenstrualHistory");
  }, 1000);
};

const MenstrualCycleScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const queryClient = useQueryClient();
  const [start, setStart] = useState(false);
  const {
    isLoading,
    error,
    data: menstrual_cycle,
  } = useQuery("menstrual_cycle", getMenstrualInfo(setStart));

  const mutation = useMutation(() => submitRequest(setLoading), {
    onSettled: () => {
      setStart(false);
      queryClient.invalidateQueries("menstrual_cycle");
    },
  });
  const current_cycle = {
    cycle_start_date: menstrual_cycle["cycle_start_date"],
    fertility_start_date: menstrual_cycle["fertility_start_date"],
  };
  return (
    <View style={styles.Container}>
      <Appbar>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Έμμηνος Κύκλος" />
      </Appbar>
      {!isLoading && (
        <MenstrualCycleComponent
          start={start}
          menstrual_cycle_info={current_cycle}
        />
      )}
      <Divider />
      <View style={styles.StartButtonStyle}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => mutation.mutate(setLoading, setStart)}
        >
          {loading ? "LOADING" : "ΕΝΑΡΞΗ ΚΥΚΛΟΥ"}
        </Button>
      </View>
      <Divider />
      <View style={styles.HistoryButtonStyle}>
        <Button
          mode="contained"
          loading={historyLoading}
          onPress={() =>
            onHistoryButtonPress(props.navigation, setHistoryLoading)
          }
        >
          {historyLoading ? "LOADING" : "Στατιστικά"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    marginTop: StatusBar.currentHeight,
  },
  StartButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 4,
  },
  HistoryButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 4,
  },
});

export default MenstrualCycleScreen;
