import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPathOverlay,
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
import ToggleButton from "../../components/ToggleButton";
import { get_now_data } from "../../utils/getFilteringData";
import useStore from "../../store";
import Spinner from "react-native-loading-spinner-overlay";
import { getMapBounds } from "../../utils/getMapBound";

const MapScreen = ({ navigation }) => {
  const { age, selectedCategories } = useStore((state) => ({
    age: state.age,
    selectedCategories: state.selectedCategories,
  }));
  const ref = useRef(null);
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

  //급식소 데이터
  const [cafeterias, setCafeterias] = useState([]);
  const [toggle, setToggle] = useState(false); //false -> 전체, true -> 필터링 급식데이터
  const [cafeteriaLoading, setCafeteriaLoading] = useState(true);
  const url =
    Platform.OS === "android"
      ? "http://10.0.2.2:3000"
      : "http://localhost:3000";
  const get_cafeteria_data = async () => {
    try {
      const res = await axios.get(`${url}/allCafeterias`);
      setCafeterias(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCafeteriaLoading(false);
    }
  };
  const get_filtered_cafeteria_data = async () => {
    let { userDate, userTime } = get_now_data();

    let filteredCategories = Object.keys(selectedCategories)
      .filter((category) => selectedCategories[category])
      .join(",");
    const body = {
      userDate: userDate,
      userTime: userTime,
      // userTime: "12:35",
      userTarget: filteredCategories,
      userAge: age,
    };

    try {
      const res = await axios.post(`${url}/filteredCafeterias`, body);
      setCafeterias(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCafeteriaLoading(false);
    }
  };

  useEffect(() => {
    //처음엔 모든 급식소 데이터 들고오기
    get_cafeteria_data();
  }, []);

  useEffect(() => {
    setCafeteriaLoading(true);
    console.log("toggle", toggle);
    if (toggle) {
      get_filtered_cafeteria_data();
    } else {
      get_cafeteria_data();
    }
  }, [toggle]);

  useEffect(() => {
    console.log("cafeLoading:", cafeteriaLoading);
  }, [cafeteriaLoading]);

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

  // 화면에 보이는 영역만 마커 표시
  const [screenLatitude, setScreenLatitude] = useState(null);
  const [screenLongitude, setScreenLongitude] = useState(null);
  const [screenZoom, setScreenZoom] = useState(null);
  const [screenCafeteria, setScreenCafeteria] = useState([]); //화면에 보이는 급식소 데이터

  let changing;
  const cameraMovingHandler = (camera) => {
    if (cafeteriaLoading === false) {
      console.log(camera.latitude, camera.longitude, camera.zoom);

      // setScreenLatitude(camera.latitude);
      // setScreenLongitude(camera.longitude);
      // setScreenZoom(camera.zoom);
      clearTimeout(changing);
      changing = setTimeout(() => {
        console.log("change finished!");
        setScreenLatitude(camera.latitude);
        setScreenLongitude(camera.longitude);
        setScreenZoom(camera.zoom);

        scrolling = undefined;
      }, 1000);
    }
    // console.log(camera.latitude, camera.longitude, camera.zoom);

    // // setScreenLatitude(camera.latitude);
    // // setScreenLongitude(camera.longitude);
    // // setScreenZoom(camera.zoom);
    // clearTimeout(changing);
    // changing = setTimeout(() => {
    //   console.log("change finished!");
    //   setScreenLatitude(camera.latitude);
    //   setScreenLongitude(camera.longitude);
    //   setScreenZoom(camera.zoom);

    //   scrolling = undefined;
    // }, 500);
  };

  const updateCafeteriaMarkers = (minLat, maxLat, minLng, maxLng) => {
    if (cafeterias.length > 0) {
      const updatedCafeterias = cafeterias.filter((cafeteria) => {
        const lat = parseFloat(cafeteria.latitude);
        const lng = parseFloat(cafeteria.longitude);
        return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
      });
      setScreenCafeteria(updatedCafeterias);
    }
  };
  useEffect(() => {
    console.log("상태값 변화");
    if (
      screenLatitude !== null &&
      screenLongitude !== null &&
      screenZoom !== null
    ) {
      console.log(screenLatitude, screenLongitude, screenZoom);
      let { minLat, minLng, maxLat, maxLng } = getMapBounds(
        screenLatitude,
        screenLongitude,
        screenZoom
      );
      console.log(minLat, maxLat, minLng, maxLng);
      updateCafeteriaMarkers(minLat, maxLat, minLng, maxLng);
    }
  }, [screenLatitude, screenLongitude, screenZoom]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Spinner
          visible={cafeteriaLoading}
          textContent={"급식소 정보를 들고옵니다"}
          textStyle={styles.spinnerTextStyle}
        />
        <NaverMapView
          style={{ flex: 1 }}
          ref={ref}
          // camera={currentPosition}
          clusters={clusters}
          onMapClick={(e) => {
            const { latitude, longitude } = e;
            updateMapPosition(latitude, longitude);
          }}
          onInitialized={() => {
            console.log("지도 초기화완료");
          }}
          onCameraChanged={(camera) => cameraMovingHandler(camera)}
          layerGroups={{
            BICYCLE: false,
            BUILDING: true,
            CADASTRAL: false,
            MOUNTAIN: false,
            TRAFFIC: true,
            TRANSIT: true,
          }}
        >
          {/* 급식소 마커 */}
          {Platform.OS === "android"
            ? screenCafeteria.map(
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
            : screenCafeteria.map(
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
      <View style={styles.toggleBtn}>
        <ToggleButton toggle={toggle} setToggle={setToggle} />
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
  toggleBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
