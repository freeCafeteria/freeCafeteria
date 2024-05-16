import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import Stars from "react-native-stars";

const CafeteriaStatus = ({ cafeteriaName }) => {
  const [statusData, setStatusData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchStatusData();
  }, [cafeteriaName]);

  const fetchStatusData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/cafeteriaStatus",
        {
          params: { cafeteriaName },
        }
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setStatusData(sortedData);
    } catch (error) {
      console.error("서버에서 현황 가져오는 중 오류 발생: ", error);
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (newStatus.trim() === "" || rating <= 0) {
      Alert.alert("오류", "현황과 별점을 모두 입력해주세요.");
    } else {
      const newEntry = {
        status: newStatus,
        rating,
        date: new Date().toISOString(),
      };
      try {
        await axios.post("http://localhost:3000/cafeteriaStatus", {
          cafeteriaName,
          ...newEntry,
        });
        setNewStatus("");
        setRating(0);
        fetchStatusData();
      } catch (error) {
        console.error("서버에 현황 등록하는 중 오류 발생: ", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={statusData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>현황: {item.status}</Text>
            <Text style={styles.statusText}>별점: {item.rating}</Text>
            <Text style={styles.statusText}>날짜: {formatDate(item.date)}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="현황을 입력하세요. (예: 사람 많음, 재료 소진)"
          value={newStatus}
          onChangeText={setNewStatus}
          multiline
        />
        <Stars
          default={rating}
          update={handleRating}
          spacing={4}
          starSize={40}
          count={5}
          fullStar={require("../../assets/fullStar.png")}
          emptyStar={require("../../assets/emptyStar.png")}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>현황 등록</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    borderColor: "#ddd",
    borderRadius: 5,
    borderWidth: 2,
    paddingTop: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 18,
    fontFamily: "BM JUA_otf",
    padding: 10,
  },
  button: {
    backgroundColor: "#64c2eb",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "BM JUA_otf",
    color: "#ffffff",
  },
  statusItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    fontFamily: "BM JUA_otf",
    color: "#333",
    marginBottom: 5,
  },
});

export default CafeteriaStatus;
