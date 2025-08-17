import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import logo from "../../assets/Logo.png";
import useAuth from "../../Hooks/useAuth";
import {
  FaHome,
  FaPlusCircle,
  FaListAlt,
  FaCrown,
  FaRegNewspaper,
  FaBell,
} from "react-icons/fa";
import { MdDashboard, MdSubscriptions } from "react-icons/md";
import useUserRole from "../../Hooks/useUserRole";

const Navbar = () => {
  const { logOutUser, user } = useAuth();
  const navigate = useNavigate();

  const { roleLoading, userInfo } = useUserRole();

  const hendleLogout = () => {
    logOutUser()
      .then(() => {
        navigate("/");
        toast.success("Logout successfully");
      })
      .catch(() => {});
  };

  const [them, setThem] = useState("light");

  useEffect(() => {
    if (them) {
      document.querySelector("html").setAttribute("data-theme", them);
    } else {
      console.log("light");
    }
  }, [them]);

  const hendleTheme = () => {
    setThem(them === "dark" ? "light" : "dark");
  };

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={`font-medium md:text-white flex items-center gap-2`}
        >
          <FaHome /> Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-articles-page"
          className={`font-medium md:text-white flex items-center gap-2 `}
        >
          <FaListAlt /> All Articles
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => window.scrollTo({ top: 120, behavior: "smooth" })}
          to="/subscription"
          className={`font-medium md:text-white flex items-center gap-2`}
        >
          <FaBell /> Subscription
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-articles"
              className={`font-medium md:text-white flex items-center gap-2`}
            >
              <FaPlusCircle /> Add Articles
            </NavLink>
          </li>

          {!roleLoading && userInfo?.premiumToken && (
            <li>
              <NavLink
                to="/premium-articles"
                className={`font-medium md:text-white flex items-center gap-2`}
              >
                <FaCrown /> Premium Articles
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/my-articles"
              className={`font-medium md:text-white flex items-center gap-2`}
            >
              <FaRegNewspaper /> My Articles
            </NavLink>
          </li>

          {!roleLoading && userInfo?.role === "admin" && (
            <li>
              <NavLink
                to="/dashboard"
                className={`font-medium md:text-white flex items-center gap-2`}
              >
                <MdDashboard /> Dashboard
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-300  shadow-md">
      <div className="navbar justify-between items-center max-w-[1250px] mx-auto">
        <div className="flex ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost md:hidden pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
              <img className="w-31 ml-2 sm:hidden" src={logo} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 w-60 h-screen p-2 -mt-13 shadow flex justify-start -ml-4 z-95 space-y-3"
            >
              <div className="flex justify-between">
                <img className="w-35 mb-3 pl-2 pt-2 sm:hidden" src={logo} alt="" />
                <label className="swap swap-rotate sm:mr-5 md:hidden">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller"
                    onClick={hendleTheme}
                    value=""
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <hr className="bg-gray-50 mb-3 sm:hidden" />
              {Links}
            </ul>
          </div>
          <ul className="menu hidden md:flex menu-horizontal px-1 ">{Links}</ul>
        </div>
        <div className="flex relative items-center">
          <label className="swap swap-rotate sm:mr-3 md:block hidden">
            <div className="flex">
              {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              onClick={hendleTheme}
              value=""
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current -mr-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
            </div>
          </label>

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-primary hover:bg-secondary text-white font-bold py-1.5 px-4 rounded-md "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary hover:bg-secondary text-white font-bold py-1.5 px-4 rounded-md ml-4 "
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={hendleLogout}
              className="bg-primary hover:bg-secondary text-white font-bold py-1.5 px-4 rounded-md ml-4 sm:flex w-25 sm:w-30 lg:w-25 h-10"
            >
              Log Out
            </button>
          )}

          {user && (
            <>
              <Link to="/profile" className="pr-1">
                <img
                  className="h-10 w-10 bg-base-300 rounded-full ml-5 border border-primary"
                  src={user?.photoURL}
                  alt=""
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
