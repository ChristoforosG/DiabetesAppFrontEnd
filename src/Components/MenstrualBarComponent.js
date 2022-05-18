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

const MenstrualBarComponent = ({ max_days, datum }) => {
  const borderWidth = 0.98 * Dimensions.get("window").width;
  const barBorderWidth = borderWidth * 0.06;
  const barWidthUnit = (borderWidth - 2 * barBorderWidth) / max_days;
  const barHeigth = 20;
  const TitleHeight = 20;
  const borderHeight = 2 * TitleHeight + barHeigth;
  return (
    <Svg height={borderHeight} width={borderWidth} style={{ borderWidth: 0 }}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colorPalette.accent} stopOpacity="1" />
          <Stop offset="1" stopColor={colorPalette.backdrop} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <SvgText
        fill={colorPalette.primary}
        fontSize="16"
        x={barBorderWidth}
        y={TitleHeight}
        fontWeight={0}
      >
        {datum.date}
      </SvgText>
      <Circle
        cx={barBorderWidth + barWidthUnit * datum.cycle_duration}
        cy={barHeigth + TitleHeight}
        r={barHeigth / 2}
        fill={colorPalette.backdrop}
      />
      <Rect
        x={barBorderWidth}
        y={barHeigth / 2 + TitleHeight}
        width={barWidthUnit * datum.cycle_duration}
        height={barHeigth}
        fill={colorPalette.backdrop}
      />
      <Circle
        cx={barBorderWidth}
        cy={barHeigth + TitleHeight}
        r={barHeigth / 2}
        fill={colorPalette.accent}
      />
      <Rect
        x={barBorderWidth}
        y={barHeigth / 2 + TitleHeight}
        width={barWidthUnit * (datum.period_day + 1)}
        height={barHeigth}
        fill="url(#grad)"
      />
      <SvgText
        fill="white"
        fontSize="14"
        x={barBorderWidth + barWidthUnit * (datum.period_day - 1)}
        y={barHeigth + 5 + TitleHeight}
        textAnchor="middle"
        fontWeight={0}
      >
        {Math.round(datum.period_day)}
      </SvgText>
      <SvgText
        fill="white"
        fontSize="14"
        x={barBorderWidth + barWidthUnit * (datum.cycle_duration - 1)}
        y={barHeigth + 5 + TitleHeight}
        textAnchor="middle"
        fontWeight={0}
      >
        {Math.round(datum.cycle_duration)}
      </SvgText>
    </Svg>
  );
};

export default MenstrualBarComponent;
