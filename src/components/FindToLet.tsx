"use client";
import ProtectedRoute from "@/app/(main)/ProtectedRoute";
import { useGetAllListingQuery } from "@/redux/features/listing/listingApi";
import { districts } from "@/utils/district";
//import { listings } from "@/utils/Listings";
import Image from "next/image";
import { useMemo, useState } from "react";

const FindToLet = () => {
  const { data } = useGetAllListingQuery(undefined);
  const [districtName, setDistrictName] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [city, setCity] = useState<string>("");

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

  return (
    <div>
      <div className="flex justify-center gap-20 mb-10">
        <div>
          <p className="text-base font-semibold mb-1">Type</p>
          <select
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-40 border text-sm border-stone-400"
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
            className="w-40 border text-sm border-stone-400"
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
            className="w-40 border text-sm border-stone-400"
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
              border flex-shrink-0"
          >
            <Image
              src={
                list?.propertyImages
                  ? list?.propertyImages[0]
                  : "https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=1200,h=630,gravity=0.25x0.25/https://assets.about.me/background/users/t/o/l/tolet.board_1592250028_106.jpg"
              }
              className="object-contain w-full"
              alt="to-let"
              height={170}
              width={120}
            />
            <div className="overflow-y-auto max-h-[200px] ps-3">
              <h3 className="text-gray-400 text-sm mb-2 break-words">
                {list?.propertyType}
              </h3>
              <p className="text-gray-500 text-sm font-semibold flex justify-start items-end">
                {list?.area}, {list?.city}, {list?.district}
              </p>
              <p className="text-gray-500 text-sm font-semibold flex justify-start items-end">
                {list?.rent} BDT
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindToLet;
