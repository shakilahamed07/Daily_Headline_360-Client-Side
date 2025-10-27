// SubscriptionPricing.jsx
import React from "react";
import { Link } from "react-router";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Access limited news", "Weekly newsletter", "No ads"],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$99/month",
    features: ["All daily news", "Exclusive articles", "No ads"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$199/month",
    features: ["Everything in Standard", "E-paper access", "Priority support"],
    highlighted: false,
  },
];

export default function SubscriptionPricing() {
  return (
    <div className="py-10 ">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div  
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-3 justify-center">
        {plans.map((plan, index) => (           
          <div 
            key={index}
            className='border pt-10 pb-5 px-5 rounded-2xl hover:border-primary hover:scale-105 transition-all hover:shadow-xl shadow-red-200'
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              {plan.name}
            </h3>
            <p className="text-2xl font-bold text-center mb-4">{plan.price}</p>
            <ul className="mb-6 space-y-2 text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link onClick={() => window.scrollTo({ top: 120, behavior: "smooth" })} to='/subscription' className=" btn w-full py-2 bg-primary text-white font-semibold rounded hover:bg-primary/80 transition mt-3 ">
              Subscribe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
