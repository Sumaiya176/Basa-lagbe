"use client";

import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProtectedRoute from "@/app/(main)/ProtectedRoute";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { RiHome4Line } from "react-icons/ri";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { CgPlayListAdd } from "react-icons/cg";
import { TbHomeCheck } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";

const basicSidebarData = [
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
    id: 3,
    icon: <TbHomeCheck className="text-2xl text-[tomato]" />,
    title: "All Admins",
    url: "/admin/allAdmins",
  },
  {
    id: 4,
    icon: <CgPlayListAdd className="text-2xl text-[tomato]" />,
    title: "All Listings",
    url: "/admin/allListings",
  },
];

const createAdmin = {
  id: 5,
  icon: <GrUserAdmin className="text-2xl text-[tomato]" />,
  title: "Create Admin",
  url: "/admin/createAdmin",
};
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(currentUser);
  const sidebarData =
    user?.role === "admin"
      ? basicSidebarData
      : [...basicSidebarData, createAdmin];
  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarData={sidebarData} />
      <ProtectedRoute>
        <main className="flex-1 p-4">{children}</main>
      </ProtectedRoute>
    </div>
  );
};

export default AdminLayout;
