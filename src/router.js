import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



import community from "./pages/Community/Community";
import CafeteriaDetail from "./pages/Community/CafeteriaDetail";

import Settings from "./pages/Settings/Settings";

import Splash from "./pages/Splash/Splash";
import OnBoarding from "./pages/Splash/OnBoarding";

import MapScreen from "./pages/Map/MapScreen";
import MapDetail from "./pages/Map/Mapdetail";
import { Icon } from "./components/Icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Map = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName="MapScreen">
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="MapDetail" component={MapDetail} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch(route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '지도':
              iconName = focused ? 'map' : 'map-outline';
              break;
              case '급식소 정보':
                iconName = focused ? 'home' : 'home-outline';
              break;
            case '나':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle-outline'; // 기본값
          }

          const iconColor = focused ? '#64c2eb' : 'gray';

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
        headerShown: false,
      })}
    >
     
      <Tab.Screen name="지도" component={Map} />
      <Tab.Screen name="급식소 정보" component={community} />
      <Tab.Screen name="나" component={Settings} />
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
