import React from "react";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router";

const ErrorElement = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <FaNewspaper className="text-red-600 text-6xl mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found!
      </h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorElement;
