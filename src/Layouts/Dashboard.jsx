import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome } from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import Logo from "../Components/Share/Logo";
import AdminAccessPages from "../Pages/Dashboard/RolebaseAccessPages/AdminAccessPages";


const DashBoard = () => {
  const { role, roleLoading } = useUserRole();
  // console.log(role)

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
          <FaHome />
          Back Home Page
        </NavLink>
      </li>
      
      <li className="bg-gray-300 mb-5 font-bold flex gap-2  rounded">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center  gap-2 bg-primary text-white"
              : "flex items-center gap-2"
          }
        >
          <FaHome />
          Dashboard Home
        </NavLink>
      </li>

      {/* admin access page */}
      {!roleLoading && role === "admin" && <AdminAccessPages />}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar w-full  lg:hidden bg-base-300">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="w-25 ml-2">
            <Logo />
          </div>
        </div>

        {/* Page content here */}
        <div className="max-w-6xl mx-auto">
          <div className="mx-3">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-gray-50 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="mb-8">
            <Logo/>
          </div>
          {nav}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
