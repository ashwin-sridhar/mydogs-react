'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

type Coordinate = [number, number]; // [latitude, longitude]

const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => <p>Loading map...</p>
  }
);

const GPSMap: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize WebSocket connection
      console.log("Yolo"+process.env.NEXT_PUBLIC_FITBARK_WS);
      const ws = new WebSocket(process.env.NEXT_PUBLIC_FITBARK_WS||'');

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.latitude && data.longitude) {
          setCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            [data.latitude, data.longitude],
          ]);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(ws);

      // Clean up WebSocket connection on component unmount
      return () => {
        if (ws) {
          ws.close();
        }
      };
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default GPSMap;