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
    const durationSeconds = route.summary.duration; 
    const durationMinutes = Math.round(durationSeconds / 60); 
    const distance = route.summary.distance; 
    const taxiFare = route.taxi_fare;

    const pathCoords = legs.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
   
console.log("Duration in seconds:", durationSeconds);

console.log("Duration in minutes:", durationMinutes);
console.log(`Starting coordinates: ${startLat}, ${startLng}`);
console.log(`Ending coordinates: ${endLat}, ${endLng}`);
console.log(`API URL: ${url}`);
    return {
      path: pathCoords,
      duration: durationMinutes, 
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