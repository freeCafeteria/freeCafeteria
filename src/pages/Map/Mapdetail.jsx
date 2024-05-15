import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { NaverMapView, NaverMapMarkerOverlay, NaverMapPathOverlay } from "@mj-studio/react-native-naver-map";
import { getNaverDirections } from '../../utils/MapUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header/Header';
import Entypo from 'react-native-vector-icons/Entypo';

const MapDetail = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const { cafeteria, userLocation } = route.params;
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ duration: null, distance: null });
  const [modalVisible, setModalVisible] = useState(false);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const renderWebView = () => {
    const url = `https://map.naver.com/v5/directions/${userLocation.longitude},${userLocation.latitude}::${cafeteria.longitude},${cafeteria.latitude}`;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModalVisibility}
      >
        <WebView source={{ uri: url }} />
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleModalVisibility}>
          <Icon name="arrow-back" size={20} color="#fff" />
          <Text style={styles.buttonText}>앱으로 돌아가기</Text>  
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Header>
        <Header.Icon iconName="navigate-circle-outline" />
        <Header.Title title="가까운 거리" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <NaverMapView
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
        center={{...userLocation, zoom: 10}}
      >
        <NaverMapMarkerOverlay
          latitude={parseFloat(cafeteria.latitude)}
          longitude={parseFloat(cafeteria.longitude)}
          title={cafeteria.fcltyNm}
        />
        
        {routeCoords.length >= 2 && (
          <NaverMapPathOverlay
            coords={routeCoords}
            width={12}
            color={'#64c2eb'}
            progress={1}
            passedColor={'#64c2eb'}
          />
        )}
      </NaverMapView>
      <View style={styles.routeInfo}>
        <Icon name="time" size={24} color="#4A90E2" />
        <Text style={styles.infoText}>{routeInfo.duration ? `${routeInfo.duration} 분` : 'Calculating...'}</Text>
        <Entypo name="merge" size={24} color="#4A90E2" />
        <Text style={styles.infoText}>{routeInfo.distance ? `${(routeInfo.distance / 1000).toFixed(2)} km` : 'Calculating...'}</Text>
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={toggleModalVisibility}>
            <Icon name="walk" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.fabText}>도보 길찾기</Text>
        </View>
      </View>
      {renderWebView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginLeft: 5
  },
  buttonStyle: {
    flexDirection: 'row',
    backgroundColor: '#64c2eb',
    padding: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10
  },
  fabContainer: {
    alignItems: 'center'
  },
  fab: {
    width: 56,  
    height: 56,  
    backgroundColor: '#4A90E2',
    borderRadius: 28,  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,  
  },
  fabText: {
    color: '#999',
    fontSize: 12,  
  }
});

export default MapDetail;