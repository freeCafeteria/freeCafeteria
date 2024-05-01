import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import { locations, subLocations } from "./data/locations";
import { categories, categoryDescriptions } from "./data/categories";

const StepIndicator = ({ currentStep, totalSteps, goToStep }) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            if (index + 1 < currentStep) {
              goToStep(index + 1);
            }
          }}
          style={[
            styles.circle,
            currentStep === index + 1
              ? styles.activeCircle
              : styles.inactiveCircle,
          ]}
        />
      ))}
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const [subLocation, setSubLocation] = useState("");
  const [subLocationOptions, setSubLocationOptions] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    if (location) {
      setSubLocationOptions(subLocations[location] || []);
      setSubLocation("");
    }
  }, [location]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNext = () => {
    if (step === 1 && !age) {
      Alert.alert("입력 오류", "나이를 입력해 주세요.");
    } else if (step === 2 && !location) {
      Alert.alert("입력 오류", "거주지를 입력해 주세요.");
    } else if (step === 3 && Object.keys(selectedCategories).length === 0) {
      Alert.alert("선택 오류", "하나 이상의 카테고리를 선택해 주세요.");
    } else if (step < 3) {
      setStep(step + 1);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    console.log({ age, location, selectedCategories });
    navigation.navigate("MainTab", { screen: "Home" });
    setModalVisible(false);
  };

  const goToStep = (newStep) => {
    setStep(newStep);
  };

  const toggleDescription = (category) => {
    setSelectedDescription(categoryDescriptions[category]);
  };

  const closeDescription = () => {
    setSelectedDescription(null);
  };

  const renderAgePicker = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setAge(value)}
        items={[...Array(100).keys()].slice(1).map((value) => ({
          label: `${value}세`,
          value: `${value}`,
        }))}
        placeholder={{ label: "나이", value: null }}
        style={{
          inputIOS: styles.pickerInput,
          inputAndroid: styles.pickerInput,
          placeholder: { color: "#bbb" },
        }}
      />
    );
  };
  const renderLocationPicker = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setLocation(value)}
        items={locations.map((loc) => ({ label: loc.label, value: loc.value }))}
        placeholder={{ label: "거주지 선택", value: null }}
        style={{
          inputIOS: styles.pickerInput,
          inputAndroid: styles.pickerInput,
          placeholder: { color: "#bbb" },
        }}
      />
    );
  };

  const renderSubLocationPicker = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setSubLocation(value)}
        items={subLocationOptions.map((subLoc) => ({
          label: subLoc,
          value: subLoc,
        }))}
        placeholder={{ label: "세부 거주지 선택", value: null }}
        style={{
          inputIOS: styles.pickerInput,
          inputAndroid: styles.pickerInput,
          placeholder: { color: "#bbb" },
        }}
      />
    );
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={step === 2 ? styles.centeredContent : null}
    >
      {step === 1 && (
        <>
          <Text style={styles.titleText}>
            무료급식소에 오신 것을 환영합니다!
          </Text>
          <Text style={styles.instructionText}>
            사용자에게 적합한 무료 급식소를 찾을 수 있도록 몇가지 질문을
            드릴게요
          </Text>
          <Text style={styles.label}>나이 (만 나이) 를 입력해주세요 </Text>
          {renderAgePicker()}
        </>
      )}
      {step === 2 && (
        <View>
          <Text style={styles.label}>거주지를 입력해주세요</Text>
          {renderLocationPicker()}
          {location && renderSubLocationPicker()}
        </View>
      )}
      {step === 3 && (
        <>
          <Text style={styles.titleText}>해당되는 키워드를 선택하세요</Text>
          <Text style={styles.instructionText}>
            "? 버튼을 눌러 용어에 대한 상세 설명을 확인하세요."
          </Text>
          <View style={styles.buttonContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCategories[category] ? styles.selected : null,
                  ]}
                  onPress={() =>
                    setSelectedCategories((prev) => ({
                      ...prev,
                      [category]: !prev[category],
                    }))
                  }
                >
                  <Text style={styles.categoryText}>{category}</Text>
                  <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => toggleDescription(category)}
                  >
                    <Image
                      source={require("../../assets/question.png")}
                      style={styles.infoButtonImage}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                {selectedDescription === category && (
                  <Text style={styles.descriptionText}>
                    {categoryDescriptions[category]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </>
      )}
      <StepIndicator currentStep={step} totalSteps={3} goToStep={goToStep} />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step === 3 ? "시작하기" : "다음"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedDescription !== null}
        onRequestClose={closeDescription}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedDescription}</Text>
            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={closeDescription}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            입력하신 정보를 기반으로 사용자에게 적합한 무료급식소를 제안할
            예정입니다. 실제 이용 가능 여부는 해당 급식소의 정책과 조건에 따라
            다를 수 있습니다! 계속 진행하시겠습니까?
          </Text>
          <View style={styles.responsebuttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.responsebutton}
            >
              <Text style={styles.responseText}>예</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.responsebutton}
            >
              <Text style={styles.responseText}>아니오</Text>
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
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#64c2eb",
    textAlign: "center",
    marginTop: 42,
    paddingBottom: 40,
    lineHeight: 40,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  instructionText: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginTop: 50,
    marginBottom: 10,
  },

  pickerInput: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#C4C4C4",
  },
  activeCircle: {
    backgroundColor: "#64c2eb",
  },
  inactiveCircle: {
    backgroundColor: "#c0e0ec",
  },

  nextButton: {
    backgroundColor: "#AEB6BF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30,
  },

  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    color: "black",
  },
  button: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  selected: {
    backgroundColor: "#64c2eb",
    borderColor: "#64c2eb",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  infoButton: {
    marginLeft: 10,
    padding: 5,
  },

  infoButtonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  descriptionText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 20,
    paddingTop: 5,
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#64c2eb",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  responsebuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },

  responsebutton: {
    backgroundColor: "#64c2eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
  },

  responseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onboarding;
