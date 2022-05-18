import React, { Fragment } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../Axios/mainAxios";
import { useQuery } from "react-query";

const STORAGE_KEY = "@user_info";

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

const LogOut = (navigation) => {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((response) => {
      return instance
        .post("api/user/logout/", {
          refresh_token: JSON.parse(response)["refresh"],
        })
        .then((response) => {
          if (response.status === 200) {
            navigation.navigate("Log In");
          }
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 400) {
        return LogOut(navigation);
      }
    });
};

const showUserName = (isLoading, error, data) => {
  if (isLoading) {
    return "";
  }
  if (error) {
    return "";
  }
  return data["user_name"].substring(0, 1).toUpperCase();
};

const CustomDrawerComponent = (props) => {
  const ripple = TouchableNativeFeedback.Ripple("#adacac", false);
  const { isLoading, error, data } = useQuery("user_info", getUserInfo);
  return (
    <Fragment>
      <DrawerContentScrollView {...props}>
        <View style={styles.AvatarView}>
          <Avatar.Text
            size={70}
            label={showUserName(isLoading, error, data)}
            style={{ borderWidth: 0 }}
          />
          <IconButton
            icon="camera"
            size={20}
            onPress={() => console.log("Pressed")}
            style={{ position: "absolute", right: 95, top: 40 }}
            color="#CC2020"
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ borderWidth: 0, marginVertical: 30 }}>
        <TouchableNativeFeedback
          background={ripple}
          onPress={() => LogOut(props.navigation)}
        >
          <View style={styles.SignOutView}>
            <View style={{ borderWidth: 0 }}>
              <Text style={{ fontSize: 16 }}>Αποσύνδεση</Text>
            </View>
            <View
              style={{
                borderWidth: 0,
                marginHorizontal: Dimensions.get("window").width / 20,
              }}
            >
              <Avatar.Icon size={20} icon="logout" />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  AvatarView: {
    borderWidth: 0,
    alignItems: "center",
  },
  menuItemsCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
  SignOutView: {
    borderWidth: 0,
    flexDirection: "row",
    marginHorizontal: Dimensions.get("window").width / 22,
  },
});

export default CustomDrawerComponent;
