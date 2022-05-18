import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button } from "react-native-paper";
import TextInputComponent from "../Components/TextInputComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";

const submitRequest = (setLoading, navigation) => {
  setLoading(true);
  setTimeout(function () {
    setLoading(false);
    navigation.goBack();
  }, 1000);
};

const InsulinIngestionScreen = (props) => {
  const [insulin, setInsulin] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Ινσουλίνη" />
      </Appbar>

      <TextInputComponent
        label="Εισαγωγή Δόσης Ινσουλίνης"
        value={insulin}
        setValue={setInsulin}
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
});

export default InsulinIngestionScreen;
