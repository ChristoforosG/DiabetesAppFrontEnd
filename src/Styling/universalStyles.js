import { DefaultTheme } from "react-native-paper";
export const theme = {
  ...DefaultTheme,
  roundness: 2,
  mode: "exact",
  colors: {
    ...DefaultTheme.colors,
    primary: "#169DE3",
    accent: "#CC2020",
    background: "#B9D8E8",
    text: "#169DE3",
    placeholder: "#169DE3",
    backdrop: "#B9D8E8",
    surface: "#EFF7FB",
  },
  fonts: "light",
};

export const colorPalette = {
  primary: "#169DE3",
  primaryFaded: "#94C9E5",
  accent: "#CC2020",
  accentFaded: "#EEA9A9",
  background: "#B9D8E8",
  text: "#169DE3",
  placeholder: "#169DE3",
  backdrop: "#B9D8E8",
  surface: "#EFF7FB",
  textInputBackGround: "#C4D1D7",
  disabledComponent: "#E6EEF2",
};
