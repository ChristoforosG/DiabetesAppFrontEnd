import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button } from "react-native-paper";
import moment from "moment";
import TextInputComponent from "../Components/TextInputComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import instance from "../Axios/mainAxios";

const submitRequest = (setLoading, navigation, weight, dateTime) => {
  setLoading(true);
  return instance
    .post("/api/data-api/weight/", {
      weight: weight,
      measurement_date_time: dateTime,
    })
    .then((response) => {
      setTimeout(function () {
        //console.log(response.data);
        setLoading(false);
        navigation.goBack();
      }, 1000);
    });
};

const WeightIngestionScreen = (props) => {
  const [weight, setWeight] = useState("");
  const currentDateTime = new Date();
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Βάρος" />
      </Appbar>

      <TextInputComponent
        label="Εισαγωγή Βάρους (Κιλά)"
        value={weight}
        setValue={setWeight}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />
      <DateTimeInput field_name="Ημερομηνία/Ώρα" returnDateTime={setDateTime} />
      <Divider />
      <View style={styles.SubmitButtonViewStyle}>
        <View style={styles.SubmitButtonStyle}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() =>
              submitRequest(setLoading, props.navigation, weight, dateTime)
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

export default WeightIngestionScreen;
