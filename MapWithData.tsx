import React = require('react');
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';

export function MapWithData() {
  const { isLoading, error, data } = useQuery('mapData', fetchMapData);

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.features.map((feature) => (
        <Polygon key={feature.properties.id} pathOptions={{ color: 'blue' }} positions={feature.geometry.coordinates}>
          <Popup>{feature.properties.name}</Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}

async function fetchMapData() {
  const response = await fetch('/api/polygons');
  return response.json();
}
