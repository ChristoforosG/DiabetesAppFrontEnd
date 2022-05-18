import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Appbar, Button } from "react-native-paper";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import DrawerComponent from "../Components/DrawerComponent";
import instance from "../Axios/mainAxios";

const registerForPushNotificationsAsync = async (setLoading) => {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return instance
      .post("/api/data-api/submit-device-token/", {
        device_token: token,
      })
      .then((response) => {
        setLoading(true);
        setTimeout(function () {
          setLoading(false);
        }, 1000);
      });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

const AboutScreen = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
        <Appbar.Content title="About" />
      </Appbar>
      <View style={{ marginVertical: 40, marginHorizontal: 20 }}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => registerForPushNotificationsAsync(setLoading)}
        >
          {loading ? "LOADING" : "Επιτρέπω την λήψη ειδοποιήσεων"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: 35,
  },
});

export default AboutScreen;
