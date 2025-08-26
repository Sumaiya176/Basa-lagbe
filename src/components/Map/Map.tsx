"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false, // ⬅️ this is the key
});

export default function Map() {
  return (
    <div className="w-full my-6 rounded-lg overflow-hidden shadow-md">
      <DynamicMap />
    </div>
  );
}
