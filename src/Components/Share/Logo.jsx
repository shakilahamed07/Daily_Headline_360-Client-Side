import React from "react";
import logo from "../../assets/Logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
        <img className="mb-1 w-[150px]" src={logo} alt="" />
    </Link>
  );
};

export default Logo;