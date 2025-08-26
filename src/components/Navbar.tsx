"use client";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { currentToken, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

const Navbar = () => {
  const [logOut] = useLogoutMutation();
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  const notify = (text: string) => toast(text);

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

            <li>
              <Link href="/user/myListings">User Listings</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              {token ? (
                <button className="cursor-pointer" onClick={handleLogout}>
                  {" "}
                  LogOut
                </button>
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
          <li>
            <Link href="/user/myListings">User Listings</Link>
          </li>
          <li>
            <Link href="/aboutUs">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            {token ? (
              <button className="cursor-pointer" onClick={handleLogout}>
                {" "}
                LogOut
              </button>
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
