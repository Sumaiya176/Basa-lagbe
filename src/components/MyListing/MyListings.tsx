"use client";

import {
  useUpdateListingMutation,
  useDeleteListingMutation,
  useMyListingQuery,
} from "@/redux/features/listing/listingApi";
import React from "react";
import { Inputs } from "../PostToLet";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "./EditListing";
import Link from "next/link";
import EditListing from "./EditListing";

export interface IListing extends Inputs {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const notify = (text: string) => toast(text);

const MyListings = () => {
  const { data } = useMyListingQuery(undefined);
  const [updateListing] = useUpdateListingMutation();
  const [deleteListing] = useDeleteListingMutation();

  //console.log(data?.data);

  const handleDeleteListing = async (id: string) => {
    try {
      const result = await deleteListing(id).unwrap();
      console.log(result);
      if (result?.isSuccess === true) {
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };

  const handleUpdateListing = async (id: string) => {
    try {
      const result = await deleteListing(id).unwrap();
      console.log(result);
      if (result?.isSuccess === true) {
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };
  return (
    <div>
      <p className="text-center text-2xl font-semibold">My Listings</p>
      <div className="overflow-x-auto mt-10">
        <table className="table table-xl table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Property type</td>
              <td>Bedroom</td>
              <td>Bathroom</td>
              <td>Balcony</td>
              <td>Size(sqft)</td>
              <td>Street</td>
              <td>City</td>
              <td>District</td>
              <td>Area/Locality</td>
              <td>Rent</td>
              <td>Advance</td>
              <td>Notice Period</td>
              <td>Owner Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.data?.listingHistory?.map((listing: IListing, i: number) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{listing?.propertyType}</td>
                <td>{listing?.bedroom}</td>
                <td>{listing?.bathroom}</td>
                <td>{listing?.balcony}</td>
                <td>{listing?.size}</td>

                <td>{listing?.street}</td>
                <td>{listing?.city}</td>
                <td>{listing?.district}</td>
                <td>{listing?.area}</td>
                <td>{listing?.rent}</td>
                <td>{listing?.advance}</td>
                <td>{listing?.noticePeriod}</td>
                <td>{listing?.ownerName}</td>
                <td>{listing?.ownerEmail}</td>
                <td>{listing?.phone}</td>
                <td className="flex gap-4">
                  <Link href="/user/editListing">
                    <BiEdit className="text-[tomato] text-2xl" />
                    {/* <EditListing listing={listing} /> */}
                  </Link>
                  <button>
                    <RiDeleteBinLine
                      onClick={() => handleDeleteListing(listing?._id)}
                      className="text-red-600 text-2xl"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyListings;
