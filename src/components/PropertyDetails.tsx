"use client";

import { useGetSingleListingQuery } from "@/redux/features/listing/listingApi";
import { useParams } from "next/navigation";

import ParallaxCarousel from "./ParallaxCarousel";
import { EmblaOptionsType } from "embla-carousel";
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { MdOutlineBalcony } from "react-icons/md";
import { TbStairs } from "react-icons/tb";
import {
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  Building2,
  DoorOpen,
  Landmark,
} from "lucide-react";
import Image from "next/image";

const PropertyDetails = () => {
  const params = useParams<{ id: string }>();

  const { data } = useGetSingleListingQuery(params?.id);
  //console.log(data);
  return (
    <div className="">
      {data?.data?.propertyImages.length > 1 ? (
        <ParallaxCarousel
          images={[
            "https://picsum.photos/id/1018/1000/600/",
            "https://picsum.photos/id/1015/1000/600/",
            "https://picsum.photos/id/1019/1000/600/",
            "https://picsum.photos/id/1019/1000/600/",
            "https://picsum.photos/id/1019/1000/600/",
            "https://picsum.photos/id/1019/1000/600/",
            "https://picsum.photos/id/1019/1000/600/",
          ]}
        />
      ) : (
        <Image
          src={data?.data?.propertyImages[0]}
          alt="tolet"
          height={400}
          width={400}
        />
      )}
      {/* <div className="mt-10 border rounded px-10 py-7">
        <p className="text-lg mb-3 font-semibold">Basic Information</p>
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center text-stone-500">
            <IoBedOutline />
            <p>Bedroom : {data?.data?.bedroom}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <PiBathtub />
            <p>Bathroom : {data?.data?.bathroom}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <MdOutlineBalcony />
            <p>Balcony : {data?.data?.balcony}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <TbStairs />
            <p>Floor : 2</p>
          </div>
        </div>
      </div>
      <div className="mt-10 border rounded px-10 py-7">
        <p className="text-lg mb-3 font-semibold">Location Information </p>
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center text-stone-500">
            <IoBedOutline />
            <p>Bedroom : {data?.data?.bedroom}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <PiBathtub />
            <p>Bathroom : {data?.data?.bathroom}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <MdOutlineBalcony />
            <p>Balcony : {data?.data?.balcony}</p>
          </div>
          <div className="flex gap-2 items-center text-stone-500">
            <TbStairs />
            <p>Floor : 2</p>
          </div>
        </div>
      </div> */}

      {/* Property Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Rent + Type */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Basic Information
          </h1>
          <p className="text-2xl font-bold text-blue-600 mt-2 md:mt-0">
            BDT {data?.data?.rent.toLocaleString()} / month
          </p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-blue-500" />
            <span>{data?.data?.bedroom} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-blue-500" />
            <span>{data?.data?.bathroom} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <DoorOpen className="w-5 h-5 text-blue-500" />
            <span>{data?.data?.balcony} Balcony</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-blue-500" />
            <span>Floor 2</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>
              Available from :{" "}
              {new Date(data?.data?.availability).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span>Type: {data?.data?.propertyType}</span>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-start gap-3 border-t pt-4">
          <MapPin className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h2 className="font-semibold text-lg text-gray-900">Location</h2>
            <p className="text-gray-700">{data?.data?.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
