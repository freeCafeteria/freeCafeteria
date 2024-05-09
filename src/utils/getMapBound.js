export const getMapBounds = (latitude, longitude, zoom) => {
  // 경도 범위 계산
  const lngDelta = 360 / Math.pow(2, zoom);

  // 위도 범위 계산
  const latRadians = (latitude * Math.PI) / 180;
  const latDelta = lngDelta * Math.cos(latRadians);

  // 최소 위도, 경도 계산
  const minLat = latitude - latDelta / 2;
  const minLng = longitude - lngDelta / 2;

  // 최대 위도, 경도 계산
  const maxLat = latitude + latDelta / 2;
  const maxLng = longitude + lngDelta / 2;

  // 결과 반환
  return {
    minLat,
    minLng,
    maxLat,
    maxLng,
  };
};
