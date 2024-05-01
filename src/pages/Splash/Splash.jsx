import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Splash = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("OnBoarding");
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.fullScreenImage}
      />
    </View>
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
