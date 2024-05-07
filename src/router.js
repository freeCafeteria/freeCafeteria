import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./pages/Home/Home";

import community from "./pages/Community/Community";
import CafeteriaDetail from "./pages/Community/CafeteriaDetail";

import Settings from "./pages/Settings/Settings";

import Splash from "./pages/Splash/Splash";
import OnBoarding from "./pages/Splash/OnBoarding";

import MapScreen from "./pages/Map/MapScreen";
import MapDetail from "./pages/Map/Mapdetail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Map = () => {
  return (
    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="MapDetail" component={MapDetail} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="community" component={community} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="CafeteriaDetail" component={CafeteriaDetail} />
    </Stack.Navigator>
  );
};

export default Router;
