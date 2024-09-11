'use client';
import React, { useState, useEffect, useCallback } from 'react';
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

  const initializeWebSocket = useCallback(() => {
    const wsUrl = 'ws://ec2-3-88-248-126.compute-1.amazonaws.com:4000';
    if (!wsUrl) {
      console.error('WebSocket URL is not defined');
      return;
    }

    console.log("Connecting to WebSocket:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.latitude && data.longitude) {
          setCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            [data.latitude, data.longitude],
          ]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return ws;
  }, []);

  useEffect(() => {
    let ws: WebSocket | undefined;

    if (typeof window !== 'undefined') {
      ws = initializeWebSocket();
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [initializeWebSocket]);

  return (
    <div className="h-screen w-full">
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default GPSMap;