"use client";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  currentToken,
  currentUser,
  logout,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const token = useAppSelector(currentToken);
  const user = useAppSelector(currentUser);
  console.log(user);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/user/post-toLet">Post To-Let</Link>
            </li>

            {user && (
              <li>
                {user?.role === "user" ? (
                  <Link href="/user/dashboard">User Listings</Link>
                ) : user?.role === "admin" || "superAdmin" ? (
                  <Link href="/admin/dashboard">Admin</Link>
                ) : null}
              </li>
            )}
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            {/* <li onClick={() => handleLogout()}>Logout</li> */}
            <li>
              {token ? (
                <Link href="/profile">
                  <div className="avatar">
                    <div className="mask mask-hexagon-2 w-8">
                      <Image
                        src="/userAvatar.png"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      <p className="text-center">{user?.name}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link className="cursor-pointer" href="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
        <a
          href="/"
          className="font-extrabold 3xs:text-xs 2xs:text-sm sm:text-xl md:text-2xl cursor-pointer "
        >
          Basa Lagbe
        </a>
      </div>
      <div className="navbar-end gap-20 hidden  lg:flex">
        <ul className="menu menu-horizontal px-1 m-auto">
          <li>
            <Link href="/user/post-toLet">Post To-Let</Link>
          </li>
          {user && (
            <li>
              {user?.role === "user" ? (
                <Link href="/user/dashboard">User Listings</Link>
              ) : user?.role === "admin" || "superAdmin" ? (
                <Link href="/admin/dashboard">Admin</Link>
              ) : null}
            </li>
          )}
          <li>
            <Link href="/aboutUs">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

          {/* <li onClick={() => handleLogout()}>Logout</li> */}
          <li>
            {token ? (
              <Link href="/profile">
                <div className="avatar">
                  <div className="mask mask-hexagon-2 w-8">
                    <Image
                      src="/userAvatar.png"
                      alt="user"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="flex justify-center items-center ps-2 text-[tomato]">
                    {user?.name}
                  </span>
                </div>
              </Link>
            ) : (
              <Link className="cursor-pointer" href="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
      <ToastContainer />
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>

    // <div classNameName="grid grid-cols-1 md:grid-cols-2">
    //   <div>
    //     <p classNameName="text-xl font-semibold">Basa Lagbe</p>
    //   </div>
    //   <div classNameName=" md:flex md:gap-20 font-light">
    //     <p>All Jobs</p>
    //     <p>Post To-Let</p>
    //     <p>Dashboard</p>
    //     <p>Profile</p>
    //     <p>LogOut</p>
    //   </div>
    // </div>
  );
};

export default Navbar;
