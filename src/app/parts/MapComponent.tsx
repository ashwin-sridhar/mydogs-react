'use client';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

type Coordinate = [number, number]; // [latitude, longitude]

interface MapComponentProps {
  coordinates: Coordinate[];
}

const MapUpdater: React.FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      map.setView(coordinates[0], 15);
    }
  }, [coordinates, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={coord} />
      ))}
      <Polyline positions={coordinates} color="red" />
      <MapUpdater coordinates={coordinates} />
    </MapContainer>
  );
};

export default MapComponent;