import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
} from "react-native";
import { Text, Appbar, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient, useQuery } from "react-query";
import instance from "../Axios/mainAxios";
import ClockComponent from "../Components/ClockComponent";
import { colorPalette } from "../Styling/universalStyles";
import ReactionsComponent from "../Components/ReactionsPopUp";
import * as Notifications from "expo-notifications";

const STORAGE_KEY = "@user_info";

const getBloodGlucoseAnalyticsData = () => {
  return instance
    .get("/api/data-api/glucose/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      throw "Blood Glucose Analytics Data Request Error:" + error;
    });
};

const getBloodPressureGraphData = () => {
  return instance
    .get("/api/data-api/blood-pressure-ingestion/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      throw "Blood Glucose Graph Data Request Error:" + error;
    });
};

const getActivityAnalyticsData = () => {
  return instance
    .get("/api/data-api/activity/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      throw "Blood Glucose Graph Data Request Error:" + error;
    });
};

const getReminders = () => {
  return instance
    .get("/api/data-api/reminder/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      throw "Reminders Request Error:" + error;
    });
};

const getUserInfo = () => {
  return instance
    .get("/api/user/userInfo/")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      throw "User Info Request Error: " + error;
    });
};

const getMenstrualInfo = () => {
  return instance.get("/api/data-api/menstrual-cycle/").then((response) => {
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 204) {
      return {};
    }
  });
};

const getMealsList = () => {
  return instance.get("/api/data-api/meals-info-list/").then((response) => {
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 204) {
      return {};
    }
  });
};

const HomeScreen = (props) => {
  const { isLoading, error, data } = useQuery("reminders", getReminders);
  const query = useQuery("user_info", getUserInfo);
  const menstrualInfo = useQuery("menstrual_cycle", getMenstrualInfo);
  const mealsList = useQuery("meals_list", getMealsList);
  const bloodPressureGraphData = useQuery(
    "blood_pressure_graph_data",
    getBloodPressureGraphData
  );
  const bloodGlucoseGraphData = useQuery(
    "blood_glucose_analytics_data",
    getBloodGlucoseAnalyticsData
  );
  const activityGraphData = useQuery(
    "activity_analytics_data",
    getActivityAnalyticsData
  );
  const [open, setOpen] = useState(false);
  const baseActionList = [
    {
      icon: () => (
        <FontistoIcon
          name={"blood-drop"}
          size={24}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Γλυκόζη",
      style: { backgroundColor: "#1634E3", color: "white" },
      onPress: () => props.navigation.navigate("BloodGlucoseIngestion"),
    },
    {
      icon: () => (
        <FontistoIcon
          name={"pulse"}
          size={18}
          style={{
            borderWidth: 0,
            color: "white",
            alignSelf: "center",
            marginTop: 4,
          }}
        />
      ),
      label: "Πίεση",
      style: { backgroundColor: "#16E3DE" },
      onPress: () => props.navigation.navigate("BloodPressureIngestion"),
    },
    {
      icon: () => (
        <MaterialIcon
          name={"food-variant"}
          size={24}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Γεύμα",
      style: { backgroundColor: "#42E316" },
      onPress: () => props.navigation.navigate("MealsIngestion"),
    },
    {
      icon: () => (
        <MaterialIcon
          name={"weight-lifter"}
          size={25}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Άθληση",
      style: { backgroundColor: "#E3D916" },
      onPress: () => props.navigation.navigate("ActivityIngestion"),
    },
    {
      icon: () => (
        <FontAwesome5Icon
          name={"weight"}
          size={22}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Βάρος",
      style: { backgroundColor: "#E3A516" },
      onPress: () => props.navigation.navigate("WeightIngestion"),
    },
    {
      icon: () => (
        <FontistoIcon
          name={"thermometer-alt"}
          size={22}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Ημέρα Ασθενείας",
      style: { backgroundColor: "#E31616" },
      onPress: () => props.navigation.navigate("IllnessIngestion"),
    },
    {
      icon: () => (
        <FontAwesome5Icon
          name={"briefcase-medical"}
          size={22}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Φαρμακευτική Αγωγή",
      style: { backgroundColor: "#7116E3" },
      onPress: () => props.navigation.navigate("MedicationIngestion"),
    },
  ];
  const genderActionList = baseActionList.concat([
    {
      icon: () => (
        <AntDesignIcon
          name={"woman"}
          size={22}
          style={{ borderWidth: 0, color: "white", alignSelf: "center" }}
        />
      ),
      label: "Έμμηνος Κύκλος",
      style: { backgroundColor: "#E31679" },
      onPress: () => props.navigation.navigate("MenstrualCycle"),
    },
  ]);
  const [actions, setActions] = useState(baseActionList);

  const navigation = useNavigation();
  const responseListener = useRef();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (
          response.notification.request.content.title === "Μέτρηση Γλυκόζης"
        ) {
          navigation.navigate("BloodGlucoseIngestion");
        }
      });
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
        <Appbar.Content title="Diabetes App" />
      </Appbar>

      <ClockComponent />

      {/* <Avatar.Image size={104} source={require('../../assets/1F605_color.png')} /> */}

      <FAB.Group
        open={open}
        icon={open ? "diabetes" : "plus"}
        actions={actions}
        onStateChange={() => {
          if (!query.isError) {
            if (!query.isLoading) {
              if (query.data["gender"] === "female") {
                setActions(genderActionList);
              } else {
                setActions(baseActionList);
              }
              setOpen(!open);
            }
          }
        }}
        fabStyle={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
  },
});

export default HomeScreen;
