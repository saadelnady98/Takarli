"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/assets/icons/pin.svg",
  iconSize: [28, 38],
  iconAnchor: [14, 38],
});

type DynamicMapProps = {
  position?: LatLngExpression | null;
};

export default function DynamicMap({ position }: DynamicMapProps) {
  if (!position) {
    return (
      <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden rounded-2xl bg-gray-100">
        <p className="text-gray-500">Loading map location...</p>
      </div>
    );
  }


  return (
    <div className="relative w-full overflow-hidden rounded-2xl h-[400px]">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{
          height: "100%", 
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon} />
      </MapContainer>
    </div>
  );
}