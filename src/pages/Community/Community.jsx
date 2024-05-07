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
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchIcon = require("../../assets/search.png");

const Community = () => {
  const [cafeterias, setCafeterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCafeterias();
    loadRecentSearches();
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
    } finally {
      setLoading(false);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const items = await AsyncStorage.getItem("recentSearches");
      if (items) {
        setRecentSearches(JSON.parse(items));
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  const handleSearch = async () => {
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
    await AsyncStorage.setItem(
      "recentSearches",
      JSON.stringify(newRecentSearches)
    );
  };

  const removeSearch = async (search) => {
    const newRecentSearches = recentSearches.filter((s) => s !== search);
    setRecentSearches(newRecentSearches);
    await AsyncStorage.setItem(
      "recentSearches",
      JSON.stringify(newRecentSearches)
    );
  };

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
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      {recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchHeader}>최근 검색어</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recentSearches}
          >
            {recentSearches.map((search, index) => (
              <View key={index} style={styles.searchChip}>
                <Text
                  onPress={() => setSearchQuery(search)}
                  style={styles.chipText}
                >
                  {search}
                </Text>
                <TouchableOpacity
                  onPress={() => removeSearch(search)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#64c2eb" />
      ) : (
        <FlatList
          data={filteredCafeterias}
          renderItem={renderItem}
          keyExtractor={(item, index) => `cafeteria_${index}`}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
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
  recentSearchesContainer: {
    marginBottom: 20,
  },
  recentSearchHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recentSearches: {
    flexDirection: "row",
  },
  searchChip: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    alignItems: "center",
  },
  chipText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginLeft: 8,
    marginTop: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
});

export default Community;
