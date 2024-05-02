import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
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
import { getCoordsFromAddress, getCoordsFromKeyword } from "../../utils/GeoUtils";
import Modal from 'react-native-modal';


const Cafeterias = [
  {
    시설명: "관운사가야복지센터",
    소재지도로명주소: "경상북도 성주군 성주읍 경산길 33-1",
    소재지지번주소: "경상북도 성주군 성주읍 경산리 577-4",
    운영기관명: "관운사가야복지센터",
    전화번호: "054-931-3000",
    급식장소: "관운사가야복지센터",
    급식대상: "60세이상 저소득층 독거노인 및 결식노인",
    급식시간: "중식(11:30~13:00)",
    급식요일: "월, 금",
    운영시작일자: "2010-01-08",
    운영종료일자: "",
    위도: "35.9156622",
    경도: "128.2843144",
    데이터기준일자: "2020-07-15",
    제공기관코드: "5210000",
    제공기관명: "경상북도 성주군",
  },
  {
    시설명: "이웃과하나노인복지센터",
    소재지도로명주소: "경상북도 성주군 성주읍 예산3길 8-4",
    소재지지번주소: "경상북도 성주군 성주읍 예산리 466",
    운영기관명: "이웃과하나노인복지센터",
    전화번호: "054-931-1611",
    급식장소: "이웃과하나노인복지센터",
    급식대상: "60세이상 저소득층 독거노인 및 결식노인",
    급식시간: "중식(12:00~13:00)",
    급식요일: "화, 수",
    운영시작일자: "2004-11-05",
    운영종료일자: "",
    위도: "35.9244472",
    경도: "128.2859217",
    데이터기준일자: "2020-07-15",
    제공기관코드: "5210000",
    제공기관명: "경상북도 성주군",
  },
];

const MapScreen = ({navigation}) => {
  const ref = useRef(null);
  const map = () => ref.current;
  Geolocation.getCurrentPosition((info) =>
    console.log("currentPosition: ", info)
  );
  const [query, setQuery] = useState("");
  const [myPosition, setMyPosition] = useState({});
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 35.9665,
    longitude: 128.2780,
    zoom: 10,
  });
  const [modalVisible, setModalVisible] = useState(false);
const [selectedCafeteria, setSelectedCafeteria] = useState(null);

  const updateMapPosition = useCallback((latitude, longitude) => {
    ref.current?.animateCameraTo({
      latitude: Number(latitude),
      longitude: Number(longitude),
      zoom: 15,
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
      setQuery(''); // 검색 후 입력 필드 초기화
    } else {
      console.log('검색 결과가 없습니다.');
    }
  }, [query, updateMapPosition]);



  // 카페테리아 선택 함수
const handleSelectCafeteria = cafeteria => {
  setSelectedCafeteria(cafeteria);
  setModalVisible(true);
};

// 모달을 닫는 함수
const closeModal = () => {
  setModalVisible(false);
};

const goToMapDetail = () => {
  setModalVisible(false); // 모달 닫기
  navigation.navigate('MapDetail', {
    cafeteria: selectedCafeteria,
    userLocation: currentPosition // 사용자의 현재 위치 전달
  });
};


  
  // 사용자의 현재 위치를 가져오기
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      updateMapPosition(latitude, longitude);
    }, (error) => console.error(error), {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }, [updateMapPosition]);


  

  return (
    <SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>
    <NaverMapView
      style={{ flex: 1 }}
      ref={ref}
      camera={currentPosition}
      onMapClick={(e) => {
        const { latitude, longitude } = e;
        updateMapPosition(latitude, longitude);
      }}
    >
      {Cafeterias.map((cafeteria, index) => (
        <NaverMapMarkerOverlay
          key={index}
          latitude={Number(cafeteria.위도)}
          longitude={Number(cafeteria.경도)}
          onTap={() => handleSelectCafeteria(cafeteria)}
          anchor={{ x: 0.5, y: 1 }}
          caption={{
              key: "1",
              text: `${cafeteria.시설명}`,
          }}
          width={40}
          height={40}
        />
      ))}
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
  <Modal
    isVisible={modalVisible}
    onBackdropPress={closeModal}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{selectedCafeteria?.시설명}</Text>
      <Text style={styles.modalText}>주소: {selectedCafeteria?.소재지도로명주소}</Text>
      <Text style={styles.modalText}>전화번호: {selectedCafeteria?.전화번호}</Text>
      <Text style={styles.modalText}>운영시간: {selectedCafeteria?.급식시간}</Text>
      <Text style={styles.modalText}>운영요일: {selectedCafeteria?.급식요일}</Text>
      <TouchableOpacity onPress={goToMapDetail} style={styles.routeButton}>
          <Text style={styles.routeButtonText}>최단 경로</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  </Modal>
</SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    height: 250,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64c2eb',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#64c2eb',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  routeButton: {
    backgroundColor: '#64c2eb',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  routeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
