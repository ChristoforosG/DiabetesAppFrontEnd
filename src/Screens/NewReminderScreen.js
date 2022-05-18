import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import {
  Text,
  Appbar,
  Divider,
  Avatar,
  TextInput,
  Button,
} from "react-native-paper";
import { useQueryClient, useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../Axios/mainAxios";

const STORAGE_KEY = "@user_info";

const SubmitReminder = (data) => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((response) => {
      let config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(response)["access"],
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      return instance
        .post(
          "/api/data-api/reminder/",
          {
            date_time: data.date_time + " 00:00:00",
            title: data.title,
            info: data.info,
          },
          config
        )
        .then((response) => {
          return response.data;
        })
        .catch(function (error) {
          console.log(error.message);
        });
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

const NewReminderScreen = (props) => {
  const { dateString, day, month, year } = props.route.params;
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => SubmitReminder(data), {
    onSettled: () => {
      queryClient.invalidateQueries("reminders");
      props.navigation.navigate("Calendar");
    },
  });
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction
          onPress={() => props.navigation.navigate("Calendar")}
        />
        <Appbar.Content title="Νέα Υπενθύμιση" />
      </Appbar>

      <View style={styles.RemindersTitleView}>
        <Avatar.Icon size={38} icon="calendar" />
        <Text style={styles.RemindersTitleText}>
          {" "}
          {day}-{month}-{year}{" "}
        </Text>
      </View>

      <Divider />
      <View style={styles.TitleView}>
        <TextInput
          onDismiss
          style={{ fontSize: 18 }}
          label="Τίτλος"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          dense={true}
        />
      </View>
      <View style={styles.infoView}>
        <TextInput
          onDismiss
          style={{ fontSize: 18 }}
          label="Λεπτομέριες"
          value={info}
          onChangeText={setInfo}
          mode="outlined"
          numberOfLines={3}
          multiline={true}
        />
      </View>
      <Divider />

      <View style={styles.SubmitButtonViewStyle}>
        <View style={styles.SubmitButtonStyle}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => {
              setLoading(true);
              mutation.mutate({
                date_time: dateString,
                title: title,
                info: info,
              });
            }}
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
  RemindersTitleView: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 10,
  },
  RemindersTitleText: {
    fontSize: 24,
    marginLeft: 10,
  },
  TitleView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoView: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  SubmitButtonViewStyle: {
    borderWidth: 0,
  },
  SubmitButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 3.3,
  },
});

export default NewReminderScreen;
