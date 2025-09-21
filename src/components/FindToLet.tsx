"use client";
import ProtectedRoute from "@/app/(main)/ProtectedRoute";
import {
  useGetAllListingQuery,
  useSavedPropertyMutation,
  useGetSavedPropertyQuery,
  useRecentlyViewedMutation,
} from "@/redux/features/listing/listingApi";
import { bangladeshAdministrativeAreas } from "@/utils/district";
//import { listings } from "@/utils/Listings";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { MdOutlineBalcony } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { GrElevator } from "react-icons/gr";
import { TiHeart } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const notify = (text: string) => toast(text);

const FindToLet = () => {
  const { data } = useGetAllListingQuery(undefined);
  const { data: allSavedProperty } = useGetSavedPropertyQuery(undefined);
  const [savedProperty] = useSavedPropertyMutation();
  const [recentlyViewed] = useRecentlyViewedMutation();
  const [divisionName, setDivisionName] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [thana, setThana] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [savePropertyId, setSavePropertyId] = useState<string[]>([]);
  const router = useRouter();

  const listings = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((listing: any) => {
      const matchesDivision =
        !divisionName || listing.division === divisionName;
      const matchesDistrict =
        !districtName || listing.district === districtName;

      const matchesType =
        !propertyType || listing.propertyType === propertyType;

      const matchesThana = !thana || listing.city === thana;
      const matchesMinPrice = !minPrice || listing.rent >= minPrice;
      const matchesMaxPrice = !maxPrice || listing.rent <= maxPrice;

      // ✅ All active filters must pass
      return (
        matchesDivision &&
        matchesDistrict &&
        matchesType &&
        matchesThana &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [
    data?.data,
    divisionName,
    districtName,
    propertyType,
    thana,
    minPrice,
    maxPrice,
  ]);

  //console.log(listings);

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

  const handleCleanFilters = () => {
    setDistrictName(""),
      setPropertyType(""),
      setThana(""),
      setMinPrice(undefined),
      setMaxPrice(undefined);
  };

  const handleView = async (id: string) => {
    try {
      const result = await recentlyViewed(id).unwrap();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allSavedProperty?.data?.forEach((element: any) => {
      setSavePropertyId((prev) => [...prev, element?.listingId?._id]);
    });
  }, [allSavedProperty]);

  return (
    <div className="mb-20 mt-5">
      <div className="grid 3xs:grid-cols-1 2xs:grid-cols-2 2xs:gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-6 mb-10 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-5 2xl:grid-cols-5 2xl:gap-3">
        <div>
          <p className="text-stone-500 mb-1">Type</p>
          <select
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full  border text-sm border-stone-400 rounded"
          >
            <option value="">Select option</option>
            <option value="family">Family</option>
            <option value="sublet">Sublet</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div>
          <p className="text-stone-500 mb-1">Division</p>
          <select
            onChange={(e) => setDivisionName(e.target.value)}
            className="w-full  border text-sm border-stone-400 rounded"
          >
            <option value="">Select option</option>
            {bangladeshAdministrativeAreas?.map((division: any) => (
              <option key={division.division} value={division.division}>
                {division.division}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-stone-500 mb-1">District</p>
          <select
            onChange={(e) => setDistrictName(e.target.value)}
            className="w-full  border text-sm border-stone-400 rounded"
          >
            {bangladeshAdministrativeAreas
              ?.find((division: any) => division.division === divisionName)
              ?.districts?.map((district: any) => (
                <option key={district.district} value={district.district}>
                  {district.district}
                </option>
              ))}
          </select>
        </div>
        <div>
          <p className="text-stone-500 mb-1">Thana</p>
          <select
            onChange={(e) => setThana(e.target.value)}
            className="w-full  border text-sm border-stone-400 rounded"
          >
            {bangladeshAdministrativeAreas
              ?.find((division: any) => division.division === divisionName)
              ?.districts?.find(
                (district: any) => district.district === districtName
              )
              ?.thanas?.map((thana: any) => (
                <option key={thana.thana} value={thana.thana}>
                  {thana.thana}
                </option>
              ))}
          </select>
        </div>

        <div>
          <p className="text-stone-500 mb-1">Min Price</p>
          <input
            onChange={(e) => setMinPrice(Number(e.target.value))}
            type="number"
            className="w-full border text-sm border-stone-400 rounded"
            name=""
            id=""
          />
        </div>

        <div>
          <p className="text-stone-500 mb-1">Max Price</p>
          <input
            type="number"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full  border text-sm border-stone-400 rounded"
            name=""
            id=""
          />
        </div>

        <div className="2xs:mt-7">
          <button
            onClick={() => handleCleanFilters()}
            className="bg-[tomato] text-white rounded px-4 py-2 "
          >
            Clean filters
          </button>
        </div>
      </div>

      <div className="grid 3xs:grid-cols-1 3xs:gap-y-2 2xs:grid-cols-2 2xs:gap-y-1 2xs:gap-x-1 1xs:gap-3 sm:grid-cols-3 md:grid-cols-3 md:gap-3 1md:grid-cols-4 xl:grid-cols-5 xl:gap-3 2xl:grid-cols-6 2xl:gap-3">
        {listings?.map((list: any) => (
          <div
            key={list?._id}
            className="min-w-[160px] max-w-full 3xs:max-w-[180] 2xs:max-w-[190px] 1xs:max-w-[270px] md:max-w-[270px]
              border flex-shrink-0 rounded"
          >
            <Image
              //src="/hero1.jpg"
              src={list?.propertyImages[0] || "/tolet.jpg"}
              className="w-full h-48 cursor-pointer"
              alt="to-let"
              height={170}
              width={120}
              onClick={() => {
                handleView(list?._id);
                router.push(`/find-toLet/${list?._id}`);
              }}
            />

            <div className="max-h-[200px] p-3">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base break-words 2xs:text-sm">
                    {list?.propertyType}
                  </h3>
                  <p className="text-gray-500 2xs:text-xs text-sm font-light flex justify-start items-end">
                    {list?.thana}, {list?.district}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-center">
                    <TiHeart
                      onClick={() => handleSaveProperty(list?._id)}
                      className={`text-2xl ${
                        savePropertyId.includes(list?._id)
                          ? "text-red-500"
                          : "text-gray-500"
                      } inline-block align-middle`}
                    />
                    <p className="text-[tomato]  2xs:text-sm text-base font-semibold flex justify-start items-end">
                      <TbCurrencyTaka className="text-2xl" />
                      {list?.rent}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <p className="text-gray-500 2xs:text-xs text-base">
                Available from :{" "}
                {new Date(list?.availability).toLocaleString("default", {
                  month: "long",
                })}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-x-1">
                  <IoBedOutline className="text-lg text-gray-500" />
                  <p className="text-sm  1xs:text-xs">{list?.bedroom}</p>
                </div>
                <div className="flex gap-x-1">
                  <PiBathtub className="text-lg text-gray-500" />
                  <p className="text-sm  1xs:text-xs">{list?.bathroom}</p>
                </div>
                <div className="flex gap-x-1">
                  <MdOutlineBalcony className="text-lg text-gray-500" />
                  <p className="text-sm  1xs:text-xs">{list?.balcony}</p>
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
