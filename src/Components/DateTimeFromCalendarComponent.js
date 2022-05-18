import React, { useState, Fragment } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DateTimeInput = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const currentDateTime = new Date();
  const [dateTimeText, setDateTimeText] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [dateText, setDateText] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDateText(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
    showTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    console.log("A time has been picked: ", time);
    setDateTimeText(dateText + " " + moment(time).format("HH:mm"));
    hideTimePicker();
    props.returnDateTime(dateText + " " + moment(time).format("HH:mm"));
  };

  return (
    <Fragment>
      <View style={styles.Container}>
        <View style={{ borderWidth: 0 }}>
          <Text style={styles.FieldName}>{props.field_name}:</Text>
        </View>
        <View
          style={{
            marginVertical: Dimensions.get("window").height / 30,
            marginHorizontal: 20,
          }}
        >
          <Button mode="outlined" onPress={() => showDatePicker()}>
            {dateTimeText}
          </Button>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginVertical: Dimensions.get("window").height / 40,
    marginHorizontal: 20,
    borderWidth: 0,
  },
  FieldName: {
    fontSize: 22,
    borderWidth: 0,
  },
});

export default DateTimeInput;
