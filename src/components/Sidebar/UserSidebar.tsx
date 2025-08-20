"use client";

import Link from "next/link";
import { useState } from "react";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { RiHome4Line } from "react-icons/ri";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { CgPlayListAdd } from "react-icons/cg";
import { TbHomeCheck } from "react-icons/tb";
import { GiNestedHearts } from "react-icons/gi";
import { GoEye } from "react-icons/go";

const UserSidebar = () => {
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
                <div
                  // style={{
                  //   padding: "9px",
                  //   textTransform: "uppercase",
                  //   fontWeight: "bold",
                  //   fontSize: 14,
                  //   letterSpacing: "1px",
                  // }}

                  className="p-3 font-bold text-xl "
                >
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
            <MenuItem
              icon={<RiHome4Line className="text-3xl text-[tomato]" />}
              component={<Link href="/user/dashboard" />}
            >
              {" "}
              Dashboard
            </MenuItem>
            <MenuItem
              icon={
                <IoArrowForwardCircleOutline className="text-3xl text-[tomato]" />
              }
              component={<Link href="/" />}
            >
              Go to Home
            </MenuItem>
            <MenuItem
              icon={<CgPlayListAdd className="text-3xl text-[tomato]" />}
              component={<Link href="/user/myListings" />}
            >
              {" "}
              My Listings
            </MenuItem>
            <MenuItem
              icon={<TbHomeCheck className="text-3xl text-[tomato]" />}
              component={<Link href="/user/post-toLet" />}
            >
              {" "}
              Add property
            </MenuItem>
            <MenuItem
              icon={<GiNestedHearts className="text-3xl text-[tomato]" />}
              component={<Link href="/user/savedProperty" />}
            >
              {" "}
              Saved Listings
            </MenuItem>
            <MenuItem
              icon={<GoEye className="text-3xl text-[tomato]" />}
              component={<Link href="" />}
            >
              {" "}
              Recently Viewed
            </MenuItem>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
};

export default UserSidebar;
