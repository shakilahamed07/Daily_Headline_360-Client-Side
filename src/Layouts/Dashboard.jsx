import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { IoReturnDownBack } from "react-icons/io5";
import useUserRole from "../Hooks/useUserRole";
import Logo from "../Components/Share/Logo";
import AdminAccessPages from "../Pages/Dashboard/RolebaseAccessPages/AdminAccessPages";
import { MdDashboard } from "react-icons/md";
import useAuth from "../Hooks/useAuth";

const DashBoard = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation()
  console.log(location.pathname)

  const nav = (
    <>
      <li className="bg-gray-300 mb-5 font-bold flex gap-2  rounded">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-primary text-white"
              : "flex items-center gap-2"
          }
        >
          <IoReturnDownBack />
          Back Home Page
        </NavLink>
      </li>

      <li className="bg-gray-300 mb-5 font-bold flex gap-2  rounded">
        <Link
          to="/dashboard"
          className={`${location.pathname === '/dashboard' && 'bg-primary text-white' }`}
        >
          <MdDashboard />
          Dashboard
        </Link>
      </li>

      {/* admin access page */}
      {!roleLoading && role === "admin" && <AdminAccessPages />}

      <li className="bg-gray-300 mb-5 font-bold flex gap-2  rounded">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-2 bg-primary text-white"
              : "flex items-center gap-2"
          }
        >
          <MdDashboard />
          Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      {/* Navbar */}
      <div className="navbar sticky top-0 z-30 flex justify-between bg-base-200">
        <div className="flex items-center">
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <div className="lg:w-40 w-30 ml-2">
            <Logo />
          </div>
        </div>

        <div className="flex items-center md:space-x-4">
          <div className="relative mr-1 sm:mr-5">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 dark:text-gray-800"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-gray-800 dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 border bg-white"
            />
          </div>
          <Link to='/dashboard/profile'
            type="button"
            className="w-10 h-10 font-semibold rounded-full border"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={user.photoURL}
              alt=""
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="max-w-7xl mx-auto">
            <div className="mx-3">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side z-50 lg:z-10 lg:sticky lg:top-15">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu lg:pt-3 bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>
            <div className="text-black">
            {nav}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
