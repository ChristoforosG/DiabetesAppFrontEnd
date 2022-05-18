import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button, Menu } from "react-native-paper";
import TextInputComponent from "../Components/TextInputComponent";
import RadioButtonComponent from "../Components/RadioButtonComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import MenuComponent from "../Components/MenuComponent";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { colorPalette } from "../Styling/universalStyles";
import instance from "../Axios/mainAxios";

const submitRequest = (
  setLoading,
  navigation,
  duration,
  activityType,
  intensity,
  dateTime
) => {
  return instance
    .post("/api/data-api/activity/", {
      duration: duration,
      activity_type: activityType,
      intensity: intensity,
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
};

const ActivityIngestionScreen = (props) => {
  const options = ["Ήπια", "Κανονική", "Έντονη"];
  const activityList = [
    {
      title: "Περπάτημα",
      icon: "walk",
    },
    {
      title: "Τρέξιμο",
      icon: "run-fast",
    },
    {
      title: "Αερόβια",
      icon: "human-handsup",
    },
    {
      title: "Ποδηλασία",
      icon: "bike",
    },
    {
      title: "Κολύμβηση",
      icon: "swim",
    },
    {
      title: "Γιόγκα",
      icon: "yoga",
    },
    {
      title: "Άλλο",
      icon: "weight-lifter",
    },
  ];
  const [duration, setDuration] = useState("");
  const [visible, setVisible] = useState("None");
  const [intensity, setIntensity] = useState("None");
  const currentDateTime = new Date();
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [activityType, setActivityType] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Άθληση" />
      </Appbar>
      <Divider />

      <TextInputComponent
        label="Διάρκεια Άθλησης (Λεπτά)"
        value={duration}
        setValue={setDuration}
        mode="outlined"
        keyboardType="numeric"
      />
      <Divider />
      <View style={styles.MenuView}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setVisible(true)}>
              {activityType == "" ? "Επιλογή Άθλησης" : activityType}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[0]["title"]);
              setVisible(false);
            }}
            title={activityList[0]["title"]}
            icon={activityList[0]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[1]["title"]);
              setVisible(false);
            }}
            title={activityList[1]["title"]}
            icon={activityList[1]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[2]["title"]);
              setVisible(false);
            }}
            title={activityList[2]["title"]}
            icon={activityList[2]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[3]["title"]);
              setVisible(false);
            }}
            title={activityList[3]["title"]}
            icon={activityList[3]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[4]["title"]);
              setVisible(false);
            }}
            title={activityList[4]["title"]}
            icon={activityList[4]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[5]["title"]);
              setVisible(false);
            }}
            title={activityList[5]["title"]}
            icon={activityList[5]["icon"]}
          />
          <Menu.Item
            onPress={() => {
              setActivityType(activityList[6]["title"]);
              setVisible(false);
            }}
            title={activityList[6]["title"]}
            icon={activityList[6]["icon"]}
          />
        </Menu>
      </View>
      <Divider />
      <RadioButtonComponent
        title="Ένταση Άθλησης"
        options={options}
        checked={intensity}
        setChecked={setIntensity}
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
              submitRequest(
                setLoading,
                props.navigation,
                duration,
                activityType,
                intensity,
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
  MenuView: {
    marginVertical: Dimensions.get("window").height / 40,
    marginHorizontal: Dimensions.get("window").width / 10,
  },
  SubmitButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 3.3,
  },
});

export default ActivityIngestionScreen;
