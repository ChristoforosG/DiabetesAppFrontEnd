import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Appbar, Divider, Button, TextInput } from "react-native-paper";
import moment from "moment";
import { useQueryClient } from "react-query";
import TextInputComponent from "../Components/TextInputComponent";
import RadioButtonComponent from "../Components/RadioButtonComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import instance from "../Axios/mainAxios";
import SearchTextInput from "../Components/SearchTextInputComponent";

const submitRequest = (
  setLoading,
  navigation,
  meals,
  mealType,
  calories,
  fats,
  carbs,
  proteins,
  info,
  dateTime
) => {
  return instance
    .post("/api/data-api/meals/", {
      meal_name: meals,
      meal_type: mealType,
      calories: calories,
      fats: fats,
      carbs: carbs,
      proteins: proteins,
      info: info,
      measurement_date_time: dateTime,
    })
    .then((response) => {
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        //console.log(response.data);
        navigation.goBack();
      }, 600);
    });
};

const onChangeCalories = (
  calories,
  setCalories,
  setProteins,
  setCarbs,
  setFats,
  fromList,
  details
) => {
  setCalories(calories);
  if (calories === "") {
    setProteins("");
    setCarbs("");
    setFats("");
  }
  if (fromList.b) {
    setProteins(((calories * details[0]) / 100).toFixed(2).toString());
    setCarbs(((calories * details[1]) / 100).toFixed(2).toString());
    setFats(((calories * details[2]) / 100).toFixed(2).toString());
  }
};

const MealsIngestionScreen = (props) => {
  const options = [
    "Πρωινό",
    "Δεκατιανό",
    "Μεσημεριανό",
    "Απογευματινό",
    "Βραδινό",
  ];
  const [mealType, setMealType] = useState("None");
  const [fromList, setFromList] = useState({ a: false, b: false });
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [proteins, setProteins] = useState("");
  const [info, setInfo] = useState("");
  const currentDateTime = new Date();
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mealsInfo = queryClient.getQueryData("meals_list");
  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Γεύμα" />
      </Appbar>
      <ScrollView>
        <SearchTextInput
          meal={meal}
          setMeal={setMeal}
          fromList={fromList}
          setFromList={setFromList}
          calories={calories}
          setProteins={setProteins}
          setCarbs={setCarbs}
          setFats={setFats}
        />
        <Divider />
        <RadioButtonComponent
          title="Κατηγορία Γεύματος"
          options={options}
          checked={mealType}
          setChecked={setMealType}
        />
        <Divider />
        <TextInputComponent
          label="Εισαγωγή γραμμαρίων"
          value={calories}
          setValue={(value) =>
            onChangeCalories(
              value,
              setCalories,
              setProteins,
              setCarbs,
              setFats,
              fromList,
              mealsInfo["details"][meal]
            )
          }
          mode="outlined"
          keyboardType="numeric"
        />
        <Divider />
        <TextInputComponent
          label="Εισαγωγή Λιπών"
          value={fats}
          setValue={setFats}
          mode="outlined"
          keyboardType="numeric"
        />
        <Divider />
        <TextInputComponent
          label="Εισαγωγή Υδατανθράκων"
          value={carbs}
          setValue={setCarbs}
          mode="outlined"
          keyboardType="numeric"
        />
        <Divider />
        <TextInputComponent
          label="Εισαγωγή Πρωτεϊνών"
          value={proteins}
          setValue={setProteins}
          mode="outlined"
          keyboardType="numeric"
        />
        <Divider />
        <View style={styles.InfoView}>
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
        <DateTimeInput
          field_name="Ημερομηνία/Ώρα"
          returnDateTime={setDateTime}
        />
        <Divider />
        <View style={styles.SubmitButtonViewStyle}>
          <View style={styles.SubmitButtonStyle}>
            <Button
              mode="contained"
              loading={loading}
              onPress={() =>
                submitRequest(
                  setLoading,
                  props.navigation,
                  meal,
                  mealType,
                  calories,
                  fats,
                  carbs,
                  proteins,
                  info,
                  dateTime
                )
              }
            >
              {loading ? "LOADING" : "SUBMIT"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  SubmitButtonViewStyle: {
    borderWidth: 0,
  },
  SubmitButtonStyle: {
    marginVertical: Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 3.3,
  },
  InfoView: {
    marginVertical: Dimensions.get("window").height / 40,
    marginHorizontal: Dimensions.get("window").width / 10,
    borderWidth: 0,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default MealsIngestionScreen;
