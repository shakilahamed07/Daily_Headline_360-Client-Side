import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const PaymentFrom = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient()
  const state = location.state;
  const priceInCents = state.price * 100;

  const now = Date.now();
  const expireTime = now + state.value * 60 * 1000;

  const generateTrackingId = () => {
    const prefix = "TRK";
    const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
    const timestamp = Date.now().toString().slice(-5); 
    return `${prefix}-${randomPart}-${timestamp}`;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    //* step -1 card validate
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("Payment method", paymentMethod);

      //* step -2 create payment intent in server
      const res = await axiosSecure.post(`/create-payment-intent`, {
        amount: priceInCents,
        currency: "usd",
      });

      const clientSecret = res.data.clientSecret;

      //* step -3 conform payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setError("");
          // const transactionId = result.paymentIntent.id;

          await axiosSecure.patch(`/users/subscription/${user.email}`,{expireTime})
          queryClient.invalidateQueries(["users2"]);

          const paymentData = {
            name: user.displayName,
            email: user.email,
            amount: priceInCents/100,
            transactionId: generateTrackingId(),
            pay_date: new Date().toISOString()
          };

          //* step:4 save payment data
          await axiosSecure.post('/payments', paymentData);

          navigate('/premium-articles')
          Swal.fire({
            title: "Congratulation! Active your subscription",
            text: `✅ Payment Successful!`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
          });
        }
      }
    }

    setLoading(false);
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: "24px",
        color: "#32325d",
        letterSpacing: "0.025em",
        fontFamily: "'Poppins', sans-serif",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#e53e3e", // red for errors
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-(285px))] bg-gray-50 mx-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Payment Information
        </h2>

        <div className="bg-gray-100 rounded-lg py-4 border focus-within:border-blue-500">
          <CardElement options={CARD_OPTIONS} className="p-3" />
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            disabled={!stripe}
          >
            {loading
              ? "Processing..."
              : `Pay $${(priceInCents / 100).toFixed(2)}`}
          </button>
        </div>

        {error && (
          <p className="text-red-600 mt-4 text-sm text-center font-medium">
            ❌ {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentFrom;
