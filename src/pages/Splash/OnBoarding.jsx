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
import useStore from "../../store";

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
  const {
    age,
    setAge,
    location,
    setLocation,
    subLocation,
    setSubLocation,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
  } = useStore((state) => ({
    age: state.age,
    location: state.location,
    subLocation: state.subLocation,
    selectedCategories: state.selectedCategories,
    setAge: state.setAge,
    setLocation: state.setLocation,
    setSubLocation: state.setSubLocation,
    setSelectedCategories: state.setSelectedCategories,
    toggleCategory: state.toggleCategory,
  }));

  const [isModalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [subLocationOptions, setSubLocationOptions] = useState([]);

  useEffect(() => {
    if (location) {
      setSubLocationOptions(subLocations[location] || []);
    }
  }, [location]);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleNext = () => {
    if (step === 2 && (!isValidAge() || !location || !subLocation)) {
      Alert.alert("입력 오류", "모든 필드를 올바르게 입력해 주세요.");
    } else if (
      step === 3 &&
      !Object.values(selectedCategories).some((value) => value)
    ) {
      Alert.alert("선택 오류", "하나 이상의 카테고리를 선택해 주세요.");
    } else if (step < 3) {
      setStep(step + 1);
    } else {
      toggleModal();
    }
  };

  const isValidAge = () => {
    const ageNumber = parseInt(age, 10);
    return ageNumber >= 0 && !isNaN(ageNumber);
  };

  const handleSubmit = () => {
    console.log({ age, location, subLocation, selectedCategories });
    useStore.getState().completeOnboarding();
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

  const renderAgeInput = () => {
    return (
      <TextInput
        style={styles.ageinput}
        onChangeText={setAge}
        value={age}
        placeholder="나이를 입력하세요"
        keyboardType="numeric"
      />
    );
  };

  const renderLocationPicker = () => {
    return (
      <RNPickerSelect
        onValueChange={setLocation}
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
        onValueChange={setSubLocation}
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

  const renderCategorySelection = () => {
    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategories[category] ? styles.selected : null,
            ]}
            onPress={() => toggleCategory(category)}
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
        ))}
      </View>
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: 100 },
        ]}
      >
        {step === 1 && (
          <>
            <Image
              source={require("../../assets/freecafeteria.png")}
              style={styles.introImage}
            />
            <Text style={styles.titleText}>
              무료급식소에 오신 것을 환영합니다.
            </Text>
            <Text style={styles.introductionText}>
              무료급식소는 사용자의 정보를 바탕으로 최적의 급식소를 추천해
              드립니다.
            </Text>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.introductionText}>
              사용자에게 적합한 무료 급식소를 찾기 위해 필요한 몇 가지 정보를
              입력해 주세요
            </Text>
            <Text style={styles.label}>나이 (만 나이)</Text>
            {renderAgeInput()}
            <Text style={styles.label}>거주지</Text>
            {renderLocationPicker()}
            {location && renderSubLocationPicker()}
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.titleText}>해당되는 키워드를 선택하세요</Text>
            <Text style={styles.introductionText}>
              ? 버튼을 눌러 용어에 대한 상세 설명을 확인하세요.
            </Text>
            {renderCategorySelection()}
          </>
        )}
        <StepIndicator currentStep={step} totalSteps={3} goToStep={goToStep} />
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step === 3 ? "시작하기" : "다음"}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={selectedDescription !== null}
        onBackdropPress={closeDescription}
        backdropColor="#000"
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{selectedDescription}</Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={closeDescription}
          >
            <Text style={styles.textStyle}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropColor="#000"
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View style={styles.modalContent}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  introImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 40,
  },
  titleText: {
    fontSize: 38,
    fontFamily: "BM JUA_otf",
    color: "#64c2eb",
    textAlign: "center",
    paddingTop: 40,
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  introductionText: {
    fontSize: 20,
    fontFamily: "BM JUA_otf",
    color: "#AEB6BF",
    textAlign: "center",
    lineHeight: 28,
    marginVertical: 40,
  },
  ageinput: {
    fontSize: 22,
    fontFamily: "BM JUA_otf",
    color: "#64c2eb",
    borderColor: "transparent",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 26,
    fontFamily: "BM JUA_otf",
    color: "#333",
    marginTop: 30,
    marginBottom: 32,
  },
  pickerInput: {
    fontSize: 22,
    fontFamily: "BM JUA_otf",
    color: "#64c2eb",
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    borderColor: "transparent",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 32,
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
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    width: "90%",
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "BM JUA_otf",
    color: "white",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    width: "48%",
    justifyContent: "space-between",
  },
  selected: {
    backgroundColor: "#64c2eb",
    borderColor: "#64c2eb",
  },
  categoryText: {
    fontSize: 18,
    fontFamily: "BM JUA_otf",
    color: "black",
  },
  infoButton: {
    padding: 5,
  },
  infoButtonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  modalContent: {
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
    width: "80%", // 가로 길이 줄이기
    alignSelf: "center", // 중앙 정렬
  },
  modalText: {
    fontFamily: "BM JUA_otf",
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 26,
  },
  buttonClose: {
    backgroundColor: "#64c2eb",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontFamily: "BM JUA_otf",
    fontSize: 16,
    textAlign: "center",
  },
  responsebuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  responsebutton: {
    backgroundColor: "#64c2eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  responseText: {
    fontFamily: "BM JUA_otf",
    color: "white",
    fontSize: 16,
  },
});

export default Onboarding;
