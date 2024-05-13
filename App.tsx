import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import Router from "./src/router";

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); // 스플래시 활성화 시간
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
