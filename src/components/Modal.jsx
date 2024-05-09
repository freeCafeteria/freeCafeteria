import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const ModalComponent = ({
  modalVisible,
  closeModal,
  selectedCafeteria,
  goToMapDetail,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{selectedCafeteria?.fcltyNm}</Text>
        <Text style={styles.modalText}>주소: {selectedCafeteria?.rdnmadr}</Text>
        <Text style={styles.modalText}>
          전화번호: {selectedCafeteria?.phoneNumber}
        </Text>
        <Text style={styles.modalText}>
          운영시간: {selectedCafeteria?.mlsvTime}
        </Text>
        <Text style={styles.modalText}>
          운영요일: {selectedCafeteria?.mlsvDate}
        </Text>
        <TouchableOpacity onPress={goToMapDetail} style={styles.routeButton}>
          <Text style={styles.routeButtonText}>최단 경로</Text>
        </TouchableOpacity>
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
    height: 250,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#64c2eb",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#64c2eb",
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  routeButton: {
    backgroundColor: "#64c2eb",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  routeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
