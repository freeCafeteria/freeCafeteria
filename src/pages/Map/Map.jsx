import { StyleSheet, Text, View } from "react-native";
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapCircleOverlay,
  NaverMapPolygonOverlay,
  NaverMapPathOverlay,
} from "@mj-studio/react-native-naver-map";
import React, { useRef } from "react";

const Map = () => {
  const ref = useRef();
  const jejuRegion = {
    latitude: 33.20530773,
    longitude: 126.14656715029,
    latitudeDelta: 0.38,
    longitudeDelta: 0.8,
  };
  return (
    <View style={{ flex: 1 }}>
      <NaverMapView style={{ flex: 1 }} />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
