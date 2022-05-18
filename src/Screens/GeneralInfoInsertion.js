import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Appbar,
  Button,
  TextInput,
  Menu,
  RadioButton,
  Switch,
  Divider,
  Avatar,
} from "react-native-paper";
import { colorPalette } from "../Styling/universalStyles";
import { days, months, years } from "../Components/DateOfBirthArrays";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../Axios/mainAxios";

const STORAGE_KEY = "@user_info";

const proceedDate = (
  val,
  setPrimary,
  close,
  second,
  third,
  gender,
  firstname,
  setSubmitButton
) => {
  setPrimary(val);
  close();
  if (second == "") {
    return;
  }
  if (third == "") {
    return;
  }
  if (gender == "none") {
    return;
  }
  if (firstname == "") {
    return;
  }
  setSubmitButton({
    disabled: false,
    color: "white",
    backgroundColor: colorPalette.primary,
  });
  return;
};

const proceedGender = (
  val,
  setGender,
  day,
  month,
  year,
  firstname,
  setSubmitButton
) => {
  setGender(val);
  if (day == "") {
    return;
  }
  if (month == "") {
    return;
  }
  if (year == "") {
    return;
  }
  if (firstname == "") {
    return;
  }
  setSubmitButton({
    disabled: false,
    color: "white",
    backgroundColor: colorPalette.primary,
  });
  return;
};

const proceedName = (
  val,
  setName,
  day,
  month,
  year,
  gender,
  setSubmitButton
) => {
  setName(val);
  if (val == "") {
    setSubmitButton({
      disabled: true,
      color: colorPalette.disabledComponent,
      backgroundColor: colorPalette.textInputBackGround,
    });
    return;
  }
  if (day == "") {
    return;
  }
  if (month == "") {
    return;
  }
  if (year == "") {
    return;
  }
  if (gender == "none") {
    return;
  }
  setSubmitButton({
    disabled: false,
    color: "white",
    backgroundColor: colorPalette.primary,
  });
  return;
};

const proceedToHome = (
  firstname,
  day,
  month,
  year,
  gender,
  insulin,
  navigation,
  username
) => {
  return instance
    .post("/api/user/submitPersonalUserInfo/", {
      user_name: username,
      first_name: firstname,
      date_of_birth: year + "-" + month + "-" + day,
      gender: gender,
      is_in_insulin: insulin,
    })
    .then(function (response) {
      navigation.navigate("Drawer Navigator", { user: username });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

const GeneralInfoInsertion = (props) => {
  const [submitButton, setSubmitButton] = useState({
    disabled: true,
    color: colorPalette.disabledComponent,
    backgroundColor: colorPalette.textInputBackGround,
  });

  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("none");
  const [insulin, setInsulin] = useState(false);

  const [visibleDay, setVisibleDay] = React.useState(false);
  const openMenuDay = () => setVisibleDay(true);
  const closeMenuDay = () => setVisibleDay(false);

  const [visibleMonth, setVisibleMonth] = React.useState(false);
  const openMenuMonth = () => setVisibleMonth(true);
  const closeMenuMonth = () => setVisibleMonth(false);

  const [visibleYear, setVisibleYear] = React.useState(false);
  const openMenuYear = () => setVisibleYear(true);
  const closeMenuYear = () => setVisibleYear(false);
  return (
    <View style={styles.Container}>
      <Appbar>
        <Appbar.BackAction
          onPress={() => props.navigation.navigate("Log In")}
        />
        <Appbar.Content title="Welcome" />
      </Appbar>
      <View style={styles.FirstnameStyle}>
        <TextInput
          mode="flat"
          label="Όνομα"
          placeholderTextColor={colorPalette.surface}
          onChangeText={(val) =>
            proceedName(
              val,
              setFirstname,
              day,
              month,
              year,
              gender,
              setSubmitButton
            )
          }
          dense={true}
          underlineColor={colorPalette.primary}
          style={{ fontSize: 20, backgroundColor: colorPalette.background }}
          autoCapitalize="none"
        />
      </View>
      <Divider />
      <View style={{ flex: 1, borderWidth: 0 }}>
        <Text style={{ fontSize: 24 }}>Ημερομηνία Γέννησης: </Text>
        <View style={styles.DateOfBirthView}>
          <View style={styles.DayView}>
            <Menu
              visible={visibleDay}
              onDismiss={closeMenuDay}
              anchor={
                <Button mode="contained" onPress={openMenuDay}>
                  {day == "" ? "DAY" : day.toString()}
                </Button>
              }
            >
              {days.map((day, key) => {
                return (
                  <Menu.Item
                    key={key}
                    onPress={() =>
                      proceedDate(
                        day["value"],
                        setDay,
                        closeMenuDay,
                        month,
                        year,
                        gender,
                        firstname,
                        setSubmitButton
                      )
                    }
                    title={day["value"]}
                  />
                );
              })}
            </Menu>
          </View>
          <View style={styles.MonthView}>
            <Menu
              visible={visibleMonth}
              onDismiss={closeMenuMonth}
              anchor={
                <Button mode="contained" onPress={openMenuMonth}>
                  {month == "" ? "MONTH" : month.toString()}
                </Button>
              }
            >
              {months.map((month, key) => {
                return (
                  <Menu.Item
                    key={key}
                    onPress={() =>
                      proceedDate(
                        month["value"],
                        setMonth,
                        closeMenuMonth,
                        day,
                        year,
                        gender,
                        firstname,
                        setSubmitButton
                      )
                    }
                    title={month["value"]}
                  />
                );
              })}
            </Menu>
          </View>
          <View style={styles.YearView}>
            <Menu
              visible={visibleYear}
              onDismiss={closeMenuYear}
              anchor={
                <Button mode="contained" onPress={openMenuYear}>
                  {year == "" ? "YEAR" : year.toString()}
                </Button>
              }
            >
              {years.map((year, key) => {
                return (
                  <Menu.Item
                    key={key}
                    onPress={() =>
                      proceedDate(
                        year["value"],
                        setYear,
                        closeMenuYear,
                        day,
                        month,
                        gender,
                        firstname,
                        setSubmitButton
                      )
                    }
                    title={year["value"]}
                  />
                );
              })}
            </Menu>
          </View>
        </View>
      </View>
      <Divider />
      <View style={styles.GenderStyles}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 24 }}>Φύλο: </Text>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <RadioButton
            value="female"
            status={gender === "female" ? "checked" : "unchecked"}
            onPress={() =>
              proceedGender(
                "female",
                setGender,
                day,
                month,
                year,
                firstname,
                setSubmitButton
              )
            }
          />
          <Text style={{ fontSize: 12 }}>Θήλυ </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <RadioButton
            value="male"
            status={gender === "male" ? "checked" : "unchecked"}
            onPress={() =>
              proceedGender(
                "male",
                setGender,
                day,
                month,
                year,
                firstname,
                setSubmitButton
              )
            }
          />
          <Text style={{ fontSize: 12 }}> Άρεν </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <Divider />
      <View style={styles.InsulinView}>
        <View style={{ flex: 5 }}>
          <Text style={{ fontSize: 24 }}>Ινσουλινοθεραπεία: </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Switch value={insulin} onValueChange={() => setInsulin(!insulin)} />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <Divider />
      <View style={styles.SubmitButtonView}>
        <TouchableOpacity
          style={styles.SubmitButtonTouch}
          disabled={submitButton.disabled}
          onPress={() =>
            proceedToHome(
              firstname,
              day,
              month,
              year,
              gender,
              insulin,
              props.navigation,
              props.route.params.user
            )
          }
        >
          <Avatar.Icon
            style={{ backgroundColor: submitButton.backgroundColor }}
            size={48}
            icon={() => (
              <Feather
                name={"arrow-right-circle"}
                size={34}
                style={{
                  borderWidth: 0,
                  color: submitButton.color,
                  alignSelf: "center",
                }}
              />
            )}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colorPalette.background,
  },
  FirstnameStyle: {
    flex: 1,
    borderWidth: 0,
  },
  DateOfBirthView: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    borderWidth: 0,
    marginTop: 20,
  },
  DayView: {
    flex: 1,
    alignItems: "center",
  },
  MonthView: {
    flex: 1,
    alignItems: "center",
  },
  YearView: {
    flex: 1,
    alignItems: "center",
  },
  GenderStyles: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 0,
  },
  InsulinView: {
    flex: 1,
    borderWidth: 0,
    flexDirection: "row",
  },
  SubmitButtonView: {
    flex: 1,
  },
  SubmitButtonTouch: {
    borderWidth: 0,
    alignItems: "center",
    marginHorizontal: Dimensions.get("window").width / 2.5,
    marginTop: 20,
  },
});

export default GeneralInfoInsertion;
