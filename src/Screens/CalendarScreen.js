import React, { useState } from "react";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";
import {
  Text,
  Appbar,
  Divider,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../Axios/mainAxios";
import NewReminderScreen from "./NewReminderScreen";
import { colorPalette } from "../Styling/universalStyles";
import ReminderComponent from "../Components/ReminderComponent";

LocaleConfig.locales["gr"] = {
  monthNames: [
    "Ιανουάριος",
    "Φεβρουάριος",
    "Μάρτιος",
    "Απρίλιος",
    "Μάιος",
    "Ιούνιος",
    "Ιούλιος",
    "Αύγουστος",
    "Σεπτέμβρης",
    "Οκτώβρης",
    "Νοέμβρης",
    "Δεκέμβρης",
  ],
  monthNamesShort: [
    "Ιαν.",
    "Φεβρ.",
    "Μάρτ.",
    "Απρ.",
    "Ιούν.",
    "Ιούλ.",
    "Αύγ.",
    "Σεπτ.",
    "Οκτ.",
    "Νοέμβρ.",
    "Δεκ.",
  ],
  dayNames: [
    "Δευτέρα",
    "Τρίτη",
    "Τετάρτη",
    "Πέμπτη",
    "Παρασκευή",
    "Σάββατο",
    "Κυριακή",
  ],
  dayNamesShort: ["Δευ.", "Τρι.", "Τετ.", "Πεμ.", "Παρ.", "Σαβ.", "Κυρ."],
  today: "Σήμερα",
};
LocaleConfig.defaultLocale = "gr";

const STORAGE_KEY = "@user_info";

const getReminders = () => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((response) => {
      const AuthStr = "Bearer ".concat(JSON.parse(response)["access"]);
      return instance
        .get("/api/data-api/reminder/", { headers: { Authorization: AuthStr } })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchData = (isloading, error, data) => {
  if (!isloading) {
    if (!error) {
      return JSON.parse(data);
    }
  }
  return [];
};

const CalendarScreen = (props) => {
  const { isloading, error, data } = useQuery("reminders", getReminders);
  const [visible, setVisible] = useState(false);
  const [reminder, setReminder] = useState({
    date: "",
    title: "",
    info: "",
  });
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.Container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainerStyle}
          style={styles.modalStyle}
        >
          <View style={{ marginTop: "5%" }}>
            <View>
              <Text style={styles.titleInfoStyle}>Λεπτομέρειες</Text>
            </View>
            <Divider />
            <View
              style={{
                marginTop: "15%",
                backgroundColor: colorPalette.backdrop,
                marginHorizontal: "10%",
                height: "65%",
                borderWidth: 1,
                borderColor: colorPalette.primary,
              }}
            >
              <Text style={styles.textInfoStyle}>{reminder.info}</Text>
            </View>
          </View>
        </Modal>
      </Portal>

      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Ημερολόγιο" />
      </Appbar>

      <Calendar
        onDayLongPress={(day) => {
          props.navigation.navigate("Reminder", day);
        }}
      />

      <View style={styles.RemindersTitleView}>
        <Text style={styles.RemindersTitleText}> Υπενθυμίσεις </Text>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Text style={styles.ListColumnStyle}>Ημερομηνία</Text>
        <Text style={styles.ListColumnStyle}>Τίτλος</Text>
      </View>

      <FlatList
        data={JSON.parse(data)}
        renderItem={({ item }) => {
          if (!isloading) {
            if (!error) {
              return (
                <ReminderComponent
                  title={item["fields"]["reminder_title"]}
                  info={item["fields"]["reminder_info"]}
                  date={item["fields"]["reminder_date_time"]}
                  setVisible={setVisible}
                  setReminder={setReminder}
                />
              );
            }
          }
        }}
        keyExtractor={(item) => item["pk"]}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={{ backgroundColor: colorPalette.surface }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  RemindersTitleView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  RemindersTitleText: {
    fontSize: 24,
  },
  ListColumnStyle: {
    borderWidth: 0,
    textAlign: "center",
    flex: 1,
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: colorPalette.primary,
    color: colorPalette.surface,
    fontWeight: "bold",
    borderRadius: 10,
  },
  ListStyle: {
    borderWidth: 0,
    textAlign: "center",
    flex: 1,
    fontSize: 16,
  },
  modalContainerStyle: {
    height: "40%",
    width: "80%",
    alignSelf: "center",
    justifyContent: "flex-start",
    backgroundColor: colorPalette.primaryFaded,
    borderRadius: 20,
  },
  modalStyle: {
    backgroundColor: colorPalette.surface,
  },
  textInfoStyle: {
    textAlign: "left",
    borderWidth: 0,
    fontSize: 20,
    margin: "2%",
  },
  titleInfoStyle: {
    textAlign: "center",
    borderWidth: 0,
    fontSize: 20,
    marginHorizontal: "5%",
    fontWeight: "bold",
    color: colorPalette.surface,
  },
});

export default CalendarScreen;
