import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Appbar, Switch } from "react-native-paper";
import { useQueryClient, useQuery, useMutation } from "react-query";
import EntypoIcon from "react-native-vector-icons/Entypo";
import DrawerComponent from "../Components/DrawerComponent";
import instance from "../Axios/mainAxios";

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

const SubmitInsulinTherapy = (data) => {
  return instance.post("/api/user/submitPersonalUserInfo/", {
    user_name: data.user_name,
    first_name: data.first_name,
    gender: data.gender,
    date_of_birth: data.date_of_birth,
    is_in_insulin: data.is_in_insulin,
  });
};

const SettingsScreen = (props) => {
  const { isError, isLoading, data } = useQuery("user_info", getUserInfo);
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => SubmitInsulinTherapy(data), {
    onSettled: () => {
      queryClient.invalidateQueries("user_info");
    },
  });
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar>
      <View style={styles.InsulinView}>
        <View style={{ flex: 5 }}>
          <Text style={{ fontSize: 24 }}>Ινσουλινοθεραπεία: </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Switch
            value={data.is_in_insulin_therapy}
            onValueChange={() =>
              mutation.mutate({
                user_name: data.user_name,
                first_name: data.first_name,
                gender: data.gender,
                date_of_birth: data.date_of_birth,
                is_in_insulin: !data.is_in_insulin_therapy,
              })
            }
          />
        </View>
        <View style={{ flex: 1 }}></View>
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
  InsulinView: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
  },
});

export default SettingsScreen;
