import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";
import { Text, Appbar, Divider, Button } from "react-native-paper";
import moment from "moment";
import { useQueryClient, useMutation, useQuery } from "react-query";
import instance from "../Axios/mainAxios";
import TextInputComponent from "../Components/TextInputComponent";
import RadioButtonComponent from "../Components/RadioButtonComponent";
import DateTimeInput from "../Components/DateTimeFromCalendarComponent";
import { ScrollView } from "react-native-gesture-handler";

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

const submitRequest = (
  setLoading,
  bloodGlucose,
  glucoseType,
  insulin,
  insulinType,
  carbs,
  dateTime
) => {
  setLoading(true);
  return instance
    .post("/api/data-api/glucose/", {
      glucose_measurement: bloodGlucose,
      glucose_type: glucoseType,
      insulin_dose: insulin,
      insulin_type: insulinType,
      hypoglycemia_carbs: carbs,
      measurement_date_time: dateTime,
    })
    .then((response) => {
      setTimeout(function () {
        setLoading(false);
        return response.status;
        // navigation.goBack();
      }, 1000);
    })
    .catch((error) => {
      throw error.response;
    });
};

const BloodGlucoseIngestionScreen = ({ navigation }) => {
  const [bloodGlucose, setBloodGlucose] = useState("");
  const options = ["Προγευματική", "Μεταγευματική", "Προ ύπνου", "Διόρθωσης"];
  const insulinOptions = ["Προγευματική", "Βασική", "Διόρθωσης"];
  const [glucoseType, setGlucoseType] = useState("None");
  const currentDateTime = new Date();
  const [dateTime, setDateTime] = useState(
    moment(currentDateTime).format("YYYY-MM-DD HH:mm")
  );
  const [loading, setLoading] = useState(false);
  const [insulin, setInsulin] = useState("");
  const [carbs, setCarbs] = useState("");
  const [insulinType, setΙnsulinType] = useState("None");
  const queryClient = useQueryClient();
  const { is_in_insulin_therapy } = queryClient.getQueryData("user_info");
  const mutation = useMutation(
    () =>
      submitRequest(
        setLoading,
        bloodGlucose,
        glucoseType,
        insulin,
        insulinType,
        carbs,
        dateTime
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries("blood_glucose_analytics_data");
        navigation.goBack();
      },
    }
  );

  return (
    <View style={styles.Container}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Γλυκόζη" />
      </Appbar>
      <ScrollView>
        <TextInputComponent
          label="Εισαγωγή Γλυκόζης (mg/dL)"
          value={bloodGlucose}
          setValue={setBloodGlucose}
          mode="outlined"
          keyboardType="numeric"
        />
        <Divider />
        <RadioButtonComponent
          options={options}
          checked={glucoseType}
          setChecked={setGlucoseType}
          title="Τύπος"
        />
        {glucoseType == "Διόρθωσης" &&
          bloodGlucose !== "" &&
          bloodGlucose < 70 && <Divider />}
        {glucoseType == "Διόρθωσης" &&
          bloodGlucose !== "" &&
          bloodGlucose < 70 && (
            <TextInputComponent
              label="Διόρθωση Υπογλυκαιμίας (carbs)"
              value={carbs}
              setValue={setCarbs}
              mode="outlined"
              keyboardType="numeric"
            />
          )}
        {is_in_insulin_therapy && <Divider />}
        {is_in_insulin_therapy && (
          <TextInputComponent
            label="Εισαγωγή Δόσης Ινσουλίνης (U)"
            value={insulin}
            setValue={setInsulin}
            mode="outlined"
            keyboardType="numeric"
          />
        )}
        {is_in_insulin_therapy && <Divider />}
        {is_in_insulin_therapy && (
          <RadioButtonComponent
            options={insulinOptions}
            checked={insulinType}
            setChecked={setΙnsulinType}
            title="Τύπος Ινσουλίνης"
          />
        )}
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
                mutation.mutate(
                  setLoading,
                  bloodGlucose,
                  glucoseType,
                  insulin,
                  insulinType,
                  carbs,
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
});

export default BloodGlucoseIngestionScreen;
