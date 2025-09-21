"use client";

import {
  useGetSavedPropertyQuery,
  useGetSingleListingQuery,
  useSavedPropertyMutation,
} from "@/redux/features/listing/listingApi";
import { useParams } from "next/navigation";

import ParallaxCarousel from "./ParallaxCarousel";

import {
  Bed,
  Bath,
  MapPin,
  Calendar,
  Building2,
  DoorOpen,
  Landmark,
} from "lucide-react";
import Image from "next/image";
import LocationMap from "./Map/LocationMap";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

const PropertyDetails = () => {
  const params = useParams<{ id: string }>();
  const { data: allSavedProperty } = useGetSavedPropertyQuery(undefined);
  const [savedProperty] = useSavedPropertyMutation();
  const [savePropertyId, setSavePropertyId] = useState<string[]>([]);

  const { data } = useGetSingleListingQuery(params?.id);
  console.log(data);
  const handleSaveProperty = async (id: string) => {
    try {
      const result = await savedProperty(id).unwrap();
      if (result?.isSuccess) {
        setSavePropertyId((prev) => (prev.includes(id) ? prev : [...prev, id]));
        //console.log(result?.message);
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };

  useEffect(() => {
    allSavedProperty?.data?.forEach((element: any) => {
      setSavePropertyId((prev) => [...prev, element?.listingId?._id]);
    });
  }, [allSavedProperty]);
  return (
    <div>
      {data?.data?.propertyImages.length === 0 ? (
        <p className="text-red-500 text-2xl text-center my-10">
          Sorry No Image Provided !
        </p>
      ) : data?.data?.propertyImages.length > 1 ? (
        <ParallaxCarousel images={data?.data?.propertyImages} />
      ) : (
        <div className="flex justify-center items-center my-5">
          <Image
            src={data?.data?.propertyImages[0]}
            alt="to-let"
            height={500}
            width={600}
            className="max-w-96 max-h-60 w-full h-full"
          />
        </div>
      )}

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
            <span>Floor {data?.data?.floor}</span>
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
        <div className="gap-3 border-t pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <MapPin className="w-6 h-6 text-blue-500 mt-1" />
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Location
              </h2>
            </div>
            <GoHeartFill
              onClick={() => handleSaveProperty(data?.data?._id)}
              className={`text-2xl ${
                savePropertyId.includes(data?.data?._id)
                  ? "text-red-500"
                  : "text-gray-500"
              } tet-4xl cursor-pointer`}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="lg:flex gap-2 items-center text-stone-500">
              <p className="font-semibold">Division </p>
              <p>{data?.data?.district}</p>
            </div>
            <div className="lg:flex gap-2 items-center text-stone-500">
              <p className="font-semibold">District</p>
              <p>{data?.data?.district}</p>
            </div>
            <div className="lg:flex gap-2 items-center text-stone-500">
              <p className="font-semibold">Thana</p>
              <p>{data?.data?.thana}</p>
            </div>
            <div className="lg:flex gap-2 items-center text-stone-500">
              <p className="font-semibold">Address</p>
              <p>{data?.data?.address}</p>
            </div>
          </div>

          {data?.data?.latitude && data?.data?.longitude ? (
            <LocationMap
              latitude={data?.data?.latitude}
              longitude={data?.data?.longitude}
              address={data?.data?.address}
            />
          ) : null}
        </div>
        {data?.data?.description ? (
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Description
            </h2>
            <p>{data?.data?.description}</p>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PropertyDetails;
