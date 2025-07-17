import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logo from "../../assets/Logo.png";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const { logOutUser, user, loading } = useAuth();
  const navigate = useNavigate();

  const { data: userRole = {}, isLoading } = useQuery({
    queryKey: ["users2"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/users/role/${user.email}`
      );
      return res.data;
    },
  });

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
        <NavLink to="/" className={`font-medium md:text-white`}>
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-articles" className={`font-medium md:text-white`}>
              Add Articles
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-articles-page"
              className={`font-medium md:text-white`}
            >
              All Articles
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={() => window.scrollTo({ top: 120, behavior: "smooth" })}
              to="/subscription"
              className={`font-medium md:text-white`}
            >
              Subscription
            </NavLink>
          </li>

          {!isLoading && userRole.premiumToken && (
            <li>
              <NavLink
                to="/premium-articles"
                className={`font-medium md:text-white`}
              >
                Premium Articles*
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/my-articles" className={`font-medium md:text-white`}>
              My Articles
            </NavLink>
          </li>

          {!isLoading && userRole.role === "admin" && (
            <li>
              <NavLink to="/dashboard" className={`font-medium md:text-white`}>
                Dashboard
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-300 border-b-3 border-primary">
      <div className="navbar mb-3 justify-between items-center max-w-[1350px] mx-auto">
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
              <img className="w-31 ml-2 sm:hidden" src={Logo} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow flex justify-start"
            >
              {Links}
            </ul>
          </div>
          <ul className="menu hidden md:flex menu-horizontal px-1 ">{Links}</ul>
        </div>
        <div className="md:navbar-end flex relative">
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
              className="bg-primary hover:bg-secondary text-white font-bold py-1.5 px-4 rounded-md ml-4 sm:flex"
            >
              Log Out
            </button>
          )}

          {user && (
            <>
              <div>
                <img
                  className="h-10 w-10 bg-base-300 rounded-full ml-5 border border-primary"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
