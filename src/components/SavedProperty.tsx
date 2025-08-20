"use client";

import {
  useGetSavedPropertyQuery,
  useRemoveSavedPropertyMutation,
} from "@/redux/features/listing/listingApi";
import { useState } from "react";
import { IListing } from "./MyListing/MyListings";
import { ToastContainer, toast } from "react-toastify";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
};

const notify = (text: string) => toast(text);

const SavedProperty = () => {
  const { data } = useGetSavedPropertyQuery(undefined);
  const [removeSavedProperty] = useRemoveSavedPropertyMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  console.log("data", data?.data);

  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data && data?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRemoveProperty = async (id: string) => {
    try {
      const result = await removeSavedProperty(id).unwrap();
      console.log(result);
      if (result?.isSuccess) {
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <p className="text-3xl font-extrabold mb-10">Saved Listings</p>
      <div className="overflow-x-auto border">
        <table className="min-w-full text-base text-center">
          <thead className="text-base bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Saved At</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((listing: IListing, i: number) => (
              <tr
                key={listing._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">
                  <p>{listing?.propertyType}</p>
                  <p className="text-gray-400">
                    {listing?.area}, {listing?.city}, {listing?.district}
                  </p>
                </td>
                <td className="px-4 py-3">
                  {new Date(listing?.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 space-x-3 space-y-2">
                  <button className="bg-stone-500 py-3 px-5 text-white rounded">
                    View
                  </button>
                  <button
                    onClick={() => handleRemoveProperty(listing._id)}
                    className="bg-red-500 py-3 px-5 text-white rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ ------------- Pagination --------------- */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {totalPages > 0 &&
          [...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SavedProperty;
