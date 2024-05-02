import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPathOverlay,
  map,
} from "@mj-studio/react-native-naver-map";

const MapDetail = ({ route }) => {
  const mapRef = useRef(null);
  const { cafeteria, userLocation } = route.params;


  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCameraTo({
        latitude: parseFloat(cafeteria.위도),
        longitude: parseFloat(cafeteria.경도),
        zoom: 15,
        duration: 2000,
        easing: "Fly",
      });
    }
  }, [cafeteria]);


  return (
    <View style={styles.container}>
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      ref={mapRef}
      center={{...userLocation, zoom: 10}}
    >
      <NaverMapMarkerOverlay
        latitude={parseFloat(cafeteria.위도)}
        longitude={parseFloat(cafeteria.경도)}
        title={cafeteria.시설명}
        caption={{
          key: "1",
          text: `${cafeteria.시설명}`,
      }}
      />
    </NaverMapView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default MapDetail;