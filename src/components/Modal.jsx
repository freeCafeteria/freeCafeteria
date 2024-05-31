import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ModalComponent = ({
  modalVisible,
  closeModal,
  selectedCafeteria,
  goToMapDetail,
  // navigation,
}) => {
  // 전화 걸기 함수
  const navigation = useNavigation();
  const makePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to make a call", err)
    );
  };

  const handleFavoritePress = (cafeteria) => {
    if (cafeteria) {
      navigation.navigate("CafeteriaDetail", { cafeteria });
    }
    closeModal();
  };

  const navigateCafeteria = (cafeteria) => {
    if (cafeteria) {
      navigation.navigate("CafeteriaDetail", { cafeteria });
    }
    closeModal();
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => navigateCafeteria(selectedCafeteria)}
          >
            <Text style={styles.modalTitle}>{selectedCafeteria?.fcltyNm}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToMapDetail}
            style={styles.iconButtonLarge}
          >
            <Icon name="navigate-circle-outline" size={36} color="#4A90E2" />
            <Text style={styles.navigateText}>길찾기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <Icon name="location-outline" size={20} color="#4A90E2" />
          <Text style={styles.modalText}>{selectedCafeteria?.rdnmadr}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="call-outline" size={20} color="#4A90E2" />
          <Text style={styles.modalText}>{selectedCafeteria?.phoneNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="time-outline" size={20} color="#4A90E2" />
          <Text style={styles.modalText}>{selectedCafeteria?.mlsvTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={20} color="#4A90E2" />
          <Text style={styles.modalText}>{selectedCafeteria?.mlsvDate}</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => makePhoneCall(selectedCafeteria?.phoneNumber)}
          >
            <Icon name="call" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleFavoritePress(selectedCafeteria)}
          >
            <Icon name="heart" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default React.memo(ModalComponent);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#64c2eb",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#64c2eb",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  iconButtonLarge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
  },
  navigateText: {
    color: "#4A90E2",
    fontSize: 16,
    marginLeft: 5,
  },
});
