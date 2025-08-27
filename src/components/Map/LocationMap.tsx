"use client";

import "@/utils/leaflet-icon-fix";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function LocationMap({ latitude, longitude, address }: Props) {
  console.log(latitude, longitude, address);
  return (
    <div className="h-80 w-full">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full rounded"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>📍 {address || "Property Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
