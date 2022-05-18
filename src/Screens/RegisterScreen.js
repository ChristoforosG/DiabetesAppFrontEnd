import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from "react-native";
import { Text, TextInput, Avatar, Button, Appbar } from "react-native-paper";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Awesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import instance from "../Axios/allowAnyAxios";
import { colorPalette } from "../Styling/universalStyles";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

const onChangePassword = (val, setPassword, setEyeOpacity) => {
  if (val == "") setEyeOpacity(0);
  else setEyeOpacity(1);
  setPassword(val);
  return;
};

const submitRequest = (
  email,
  username,
  password,
  repeatPassword,
  navigation
) => {
  console.log(email, username, password, repeatPassword);
  instance
    .post("/api/user/register/", {
      email: email,
      user_name: username,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      navigation.navigate("Log In");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else if (error.message) {
        console.log(error.message);
      }
    });
};

const postRegister = (email, username, password, repeatPassword) => {
  return fetch("http://192.168.1.11:8000/api/user/register/", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.stringify({
        email: email,
        user_name: username,
        password: password,
      }),
    }),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.error(e);
    });
};

const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [textSecurity, setTextSecurity] = useState(true);
  const [eyeOpacity, setEyeOpacity] = useState(() => {
    if (password == "") return 0;
    else return 1;
  });
  const [textSecurity2, setTextSecurity2] = useState(true);
  const [eyeOpacity2, setEyeOpacity2] = useState(() => {
    if (passwordRepeat == "") return 0;
    else return 1;
  });
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.AvatarViewStyle}>
        <Avatar.Icon size={200} icon="diabetes" />
      </View>
      <View style={styles.EmailViewStyle}>
        <TextInput
          mode="flat"
          placeholder="E-mail"
          placeholderTextColor={colorPalette.surface}
          left={
            <TextInput.Icon
              name={() => <AwesomeIcon name={"user"} size={20} />}
              disabled={true}
              style={{ opacity: 1.0 }}
            />
          }
          onChangeText={setEmail}
          dense={true}
          underlineColor={colorPalette.primary}
          style={{
            fontSize: 20,
            backgroundColor: colorPalette.textInputBackGround,
          }}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.UsernameViewStyle}>
        <TextInput
          mode="flat"
          placeholder="Όνομα Χρήστη"
          placeholderTextColor={colorPalette.surface}
          left={
            <TextInput.Icon
              name={() => <AwesomeIcon name={"user"} size={20} />}
              disabled={true}
              style={{ opacity: 1.0 }}
            />
          }
          onChangeText={setUsername}
          dense={true}
          underlineColor={colorPalette.primary}
          style={{
            fontSize: 20,
            backgroundColor: colorPalette.textInputBackGround,
          }}
          autoCapitalize="none"
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
              onPress={() => {
                setTextSecurity(!textSecurity);
                Keyboard.dismiss();
              }}
              disabled={Boolean(eyeOpacity) ? false : true}
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
      <View style={styles.PasswordViewStyle}>
        <TextInput
          mode="flat"
          placeholder="Επαλήθευση Κωδικού"
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
                  style={{ opacity: eyeOpacity2 }}
                />
              )}
              onPress={() => {
                setTextSecurity2(!textSecurity2);
                Keyboard.dismiss();
              }}
              disabled={Boolean(eyeOpacity2) ? false : true}
            />
          }
          secureTextEntry={textSecurity2}
          onChangeText={(val) =>
            onChangePassword(val, setPasswordRepeat, setEyeOpacity2)
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
          onPress={() =>
            submitRequest(
              email,
              username,
              password,
              passwordRepeat,
              props.navigation
            )
          }
        >
          ΕΓΓΡΑΦΗ
        </Button>
      </View>
      <View style={styles.TouchableViewStyle}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Log In")}>
          <Text style={styles.RegisterTextStyle}>Έχεις ήδη λογαριασμό?</Text>
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
  },
  AvatarViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 10,
    alignItems: "center",
  },
  EmailViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 20,
    marginHorizontal: 10,
  },
  UsernameViewStyle: {
    borderWidth: 0,
    marginTop: Dimensions.get("window").height / 80,
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

export default RegisterScreen;
