'use client';
import axiosClient from '@/helpers/axios';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  Libraries,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Home() {
  const libraries: Libraries = ['visualization'] as const;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAN6b_-hDFORuqIbR3NITLQOv9L8IMmHzs',
    libraries,
  });
  const [cordData, setcordData] = useState([
    { latitude: 0, longitude: 0, email: '' },
  ]);
  const getdata = async () => { 
    const token = Cookies.get('user')
    const data = await axiosClient.get('/data/cords/email', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setcordData(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);
 
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  if (loadError) {
    return <div>Error loading the map</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
 
  function calculateCenter(data: any) {
    let sumLat = 0;
    let sumLng = 0;
    let count = 0;

    data.forEach((item: { latitude: number; longitude: number }) => {
      sumLat += item.latitude;
      sumLng += item.longitude;
      count++;
    });

    return {
      lat: sumLat / count,
      lng: sumLng / count,
    };
  }
  function getCoordinatesWithinRadius(
    data: any,
    email: string,
    radiusKm: number
  ) {
    const referencePoint = data.find((item:any) => item.email === email);
    if (!referencePoint) {
      console.log('Email not found');
      return [];
    }
    function calculateDistance(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }
    const filteredData = data.filter((item:any) => {
      const distance = calculateDistance(
        referencePoint.latitude,
        referencePoint.longitude,
        item.latitude,
        item.longitude
      );
      return distance <= radiusKm;
    });

    return filteredData;
  }
 
  const center = calculateCenter(cordData);

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        height: `calc(100vh - 60px)`, 
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
        zoom={10}
        onLoad={(loadedmap) => setMap(map)}
        center={center}
      >
        {cordData.map((data, index) => (
          <Marker
            key={index}
            position={{ lat: data.latitude, lng: data.longitude }}
            onClick={() => handleActiveMarker(index)}
          >
            {activeMarker === index ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <h2>{data.email}</h2>
                  <p>Latitude: {data.latitude}</p>
                  <p>Longitude: {data.longitude}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </main>
  );
}

export default Home;
