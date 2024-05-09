import React, { useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

const ToggleButton = ({ toggle, setToggle }) => {
  const toggleSwitch = () => {
    setToggle(!toggle);
  };

  return (
    <Switch
      trackColor={{ false: "#e0e0e0", true: "#a6dcef" }}
      thumbColor={toggle ? "#64c2eb" : "#ffffff"}
      ios_backgroundColor="#e0e0e0"
      onValueChange={toggleSwitch}
      value={toggle}
    />
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

export default React.memo(ToggleButton);
