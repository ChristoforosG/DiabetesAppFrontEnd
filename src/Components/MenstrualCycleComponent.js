import React from "react";
import { View, StyleSheet } from "react-native";
import { Text as SimpleText } from "react-native-paper";
import Svg, { G, Circle, Text } from "react-native-svg";
import Icon from "react-native-vector-icons/Entypo";
import { colorPalette } from "../Styling/universalStyles";

const calculateDates = (menstrual_cycle_info) => {
  const currentDate = new Date();

  if (Object.keys(menstrual_cycle_info).length === 0) {
    const date =
      currentDate.getDate().toString() +
      "/" +
      (currentDate.getMonth() + 1).toString();
    let fertilityDate = new Date();
    fertilityDate.setDate(currentDate.getDate() + 13);
    const fertDate =
      fertilityDate.getDate().toString() +
      "/" +
      (fertilityDate.getMonth() + 1).toString();
    return [date, fertDate];
  }

  return [
    menstrual_cycle_info.cycle_start_date.substring(5, 7) +
      "/" +
      menstrual_cycle_info.cycle_start_date.substring(8, 10),
    menstrual_cycle_info.fertility_start_date.substring(5, 7) +
      "/" +
      menstrual_cycle_info.fertility_start_date.substring(8, 10),
  ];
};

const MenstrualCycleComponent = (props) => {
  const borderDim = 400;
  const extraSpace = borderDim / 40;
  const thickness = borderDim / 8;
  const radius = borderDim / 2 - thickness / 2 - extraSpace;
  const circleOutline = {
    thickness: thickness,
    radius: radius,
    center: borderDim / 2,
    perimeter: 2 * Math.PI * radius,
  };
  const circlePeriod = {};
  const circleFertile = {};
  const smallCircle = {
    radius: circleOutline["thickness"] / 16,
    centerDist: radius,
  };
  const dTheta = 0.2244;
  var dotsList = [];
  for (var i = 0; i < 28; i++) {
    dotsList.push({
      theta: i * dTheta,
      color: colorPalette.backdrop,
    });
  }
  const [date, fertDate] = calculateDates(props.menstrual_cycle_info);
  if (props.start) {
    return (
      <View style={{ borderWidth: 0, alignItems: "center" }}>
        <Svg height={borderDim} width={borderDim} style={{ borderWidth: 0 }}>
          <G
            rotation="180"
            origin={
              circleOutline["radius"] +
              circleOutline["thickness"] / 2 +
              extraSpace
            }
          >
            <Circle
              cx={circleOutline["center"]}
              cy={circleOutline["center"]}
              r={circleOutline["radius"]}
              stroke={colorPalette.disabledComponent}
              strokeWidth={circleOutline["thickness"]}
            />

            <G
              rotation="90"
              origin={
                circleOutline["radius"] +
                circleOutline["thickness"] / 2 +
                extraSpace
              }
            >
              <Circle
                cx={circleOutline["center"]}
                cy={circleOutline["center"]}
                r={circleOutline["radius"]}
                stroke={colorPalette.accent}
                strokeWidth={circleOutline["thickness"]}
                strokeDasharray={[
                  (4 * circleOutline["perimeter"]) / 28,
                  circleOutline["perimeter"] -
                    (4 * circleOutline["perimeter"]) / 28,
                ]}
              />
            </G>
            <Circle
              cx={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.cos(dotsList[21]["theta"])
              }
              cy={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.sin(dotsList[21]["theta"])
              }
              r={circleOutline["thickness"] / 2}
              fill={colorPalette.accentFaded}
            />

            <Circle
              cx={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.cos(dotsList[25]["theta"])
              }
              cy={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.sin(dotsList[25]["theta"])
              }
              r={circleOutline["thickness"] / 2}
              fill={colorPalette.accent}
            />

            <G
              rotation="257.1428"
              origin={
                circleOutline["radius"] +
                circleOutline["thickness"] / 2 +
                extraSpace
              }
            >
              <Circle
                cx={circleOutline["center"]}
                cy={circleOutline["center"]}
                r={circleOutline["radius"]}
                stroke={colorPalette.primary}
                strokeWidth={circleOutline["thickness"]}
                strokeDasharray={[
                  (9 * circleOutline["perimeter"]) / 28,
                  circleOutline["perimeter"] -
                    (9 * circleOutline["perimeter"]) / 28,
                ]}
              />
            </G>
            <Circle
              cx={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.cos(dotsList[6]["theta"])
              }
              cy={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.sin(dotsList[6]["theta"])
              }
              r={circleOutline["thickness"] / 2}
              fill={colorPalette.primaryFaded}
            />
            <Circle
              cx={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.cos(dotsList[15]["theta"])
              }
              cy={
                circleOutline["center"] -
                smallCircle["centerDist"] * Math.sin(dotsList[15]["theta"])
              }
              r={circleOutline["thickness"] / 2}
              fill={colorPalette.primary}
            />
            {dotsList.map((dot, key) => {
              return (
                <Circle
                  key={key}
                  cx={
                    circleOutline["center"] -
                    smallCircle["centerDist"] * Math.cos(dot["theta"])
                  }
                  cy={
                    circleOutline["center"] -
                    smallCircle["centerDist"] * Math.sin(dot["theta"])
                  }
                  r={smallCircle["radius"]}
                  fill={dot["color"]}
                />
              );
            })}
          </G>

          <Text
            fill="white"
            stroke="white"
            fontSize="14"
            x={
              circleOutline["center"] -
              smallCircle["centerDist"] * Math.cos(dotsList[7]["theta"])
            }
            y={
              circleOutline["center"] -
              smallCircle["centerDist"] * Math.sin(dotsList[7]["theta"]) -
              circleOutline["thickness"] / 5
            }
            textAnchor="middle"
          >
            {date}
          </Text>

          <Text
            fill="white"
            stroke="white"
            fontSize="14"
            x={
              circleOutline["center"] -
              smallCircle["centerDist"] * Math.cos(dotsList[20]["theta"])
            }
            y={
              circleOutline["center"] -
              smallCircle["centerDist"] * Math.sin(dotsList[20]["theta"]) -
              circleOutline["thickness"] / 5
            }
            textAnchor="middle"
          >
            {fertDate}
          </Text>
        </Svg>

        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            borderWidth: 0,
          }}
        >
          <View style={styles.ViewStyle1}>
            <Icon name="minus" size={40} color={colorPalette.accent} />
            <SimpleText style={{ color: colorPalette.accent }}>
              Φάση Εμμηνορρυσίας
            </SimpleText>
          </View>
          <View style={styles.ViewStyle1}>
            <Icon name="minus" size={40} color={colorPalette.primary} />
            <SimpleText>Φάση Γονιμότητας</SimpleText>
          </View>
        </View>
      </View>
    );
  }
  if (!props.start) {
    return (
      <View style={{ borderWidth: 0, alignItems: "center" }}>
        <Svg height={borderDim} width={borderDim} style={{ borderWidth: 0 }}>
          <G
            rotation="180"
            origin={
              circleOutline["radius"] +
              circleOutline["thickness"] / 2 +
              extraSpace
            }
          >
            <Circle
              cx={circleOutline["center"]}
              cy={circleOutline["center"]}
              r={circleOutline["radius"]}
              stroke={colorPalette.disabledComponent}
              strokeWidth={circleOutline["thickness"]}
            />
            {dotsList.map((dot, key) => {
              return (
                <Circle
                  key={key}
                  cx={
                    circleOutline["center"] -
                    smallCircle["centerDist"] * Math.cos(dot["theta"])
                  }
                  cy={
                    circleOutline["center"] -
                    smallCircle["centerDist"] * Math.sin(dot["theta"])
                  }
                  r={smallCircle["radius"]}
                  fill={dot["color"]}
                />
              );
            })}
          </G>
        </Svg>
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            borderWidth: 0,
          }}
        >
          <View style={styles.ViewStyle1}>
            <Icon name="minus" size={40} color={colorPalette.surface} />
          </View>
          <View style={styles.ViewStyle1}>
            <Icon name="minus" size={40} color={colorPalette.surface} />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ViewStyle1: {
    borderWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MenstrualCycleComponent;
