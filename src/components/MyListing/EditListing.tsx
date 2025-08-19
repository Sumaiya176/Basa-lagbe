"use client";

import { BiEdit } from "react-icons/bi";
import { useParams } from "next/navigation";
import {
  useUpdateListingMutation,
  useGetSingleListingQuery,
} from "@/redux/features/listing/listingApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export type Inputs = {
  propertyType: "family" | "sublet" | "office";
  bedroom: number;
  bathroom: number;
  balcony: number;
  size?: number;
  availability: string;
  description?: string;
  street?: string;
  city: string;
  district: string;
  area: string;
  rent: number;
  advance: number;
  noticePeriod: number;
  electricity: boolean | null;
  gas: boolean | null;
  water: boolean | null;
  rentNegotiable?: boolean | null;
  internet: boolean | null;
  security: boolean | null;
  swimmingPool: boolean | null;
  furnished: boolean | null;
  parking: boolean | null;
  intercom: boolean | null;
  childrenPlayArea: boolean | null;
  lift: boolean | null;
  servantQuarter: boolean | null;
  waterHeater: boolean | null;
  generator: boolean | null;
  fitnessCenter: boolean | null;
  ac: boolean | null;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  preferredContact: "phoneCall" | "email" | "whatsapp";
  propertyImages: string[];
};

const notify = (text: string) => toast(text);

interface IListing extends Inputs {
  _id: string;
}

const EditListing = ({ listing }: any) => {
  const params = useParams<{ id: string }>();
  const [updateListing] = useUpdateListingMutation();
  const { data } = useGetSingleListingQuery(params?.id);

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //   const formData = new FormData();
    //   keys.forEach((key) => {
    //     formData.append(key, String(data[key]));
    //   });
    //   if (data.propertyImages && data.propertyImages.length > 0) {
    //     Array.from(data.propertyImages).forEach((file: string) => {
    //       formData.append("propertyImages", file);
    //     });
    //   }
    try {
      const result = await updateListing(data).unwrap();
      console.log(result, result?.isSuccess);
      if (result?.isSuccess) {
        //console.log(result?.message);
        notify(result?.message);
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
  };
  return (
    <div>
      <div className="mt-5">
        <p className="text-2xl font-extrabold">Property details</p>
        <p className="text-gray-400 ">Tell us about your property for rent</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:grid md:grid-cols-3 md:gap-10 mt-6">
            <div>
              <p className="font-medium">Property Type</p>
              <select
                defaultValue={listing.propertyType}
                {...register("propertyType", { required: true })}
                className="border border-stone-400 rounded mt-2 h-12 px-4 w-full"
              >
                <option value="family">Family</option>
                <option value="sublet">Sublet</option>
                <option value="office">Office</option>
              </select>
              {errors.propertyType && (
                <span className="text-red-600">Property Type is required</span>
              )}
            </div>

            <div>
              <p className="font-medium">Bedrooms</p>
              <input
                defaultValue={listing.bedroom}
                type="number"
                placeholder="e.g. 3"
                className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                {...register("bedroom", {
                  required: "Bedroom is required",
                  valueAsNumber: true,
                  validate: (value) => {
                    if (value < 0) {
                      return "Bedroom cannot be less than zero";
                    }
                  },
                })}
              />
              {errors.bedroom && (
                <span className="text-red-600">{errors.bedroom.message}</span>
              )}
            </div>
            <div>
              <p className="font-medium">Bathrooms</p>
              <input
                defaultValue={listing.bathroom}
                placeholder="e.g. 2"
                className="border border-stone-400 rounded px-4 mt-2 h-12 w-full"
                type="number"
                {...register("bathroom", {
                  required: "Bedroom is required",
                  valueAsNumber: true,
                  validate: (value) => {
                    if (value < 0) {
                      return "Bathroom cannot be less than zero";
                    }
                  },
                })}
              />
              {errors.bathroom && (
                <span className="text-red-600">
                  {errors?.bathroom?.message}
                </span>
              )}
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-10 mt-6">
            <div>
              <p className="font-medium">Balcony</p>
              <input
                placeholder="e.g. 2"
                type="number"
                className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                {...register("balcony", { valueAsNumber: true })}
              />
              {errors.balcony && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div>
              <p className="font-medium">Size (sqft) </p>
              <input
                placeholder="e.g. 1200"
                type="number"
                className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                {...register("size", { valueAsNumber: true })}
              />
              {errors.size && (
                <span className="text-red-600">Size (sqft) is required</span>
              )}
            </div>
            <div>
              <p className="font-medium">Availability</p>
              <input
                className="border border-stone-400 rounded px-4 mt-2 h-12 w-full"
                type="date"
                {...register("availability", {
                  required: "Availability is required",
                  valueAsDate: true,
                  validate: (value) => {
                    const dateValue = value as unknown as Date; // 👈 Assert the type
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (dateValue < today) {
                      return "Availability cannot be less than current date";
                    }
                  },
                })}
              />
              {errors.availability && (
                <span className="text-red-600">
                  {errors?.availability?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium">Description</p>
            <textarea
              placeholder="Provide a detailed description of the property..."
              className="border border-stone-400 rounded p-4 mt-2 h-32 w-full"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-600">Description is required</span>
            )}
          </div>

          <div className="mt-14">
            <p className="text-2xl font-extrabold">Location Details</p>
            <p className="text-gray-400 ">Where is your property Location ?</p>
            <div className="md:grid md:grid-cols-3 md:gap-10 mt-6">
              <div>
                <p className="font-medium">Street</p>
                <input
                  placeholder="e.g. House 12, Road 5"
                  type="text"
                  className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                  {...register("street")}
                />
                {errors.street && (
                  <span className="text-red-600">Street is required</span>
                )}
              </div>

              <div>
                <p className="font-medium">City </p>
                <input
                  placeholder="e.g. Dhaka"
                  type="text"
                  className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <span className="text-red-600">{errors.city.message}</span>
                )}
              </div>
              <div>
                <p className="font-medium">District</p>
                <input
                  className="border border-stone-400 rounded px-4 mt-2 h-12 w-full"
                  type="text"
                  {...register("district", {
                    required: "District is required",
                  })}
                />
                {errors.district && (
                  <span className="text-red-600">
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium">Area / Locality </p>
              <input
                placeholder="e.g. Gulshan 1"
                type="text"
                className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                {...register("area", { required: "Area is required" })}
              />
              {errors.area && (
                <span className="text-red-600">{errors.area.message}</span>
              )}
            </div>
          </div>

          <div className="mt-14">
            <p className="text-2xl font-extrabold">Rental Specifies</p>
            <p className="text-gray-400 ">
              Set the terms and prices for your rental.
            </p>
            <div className="md:grid md:grid-cols-3 md:gap-10 mt-6">
              <div>
                <p className="font-medium">Monthly Rent (BDT)</p>
                <input
                  placeholder="e.g. 25000"
                  type="number"
                  className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                  {...register("rent", {
                    required: "Monthly Rent is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.rent && (
                  <span className="text-red-600">
                    Monthly Rent (BDT) is required
                  </span>
                )}
              </div>

              <div>
                <p className="font-medium">Advance </p>
                <input
                  placeholder="e.g. 50000"
                  type="number"
                  className="border border-stone-400 rounded mt-2 px-4 h-12 w-full"
                  {...register("advance", { valueAsNumber: true })}
                />
                {errors.advance && (
                  <span className="text-red-600">Advance is required</span>
                )}
              </div>
              <div>
                <p className="font-medium">
                  Notice Period before leave (Months)
                </p>
                <input
                  className="border border-stone-400 rounded px-4 mt-2 h-12 w-full"
                  type="number"
                  {...register("noticePeriod", { valueAsNumber: true })}
                />
                {errors.noticePeriod && (
                  <span className="text-red-600">
                    Notice Period before leave is required
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium">Utilities included </p>
              <div className="md:flex md:justify-between">
                <fieldset className="fieldset rounded-box w-40 p-4">
                  <label className="label font-medium">
                    <input
                      type="checkbox"
                      className="checkbox border border-stone-500"
                      {...register("electricity")}
                    />
                    Electricity
                  </label>
                </fieldset>
                <fieldset className="fieldset rounded-box w-28 p-4">
                  <label className="label font-medium">
                    <input
                      type="checkbox"
                      className="checkbox border border-stone-500"
                      {...register("gas")}
                    />
                    Gas
                  </label>
                </fieldset>
                <fieldset className="fieldset rounded-box w-32 p-4">
                  <label className="label font-medium">
                    <input
                      type="checkbox"
                      className="checkbox border border-stone-500"
                      {...register("water")}
                    />
                    Water
                  </label>
                </fieldset>
                <fieldset className="fieldset rounded-box w-36 border p-4">
                  <label className="label font-medium">
                    <input
                      type="checkbox"
                      className="checkbox border border-stone-500"
                      {...register("internet")}
                    />
                    Internet
                  </label>
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset w-64 p-4">
                  <label className="label font-medium">
                    Rent Negotiable
                    <input
                      type="checkbox"
                      {...register("rentNegotiable")}
                      className="toggle text-green-500"
                    />
                  </label>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-2xl font-extrabold">Amenities</p>
            <p className="text-gray-400 mt-2">
              Select the amenities available with your property.
            </p>
            <div className="grid grid-cols-2 md:grid md:grid-cols-4 mt-6">
              <div className="">
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("security", {})}
                  />{" "}
                  <p className="font-medium">Security</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("swimmingPool", {})}
                  />{" "}
                  <p className="font-medium">Swimming Pool</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("furnished", {})}
                  />{" "}
                  <p className="font-medium">Furnished</p>
                </div>
              </div>
              <div className="">
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("intercom", {})}
                  />{" "}
                  <p className="font-medium">Intercom</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("childrenPlayArea", {})}
                  />{" "}
                  <p className="font-medium">Children&apos;s Play Area</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("lift", {})}
                  />{" "}
                  <p className="font-medium">Lift</p>
                </div>
              </div>
              <div className="">
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("waterHeater", {})}
                  />{" "}
                  <p className="font-medium">Water Heater</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("generator", {})}
                  />{" "}
                  <p className="font-medium">Generator</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("fitnessCenter", {})}
                  />{" "}
                  <p className="font-medium">Fitness Center</p>
                </div>
              </div>
              <div className="">
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("parking", {})}
                  />{" "}
                  <p className="font-medium">Parking</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("servantQuarter", {})}
                  />{" "}
                  <p className="font-medium">Servant Quarters</p>
                </div>
                <div className="flex gap-6 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox border border-stone-500 checkbox-md"
                    {...register("ac", {})}
                  />{" "}
                  <p className="font-medium">AC</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-10">
              <p className="text-2xl font-extrabold">Property Images</p>
              <p className="text-gray-400 mt-2">
                Upload high-quality photos of your property. Max 10 images.
              </p>
              <input
                {...register("propertyImages")}
                type="file"
                multiple
                accept="image/*"
                className="file-input file-input-neutral"
              />
            </div> */}

          <div className="mt-10">
            <p className="text-2xl font-extrabold">Contact Information</p>
            <p className="text-gray-400 mt-2">
              How can prospective tenants get in touch with you?
            </p>

            <div className="md:grid md:grid-cols-2 gap-10 md:my-6">
              <div>
                <p className="font-medium">Full Name</p>
                <input
                  type="text"
                  {...register("ownerName", { required: true })}
                  className="border border-stone-400 rounded mt-2 h-12 px-4 w-full"
                />

                {errors.ownerName && (
                  <span className="text-red-600">Full Name is required</span>
                )}
              </div>
              <div>
                <p className="font-medium">Email Address</p>
                <input
                  type="email"
                  placeholder="test"
                  {...register("ownerEmail", {
                    required: "Email Address is required",
                  })}
                  className="border border-stone-400 rounded mt-2 h-12 px-4 w-full"
                />
                {errors.ownerEmail && (
                  <span className="text-red-600">
                    {errors.ownerEmail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 gap-10">
              <div>
                <p className="font-medium">Phone Number</p>
                <input
                  type="text"
                  placeholder="e.g. 01xxxxxxxxx"
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                  className="border border-stone-400 rounded mt-2 h-12 px-4 w-full"
                />

                {errors.phone && (
                  <span className="text-red-600">{errors.phone.message}</span>
                )}
              </div>
              <div>
                <p className="font-medium">Preferred Contact Method</p>
                {/* <input
                  {...register("preferredContact", { required: true })}
                  className="border border-stone-400 rounded mt-2 h-12 px-4 w-full"
                /> */}
                <div className="flex gap-10 mt-3">
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      {...register("preferredContact")}
                      value="phoneCall"
                      className="radio radio-neutral"
                    />
                    <p>Phone call</p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      {...register("preferredContact")}
                      value="email"
                      className="radio radio-neutral"
                    />
                    <p>Email</p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      value="whatsapp"
                      className="radio radio-neutral"
                      {...register("preferredContact")}
                    />
                    <p>WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <input
              type="submit"
              className="py-4 px-16 font-semibold rounded bg-green-500 text-white"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditListing;
