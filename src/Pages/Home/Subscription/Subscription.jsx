import React, { useState } from "react";
import { useNavigate } from "react-router";
import SubscriptionImg from "../../../assets/Subscription.png";
import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const subscriptionOptions = [
  { label: "1 Minute -(test Purpose)", value: 1, price: 5 },
  { label: "5 Days", value: 5 * 24 * 60, price: 10 },
  { label: "10 Days", value: 10 * 24 * 60, price: 20 },
];

export default function Subscription() {
  const [selected, setSelected] = useState(subscriptionOptions[0]);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    navigate("/payment", { state: selected });
  };

  return (
    <div className="min-h-screen ">
      {/* Banner */}
      <div className="lg:flex text-center lg:text-start items-center  gap-5 bg-white justify-between max-w-7xl mx-auto my-10 shadow-xl rounded-3xl py-10 mb-30 ml-2 mr-2 space-y-8 lg:space-y-0">
        <img className="xl:w-[700px] w-[500px] mx-auto lg:mx-0" src={SubscriptionImg} alt="" />
        <div className="">
          <h1 className="sm:text-5xl text-4xl md:leading-15 font-bold text-black max-w-[500px] mx-auto lg:mx-0">Subscription to our Newsletter</h1>
          <p className="text-xl font-medium text-gray-600 mb-5 mt-2 max-w-xl mx-auto lg:mx-0">Get access to exclusive articles, ad-free reading, and digital newspaper editions.</p>
          <button
            onClick={() => window.scrollTo({ top: 750, behavior: "smooth" })}
            className="btn btn-primary"
          >
            <FaArrowRight />
            Get Started
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold  mb-4">
          Unlock Premium Access to All News
        </h1>
        <p className="text-lg text-gray-500">
        Subscription to access premium news.
        </p>
      </div>

      {/* Subscription Card */}
      <div className="max-w-xl mx-auto bg-base-200 shadow-2xl rounded-2xl p-8 border border-gray-200 mb-20">
        <h2 className="text-2xl font-semibold text-center mb-6 ">
          Choose Your Subscription Plan
        </h2>

        {/* Dropdown */}
        <div className="mb-6">
          <label className="block  font-medium mb-2">
            Subscription Period
          </label>
          <select
            className="w-full border border-gray-800 bg-base-200 rounded px-4 py-2"
            value={selected.value}
            onChange={(e) => {
              const option = subscriptionOptions.find(
                (opt) => opt.value === parseInt(e.target.value)
              );
              setSelected(option);
            }}
          >
            {subscriptionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} - ${opt.price}
              </option>
            ))}
          </select>
        </div>

        {/* Price Display */}
        <div className="text-center text-xl font-bold text-primary mb-6">
          Total: ${selected.price}
        </div>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
