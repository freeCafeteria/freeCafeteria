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

const Map = () => {
  const ref = useRef(null);
  const map = () => ref.current;
  Geolocation.getCurrentPosition((info) =>
    console.log("currentPosition: ", info)
  );
  const [query, setQuery] = useState("");
  const [myPosition, setMyPosition] = useState({});
  const [camera, setCamera] = useState({
    latitude: 37.240765,
    longitude: 127.07975296858098,
    zoom: 15,
  });

  const markerHandler = (lat, lon) => {
    map()?.animateCameraTo({
      latitude: Number(lat),
      longitude: Number(lon),
      zoom: 15,
      duration: 3000,
      easing: "Fly",
    });
  };

  // 주소를 검색창에 주소, 키워드 입력시 해당 위치로 마커 이동
  const onFindAddress = useCallback(async () => {
    // const keywordResult = await getCoordsFromKeyword(query);
    // if (keywordResult !== null) {
    //   setCurrentAddress(keywordResult.address);
    //   setCurrentRegion({
    //     latitude: parseFloat(keywordResult.latitude.toString()),
    //     longitude: parseFloat(keywordResult.longitude.toString()),
    //   });
    //   return;
    // }
    // const addressResult = await getCoordsFromAddress(query);
    // if (addressResult === null) {
    //   console.log('주소값을 찾지 못했습니다');
    //   return;
    // }
    // setCurrentAddress(addressResult.address);
    // setCurrentRegion({
    //   latitude: parseFloat(addressResult.latitude.toString()),
    //   longitude: parseFloat(addressResult.longitude.toString()),
    // });
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <SingleLineInput
          value={query}
          placeholder="주소를 입력해 주세요"
          onChangeText={setQuery}
        />
      </View>
      <NaverMapView
        style={{ flex: 1 }}
        ref={ref}
        camera={camera}
      >
        {Cafeterias.map((cafeteria, index) => (
          <NaverMapMarkerOverlay
            key={index}
            latitude={Number(cafeteria.위도)}
            longitude={Number(cafeteria.경도)}
            onTap={() => markerHandler(cafeteria.위도, cafeteria.경도)}
            anchor={{ x: 0.5, y: 1 }}
            caption={{
              key: "1",
              text: `${cafeteria.시설명}`,
            }}
            subCaption={{
              key: "1234",
              text: `${cafeteria.전화번호}`,
            }}
            width={50}
            height={50}
          />
        ))}
      </NaverMapView>
    </View>
  </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
