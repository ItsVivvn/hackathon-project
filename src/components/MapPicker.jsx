import { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ initialCenter = [18.2700, 73.6900], initialZoom = 13, onChange }) {
  const [pos, setPos] = useState(null);

  const handleSelect = (lat, lng) => {
    setPos([lat, lng]);
    onChange?.({ latitude: lat, longitude: lng });
  };

  return (
    <section className="map-card">
      <h3>Choose location (Lavasa, Pune)</h3>
      <MapContainer center={initialCenter} zoom={initialZoom} scrollWheelZoom={true} className="map-view map-picker">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onSelect={handleSelect} />
        {pos ? <Marker position={pos} /> : null}
      </MapContainer>
      <p className="muted">Click on the map to pick a place; marker will appear at the selected coordinates.</p>
    </section>
  );
}
