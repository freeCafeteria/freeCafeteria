import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const searchIcon = require("../../assets/search.png");

const Community = () => {
  const [cafeterias, setCafeterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchCafeterias();
  }, []);

  const filteredCafeterias = cafeterias.filter((item) =>
    item.fcltyNm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("CafeteriaDetail", { cafeteria: item })
      }
    >
      <Text style={styles.itemTitle}>{item.fcltyNm}</Text>
      <Text style={styles.itemAddress}>{item.rdnmadr}</Text>
      <Text style={styles.itemDetails}>전화번호: {item.phoneNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="급식소 이름을 검색하세요"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#64c2eb" />
      ) : (
        <FlatList
          data={filteredCafeterias}
          renderItem={renderItem}
          keyExtractor={(item, index) => `cafeteria_${index}`}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>무료 급식소 목록이 없습니다.</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f4f8",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#64c2eb",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    paddingBottom: 10,
  },
  itemAddress: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 6,
  },
  itemDetails: {
    fontSize: 14,
    color: "#495057",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6c757d",
  },
});

export default Community;
