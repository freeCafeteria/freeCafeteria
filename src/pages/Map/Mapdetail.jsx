import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapPathOverlay,
} from "@mj-studio/react-native-naver-map";
import { getNaverDirections } from '../../utils/MapUtils';

const MapDetail = ({ route }) => {
  const mapRef = useRef(null);
  const { cafeteria, userLocation } = route.params;
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ duration: null, distance: null });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCameraTo({
        latitude: parseFloat(userLocation.latitude),
        longitude: parseFloat(userLocation.longitude),
        zoom: 15,
        duration: 2000,
        easing: "Fly",
      });
    }
  }, [userLocation]);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      const { path, duration, distance } = await getNaverDirections(
        userLocation.latitude,
        userLocation.longitude,
        cafeteria.latitude,
        cafeteria.longitude
      );
  
      setRouteCoords(path);
      setRouteInfo({ duration, distance });
    };
  
    fetchRouteInfo();
  }, [userLocation, cafeteria]);


  // 해당 부분 재구현 해야함 
  const openNaverMapWalkingRoute = () => {
    // 위치 이름을 URL 인코딩
    const userLocationName = encodeURIComponent(userLocation.name || "현재 위치");
    const cafeteriaName = encodeURIComponent(cafeteria.fcltyNm || "목적지");
  
    // 경도와 위도를 문자열로 확인
    const userLongitude = userLocation.longitude.toString();
    const userLatitude = userLocation.latitude.toString();
    const cafeteriaLongitude = cafeteria.longitude.toString();
    const cafeteriaLatitude = cafeteria.latitude.toString();
    
    // URL 생성
    const url = `https://map.naver.com/v5/directions/${userLongitude},${userLatitude},${userLocationName}::${cafeteriaLongitude},${cafeteriaLatitude},${cafeteriaName}`;
  
    // URL 열기
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        center={{...userLocation, zoom: 10}}
      >
        <NaverMapMarkerOverlay
          latitude={parseFloat(cafeteria.latitude)}
          longitude={parseFloat(cafeteria.longitude)}
          title={cafeteria.fcltyNm}
          caption={{ key: "1", text: `${cafeteria.fcltyNm}` }}
        />
        
        {routeCoords.length >= 2 && (
          <NaverMapPathOverlay
            coords={routeCoords}
            width={12}
            color={'#64c2eb'}
            progress={1}
            passedColor={'#FFA07A'}
          />
        )}
      </NaverMapView>
      <View style={styles.routeInfo}>
        <Text style={styles.infoText}>예상 이동 시간: {routeInfo.duration ? `${routeInfo.duration} 분` : 'Calculating...'}</Text>
        <Text style={styles.infoText}>거리: {routeInfo.distance ? `${(routeInfo.distance / 1000).toFixed(2)} km` : 'Calculating...'}</Text>
        <Button title="도보 경로 보기" onPress={openNaverMapWalkingRoute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  routeInfo: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10
  },
  infoText: {
    fontSize: 16,
    color: '#333'
  }
});

export default MapDetail;