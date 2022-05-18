import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Avatar } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import { colorPalette } from "../Styling/universalStyles";

const MedicationSchedulerComponent = (props) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [vc1, setvc1] = useState(colorPalette.backdrop);
  const [vc2, setvc2] = useState(colorPalette.backdrop);
  const [vc3, setvc3] = useState(colorPalette.backdrop);
  const [vc4, setvc4] = useState(colorPalette.backdrop);
  const [vc5, setvc5] = useState(colorPalette.backdrop);
  const [vc6, setvc6] = useState(colorPalette.backdrop);
  const [vc7, setvc7] = useState(colorPalette.backdrop);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    props.setTimeText(moment(time).format("HH:mm"));
    hideTimePicker();
  };
  if (props.type == "None") {
    return <View style={styles.Container}></View>;
  }
  if (props.type == "Ημερήσια") {
    return (
      <View style={styles.Container}>
        <View
          style={{
            marginVertical: Dimensions.get("window").height / 30,
            marginHorizontal: Dimensions.get("window").width / 8,
          }}
        >
          <Button mode="outlined" onPress={() => showTimePicker()}>
            {props.timeText === "" ? "Ώρα Χορήγησης" : props.timeText}
          </Button>
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    );
  }
  if (props.type == "Εβδομαδιαία") {
    return (
      <View style={styles.Container}>
        <View style={styles.WeekListView}>
          <Avatar
            size="small"
            rounded
            title="Δ"
            onPress={() => {
              if (!props.v1) {
                setvc1(colorPalette.primary);
              } else setvc1(colorPalette.backdrop);
              props.setv1(!props.v1);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc1 }}
          />
          <Avatar
            size="small"
            rounded
            title="T"
            onPress={() => {
              if (!props.v2) {
                setvc2(colorPalette.primary);
              } else setvc2(colorPalette.backdrop);
              props.setv2(!props.v2);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc2 }}
          />
          <Avatar
            size="small"
            rounded
            title="T"
            onPress={() => {
              if (!props.v3) {
                setvc3(colorPalette.primary);
              } else setvc3(colorPalette.backdrop);
              props.setv3(!props.v3);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc3 }}
          />
          <Avatar
            size="small"
            rounded
            title="Π"
            onPress={() => {
              if (!props.v4) {
                setvc4(colorPalette.primary);
              } else setvc4(colorPalette.backdrop);
              props.setv4(!props.v4);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc4 }}
          />
          <Avatar
            size="small"
            rounded
            title="Π"
            onPress={() => {
              if (!props.v5) {
                setvc5(colorPalette.primary);
              } else setvc5(colorPalette.backdrop);
              props.setv5(!props.v5);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc5 }}
          />
          <Avatar
            size="small"
            rounded
            title="Σ"
            onPress={() => {
              if (!props.v6) {
                setvc6(colorPalette.primary);
              } else setvc6(colorPalette.backdrop);
              props.setv6(!props.v6);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc6 }}
          />
          <Avatar
            size="small"
            rounded
            title="K"
            onPress={() => {
              if (!props.v7) {
                setvc7(colorPalette.primary);
              } else setvc7(colorPalette.backdrop);
              props.setv7(!props.v7);
            }}
            activeOpacity={1.0}
            overlayContainerStyle={{ backgroundColor: vc7 }}
          />
        </View>
        <View
          style={{
            marginBottom: Dimensions.get("window").height / 30,
            marginHorizontal: Dimensions.get("window").width / 8,
          }}
        >
          <Button mode="outlined" onPress={() => showTimePicker()}>
            {props.timeText === "" ? "Ώρα Χορήγησης" : props.timeText}
          </Button>
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    );
  }
  if (props.type == "Έκτακτη λήψη") {
    return (
      <DateTimeInput
        field_name="Ημερομηνία/Ώρα"
        returnDateTime={props.setDateTime}
      />
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    height: Dimensions.get("window").height / 8,
    marginHorizontal: Dimensions.get("window").width / 20,
  },
  WeekListView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Dimensions.get("window").height / 40,
    marginHorizontal: Dimensions.get("window").width / 20,
  },
});

export default MedicationSchedulerComponent;
