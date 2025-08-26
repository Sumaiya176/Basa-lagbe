"use client";

import React from "react";
import Table from "./Table";
import { useGetAllListingQuery } from "@/redux/features/listing/listingApi";
import { Column, IListing } from "@/interfaces/interfaces";

const AllListings = () => {
  const { data } = useGetAllListingQuery(undefined);
  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
    // Example: navigate to edit page
    // router.push(`/admin/edit-user/${id}`)
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
  };
  const columns: Column<Partial<IListing>>[] = [
    { key: "propertyType", header: "propertyType", className: "min-w-[160px]" },
    { key: "bedroom", header: "bedroom", className: "min-w-[120px]" },
    {
      key: "bathroom",
      header: "bathroom",
      className: "min-w-[100px]",
    },
    { key: "balcony", header: "balcony", className: "min-w-[100px]" },
    {
      key: "availability",
      header: "availability",
      className: "min-w-[140px]",
      render: (row) =>
        new Date(row.availability as string).toLocaleDateString(),
    },
    {
      key: "_id",
      header: "Actions",
      className: "min-w-[160px]",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row._id as string)}
            className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id as string)}
            className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-stone-900">
        All To-Let Listings
      </h1>

      <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:p-6">
        <Table<IListing>
          data={data?.data}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>

      <p className="mt-4 text-sm text-stone-500">
        <span className="text-red-500">*</span> Click on column headers to sort.
      </p>
    </main>
  );
};

export default AllListings;
