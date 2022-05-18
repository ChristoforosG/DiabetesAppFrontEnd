import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import { useQueryClient } from "react-query";
import { colorPalette } from "../Styling/universalStyles";
import Trie from "../JavascrptClasses/AutoCompleteClass";

const autoSuggest = (
  text,
  autocomplete,
  setText,
  setOptions,
  meals_mapping,
  fromList,
  setFromList,
  setProteins,
  setCarbs,
  setFats
) => {
  autocomplete.complete(text.toLowerCase());
  setFromList({
    a: fromList.b,
    b: false,
  });
  let options = [];
  for (const suggestion of autocomplete.suggestions) {
    options.push(meals_mapping[suggestion]);
  }
  setOptions(options.slice(0, 5));
  setText(text);
  if (fromList.b) {
    // empty proteins, carbs, fats
    setProteins("");
    setCarbs("");
    setFats("");
  }
  return;
};

const pickMealFromList = (
  value,
  setMeal,
  fromList,
  setFromList,
  setOnFocus,
  setProteins,
  setCarbs,
  setFats,
  calories,
  details
) => {
  setMeal(value);
  setFromList({
    a: fromList.b,
    b: true,
  });
  setOnFocus(false);
  // set proteins, carbs, fats according to calories
  if (calories !== "") {
    setProteins(((calories * details[value][0]) / 100).toFixed(2).toString());
    setCarbs(((calories * details[value][1]) / 100).toFixed(2).toString());
    setFats(((calories * details[value][2]) / 100).toFixed(2).toString());
  }
  return;
};

const checkBlur = (setOnFocus, meals) => {
  if (meals === "") {
    setOnFocus(false);
  }
  return;
};

const SearchTextInput = ({
  meal,
  setMeal,
  fromList,
  setFromList,
  calories,
  setProteins,
  setCarbs,
  setFats,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  let autocomplete = new Trie();
  const queryClient = useQueryClient();
  const mealsInfo = queryClient.getQueryData("meals_list");
  const [options, setOptions] = useState(mealsInfo["lowercase"]);
  for (const meal of mealsInfo["lowercase"]) {
    autocomplete.add(meal);
  }
  return (
    <View>
      <View style={styles.Container}>
        <TextInput
          style={{ textAlign: "center", fontSize: 18 }}
          label="Εισαγωγή γεύματος"
          value={meal}
          onChangeText={(text) =>
            autoSuggest(
              text,
              autocomplete,
              setMeal,
              setOptions,
              mealsInfo["mapping"],
              fromList,
              setFromList,
              setProteins,
              setCarbs,
              setFats
            )
          }
          mode="outlined"
          keyboardType="default"
          onFocus={() => setOnFocus(true)}
          onBlur={() => checkBlur(setOnFocus, meal)}
        />
      </View>
      <View style={styles.SearchListView}>
        {onFocus &&
          meal !== "" &&
          options.map((value, key) => {
            return (
              <Menu.Item
                key={key}
                onPress={() =>
                  pickMealFromList(
                    value,
                    setMeal,
                    fromList,
                    setFromList,
                    setOnFocus,
                    setProteins,
                    setCarbs,
                    setFats,
                    calories,
                    mealsInfo["details"]
                  )
                }
                title={value}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: Dimensions.get("window").height / 40,
    marginHorizontal: Dimensions.get("window").width / 10,
    borderWidth: 0,
  },
  SearchListView: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorPalette.placeholder,
    marginHorizontal: Dimensions.get("window").width / 9,
    marginBottom: Dimensions.get("window").height / 40,
    backgroundColor: colorPalette.surface,
  },
});

export default SearchTextInput;
