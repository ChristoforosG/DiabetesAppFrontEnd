import React from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Svg, {
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { colorPalette } from "../Styling/universalStyles";
import MenstrualBarComponent from "./MenstrualBarComponent";

const MenstrualAnalyticsComponent = ({ max_days, cycle_info_list }) => {
  const data = cycle_info_list;
  return (
    <View style={{ borderWidth: 0, alignItems: "center" }}>
      {data.map((datum, key) => {
        return (
          <MenstrualBarComponent key={key} max_days={max_days} datum={datum} />
        );
      })}
    </View>
  );
};

export default MenstrualAnalyticsComponent;
