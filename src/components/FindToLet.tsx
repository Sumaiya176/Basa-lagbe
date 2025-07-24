"use client";
import { listings } from "@/utils/Listings";
import { Button } from "flowbite-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const FindToLet = () => {
  return (
    <div>
      <div className="flex justify-center gap-20 mb-10">
        <div>
          <p className="text-base font-semibold mb-1">Type</p>
          <select className="w-40 border text-sm border-stone-400">
            <option value="family">Family</option>
            <option value="sublet">Sublet</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div>
          <p className="text-base font-semibold mb-1">District</p>
          <select className="w-40 border text-sm border-stone-400">
            <option>Dhaka</option>
          </select>
        </div>
        <div>
          <p className="text-base font-semibold mb-1">City</p>
          <select className="w-40 border text-sm border-stone-400">
            <option>Dhaka</option>
          </select>
        </div>
      </div>

      <div className="grid 1xs:grid-cols-2 2xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-y-6">
        {listings?.map((list) => (
          <div
            key={list?.id}
            className="min-w-[160px] max-w-full 1xs:w-[160px] md:min-w-[245px] md:max-w-[245px]
              border flex-shrink-0"
          >
            <Image
              src="/room1.jpg"
              className="object-contain w-full"
              alt="to-let"
              height={170}
              width={120}
            />
            <div className="overflow-y-auto max-h-[200px]">
              <h3 className="text-gray-400 text-sm mb-2 break-words">
                {list?.title}
              </h3>
            </div>
            <p className="text-gray-500 text-sm font-semibold flex justify-end items-end">
              {list?.address?.street}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindToLet;
