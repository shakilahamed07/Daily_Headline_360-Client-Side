import React from "react";
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
  FaUserShield,
  FaBell,
} from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
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
          className={`font-medium md:text-white flex items-center gap-2`}
        >
          <FaListAlt /> All Articles
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

          <li>
            <NavLink
              onClick={() => window.scrollTo({ top: 120, behavior: "smooth" })}
              to="/subscription"
              className={`font-medium md:text-white flex items-center gap-2`}
            >
              <FaBell /> Subscription
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
                <FaUserShield /> Dashboard
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-300 border-b-2 border-primary">
      <div className="navbar justify-between items-center max-w-[1350px] mx-auto">
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
              className="menu menu-sm dropdown-content bg-base-100 w-60 h-screen p-2 -mt-13 shadow flex justify-start -ml-4 z-95"
            >
              <a>
                <img className="w-35 mb-3 sm:hidden" src={logo} alt="" />
              </a>
              <hr className="bg-gray-50 mb-3 sm:hidden" />
              {Links}
            </ul>
          </div>
          <ul className="menu hidden md:flex menu-horizontal px-1 ">{Links}</ul>
        </div>
        <div className="flex relative">
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
