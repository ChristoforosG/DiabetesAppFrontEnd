import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { Text as RPText } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import { colorPalette } from "../../Styling/universalStyles";

const BarStyle = (percent, color, possition) => {
  if (possition == 1) {
    return {
      borderWidth: 0,
      justifyContent: "center",
      backgroundColor: color,
      flex: percent,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    };
  }
  if (possition == 2) {
    return {
      borderWidth: 0,
      justifyContent: "center",
      backgroundColor: color,
      flex: percent,
    };
  }
  if (possition == 3) {
    return {
      borderWidth: 0,
      justifyContent: "center",
      backgroundColor: color,
      flex: percent,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    };
  }
};

const RowPercentageChart = ({ percentages }) => {
  const button1Change = (val, index2, setIndex, setPerc) => {
    setIndex(val);
    setPerc(percentages[duration[index2]][type[val]]);
  };
  const button2Change = (val, index, setIndex2, setPerc) => {
    setIndex2(val);
    setPerc(percentages[duration[val]][type[index]]);
  };
  const [index, setIndex] = useState(0);
  const buttons = ["Προγευματική", "Μεταγευματική", "Προ ύπνου"];
  const duration = ["week", "fifteen", "month"];
  const type = ["pre", "post", "sleep"];
  const [index2, setIndex2] = useState(0);
  const buttons2 = ["Εβδομαδιαία", "15 ημέρες", "Μηνιαία"];
  const [perc, setPerc] = useState(percentages["week"]["pre"]);
  console.log(perc[1]);
  return (
    <View style={styles.Container}>
      <View>
        <ButtonGroup
          onPress={(val) => button1Change(val, index2, setIndex, setPerc)}
          selectedIndex={index}
          buttons={buttons}
          containerStyle={{ height: 20 }}
        />
      </View>
      <View>
        <ButtonGroup
          onPress={(val) => button2Change(val, index, setIndex2, setPerc)}
          selectedIndex={index2}
          buttons={buttons2}
          containerStyle={{ height: 20 }}
          delayPress={0}
        />
      </View>
      {perc[0] == 0 && perc[1] == 0 && perc[2] == 0 ? (
        <View style={styles.BarContainer}>
          <View style={BarStyle(0.25, colorPalette.surface, 1)}></View>
          <View style={BarStyle(0.5, colorPalette.surface, 2)}>
            <RPText style={styles.TextStyle}>Έλλειψη Δεδομένων</RPText>
          </View>
          <View style={BarStyle(0.25, colorPalette.surface, 3)}></View>
        </View>
      ) : (
        <View style={styles.BarContainer}>
          <View style={BarStyle(perc[0], "#FFFE00", 1)}>
            <Text style={styles.TextStyle}>{(100 * perc[0]).toFixed(2)}%</Text>
          </View>
          <View style={BarStyle(perc[1], "#00FF0E", 2)}>
            <Text style={styles.TextStyle}>{(100 * perc[1]).toFixed(2)}%</Text>
          </View>
          <View style={BarStyle(perc[2], "#FF0000", 3)}>
            <Text style={styles.TextStyle}>{(100 * perc[2]).toFixed(2)}%</Text>
          </View>
        </View>
      )}
      <View
        style={{ flexDirection: "row", alignItems: "stretch", borderWidth: 0 }}
      >
        <View style={styles.ViewStyle1}>
          <Icon name="minus" size={40} color="#FFFE00" />
          <Text>Χαμηλή</Text>
        </View>
        <View style={styles.ViewStyle1}>
          <Icon name="minus" size={40} color="#00FF0E" />
          <Text>Κανονική</Text>
        </View>
        <View style={styles.ViewStyle1}>
          <Icon name="minus" size={40} color="#FF0000" />
          <Text>Υψηλή</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    marginHorizontal: 20,
  },
  BarContainer: {
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "stretch",
    height: 50,
  },
  ViewStyle1: {
    borderWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewStyle2: {},
  ViewStyle3: {},
  BarStyle1: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: "#FFFE00",
    flex: 23,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  BarStyle2: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: "#00FF0E",
    flex: 61,
  },
  BarStyle3: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: "#FF0000",
    flex: 16,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  TextStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  TextStyle2: {
    textAlign: "center",
    fontSize: 12,
    flex: 1,
  },
});

export default RowPercentageChart;
