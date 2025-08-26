"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

interface Props {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

function LocationMarker({ onLocationSelect }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position ? <Marker position={position}></Marker> : null;
}

export default function LocationPicker({ onLocationSelect }: Props) {
  return (
    <div className="h-80 w-full">
      <MapContainer
        center={[23.8103, 90.4125]} // Dhaka as default
        zoom={13}
        className="h-full w-full rounded"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
