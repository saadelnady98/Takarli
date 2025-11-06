"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

const DynamicMap = dynamic(() => import("./dynamic-map"), {
  ssr: false,
  loading: () => (
    <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden rounded-2xl bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

type MapData = {
  lat?: number;
  lng?: number;
  city?: string;
  country?: string;
  area?: string;
};

export default function MapComponent({ data, address }: { data: MapData; address?: string }) {

  const position: LatLngExpression | null =
    data?.lat && data?.lng
      ? [data.lat, data.lng] 
      : null;


  return (
    <section className="w-full mb-5">
      {position ? (
        <>
          <DynamicMap position={position} />
          <p className="text-center text-gray-600 mt-4">
            {address || "Address not available"}
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center h-[400px] rounded-2xl bg-gray-100">
          <p className="text-gray-500">Map not available</p>
        </div>
      )}
    </section>
  );
}
