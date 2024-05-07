import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPathOverlay,
  map,
} from "@mj-studio/react-native-naver-map";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { SingleLineInput } from "../../components/SingleLineInput";
import {
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from "../../utils/GeoUtils";
import axios from "axios";
import ModalComponent from "../../components/Modal";

const MapScreen = ({ navigation }) => {
  const ref = useRef(null);
  Geolocation.getCurrentPosition((info) =>
    console.log("currentPosition: ", info.coords)
  );
  const [query, setQuery] = useState("");
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.5109,
    longitude: 127.0437,
    zoom: 8,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCafeteria, setSelectedCafeteria] = useState(null);

  const updateMapPosition = useCallback((latitude, longitude) => {
    ref.current?.animateCameraTo({
      latitude: Number(latitude),
      longitude: Number(longitude),
      zoom: 13,
      duration: 2000,
      easing: "Fly",
    });
  }, []);

  // 주소를 검색창에 주소, 키워드 입력시 해당 위치로 마커 이동
  const onFindAddress = useCallback(async () => {
    // 주소나 키워드에 따라 위치 검색
    let result = await getCoordsFromKeyword(query);
    if (!result) {
      result = await getCoordsFromAddress(query);
    }

    if (result) {
      updateMapPosition(result.latitude, result.longitude);
      setQuery(""); // 검색 후 입력 필드 초기화
    } else {
      console.log("검색 결과가 없습니다.");
    }
  }, [query, updateMapPosition]);

  // 카페테리아 선택 함수
  const handleSelectCafeteria = (cafeteria) => {
    setSelectedCafeteria(cafeteria);
    setModalVisible(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setModalVisible(false);
  };

  const goToMapDetail = () => {
    setModalVisible(false); // 모달 닫기
    navigation.navigate("MapDetail", {
      cafeteria: selectedCafeteria,
      userLocation: currentPosition, // 사용자의 현재 위치 전달
    });
  };

  // 사용자의 현재 위치를 가져오기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateMapPosition(latitude, longitude);
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, [updateMapPosition]);

  //전체 급식소 들고오기
  const [cafeterias, setCafeterias] = useState([]);
  useEffect(() => {
    const get_cafeteria_data = async () => {
      const url =
        Platform.OS === "android"
          ? "http://10.0.2.2:3000"
          : "http://localhost:3000";
      const res = await axios.get(`${url}/allCafeterias`);
      setCafeterias(res.data);
    };
    get_cafeteria_data();
  }, []);

  const clusters = [
    {
      animate: true,
      markers: cafeterias.map((cafeteria, index) => ({
        identifier: `marker_${index}`,
        latitude: Number(cafeteria.latitude),
        longitude: Number(cafeteria.longitude),
        image: {
          assetName: "cafeMarker", // 마커 이미지의 이름
          symbol: "lowDensityCluster", // 클러스터 심볼
        },
        width: 40,
        height: 40,
      })),
      maxZoom: 12.99999, // 최대 줌 레벨
      screenDistance: 100, // 클러스터링에 사용되는 최소 거리
    },
  ];
  // console.log(cafeterias);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NaverMapView
          style={{ flex: 1 }}
          ref={ref}
          camera={currentPosition}
          clusters={clusters}
          onMapClick={(e) => {
            const { latitude, longitude } = e;
            updateMapPosition(latitude, longitude);
          }}
        >
          {/* 급식소 마커 */}
          {Platform.OS === "android"
            ? cafeterias.map(
                (cafeteria, index) =>
                  cafeteria.latitude && (
                    <NaverMapMarkerOverlay
                      key={index}
                      latitude={Number(cafeteria.latitude)}
                      longitude={Number(cafeteria.longitude)}
                      onTap={() => handleSelectCafeteria(cafeteria)}
                      anchor={{ x: 0.5, y: 1 }}
                      caption={{
                        key: index,
                        text: `${cafeteria.fcltyNm}`,
                      }}
                      width={40}
                      height={40}
                      minZoom={13} //ios에서는 이 코드 주석처리
                    />
                  )
              )
            : cafeterias.map(
                (cafeteria, index) =>
                  cafeteria.latitude && (
                    <NaverMapMarkerOverlay
                      key={index}
                      latitude={Number(cafeteria.latitude)}
                      longitude={Number(cafeteria.longitude)}
                      onTap={() => handleSelectCafeteria(cafeteria)}
                      anchor={{ x: 0.5, y: 1 }}
                      caption={{
                        key: index,
                        text: `${cafeteria.fcltyNm}`,
                      }}
                      width={40}
                      height={40}
                      // minZoom={13} //ios에서는 이 코드 주석처리
                    />
                  )
              )}
        </NaverMapView>
        <View style={styles.searchBar}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해주세요"
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedCafeteria={selectedCafeteria}
        goToMapDetail={goToMapDetail}
      />
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.84,
  },
});
