"use client";

import Link from "next/link";
import { useState } from "react";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { TSidebar } from "@/interfaces/interfaces";

const UserSidebar = ({ sidebarData }: { sidebarData: TSidebar[] }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };
  return (
    <div>
      <Sidebar
        // rootStyles={{
        //   backgroundColor: "#f0f2f5",
        //   color: "#333",
        // }}
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100%" }}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        <main>
          <Menu>
            {collapsed ? (
              <MenuItem
                icon={<FiChevronsRight className="text-3xl text-[#10ab20]" />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FiChevronsLeft className="text-3xl text-[#10ab20]" />}
                onClick={handleCollapsedChange}
                //component={<Link href="/user/myListings" />
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
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
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
                {" "}
                {data?.title}
              </MenuItem>
            ))}
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
};

export default UserSidebar;
