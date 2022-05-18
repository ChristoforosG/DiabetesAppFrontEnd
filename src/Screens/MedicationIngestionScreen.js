import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button, Menu } from "react-native-paper";
import moment from "moment";
import TextInputComponent from "../Components/TextInputComponent";
import RadioButtonComponent from "../Components/RadioButtonComponent";
import MedicationSchedulerComponent from "../Components/MedicationSchedulerComponent";
import instance from "../Axios/mainAxios";

const submitRequest = (
  setLoading,
  navigation,
  activity,
  medication,
  unit,
  scheduleType,
  v1,
  v2,
  v3,
  v4,
  v5,
  v6,
  v7,
  timeText,
  dateTime
) => {
  let data = {};
  if (scheduleType == "Ημερήσια") {
    return instance
      .post("/api/data-api/medication/", {
        category: activity,
        madication_name: medication,
        dose: unit,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        sutarday: true,
        sunday: true,
        dose_time: timeText,
      })
      .then((response) => {
        setLoading(true);
        setTimeout(function () {
          setLoading(false);
          //console.log(response.data);
          navigation.goBack();
        }, 1000);
      });
  } else if (scheduleType == "Εβδομαδιαία") {
    return instance
      .post("/api/data-api/medication/", {
        category: activity,
        madication_name: medication,
        dose: unit,
        monday: v1,
        tuesday: v2,
        wednesday: v3,
        thursday: v4,
        friday: v5,
        sutarday: v6,
        sunday: v7,
        dose_time: timeText,
      })
      .then((response) => {
        setLoading(true);
        setTimeout(function () {
          setLoading(false);
          //console.log(response.data);
          navigation.goBack();
        }, 1000);
      });
  } else {
    return instance
      .post("/api/data-api/medication-once/", {
        category: activity,
        madication_name: medication,
        dose: unit,
        measurement_date_time: dateTime,
      })
      .then((response) => {
        setLoading(true);
        setTimeout(function () {
          setLoading(false);
          //console.log(response.data);
          navigation.goBack();
        }, 1000);
      });
  }
};

const MedicationIngestionScreen = (props) => {
  const options = ["Ημερήσια", "Εβδομαδιαία", "Έκτακτη λήψη"];
  const [scheduleType, setScheduleType] = useState("None");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState("");
  const [medication, setMedication] = useState("");
  const [unit, setUnit] = useState("");
  const currentDateTime = new Date();
  const [timeText, setTimeText] = useState(
    moment(currentDateTime).format("HH:mm")
  );
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [v1, setv1] = useState(false);
  const [v2, setv2] = useState(false);
  const [v3, setv3] = useState(false);
  const [v4, setv4] = useState(false);
  const [v5, setv5] = useState(false);
  const [v6, setv6] = useState(false);
  const [v7, setv7] = useState(false);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Φαρμακευτική Αγωγή" />
      </Appbar>
      <View style={styles.MenuView}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setVisible(true)}>
              {activity == "" ? "Κατηγορία Αγωγής" : activity}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setActivity("Διαβήτης");
              setVisible(false);
            }}
            title="Διαβήτης"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Υπέρταση");
              setVisible(false);
            }}
            title="Υπέρταση"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Υπολιπιδαιμική αγωγή");
              setVisible(false);
            }}
            title="Υπολιπιδαιμική αγωγή"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Αντιθρομβωτικά");
              setVisible(false);
            }}
            title="Αντιθρομβωτικά"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Νευρολογικά");
              setVisible(false);
            }}
            title="Νευρολογικά"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Αναλγητικά");
              setVisible(false);
            }}
            title="Αναλγητικά"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Λοιπή Αγωγή");
              setVisible(false);
            }}
            title="Λοιπή Αγωγή"
          />
        </Menu>
      </View>
      <Divider />
      <TextInputComponent
        label="Εισαγωγή Φαρμακευτικής Αγωγής"
        value={medication}
        setValue={setMedication}
        mode="outlined"
        keyboardType="default"
      />
      <Divider />
      <TextInputComponent
        label="Εισαγωγή Δοσολογίας"
        value={unit}
        setValue={setUnit}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />

      <RadioButtonComponent
        title="Συχνότητα Χορήγησης"
        options={options}
        checked={scheduleType}
        setChecked={setScheduleType}
      />

      <MedicationSchedulerComponent
        type={scheduleType}
        setTimeText={setTimeText}
        timeText={timeText}
        v1={v1}
        setv1={setv1}
        v2={v2}
        setv2={setv2}
        v3={v3}
        setv3={setv3}
        v4={v4}
        setv4={setv4}
        v5={v5}
        setv5={setv5}
        v6={v6}
        setv6={setv6}
        v7={v7}
        setv7={setv7}
        setDateTime={setDateTime}
      />

      <Divider />
      <View style={styles.SubmitButtonViewStyle}>
        <View style={styles.SubmitButtonStyle}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() =>
              submitRequest(
                setLoading,
                props.navigation,
                activity,
                medication,
                unit,
                scheduleType,
                v1,
                v2,
                v3,
                v4,
                v5,
                v6,
                v7,
                timeText,
                dateTime
              )
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
  MenuView: {
    marginVertical: Dimensions.get("window").height / 40,
    marginHorizontal: Dimensions.get("window").width / 10,
  },
  ScheduleName: {
    fontSize: 22,
    borderWidth: 0,
  },
  ScheduleContainer: {
    marginVertical: Dimensions.get("window").height / 40,
    marginHorizontal: 20,
    borderWidth: 0,
  },
});

export default MedicationIngestionScreen;
