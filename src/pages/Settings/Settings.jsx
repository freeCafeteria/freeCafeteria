import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useStore from "../../store";

import { locations, subLocations } from "../Splash/data/locations";

const Settings = () => {
  const {
    age,
    location,
    subLocation,
    selectedCategories,
    setAge,
    setLocation,
    setSubLocation,
    toggleCategory,
  } = useStore((state) => ({
    age: state.age,
    location: state.location,
    subLocation: state.subLocation,
    selectedCategories: state.selectedCategories,
    setAge: state.setAge,
    setLocation: state.setLocation,
    setSubLocation: state.setSubLocation,
    toggleCategory: state.toggleCategory,
  }));

  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>설정</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>나이</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age ? age.toString() : ""}
          placeholder="나이를 입력해주세요"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>거주지</Text>
        <RNPickerSelect
          onValueChange={setLocation}
          items={locations.map((loc) => ({
            label: loc.label,
            value: loc.value,
          }))}
          value={location}
          placeholder={{ label: "거주지를 선택해주세요", value: null }}
          style={pickerSelectStyles}
        />
      </View>
      {location && (
        <View style={styles.section}>
          <Text style={styles.label}>세부 거주지</Text>
          <RNPickerSelect
            onValueChange={setSubLocation}
            items={subLocations[location].map((subLoc) => ({
              label: subLoc,
              value: subLoc,
            }))}
            value={subLocation}
            placeholder={{ label: "세부 거주지를 선택해주세요", value: null }}
            style={pickerSelectStyles}
          />
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.label}>키워드:</Text>
        {Object.keys(selectedCategories).map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedCategories[category] ? styles.buttonSelected : null,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>저장되었습니다</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  titleContainer: {
    paddingTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: "#cce5ff",
    borderColor: "#66b0ff",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#64c2eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  buttonClose: {
    backgroundColor: "#64c2eb",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
};

export default Settings;
