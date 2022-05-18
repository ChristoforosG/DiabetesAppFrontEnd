import React, { useRef, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, YellowBox } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./src/Styling/universalStyles";
import HomeScreen from "./src/Screens/HomeScreen";
import LogInScreen from "./src/Screens/LogInScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SettingsScreen from "./src/Screens/SettingsScreen";
import AboutScreen from "./src/Screens/AboutScreen";
import CustomDrawerComponent from "./src/Components/CustomDrawerComponent";
import BloodGlucoseIngestionScreen from "./src/Screens/BloodGlucoseIngestionScreen";
import BloodPressureIngestionScreen from "./src/Screens/BloodPressureIngestionScreen";
import MealsIngestionScreen from "./src/Screens/MealsIngestionScreen";
import ActivityIngestionScreen from "./src/Screens/ActivityIngestionScreen";
import WeightIngestionScreen from "./src/Screens/WeightIngestionScreen";
import GeneralInfoInsertion from "./src/Screens/GeneralInfoInsertion";
import MenstrualCycleScreen from "./src/Screens/MenstrualCycleScreen";
import AnalyticsScreen from "./src/Screens/AnalyticsScreen";
import CalendarScreen from "./src/Screens/CalendarScreen";
import NewReminderScreen from "./src/Screens/NewReminderScreen";
import IllnestIngestionScreen from "./src/Screens/IllnessIngestionScreen";
import MedicationIngestionScreen from "./src/Screens/MedicationIngestionScreen";
import MenstrualHistoryScreen from "./src/Screens/MenstrualHistoryScreen";
import InsulinIngestionScreen from "./src/Screens/InsulinIngestionScreen";
import * as Notifications from "expo-notifications";

console.disableYellowBox = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const LoginNav = createStackNavigator();
const DrawerNav = createDrawerNavigator();
const IngestionNav = createStackNavigator();
const CalendarNav = createStackNavigator();
const MenstrualCycleNav = createStackNavigator();

const MenstrualCycleStack = () => {
  return (
    <MenstrualCycleNav.Navigator
      initialRouteName="MenstrualCycle"
      headerMode="none"
    >
      <CalendarNav.Screen
        name="MenstrualCycle"
        component={MenstrualCycleScreen}
      />
      <CalendarNav.Screen
        name="MenstrualHistory"
        component={MenstrualHistoryScreen}
      />
    </MenstrualCycleNav.Navigator>
  );
};

const CalendarStack = () => {
  return (
    <CalendarNav.Navigator initialRouteName="Calendar" headerMode="none">
      <CalendarNav.Screen name="Calendar" component={CalendarScreen} />
      <CalendarNav.Screen name="Reminder" component={NewReminderScreen} />
    </CalendarNav.Navigator>
  );
};

const DrawerScreen = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName="Αρχική"
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <DrawerNav.Screen name="Αρχική" component={DataIngestionStack} />
      <DrawerNav.Screen name="Αναλύσεις" component={AnalyticsScreen} />
      <DrawerNav.Screen name="Ημερολόγιο" component={CalendarStack} />
      <DrawerNav.Screen name="Ρυθμίσεις" component={SettingsScreen} />
      <DrawerNav.Screen name="Σχετικά με Εμάς" component={AboutScreen} />
    </DrawerNav.Navigator>
  );
};
const DataIngestionStack = () => {
  return (
    <IngestionNav.Navigator initialRoutName="Home Stack" headerMode="none">
      <IngestionNav.Screen name="Home Stack" component={HomeScreen} />
      <IngestionNav.Screen
        name="BloodGlucoseIngestion"
        component={BloodGlucoseIngestionScreen}
      />
      <IngestionNav.Screen
        name="BloodPressureIngestion"
        component={BloodPressureIngestionScreen}
      />
      <IngestionNav.Screen
        name="MealsIngestion"
        component={MealsIngestionScreen}
      />
      <IngestionNav.Screen
        name="ActivityIngestion"
        component={ActivityIngestionScreen}
      />
      <IngestionNav.Screen
        name="WeightIngestion"
        component={WeightIngestionScreen}
      />
      <IngestionNav.Screen
        name="MenstrualCycle"
        component={MenstrualCycleStack}
      />
      <IngestionNav.Screen
        name="IllnessIngestion"
        component={IllnestIngestionScreen}
      />
      <IngestionNav.Screen
        name="InsulinIngestion"
        component={InsulinIngestionScreen}
      />
      <IngestionNav.Screen
        name="MedicationIngestion"
        component={MedicationIngestionScreen}
      />
    </IngestionNav.Navigator>
  );
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <LoginNav.Navigator initialRouteName="Log In" headerMode="none">
            <LoginNav.Screen name="Log In" component={LogInScreen} />
            <LoginNav.Screen name="Register" component={RegisterScreen} />
            <LoginNav.Screen name="Drawer Navigator" component={DrawerScreen} />
            <LoginNav.Screen
              name="General Info"
              component={GeneralInfoInsertion}
            />
          </LoginNav.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
