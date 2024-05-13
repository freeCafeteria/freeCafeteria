import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

const CafeteriaStatus = ({ cafeteriaName }) => {
  const [statusData, setStatusData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [rating, setRating] = useState("");

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
      setStatusData(response.data);
    } catch (error) {
      console.error("서버에서 현황 가져오는 중 오류 발생: ", error);
    }
  };

  const handleSubmit = async () => {
    if (newStatus.trim() && rating) {
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
        setRating("");
        fetchStatusData();
      } catch (error) {
        console.error("서버에 현황 등록하는 중 오류 발생: ", error);
      }
    } else {
      Alert.alert("오류", "현황과 별점을 모두 입력해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>급식소 현황</Text>
      <TextInput
        style={styles.input}
        placeholder="현황을 입력하세요. (예: 사람 많음, 재료 소진)"
        value={newStatus}
        onChangeText={setNewStatus}
        multiline
        minHeight={40}
        maxHeight={120}
      />
      <TextInput
        style={styles.input}
        placeholder="별점을 입력하세요. (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <Button title="현황 등록" onPress={handleSubmit} color="#64c2eb" />
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
      />
    </View>
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
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    fontSize: 18,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    minHeight: 40,
    maxHeight: 120,
  },
  statusItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  statusText: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    marginBottom: 5,
  },
});

export default CafeteriaStatus;
