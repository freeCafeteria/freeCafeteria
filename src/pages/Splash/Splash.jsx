import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import useStore from "../../store";

const Splash = ({ navigation }) => {
  const onboardingCompleted = useStore((state) => state.onboardingCompleted);
  const fadeAnim = new Animated.Value(1);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fadeOut();
      setTimeout(() => {
        navigation.replace(onboardingCompleted ? "MainTab" : "OnBoarding");
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation, onboardingCompleted, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.fullScreenImage}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  fullScreenImage: {
    width: "100%",
    height: "50%",
  },
});

export default Splash;
