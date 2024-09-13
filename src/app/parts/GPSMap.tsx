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
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const initializeWebSocket = useCallback(() => {
    const wsUrl = 'wss://ashsridhar.xyz';
    if (!wsUrl) {
      console.error('WebSocket URL is not defined');
      return;
    }

    console.log("Connecting to WebSocket:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionError(null);
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
      setConnectionError('Failed to connect. There might be an issue with the server certificate.');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionError('Connection closed. Click to retry.');
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

  const handleRetry = () => {
    if (socket) {
      socket.close();
    }
    setConnectionError(null);
    initializeWebSocket();
  };

  return (
    <div className="h-screen w-full">
      {connectionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Connection Error: </strong>
          <span className="block sm:inline">{connectionError}</span>
          <button 
            onClick={handleRetry}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Retry Connection
          </button>
        </div>
      )}
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default GPSMap;