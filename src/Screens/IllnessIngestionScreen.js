import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button, Menu } from "react-native-paper";
import TextInputComponent from "../Components/TextInputComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";

const submitRequest = (setLoading, navigation) => {
  setLoading(true);
  setTimeout(function () {
    setLoading(false);
    navigation.goBack();
  }, 1000);
};

const IllnestIngestionScreen = (props) => {
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState("");
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Ημέρα Ασθενείας" />
      </Appbar>
      <View style={styles.MenuView}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setVisible(true)}>
              {activity == "" ? "Επιλογή Ασθένειας" : activity}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setActivity("Covid-19");
              setVisible(false);
            }}
            title="Covid-19"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Γρίπη");
              setVisible(false);
            }}
            title="Γρίπη"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Πονοκέφαλος");
              setVisible(false);
            }}
            title="Πονοκέφαλος"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Πυρετός");
              setVisible(false);
            }}
            title="Πυρετός"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Εντερική Διαταραχή");
              setVisible(false);
            }}
            title="Εντερική Διαταραχή"
          />
          <Menu.Item
            onPress={() => {
              setActivity("Στομαχική Διαταραχή");
              setVisible(false);
            }}
            title="Στομαχική Διαταραχή"
          />
        </Menu>
      </View>
      <Divider />
      <DateTimeInput field_name="Ημερομηνία/Ώρα" returnDateTime={setDateTime} />
      <Divider />
      <View style={styles.SubmitButtonViewStyle}>
        <View style={styles.SubmitButtonStyle}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => submitRequest(setLoading, props.navigation)}
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
});

export default IllnestIngestionScreen;
