"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false, // ⬅️ ensures map loads only on client
  loading: () => <p>Loading map...</p>,
});

export default function MapWrapper() {
  return (
    <div className="w-full my-6 rounded-lg overflow-hidden shadow-md">
      <DynamicMap />
    </div>
  );
}
