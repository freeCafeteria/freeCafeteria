import React, { useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

const ToggleButton = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onToggle(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#e0e0e0", true: "#a6dcef" }}
        thumbColor={isEnabled ? "#64c2eb" : "#ffffff"}
        ios_backgroundColor="#e0e0e0"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});

export default ToggleButton;
