import axios from 'axios';

export const getNaverDirections = async (startLat, startLng, endLat, endLng) => {
  const clientId = '6tt80oo552';
  const clientSecret = 'dLDnbRiaMDMNhNZosElZTBDHpmoD8AD13wqR2o8s';
  const url = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${startLng},${startLat}&goal=${endLng},${endLat}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret
      }
    });
    const route = response.data.route.traoptimal[0];
    const legs = route.path;
    const durationSeconds = route.summary.duration; // 전체 경로 소요 시간 (초)
    const durationMinutes = Math.round(durationSeconds / 60); // 소요 시간을 분으로 변환
    const distance = route.summary.distance; // 전체 경로 거리
    const taxiFare = route.taxi_fare; // 택시 요금 (API가 이 정보를 제공하는 경우)

    const pathCoords = legs.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));

    return {
      path: pathCoords,
      duration: durationMinutes, // 분 단위로 변경된 duration
      distance,
      taxiFare
    };
  } catch (error) {
    console.error("Failed to fetch directions", error);
    return {
      path: [],
      duration: null,
      distance: null,
      taxiFare: null
    };
  }
};