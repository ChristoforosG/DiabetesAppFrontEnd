import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { Text, Portal, Provider } from "react-native-paper";
import { colorPalette } from "../Styling/universalStyles";

const ReminderComponent = ({ date, title, info, setVisible, setReminder }) => {
  const showModal = () => {
    setVisible(true);
    setReminder({
      date: date,
      title: title,
      info: info,
    });
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.touchableOpacityStyle}
        onPress={showModal}
      >
        <View style={styles.contentViewStyle}>
          <Text style={styles.dateTextStyle}>
            {date.toString().split("T")[0]}
          </Text>
          <Text style={styles.titleTextStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  touchableOpacityStyle: {
    borderWidth: 0,
    backgroundColor: colorPalette.primaryFaded,
    height: 30,
    alignItems: "center",
    flexDirection: "row",
    //alignItems: "flex-start",
    borderRadius: 5,
  },
  contentViewStyle: {
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 0,
    flex: 1,
  },
  dateTextStyle: {
    borderWidth: 0,
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: colorPalette.surface,
  },
  titleTextStyle: {
    borderWidth: 0,
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: colorPalette.surface,
  },
});

export default ReminderComponent;
