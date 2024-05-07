import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CafeteriaStatus from "./CafeteriaStatus";

const backIcon = require("../../assets/back.png");

const CafeteriaDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cafeteria } = route.params;
  const [activeTab, setActiveTab] = useState("basic");

  const renderTabContent = () => {
    if (activeTab === "basic") {
      return [
        { label: "전화번호", value: cafeteria.phoneNumber },
        { label: "운영시간", value: cafeteria.mlsvTime },
        { label: "운영요일", value: cafeteria.mlsvDate },
        { label: "급식대상", value: cafeteria.mlsvTrget },
      ];
    } else if (activeTab === "status") {
      return [<CafeteriaStatus cafeteriaName={cafeteria.fcltyNm} />];
    } else {
      return [<Text style={styles.infoMessage}>해당 정보가 없습니다.</Text>];
    }
  };

  const renderItem = ({ item }) => {
    if (React.isValidElement(item)) {
      return item;
    }
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{item.label}:</Text>
        <Text style={styles.detailValue}>{item.value}</Text>
      </View>
    );
  };

  const data = renderTabContent();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{cafeteria.fcltyNm}</Text>
        <Text style={styles.address}>주소: {cafeteria.rdnmadr}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "basic" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("basic")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "basic" && styles.activeTabText,
            ]}
          >
            기본 정보
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "status" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("status")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "status" && styles.activeTabText,
            ]}
          >
            급식소 현황
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `item_${index}`}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 15,
    marginTop: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#F4F6F9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    paddingBottom: 12,
  },
  address: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 5,
    textAlign: "center",
    paddingBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#e9ecef",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activeTabButton: {
    backgroundColor: "#64c2eb",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  activeTabText: {
    color: "white",
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: "#6c757d",
    textAlign: "right",
  },
  infoMessage: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default CafeteriaDetail;
