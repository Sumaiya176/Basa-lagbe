// app/(main)/layout.tsx

import "@/app/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RiHome4Line } from "react-icons/ri";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { CgPlayListAdd } from "react-icons/cg";
import { TbHomeCheck } from "react-icons/tb";
import { GiNestedHearts } from "react-icons/gi";
import { GoEye } from "react-icons/go";
import ProtectedRoute from "../(main)/ProtectedRoute";

const sidebarData = [
  {
    id: 1,
    icon: <RiHome4Line className="text-2xl text-[tomato]" />,
    title: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    id: 2,
    icon: <IoArrowForwardCircleOutline className="text-2xl text-[tomato]" />,
    title: "Go to Home",
    url: "/",
  },
  {
    id: 3,
    icon: <TbHomeCheck className="text-2xl text-[tomato]" />,
    title: "All Users",
    url: "/admin/allUsers",
  },
  {
    id: 4,
    icon: <CgPlayListAdd className="text-2xl text-[tomato]" />,
    title: "All Listings",
    url: "/admin/allListings",
  },
  // {
  //   id: 5,
  //   icon: <GiNestedHearts className="text-2xl text-[tomato]" />,
  //   title: "Saved Listings",
  //   url: "/user/savedProperty",
  // },
  // {
  //   id: 6,
  //   icon: <GoEye className="text-2xl text-[tomato]" />,
  //   title: "Recently Viewed",
  //   url: "",
  // },
];
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarData={sidebarData} />
      <ProtectedRoute>
        <main className="flex-1 p-4">{children}</main>
      </ProtectedRoute>
    </div>
  );
}
