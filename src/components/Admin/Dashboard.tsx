"use client";

import {
  useGetAllListingQuery,
  useGetSavedPropertyQuery,
  useGetViewedPropertyQuery,
} from "@/redux/features/listing/listingApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import React from "react";

const Dashboard = () => {
  const { data: allListings } = useGetAllListingQuery(undefined);
  const { data: allUsers } = useGetAllUsersQuery(undefined);
  const { data: savedProperty } = useGetSavedPropertyQuery(undefined);
  const { data: ViewedProperty } = useGetViewedPropertyQuery(undefined);
  return (
    <div className="grid 3xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 3xs:gap-5 gap-10">
      <div className="3xs:w-52 2xs:max-w-full sm:min-w-60 sm:max-w-full md:w-96 md:h-52 rounded flex justify-center items-center 3xs:text-xl md:text-3xl text-bold bg-stone-200">
        <p className="p-9">Total Listings {allListings?.data?.length}</p>
      </div>
      <div className="3xs:w-52 2xs:max-w-full sm:min-w-60 sm:max-w-full md:w-96 md:h-52 rounded flex justify-center items-center 3xs:text-xl md:text-3xl text-bold bg-stone-200">
        <p className="p-9">Total Users {allUsers?.data?.length}</p>
      </div>
      <div className="3xs:w-52 2xs:max-w-full sm:min-w-60 sm:max-w-full md:w-96 md:h-52 rounded flex justify-center items-center 3xs:text-xl md:text-3xl text-bold bg-stone-200">
        <p className="p-9">
          Total My Saved Listings {savedProperty?.data?.length}
        </p>
      </div>
      <div className="3xs:w-52 2xs:max-w-full sm:min-w-60 sm:max-w-full md:w-96 md:h-52 rounded flex justify-center items-center 3xs:text-xl md:text-3xl text-bold bg-stone-200">
        <p className="p-9">
          Total My Viewed Listings: {ViewedProperty?.data?.length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
