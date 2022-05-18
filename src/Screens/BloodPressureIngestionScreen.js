import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button } from "react-native-paper";
import moment from "moment";
import TextInputComponent from "../Components/TextInputComponent";
import RadioButtonComponent from "../Components/RadioButtonComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import { useQueryClient, useMutation, useQuery } from "react-query";
import instance from "../Axios/mainAxios";

const submitRequest = (setLoading, systolic, diastolic, pulse, dateTime) => {
  setLoading(true);
  return instance
    .post("/api/data-api/blood-pressure-ingestion/", {
      systolic_blood_pressure: systolic,
      diastolic_blood_pressure: diastolic,
      blood_pulse: pulse,
      measurement_date_time: dateTime + ":00",
    })
    .then((response) => {
      setTimeout(function () {
        setLoading(false);
        return response.status;
      }, 600);
    })
    .catch((error) => {
      throw error.response;
    });
};

const BloodPressureIngestionScreen = ({ navigation }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const currentDateTime = new Date();
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => submitRequest(setLoading, systolic, diastolic, pulse, dateTime),
    {
      onSettled: () => {
        queryClient.invalidateQueries("blood_pressure_graph_data");
        navigation.goBack();
      },
    }
  );

  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Πίεση Αίματος" />
      </Appbar>

      <TextInputComponent
        label="Εισαγωγή Συστολικής (mmHg)"
        value={systolic}
        setValue={setSystolic}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />
      <TextInputComponent
        label="Εισαγωγή Διαστολικής (mmHg)"
        value={diastolic}
        setValue={setDiastolic}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />
      <TextInputComponent
        label="Εισαγωγή Παλμών (bpm)"
        value={pulse}
        setValue={setPulse}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />

      <Divider />
      <DateTimeInput field_name="Ημερομηνία/Ώρα" returnDateTime={setDateTime} />
      <Divider />
      <View style={styles.SubmitButtonViewStyle}>
        <View style={styles.SubmitButtonStyle}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() =>
              mutation.mutate(setLoading, systolic, diastolic, pulse, dateTime)
            }
          >
            {loading ? "LOADING" : "SUBMIT"}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  SubmitButtonViewStyle: {
    borderWidth: 0,
  },
  SubmitButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 3.3,
  },
});

export default BloodPressureIngestionScreen;
