"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { TSidebar } from "@/interfaces/interfaces";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

const UserSidebar = ({ sidebarData }: { sidebarData: TSidebar[] }) => {
  const [logOut] = useLogoutMutation();
  const user = useAppSelector(currentUser);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const dispatch = useAppDispatch();

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      const result = await logOut("").unwrap();
      if (result?.isSuccess) {
        notify(result?.message);
      }
      console.log(result);
      console.log();
      // router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-screen">
      {" "}
      {/* Full height */}
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100%" }}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        <div className="flex flex-col h-full">
          {/* ---------- TOP MENU ---------- */}
          <main className="flex-1">
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<FiChevronsRight className="text-3xl text-[#10ab20]" />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={
                    <FiChevronsLeft className="text-3xl text-[#10ab20]" />
                  }
                  onClick={handleCollapsedChange}
                >
                  <div className="p-3 font-bold text-xl ">
                    <Link href="/">Basa Lagbe</Link>
                  </div>
                </MenuItem>
              )}
              <hr />
            </Menu>

            <Menu
              menuItemStyles={{
                button: {
                  [`&.active`]: {
                    backgroundColor: "#13395e",
                    color: "#b6c8d9",
                  },
                },
              }}
            >
              {sidebarData?.map((data: TSidebar) => (
                <MenuItem
                  key={data?.id}
                  icon={data?.icon}
                  component={<Link href={data?.url} />}
                >
                  {data?.title}
                </MenuItem>
              ))}
            </Menu>
          </main>

          {/* ---------- BOTTOM MENU ---------- */}
          <div className="border-t">
            <Menu>
              <MenuItem
                icon={
                  <HiOutlineUser className="text-2xl font-bold text-[tomato]" />
                }
              >
                {user?.name}
              </MenuItem>
              <MenuItem
                icon={<BiLogOutCircle className="text-2xl text-[tomato]" />}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <ToastContainer />
    </div>
  );
};

export default UserSidebar;
