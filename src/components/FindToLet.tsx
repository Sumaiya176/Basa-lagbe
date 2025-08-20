"use client";
import ProtectedRoute from "@/app/(main)/ProtectedRoute";
import {
  useGetAllListingQuery,
  useSavedPropertyMutation,
} from "@/redux/features/listing/listingApi";
import { districts } from "@/utils/district";
//import { listings } from "@/utils/Listings";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { MdOutlineBalcony } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { GrElevator } from "react-icons/gr";
import { TiHeart } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

const FindToLet = () => {
  const { data } = useGetAllListingQuery(undefined);
  const [savedProperty] = useSavedPropertyMutation();
  const [districtName, setDistrictName] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [saveProperty, setSaveProperty] = useState<boolean>(false);

  const listings = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((listing: any) => {
      const matchesDistrict =
        !districtName || listing.districtName === districtName;

      const matchesType =
        !propertyType || listing.propertyType === propertyType;

      const matchesCity = !city || listing.city === city;

      // ✅ All active filters must pass
      return matchesDistrict && matchesType && matchesCity;
    });
  }, [data, districtName, propertyType, city]);

  console.log(listings);

  const handleSaveProperty = async (id: string) => {
    console.log(id);
    try {
      const result = await savedProperty(id).unwrap();
      console.log(result, result?.isSuccess);
      if (result?.isSuccess) {
        setSaveProperty(true);
        //console.log(result?.message);
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };

  return (
    <div className="mb-20">
      <div className="md:flex justify-center md:gap-20 mb-10">
        <div>
          <p className="text-base font-semibold mb-1">Type</p>
          <select
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full md:w-40 border text-sm border-stone-400 rounded"
          >
            <option value="family">Family</option>
            <option value="sublet">Sublet</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div>
          <p className="text-base font-semibold mb-1">District</p>
          <select
            onChange={(e) => setDistrictName(e.target.value)}
            className="w-full md:w-40 border text-sm border-stone-400 rounded"
          >
            {districts?.map((district: any) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-base font-semibold mb-1">City</p>
          <select
            onChange={(e) => setCity(e.target.value)}
            className="w-full md:w-40 border text-sm border-stone-400 rounded"
          >
            {districts
              ?.find((district: any) => district.name === districtName)
              ?.cities.map((city: any) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid 1xs:grid-cols-2 2xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-y-6">
        {listings?.map((list: any) => (
          <div
            key={list?._id}
            className="min-w-[160px] max-w-full 1xs:w-[160px] md:min-w-[245px] md:max-w-[245px]
              border flex-shrink-0 rounded"
          >
            <Image
              //src="/hero1.jpg"
              src={list?.propertyImages[0] || "/tolet.jpg"}
              className=" w-full  h-48"
              alt="to-let"
              height={170}
              width={120}
            />

            <div className=" max-h-[200px] p-3">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base break-words">
                    {list?.propertyType}
                  </h3>
                  <p className="text-gray-500 text-sm font-light flex justify-start items-end">
                    {list?.area}, {list?.city}, {list?.district}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-center">
                    <TiHeart
                      onClick={() => handleSaveProperty(list?._id)}
                      className={`text-2xl ${
                        saveProperty ? "text-red-500" : "text-gray-500"
                      } inline-block align-middle`}
                    />
                    <p className="text-[tomato] text-base font-semibold flex justify-start items-end">
                      <TbCurrencyTaka className="text-2xl" />
                      {list?.rent}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <p className="text-gray-500 text-base">
                Available from :{" "}
                {new Date(list?.availability).toLocaleString("default", {
                  month: "long",
                })}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-x-1">
                  <IoBedOutline className="text-lg text-gray-500" />
                  <p className="text-sm">{list?.bedroom}</p>
                </div>
                <div className="flex gap-x-1">
                  <PiBathtub className="text-lg text-gray-500" />
                  <p className="text-sm">{list?.bathroom}</p>
                </div>
                <div className="flex gap-x-1">
                  <MdOutlineBalcony className="text-lg text-gray-500" />
                  <p className="text-sm">{list?.balcony}</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="text-sm">
                    {list?.lift ? (
                      <GrElevator className="text-lg text-gray-500" />
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FindToLet;
