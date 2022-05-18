import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from "react-native";
import {
  Text,
  TextInput,
  Avatar,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Awesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import { colorPalette } from "../Styling/universalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../Axios/allowAnyAxios";

const STORAGE_KEY = "@user_info";

const onChangePassword = (val, setPassword, setEyeOpacity) => {
  if (val == "") setEyeOpacity(0);
  else setEyeOpacity(1);
  setPassword(val);
  return;
};

const submitRequest = (navigation, username, password, setLoading) => {
  setLoading(true);
  return instance
    .post("/api/user/login/", {
      username: username,
      password: password,
    })
    .then(function (response) {
      if (response.status === 200) {
        const userInfo = response.data;
        return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo))
          .then((response) => {
            if (userInfo["first_login"] == true) {
              setTimeout(function () {
                setLoading(false);
              }, 200);
              return navigation.navigate("General Info", { user: username });
            }
            if (userInfo["first_login"] == false) {
              setTimeout(function () {
                setLoading(false);
              }, 200);
              return navigation.navigate("Drawer Navigator", {
                user: username,
              });
            }
          })
          .catch((error) => {
            throw "Login Request Error: " + error;
          });
      }
    })
    .catch(function (error) {
      setTimeout(function () {
        setLoading(false);
      }, 200);
      console.log("Login Catch: " + error.response);
    });
};

const LogInScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textSecurity, setTextSecurity] = useState(true);
  const [loading, setLoading] = useState(false);
  const [eyeOpacity, setEyeOpacity] = useState(() => {
    if (password == "") return 0;
    else return 1;
  });

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.AvatarViewStyle}>
        <Avatar.Icon size={200} icon="diabetes" />
      </View>
      <View style={styles.UsernameViewStyle}>
        <TextInput
          mode="flat"
          placeholder="Όνομα Χρήστη/Email"
          placeholderTextColor={colorPalette.surface}
          left={
            <TextInput.Icon
              name={() => <AwesomeIcon name={"user"} size={20} />}
              disabled={true}
              style={{ opacity: 1.0 }}
            />
          }
          onChangeText={setUsername}
          autoCapitalize="none"
          dense={true}
          underlineColor={colorPalette.primary}
          style={{
            fontSize: 20,
            backgroundColor: colorPalette.textInputBackGround,
          }}
        />
      </View>
      <View style={styles.PasswordViewStyle}>
        <TextInput
          mode="flat"
          placeholder="Κωδικός"
          placeholderTextColor={colorPalette.surface}
          left={
            <TextInput.Icon
              name={() => <Awesome5Icon name={"key"} size={20} />}
              disabled={true}
              style={{ opacity: 1.0 }}
            />
          }
          right={
            <TextInput.Icon
              name={() => (
                <IonIcon
                  name={"eye"}
                  size={20}
                  style={{ opacity: eyeOpacity }}
                />
              )}
              onPress={() => setTextSecurity(!textSecurity)}
            />
          }
          secureTextEntry={textSecurity}
          onChangeText={(val) =>
            onChangePassword(val, setPassword, setEyeOpacity)
          }
          dense={true}
          underlineColor={colorPalette.primary}
          style={{
            fontSize: 20,
            backgroundColor: colorPalette.textInputBackGround,
          }}
        />
      </View>
      <View style={styles.ButtonViewStyle}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() =>
            submitRequest(props.navigation, username, password, setLoading)
          }
        >
          {loading ? "LOADING" : "ΣΥΝΔΕΣΗ"}
        </Button>
      </View>
      <View style={styles.TouchableViewStyle}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.RegisterTextStyle}>Δημιουργία Λογαριασμού</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: 40,
    backgroundColor: colorPalette.surface,
  },
  AvatarViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 10,
    alignItems: "center",
  },
  UsernameViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 20,
    marginHorizontal: 10,
  },
  PasswordViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 80,
    marginHorizontal: 10,
  },
  ButtonViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 20,
    marginHorizontal: 80,
  },
  TouchableViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 80,
    alignItems: "center",
    marginHorizontal: 40,
  },
  RegisterTextStyle: {
    fontSize: 16,
  },
});

export default LogInScreen;
