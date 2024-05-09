import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useStore from "../../store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { locations, subLocations } from "../Splash/data/locations";

const favoriteIcon = require("../../assets/favorite.png");
const favoriteFilledIcon = require("../../assets/favorite_filled.png");

const Settings = () => {
  const {
    age,
    location,
    subLocation,
    selectedCategories,
    favorites,
    setAge,
    setLocation,
    setSubLocation,
    toggleCategory,
    toggleFavorite,
  } = useStore((state) => ({
    age: state.age,
    location: state.location,
    subLocation: state.subLocation,
    selectedCategories: state.selectedCategories,
    favorites: state.favorites,
    setAge: state.setAge,
    setLocation: state.setLocation,
    setSubLocation: state.setSubLocation,
    toggleCategory: state.toggleCategory,
    toggleFavorite: state.toggleFavorite,
  }));

  const [modalVisible, setModalVisible] = useState(false);
  const [cafeterias, setCafeterias] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCafeterias();
  }, []);

  const fetchCafeterias = async () => {
    const url =
      Platform.OS === "android"
        ? "http://10.0.2.2:3000"
        : "http://localhost:3000";
    try {
      const response = await axios.get(`${url}/allCafeterias`);
      setCafeterias(response.data);
    } catch (error) {
      console.error("Error fetching cafeterias:", error);
    }
  };

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleFavoritePress = (favorite) => {
    const cafeteria = cafeterias.find((caf) => caf.fcltyNm === favorite);
    if (cafeteria) {
      navigation.navigate("CafeteriaDetail", { cafeteria });
    }
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
        <View style={styles.buttonContainer}>
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
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>즐겨찾기 급식소</Text>
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <TouchableOpacity
              key={index}
              style={styles.favoriteItem}
              onPress={() => handleFavoritePress(favorite)}
            >
              <Text style={styles.favoriteText}>{favorite}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(favorite)}>
                <Image
                  source={
                    favorites.includes(favorite)
                      ? favoriteFilledIcon
                      : favoriteIcon
                  }
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>
            즐겨찾기 급식소가 없습니다.
          </Text>
        )}
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
    backgroundColor: "#f0f4f7",
  },
  titleContainer: {
    paddingTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#e9ecef",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonSelected: {
    backgroundColor: "#64c2eb",
  },
  buttonText: {
    fontSize: 16,
    color: "#495057",
  },
  saveButton: {
    backgroundColor: "#64c2eb",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  favoriteText: {
    fontSize: 16,
    color: "#333",
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  noFavoritesText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default Settings;
